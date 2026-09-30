"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";

// Skjemaet har ingen backend ennå. Ved innsending åpnes brukerens e-postprogram
// med utfylt melding til site.email. Bytt ut handleSubmit når et skjema-API er på plass.

const fieldClass =
  "mt-2 block w-full rounded-md border border-cream-muted bg-navy-soft px-4 py-3 text-cream focus:border-cream";

export function ContactForm() {
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

    const subject = `Henvendelse fra nettsiden${company ? ` – ${company}` : ""}`;
    const body = [
      `Navn: ${name}`,
      `E-post: ${email}`,
      company ? `Bedrift: ${company}` : null,
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
          Navn
        </label>
        <input id="navn" name="navn" type="text" autoComplete="name" required className={fieldClass} />
      </div>
      <div>
        <label htmlFor="epost" className="text-sm font-medium">
          E-post
        </label>
        <input id="epost" name="epost" type="email" autoComplete="email" required className={fieldClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="bedrift" className="text-sm font-medium">
          Bedrift <span className="font-normal text-cream-muted">(valgfritt)</span>
        </label>
        <input id="bedrift" name="bedrift" type="text" autoComplete="organization" className={fieldClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="melding" className="text-sm font-medium">
          Hva trenger du hjelp med?
        </label>
        <textarea id="melding" name="melding" rows={5} required className={fieldClass} />
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-cream px-7 py-3.5 font-medium text-navy transition-colors hover:bg-sand"
        >
          Send henvendelse
        </button>
        <p role="status" aria-live="polite" className="text-sm text-cream-muted sm:text-right">
          {sent ? "Takk! E-postprogrammet ditt skal nå åpne seg med meldingen klar til sending." : null}
        </p>
      </div>
      {sent ? (
        <div className="rounded-xl border border-cream-muted/30 p-5 text-sm text-cream-muted sm:col-span-2">
          <p>
            Åpnet det seg ikke noe? Send meldingen direkte til <span className="text-cream">{site.email}</span>.
          </p>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-3 rounded-full border border-cream-muted/60 px-4 py-2 text-cream transition-colors hover:bg-cream hover:text-navy"
          >
            {copied ? "Kopiert!" : "Kopier e-postadressen"}
          </button>
        </div>
      ) : null}
    </form>
  );
}
