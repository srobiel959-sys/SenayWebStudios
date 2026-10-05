"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import type { Content } from "@/content";
import { site } from "@/content/shared";
import { href, type Lang } from "@/lib/routes";
import { ArrowIcon } from "./Icons";

// AI-chatten: en «Spør oss»-knapp nederst til høyre som åpner et chatvindu.
// Svarene strømmes fra /api/chat. Samtalen ligger bare i minnet og lagres ikke.

type Message = {
  role: "user" | "assistant";
  content: string;
  /** Feilmeldinger og spørsmålet som feilet sendes ikke med videre. */
  local?: boolean;
};

const MAX_CHARS = 2000;
const MAX_HISTORY = 19; // Oddetall, så historikken alltid starter med brukeren.

// Gjør nettadresser og e-post i svarene klikkbare. Lenker til egen side blir interne.
const linkPattern = /(https?:\/\/[^\s)]+[^\s).,!?:;]|[\w.+-]+@[\w-]+\.[\w.]*\w)/g;

function RichText({ text }: { text: string }) {
  return text.split(linkPattern).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    const className = "underline underline-offset-2 hover:no-underline";
    if (part.includes("@") && !part.startsWith("http")) {
      return (
        <a key={i} href={`mailto:${part}`} className={className}>
          {part}
        </a>
      );
    }
    if (part.startsWith(site.url)) {
      return (
        <Link key={i} href={part.slice(site.url.length) || "/"} className={className}>
          {part.replace(/^https?:\/\//, "")}
        </Link>
      );
    }
    return (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className={className}>
        {part.replace(/^https?:\/\//, "")}
      </a>
    );
  });
}

function ChatIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={className}>
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 4 13.5Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className={className}>
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export function ChatWidget({ lang, labels }: { lang: Lang; labels: Content["chat"] }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const wasOpen = useRef(false);

  // Fokus inn i chatten når den åpnes, og tilbake til knappen når den lukkes.
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (wasOpen.current) buttonRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Hold siste melding synlig mens svaret strømmer inn.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, open]);

  // Avbryt et pågående svar hvis komponenten forsvinner.
  useEffect(() => () => abortRef.current?.abort(), []);

  function close() {
    setOpen(false);
  }

  async function send(text: string) {
    const question = text.trim().slice(0, MAX_CHARS);
    if (!question || busy) return;

    const history = [...messages.filter((m) => !m.local), { role: "user" as const, content: question }];
    setMessages((prev) => [...prev, { role: "user", content: question }, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    // Oppdaterer det siste (assistent-)svaret i lista.
    const setReply = (update: (reply: Message) => Message) =>
      setMessages((prev) => [...prev.slice(0, -1), update(prev[prev.length - 1])]);
    // Ved feil vises feilmeldingen, og spørsmålet holdes utenfor videre historikk.
    const fail = (content: string) =>
      setMessages((prev) => [
        ...prev.slice(0, -2),
        { ...prev[prev.length - 2], local: true },
        { role: "assistant", content, local: true },
      ]);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: history.slice(-MAX_HISTORY).map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        fail(
          response.status === 503
            ? labels.errorNotConfigured
            : response.status === 429
              ? labels.errorRateLimited
              : labels.errorGeneric,
        );
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setReply((m) => ({ ...m, content: reply }));
      }
      if (!reply.trim()) fail(labels.errorGeneric);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) fail(labels.errorGeneric);
    } finally {
      abortRef.current = null;
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  // Enter sender, Shift+Enter gir ny linje.
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void send(input);
    }
  }

  const waiting = busy && messages[messages.length - 1]?.content === "";

  return (
    <>
      {!open && (
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label={labels.openLabel}
          aria-haspopup="dialog"
          className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3.5 font-medium text-cream shadow-lg shadow-navy/20 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-navy-soft motion-reduce:hover:translate-y-0 sm:bottom-6 sm:right-6"
        >
          <ChatIcon />
          {labels.open}
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-title"
          onKeyDown={(event) => {
            if (event.key === "Escape") close();
          }}
          className="fixed inset-x-0 bottom-0 z-50 flex h-[85dvh] flex-col overflow-hidden rounded-t-3xl border border-line bg-cream shadow-2xl shadow-navy/20 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(640px,calc(100dvh-3rem))] sm:w-[400px] sm:rounded-3xl"
        >
          <div className="flex items-start justify-between gap-4 bg-navy px-5 py-4 text-cream">
            <div>
              <h2 id="chat-title" className="font-display text-xl leading-tight">
                {labels.title}
              </h2>
              <p className="mt-1 text-sm text-cream-muted">{labels.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={labels.close}
              className="-mr-1 rounded-full p-2 transition-colors hover:bg-navy-soft"
            >
              <CloseIcon />
            </button>
          </div>

          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite" aria-busy={busy}>
            <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-sand px-4 py-3 leading-relaxed">
              {labels.welcome}
            </div>

            {messages.length === 0 && (
              <ul className="flex flex-wrap gap-2" aria-label={labels.inputLabel}>
                {labels.suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => void send(suggestion)}
                      className="rounded-full border border-navy/30 px-3.5 py-2 text-left text-sm transition-colors hover:bg-navy hover:text-cream"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {messages.map((message, i) =>
              message.role === "assistant" && message.content === "" ? null : (
                <div
                  key={i}
                  className={
                    message.role === "user"
                      ? "ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-md bg-navy px-4 py-3 leading-relaxed text-cream"
                      : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-md bg-sand px-4 py-3 leading-relaxed"
                  }
                >
                  <span className="sr-only">{message.role === "user" ? labels.youLabel : labels.assistantLabel}: </span>
                  {message.role === "assistant" ? <RichText text={message.content} /> : message.content}
                </div>
              ),
            )}

            {waiting && (
              <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-tl-md bg-sand px-4 py-3.5">
                <span className="sr-only">{labels.thinking}</span>
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    aria-hidden="true"
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-muted motion-reduce:animate-none"
                    style={{ animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-line px-4 pb-4 pt-3">
            <form onSubmit={handleSubmit} className="flex items-end gap-2">
              <label htmlFor="chat-input" className="sr-only">
                {labels.inputLabel}
              </label>
              <textarea
                ref={inputRef}
                id="chat-input"
                rows={1}
                value={input}
                maxLength={MAX_CHARS}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={labels.placeholder}
                className="max-h-32 min-h-12 flex-1 resize-none rounded-2xl border border-line bg-white px-4 py-3 leading-snug focus:border-navy"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label={labels.send}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-cream transition-colors hover:bg-navy-soft disabled:opacity-40"
              >
                <ArrowIcon className="h-5 w-5" />
              </button>
            </form>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-ink-muted">
              <p>{labels.disclaimer}</p>
              <Link href={href(lang, "contact")} onClick={close} className="font-medium text-navy underline underline-offset-2">
                {labels.contact}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
