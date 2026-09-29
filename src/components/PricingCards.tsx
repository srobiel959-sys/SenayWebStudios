import Link from "next/link";
import { packages } from "@/content/site";
import { CheckIcon } from "./Icons";

export function PricingCards() {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {packages.map((pkg) => {
        const muted = pkg.highlighted ? "text-cream-muted" : "text-ink-muted";
        return (
          <li
            key={pkg.name}
            className={`flex flex-col rounded-2xl border p-8 sm:p-10 ${
              pkg.highlighted ? "border-navy bg-navy text-cream" : "border-line bg-cream"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-3xl">{pkg.name}</h3>
              {pkg.highlighted ? (
                <span className="rounded-full border border-cream-muted/60 px-3 py-1 text-xs uppercase tracking-wider">
                  Start her
                </span>
              ) : null}
            </div>
            <p className={`mt-3 leading-relaxed ${muted}`}>{pkg.description}</p>

            <p className="mt-10 flex items-baseline gap-2">
              <span className="text-sm">kr</span>
              <span className="text-5xl font-medium tracking-tight">{pkg.price}</span>
              <span className={`text-sm ${muted}`}>{pkg.period}</span>
            </p>
            {pkg.perDay ? <p className={`mt-2 text-sm ${muted}`}>{pkg.perDay}</p> : null}

            <ul className="mt-8 flex-1 space-y-3 border-t border-current/15 pt-8">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/kontakt"
              className={`mt-10 inline-flex items-center justify-center rounded-full px-6 py-3.5 font-medium transition-colors ${
                pkg.highlighted ? "bg-cream text-navy hover:bg-sand" : "border border-navy hover:bg-navy hover:text-cream"
              }`}
            >
              {pkg.cta}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
