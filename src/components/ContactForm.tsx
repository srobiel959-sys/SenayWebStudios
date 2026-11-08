"use client";

import { useState, type FormEvent } from "react";
import type { Content } from "@/content";
import { site } from "@/content/shared";
import { btnArrow } from "@/lib/ui";
import { ArrowCircle } from "./Icons";

// Henvendelser sendes til Formspree (https://formspree.io), som videresender dem på e-post.
// Skjema-ID-en settes i NEXT_PUBLIC_FORMSPREE_ID. Mangler den, åpnes brukerens
// e-postprogram i stedet, med meldingen ferdig utfylt.

const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

/** Øvre grense for hvert felt (e-post: 254 tegn er maks for en adresse). */
const maxLength = { bedrift: 120, kontakt: 254, navn: 100, melding: 2000 } as const;

const fieldClass =
  "mt-2 block w-full rounded-2xl border border-line bg-white px-4 py-3 text-navy transition-colors duration-300 hover:border-navy/30 focus:border-navy";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

export function ContactForm({ labels }: { labels: Content["contact"]["form"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

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
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
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
      <div>
        <label htmlFor="kontakt" className="text-sm font-medium">
          {labels.contact}
        </label>
        <input
          id="kontakt"
          name="kontakt"
          type="text"
          autoComplete="email"
          required
          maxLength={maxLength.kontakt}
          className={fieldClass}
        />
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
        <button type="submit" disabled={status === "sending"} className={`${btnArrow} disabled:opacity-60`}>
          {status === "sending" ? labels.sending : labels.submit}
          <ArrowCircle />
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
            className="mt-3 rounded-full border border-navy/20 px-4 py-2 text-navy transition-colors hover:border-navy/40 hover:bg-navy/5"
          >
            {copied ? labels.copied : labels.copy}
          </button>
        </div>
      ) : null}
    </form>
  );
}
