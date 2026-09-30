"use client";

import { useState, type FormEvent } from "react";
import type { Content } from "@/content";
import { site } from "@/content/shared";

// Skjemaet har ingen backend ennå. Ved innsending åpnes brukerens e-postprogram
// med utfylt melding til site.email. Bytt ut handleSubmit når et skjema-API er på plass.

const fieldClass =
  "mt-2 block w-full rounded-md border border-cream-muted bg-navy-soft px-4 py-3 text-cream focus:border-cream";

export function ContactForm({ labels }: { labels: Content["contact"]["form"] }) {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  // Reserveløsning for dem som ikke har et e-postprogram satt opp.
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("navn") ?? "");
    const email = String(data.get("epost") ?? "");
    const company = String(data.get("bedrift") ?? "");
    const message = String(data.get("melding") ?? "");

    const subject = `${labels.subject}${company ? ` – ${company}` : ""}`;
    const body = [
      `${labels.bodyName}: ${name}`,
      `${labels.bodyEmail}: ${email}`,
      company ? `${labels.bodyCompany}: ${company}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="navn" className="text-sm font-medium">
          {labels.name}
        </label>
        <input id="navn" name="navn" type="text" autoComplete="name" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="epost" className="text-sm font-medium">
          {labels.email}
        </label>
        <input id="epost" name="epost" type="email" autoComplete="email" required className={fieldClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="bedrift" className="text-sm font-medium">
          {labels.company} <span className="font-normal text-cream-muted">{labels.optional}</span>
        </label>
        <input id="bedrift" name="bedrift" type="text" autoComplete="organization" className={fieldClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="melding" className="text-sm font-medium">
          {labels.message}
        </label>
        <textarea id="melding" name="melding" rows={5} required className={fieldClass} />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-cream px-7 py-3.5 font-medium text-navy transition-colors hover:bg-sand"
        >
          {labels.submit}
        </button>
        <p role="status" aria-live="polite" className="text-sm text-cream-muted sm:text-right">
          {sent ? labels.sent : null}
        </p>
      </div>
      {sent ? (
        <div className="rounded-xl border border-cream-muted/30 p-5 text-sm text-cream-muted sm:col-span-2">
          <p>
            {labels.fallback} <span className="text-cream">{site.email}</span>.
          </p>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-3 rounded-full border border-cream-muted/60 px-4 py-2 text-cream transition-colors hover:bg-cream hover:text-navy"
          >
            {copied ? labels.copied : labels.copy}
          </button>
        </div>
      ) : null}
    </form>
  );
}
