import Link from "next/link";
import { AgencyCompare } from "@/components/AgencyCompare";
import { CtaBand } from "@/components/CtaBand";
import { DemoGallery } from "@/components/demo/DemoGallery";
import { HeroShowcase } from "@/components/demo/HeroShowcase";
import { ArrowIcon } from "@/components/Icons";
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

      {/* Hero: kort spørsmål, én setning, og en ferdig nettside som blikkfang. */}
      <section aria-labelledby="hero-tittel" className="relative overflow-hidden border-b border-line">
        <div className={`${container} pt-12 text-center sm:pt-16 lg:pt-20`}>
          <p className="hero-in text-sm font-medium uppercase tracking-[0.22em] text-ink-muted">{hero.eyebrow}</p>
          <h1
            id="hero-tittel"
            className="hero-in hero-in-2 mx-auto mt-6 max-w-5xl font-display text-[2.9rem] leading-[1.02] tracking-tight sm:text-7xl lg:text-[6rem]"
          >
            {hero.title} <em className="block not-italic text-ink-muted">{hero.titleAccent}</em>
          </h1>
          <p className="hero-in hero-in-3 mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-ink-muted sm:text-xl">{hero.lead}</p>
          <div className="hero-in hero-in-4 mt-9 flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href={href(lang, "contact")} className={btnPrimary}>
              {hero.primaryCta}
              <ArrowIcon />
            </Link>
            <a href="#eksempler" className={btnSecondary}>
              {hero.secondaryCta}
            </a>
          </div>

          <div className="hero-in hero-in-4 mx-auto mt-12 max-w-5xl sm:mt-14">
            <HeroShowcase lang={lang} label={hero.showcaseLabel} fictional={c.demos.fictional} />
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
