import Link from "next/link";
import type { Content } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { btnArrowLight } from "@/lib/ui";
import { ArrowCircle, CheckIcon } from "./Icons";

// Én samlet pakke: 0 kr for å lage nettsiden → engangsbeløp når den går live → fast månedspris for drift.

export function PricingCards({ lang, c }: { lang: Lang; c: Content }) {
  const b = c.pricing.bundle;
  // Norsk skrives «4 599 kr», engelsk «NOK 4,599».
  const currency = <span className="text-base font-normal text-cream-muted">{c.ui.kr}</span>;
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-navy text-cream">
      <div className="pointer-events-none absolute -left-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.3),transparent)]" />
      <div className="relative grid lg:grid-cols-12">
        <div className="p-8 sm:p-12 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-display text-4xl tracking-tight sm:text-5xl">{b.name}</h3>
            <span className="rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider">{b.badge}</span>
          </div>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream-muted">{b.description}</p>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/15 sm:grid-cols-3">
            {b.steps.map((step, i) => (
              <li key={step.label} className="relative bg-[#0b2178] p-6">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#93c5fd]">
                  {c.ui.step} {i + 1}
                </span>
                <p className="mt-3 flex items-baseline gap-1.5 font-display text-4xl tracking-tight">
                  {lang === "en" ? currency : null}
                  {step.price}
                  {lang === "en" ? null : currency}
                </p>
                <p className="mt-2 font-medium">{step.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream-muted">{step.note}</p>
              </li>
            ))}
          </ol>

          <Link href={href(lang, "contact")} className={`${btnArrowLight} mt-10`}>
            {b.cta}
            <ArrowCircle tone="light" />
          </Link>
        </div>

        <div className="border-t border-white/15 bg-black/15 p-8 sm:p-12 lg:col-span-5 lg:border-l lg:border-t-0">
          <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-cream-muted">{b.featuresTitle}</h4>
          <ul className="mt-6 space-y-3">
            {b.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-[#93c5fd]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
