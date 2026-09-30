import Link from "next/link";
import type { Content } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { btnLight, container } from "@/lib/ui";
import { ArrowIcon, CheckIcon, CrossIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// «Andre byråer» mot «Senay Web Studio», side om side.

export function AgencyCompare({ lang, c }: { lang: Lang; c: Content }) {
  const a = c.agencies;
  return (
    <section aria-labelledby="byraer-tittel" className="border-t border-line py-24 sm:py-32">
      <div className={container}>
        <Reveal>
          <SectionHeading id="byraer-tittel" eyebrow={a.eyebrow} title={a.title} />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full rounded-2xl border border-line bg-sand p-8 sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">{a.others.label}</p>
            <h3 className="mt-3 font-display text-3xl">{a.others.title}</h3>
            <ul className="mt-8 space-y-4 text-lg">
              {a.others.items.map((item) => (
                <li key={item} className="flex gap-3 text-ink-muted">
                  <CrossIcon className="mt-1.5 h-4 w-4 shrink-0" />
                  <span>
                    <span className="sr-only">{c.ui.downside}: </span>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="h-full rounded-2xl bg-navy p-8 text-cream sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream-muted">{a.us.label}</p>
            <h3 className="mt-3 font-display text-3xl">{a.us.title}</h3>
            <ul className="mt-8 space-y-4 text-lg">
              {a.us.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckIcon className="mt-1.5 h-4 w-4 shrink-0" />
                  <span>
                    <span className="sr-only">{c.ui.upside}: </span>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-cream-muted/25 pt-6 text-cream-muted">{a.note}</p>
            <Link href={href(lang, "contact")} className={`${btnLight} mt-8`}>
              {a.cta}
              <ArrowIcon />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
