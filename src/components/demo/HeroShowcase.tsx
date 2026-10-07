"use client";

import { useEffect, useState } from "react";
import { demos } from "@/content/demos";
import type { Lang } from "@/lib/routes";
import { DemoSite } from "./DemoSite";
import { ScaledPreview } from "./ScaledPreview";

// Blikkfanget på forsiden: en ferdig nettside som bytter bransje av seg selv,
// mens adressen skrives inn i adressefeltet. Viser i stedet for å forklare.

const SLUGS = ["frisor", "kafe", "elektriker", "tannlege", "restaurant", "blomsterbutikk"];
const showcase = SLUGS.map((slug) => demos.find((d) => d.slug === slug)).filter((d) => d !== undefined);
const INTERVAL = 4200;

/** «Salong Lykke» → «salonglykke.no» */
function domainFor(name: string) {
  return `${name
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]/g, "")}.no`;
}

export function HeroShowcase({ lang, label, fictional }: { lang: Lang; label: string; fictional: string }) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const current = showcase[index];
  const domain = domainFor(current.name);
  const [typing, setTyping] = useState({ domain, n: 0 });
  const typed = typing.domain === domain ? typing.n : 0;

  // Bytt bransje automatisk, men ikke ved redusert bevegelse eller etter at brukeren har valgt selv.
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % showcase.length), INTERVAL);
    return () => clearInterval(timer);
  }, [auto]);

  // Skriv adressen tegn for tegn (alt på én gang ved redusert bevegelse).
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let n = 0;
    const timer = setInterval(
      () => {
        n = reduced ? domain.length : n + 1;
        setTyping({ domain, n });
        if (n >= domain.length) clearInterval(timer);
      },
      reduced ? 0 : 55,
    );
    return () => clearInterval(timer);
  }, [domain]);

  return (
    <div>
      {/* Bransjevelger */}
      <div
        role="group"
        aria-label={label}
        className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-2 sm:px-0"
      >
        {showcase.map((demo, i) => (
          <button
            key={demo.slug}
            type="button"
            aria-pressed={i === index}
            onClick={() => {
              setAuto(false);
              setIndex(i);
            }}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
              i === index ? "bg-navy text-cream" : "text-ink-muted hover:text-navy"
            }`}
          >
            {demo.label[lang]}
          </button>
        ))}
      </div>

      {/* Nettleservinduet. Toner ut nederst, så man får lyst til å scrolle videre. */}
      <div className="relative mt-6 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
        <div className="overflow-hidden rounded-t-2xl border border-b-0 border-line bg-cream shadow-[0_40px_120px_-40px_rgba(7,22,48,0.55)]">
          <div className="flex items-center gap-3 border-b border-line bg-sand px-4 py-3">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E36A5C]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E9B949]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#62B36B]" />
            </span>
            <span className="mx-auto flex w-full max-w-sm items-center justify-center gap-1.5 rounded-md bg-cream px-3 py-1 text-xs text-ink-muted">
              <svg viewBox="0 0 16 16" className="h-3 w-3 shrink-0" aria-hidden="true">
                <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
              <span aria-hidden="true">
                {domain.slice(0, typed)}
                <span className="ml-px inline-block h-3 w-px translate-y-0.5 animate-pulse bg-ink-muted motion-reduce:hidden" />
              </span>
              <span className="sr-only">
                {current.label[lang]} · {current.name} · {fictional}
              </span>
            </span>
            <span className="hidden w-[46px] sm:block" aria-hidden="true" />
          </div>
          <ScaledPreview id={current.slug} className="h-[26rem] sm:h-[30rem] lg:h-[34rem]">
            <DemoSite demo={current} fictionalLabel={fictional} />
          </ScaledPreview>
        </div>
      </div>
    </div>
  );
}
