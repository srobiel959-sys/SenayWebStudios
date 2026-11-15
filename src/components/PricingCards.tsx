import Link from "next/link";
import type { Content } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { btnArrowLight } from "@/lib/ui";
import { ArrowCircle, CheckIcon } from "./Icons";

// Én samlet pakke: 0 kr for å lage nettsiden → engangsbeløp når den går live → fast månedspris for drift.

function ShieldIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-sky" aria-hidden="true">
      <path d="M10 2.5 4 5v4.5c0 3.7 2.6 6.6 6 8 3.4-1.4 6-4.3 6-8V5l-6-2.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m7.5 10 1.8 1.8 3.4-3.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PricingCards({ lang, c }: { lang: Lang; c: Content }) {
  const b = c.pricing.bundle;
  // Norsk skrives «4 599 kr», engelsk «NOK 4,599».
  const currency = <span className="text-base font-normal text-cream-muted">{c.ui.kr}</span>;
  return (
    <div className="relative overflow-hidden rounded-3xl bg-navy text-cream">
      <div className="relative grid lg:grid-cols-12">
        <div className="p-8 sm:p-12 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-display text-4xl tracking-tight sm:text-5xl">{b.name}</h3>
            <span className="rounded-full border border-white/25 px-3 py-1 text-sm">{b.badge}</span>
          </div>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream-muted">{b.description}</p>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/15 bg-white/15 sm:grid-cols-3">
            {b.steps.map((step, i) => (
              <li key={step.label} className="relative bg-navy-soft p-6">
                <span className="text-sm font-medium text-sky">
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
          <div className="mb-10 rounded-[1.25rem] border border-white/15 bg-white/[0.06] p-5">
            <p className="flex items-center gap-2 font-medium">
              <ShieldIcon />
              {b.guarantee.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-cream-muted">{b.guarantee.text}</p>
          </div>
          <h4 className="text-sm font-medium text-cream-muted">{b.featuresTitle}</h4>
          <div className="mt-6 space-y-7">
            {b.featureGroups.map((group) => (
              <div key={group.title}>
                <h5 className="font-medium">{group.title}</h5>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-cream-muted">
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-sky" />
                      <span className="text-cream">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
