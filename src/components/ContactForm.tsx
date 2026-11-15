"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Content } from "@/content";
import { site } from "@/content/shared";
import { btnArrow } from "@/lib/ui";
import { ArrowCircle, CheckIcon } from "./Icons";

// Henvendelser sendes til Formspree (https://formspree.io), som videresender dem på e-post.
// Skjema-ID-en settes i NEXT_PUBLIC_FORMSPREE_ID. Mangler den, åpnes brukerens
// e-postprogram i stedet, med meldingen ferdig utfylt.

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

/** Øvre grense for hvert felt (e-post: 254 tegn er maks for en adresse). */
const maxLength = { bedrift: 120, kontakt: 254, navn: 100, melding: 2000 } as const;

const fieldClass =
  "mt-2 block w-full rounded-2xl border border-line bg-white px-4 py-3 text-navy transition-colors duration-300 hover:border-navy/30 focus:border-navy";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

/** Godtar e-post eller telefon slik folk faktisk skriver dem: «+47 912 34 567», «912-34-567», «ola@firma.no». */
export function isContact(value: string) {
  const v = value.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return true;
  const digits = v.replace(/[\s+().-]/g, "");
  return /^\d{8,15}$/.test(digits);
}

export function ContactForm({ labels, prefillMessage }: { labels: Content["contact"]["form"]; prefillMessage: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Kommer kunden fra «Din nettside, live» på forsiden, fylles bedrift og melding ut.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const company = (params.get("bedrift") ?? "").trim().slice(0, maxLength.bedrift);
    const industry = (params.get("bransje") ?? "").trim().slice(0, 60);
    const form = formRef.current;
    if (!form) return;
    const companyField = form.elements.namedItem("bedrift");
    const messageField = form.elements.namedItem("melding");
    if (company && companyField instanceof HTMLInputElement && !companyField.value) companyField.value = company;
    if (industry && messageField instanceof HTMLTextAreaElement && !messageField.value) {
      messageField.value = prefillMessage.replace("{bransje}", industry.toLowerCase()).slice(0, maxLength.melding);
    }
  }, [prefillMessage]);

  // Etter en feil: flytt fokus til feltet når det er tegnet på nytt (det ristes ved hjelp av key).
  useEffect(() => {
    if (!shakeKey) return;
    const field = formRef.current?.elements.namedItem("kontakt");
    if (field instanceof HTMLInputElement) field.focus();
  }, [shakeKey]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    // Trimmes og kortes ned også her, i tilfelle maxLength i feltet er omgått.
    const line = (key: Exclude<keyof typeof maxLength, "melding">) =>
      String(data.get(key) ?? "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, maxLength[key]);
    const company = line("bedrift");
    const contact = line("kontakt");
    const name = line("navn");
    const message = String(data.get("melding") ?? "")
      .trim()
      .slice(0, maxLength.melding);
    const subject = `${labels.subject} – ${company}`;

    if (!isContact(contact)) {
      setContactError(true);
      setShakeKey((k) => k + 1);
      return;
    }
    setContactError(false);

    if (!formspreeId) {
      const body = [
        `${labels.bodyCompany}: ${company}`,
        `${labels.bodyContact}: ${contact}`,
        name ? `${labels.bodyName}: ${name}` : null,
        "",
        message,
      ]
        .filter((part) => part !== null)
        .join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subject,
          // Formspree bruker «email» som svaradresse, så den settes bare når det er en e-post.
          ...(contact.includes("@") ? { email: contact } : {}),
          [labels.bodyCompany]: company,
          [labels.bodyContact]: contact,
          [labels.bodyName]: name,
          [labels.bodyMessage]: message,
          _gotcha: String(data.get("_gotcha") ?? ""),
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const statusText =
    status === "sending"
      ? labels.sending
      : status === "sent"
        ? labels.sent
        : status === "mailto"
          ? labels.sentMailto
          : status === "error"
            ? labels.error
            : null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="bedrift" className="text-sm font-medium">
          {labels.company}
        </label>
        <input
          id="bedrift"
          name="bedrift"
          type="text"
          autoComplete="organization"
          required
          maxLength={maxLength.bedrift}
          className={fieldClass}
        />
      </div>
      <div key={shakeKey} className={shakeKey ? "shake" : undefined}>
        <label htmlFor="kontakt" className="text-sm font-medium">
          {labels.contact}
        </label>
        <input
          id="kontakt"
          name="kontakt"
          type="text"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={maxLength.kontakt}
          aria-invalid={contactError || undefined}
          aria-describedby={contactError ? "kontakt-feil" : undefined}
          onChange={() => contactError && setContactError(false)}
          className={`${fieldClass} ${contactError ? "border-[#b42318]" : ""}`}
        />
        {contactError ? (
          <p id="kontakt-feil" className="mt-2 text-sm text-[#b42318]">
            {labels.contactInvalid}
          </p>
        ) : null}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="navn" className="text-sm font-medium">
          {labels.name} <span className="font-normal text-ink-muted">{labels.optional}</span>
        </label>
        <input id="navn" name="navn" type="text" autoComplete="name" maxLength={maxLength.navn} className={fieldClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="melding" className="text-sm font-medium">
          {labels.message} <span className="font-normal text-ink-muted">{labels.optional}</span>
        </label>
        <textarea id="melding" name="melding" rows={4} maxLength={maxLength.melding} className={fieldClass} />
      </div>
      {/* Felle for spamroboter: skjult for mennesker, Formspree avviser innsendinger der den er fylt ut. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="_gotcha">Ikke fyll ut</label>
        <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className={`${btnArrow} disabled:opacity-60 ${status === "sent" ? "bg-[#0c7d4c] hover:bg-[#0c7d4c]" : ""}`}
        >
          {status === "sending" ? labels.sending : status === "sent" ? labels.sentButton : labels.submit}
          {status === "sent" ? (
            <span aria-hidden="true" className="pop flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
              <CheckIcon className="check-draw h-5 w-5" />
            </span>
          ) : (
            <ArrowCircle />
          )}
        </button>
        <p role="status" aria-live="polite" className={`text-sm sm:text-right ${status === "error" ? "text-[#b42318]" : "text-ink-muted"}`}>
          {statusText}
        </p>
      </div>
      {status === "mailto" || status === "error" ? (
        <div className="rounded-2xl border border-line bg-sand p-5 text-sm text-ink-muted sm:col-span-2">
          <p>
            {labels.fallback} <span className="text-navy">{site.email}</span>.
          </p>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-3 inline-flex min-h-11 items-center rounded-full border border-navy/20 px-4 py-2 text-navy transition-colors duration-150 hover:border-navy/40 hover:bg-navy/5"
          >
            {copied ? (
              <span className="inline-flex items-center gap-1.5">
                <CheckIcon className="pop check-draw h-4 w-4" />
                {labels.copied}
              </span>
            ) : (
              labels.copy
            )}
          </button>
        </div>
      ) : null}
    </form>
  );
}
