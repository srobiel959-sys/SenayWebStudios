"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import type { Content } from "@/content";
import { site } from "@/content/shared";
import { answer } from "@/lib/chat-match";
import { href, type Lang, type PageKey } from "@/lib/routes";
import { ArrowIcon } from "./Icons";

// Chat-assistenten: en «Spør oss»-knapp nederst til høyre som åpner et chatvindu.
// Svarene kommer fra kunnskapsbasen i src/content/chat-knowledge.ts og finnes
// i nettleseren (src/lib/chat-match.ts) – ingen AI, ingen API og ingenting lagres.

type Message =
  | { role: "user"; content: string }
  | { role: "assistant"; content: string; links: PageKey[]; followUps: string[] };

const MAX_CHARS = 500;

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

export function ChatWidget({ lang, labels, nav }: { lang: Lang; labels: Content["chat"]; nav: Content["nav"] }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const wasOpen = useRef(false);

  // Fokus inn i chatten når den åpnes, og tilbake til knappen når den lukkes.
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else if (wasOpen.current) buttonRef.current?.focus();
    wasOpen.current = open;
  }, [open]);

  // Hold siste melding synlig.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, busy, open]);

  // Stopp et ventende svar hvis komponenten forsvinner.
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  function close() {
    setOpen(false);
  }

  function send(text: string) {
    const question = text.trim().slice(0, MAX_CHARS);
    if (!question || busy) return;

    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setInput("");
    setBusy(true);

    // En kort «skriver …»-pause, så svaret føles naturlig. Kortere ved redusert bevegelse.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduced ? 150 : 500 + Math.min(question.length * 8, 400);
    timerRef.current = setTimeout(() => {
      const reply = answer(question, lang);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply.text, links: reply.links, followUps: reply.followUps },
      ]);
      setBusy(false);
      timerRef.current = null;
    }, delay);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(input);
  }

  // Enter sender, Shift+Enter gir ny linje.
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      send(input);
    }
  }

  // Eksempelsidene skal se ut som kundens egen nettside – uten vår chatboble.
  if (/\/demo\//.test(pathname)) return null;

  const last = messages[messages.length - 1];
  const suggestions = messages.length === 0 ? labels.suggestions : last?.role === "assistant" ? last.followUps : [];

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

            {messages.map((message, i) =>
              message.role === "user" ? (
                <div
                  key={i}
                  className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-md bg-navy px-4 py-3 leading-relaxed text-cream"
                >
                  <span className="sr-only">{labels.youLabel}: </span>
                  {message.content}
                </div>
              ) : (
                <div key={i} className="max-w-[85%] space-y-2">
                  <div className="whitespace-pre-wrap rounded-2xl rounded-tl-md bg-sand px-4 py-3 leading-relaxed">
                    <span className="sr-only">{labels.assistantLabel}: </span>
                    <RichText text={message.content} />
                  </div>
                  {message.links.length > 0 && (
                    <p className="flex flex-wrap gap-2">
                      {message.links.map((key) => (
                        <Link
                          key={key}
                          href={href(lang, key)}
                          onClick={close}
                          className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3.5 py-1.5 text-sm font-medium text-cream transition-colors hover:bg-navy-soft"
                        >
                          {nav[key]}
                          <ArrowIcon className="h-3.5 w-3.5" />
                        </Link>
                      ))}
                    </p>
                  )}
                </div>
              ),
            )}

            {busy && (
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

            {!busy && suggestions.length > 0 && (
              <ul className="flex flex-wrap gap-2" aria-label={labels.suggestionsLabel}>
                {suggestions.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => send(suggestion)}
                      className="rounded-full border border-navy/30 px-3.5 py-2 text-left text-sm transition-colors hover:bg-navy hover:text-cream"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
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
