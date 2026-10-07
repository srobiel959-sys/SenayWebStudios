import Link from "next/link";
import { AgencyCompare } from "@/components/AgencyCompare";
import { CtaBand } from "@/components/CtaBand";
import { DemoGallery } from "@/components/demo/DemoGallery";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/content";
import { href, type Lang, type PageKey } from "@/lib/routes";
import { businessSchema } from "@/lib/schema";
import { btnPrimary, btnSecondary, container } from "@/lib/ui";

export function HomeView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { hero } = c;

  return (
    <>
      <JsonLd data={businessSchema(lang)} />

      {/* Hero */}
      <section aria-labelledby="hero-tittel" className="relative overflow-hidden border-b border-line">
        <div className={`${container} grid min-h-[calc(100svh-5rem)] items-center gap-12 py-16 sm:py-24 lg:grid-cols-12`}>
          <div className="lg:col-span-8">
            <p className="hero-in text-sm font-medium uppercase tracking-[0.22em] text-ink-muted">{hero.eyebrow}</p>
            <h1
              id="hero-tittel"
              className="hero-in hero-in-2 mt-6 font-display text-[2.75rem] leading-[1.02] tracking-tight sm:text-7xl lg:text-[4.75rem] xl:text-[5.25rem]"
            >
              {hero.title} <em className="not-italic text-ink-muted">{hero.titleAccent}</em>
            </h1>
            <p className="hero-in hero-in-3 mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">{hero.lead}</p>
            <div className="hero-in hero-in-4 mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href={href(lang, "contact")} className={btnPrimary}>
                {hero.primaryCta}
                <ArrowIcon />
              </Link>
              <a href="#eksempler" className={btnSecondary}>
                {hero.secondaryCta}
              </a>
            </div>
          </div>

          {/* Prisen som blikkfang: hele tilbudet på ett kort. */}
          <div className="hero-in hero-in-4 lg:col-span-4">
            <div className="rounded-3xl bg-navy p-7 text-cream shadow-xl shadow-navy/10 sm:p-9">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-cream-muted">{hero.offer.label}</p>
              <ul className="mt-6 divide-y divide-cream-muted/20">
                {hero.offer.items.map((item, i) => (
                  <li key={item.amount} className={i === 0 ? "pb-5" : "py-5"}>
                    <p className={`font-display leading-none ${i === 0 ? "text-5xl sm:text-6xl" : "text-3xl"}`}>{item.amount}</p>
                    <p className="mt-2 text-cream-muted">{item.text}</p>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-2 border-t border-cream-muted/20 pt-5">
                {hero.offer.badges.map((badge) => (
                  <li key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-cream-muted/40 px-3 py-1 text-sm">
                    <CheckIcon className="h-3.5 w-3.5" />
                    {badge}
                  </li>
                ))}
              </ul>
              <Link
                href={href(lang, "pricing")}
                className="mt-6 inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
              >
                {hero.offer.link}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Eksempler rett under forsiden */}
      <section id="eksempler" aria-labelledby="eksempler-tittel" className="scroll-mt-24 py-24 sm:py-32">
        <div className={container}>
          <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="eksempler-tittel" eyebrow={c.demos.eyebrow} title={c.demos.title} lead={c.demos.lead} />
          </Reveal>
          <div className="mt-12">
            <DemoGallery lang={lang} labels={c.demos} />
          </div>
        </div>
      </section>

      <AgencyCompare lang={lang} c={c} />

      {/* Innganger til sidene */}
      <section aria-labelledby="utforsk-tittel" className="border-t border-line bg-sand py-24 sm:py-32">
        <div className={container}>
          <Reveal>
            <SectionHeading id="utforsk-tittel" eyebrow={c.explore.eyebrow} title={c.explore.title} lead={c.explore.lead} />
          </Reveal>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {c.explore.items.map((item, i) => {
              const last = i === c.explore.items.length - 1;
              return (
                <li key={item.key} className={last ? "bg-navy text-cream" : "bg-cream"}>
                  <Link
                    href={href(lang, item.key as PageKey)}
                    className={`group flex h-full flex-col p-8 transition-colors duration-300 sm:p-10 ${
                      last ? "hover:bg-navy-soft" : "hover:bg-sand"
                    }`}
                  >
                    <span className={`text-sm font-medium ${last ? "text-cream-muted" : "text-ink-muted"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-3xl">{item.title}</h3>
                    <p className={`mt-3 flex-1 leading-relaxed ${last ? "text-cream-muted" : "text-ink-muted"}`}>{item.text}</p>
                    <span className="mt-8 inline-flex items-center gap-2 font-medium">
                      {last ? c.ui.getInTouch : c.ui.readMore}
                      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand lang={lang} c={c} />
    </>
  );
}
