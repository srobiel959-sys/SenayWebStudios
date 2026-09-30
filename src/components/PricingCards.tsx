import Link from "next/link";
import type { Content } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { btnLight } from "@/lib/ui";
import { ArrowIcon, CheckIcon } from "./Icons";

// Én samlet pakke: 0 kr for å lage nettsiden → engangsbeløp når den går live → fast månedspris for drift.

export function PricingCards({ lang, c }: { lang: Lang; c: Content }) {
  const b = c.pricing.bundle;
  return (
    <div className="overflow-hidden rounded-3xl bg-navy text-cream">
      <div className="grid lg:grid-cols-12">
        <div className="p-8 sm:p-12 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-display text-4xl sm:text-5xl">{b.name}</h3>
            <span className="rounded-full border border-cream-muted/60 px-3 py-1 text-xs uppercase tracking-wider">
              {b.badge}
            </span>
          </div>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-cream-muted">{b.description}</p>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-cream-muted/20 sm:grid-cols-3">
            {b.steps.map((step, i) => (
              <li key={step.label} className="relative bg-navy p-6">
                <span className="text-xs font-medium uppercase tracking-[0.2em] text-cream-muted">
                  {c.ui.step} {i + 1}
                </span>
                <p className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-sm">{c.ui.kr}</span>
                  <span className="text-4xl font-medium tracking-tight">{step.price}</span>
                </p>
                <p className="mt-1 font-medium">{step.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream-muted">{step.note}</p>
              </li>
            ))}
          </ol>

          <Link href={href(lang, "contact")} className={`${btnLight} mt-10`}>
            {b.cta}
            <ArrowIcon />
          </Link>
        </div>

        <div className="border-t border-cream-muted/20 bg-navy-soft/40 p-8 sm:p-12 lg:col-span-5 lg:border-l lg:border-t-0">
          <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-cream-muted">{b.featuresTitle}</h4>
          <ul className="mt-6 space-y-3">
            {b.features.map((feature) => (
              <li key={feature} className="flex gap-3">
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
