import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { DemoSite } from "@/components/demo/DemoSite";
import { ScaledPreview } from "@/components/demo/ScaledPreview";
import { Faq } from "@/components/Faq";
import { ArrowCircle, ArrowIcon, CheckIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { PricingCards } from "@/components/PricingCards";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/content";
import { demos, getDemo } from "@/content/demos";
import { demoHref, href, industryHref, type Lang } from "@/lib/routes";
import { bezel, bezelCore, btnArrow, btnSecondary, container, kicker } from "@/lib/ui";

// Egen side per bransje («Nettside for frisør»), laget for å bli funnet på Google.
// All tekst er felles; bare bransjenavnet, eksemplet og listen over behov varierer.

/** «Frisør» → «frisør», men «Treningssenter / PT» beholder «PT». */
export function industryName(label: string) {
  return label.charAt(0).toLowerCase() + label.slice(1);
}

export function fillIndustry(text: string, label: string) {
  return text.replaceAll("{bransje}", industryName(label));
}

export function IndustryView({ lang, slug }: { lang: Lang; slug: string }) {
  const demo = getDemo(slug);
  if (!demo) notFound();
  const c = getContent(lang);
  const t = c.industry;
  const label = demo.label[lang];
  const fill = (text: string) => fillIndustry(text, label);
  const others = demos.filter((d) => d.group === demo.group && d.slug !== demo.slug);

  return (
    <>
      <PageHero eyebrow={fill(t.eyebrow)} title={fill(t.title)} lead={t.lead}>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link href={href(lang, "contact")} className={btnArrow}>
            {t.primaryCta}
            <ArrowCircle />
          </Link>
          <a href="#eksempel" className={btnSecondary}>
            {t.exampleTitle}
          </a>
        </div>
      </PageHero>

      <section aria-labelledby="behov-tittel" className="py-20 sm:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <Reveal className="lg:col-span-5">
            <SectionHeading id="behov-tittel" eyebrow={label} title={t.needsTitle} lead={t.needsLead} />
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {t.needs[demo.group].map((need, i) => (
              <li key={need}>
                <Reveal delay={(i % 2) * 90} className={`h-full ${bezel}`}>
                  <div className={`${bezelCore} flex h-full gap-3 p-6`}>
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-accent" />
                    <span className="font-medium">{need}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="eksempel" aria-labelledby="eksempel-tittel" className="scroll-mt-24 border-t border-line bg-sand py-20 sm:py-28">
        <div className={container}>
          <Reveal>
            <h2 id="eksempel-tittel" className="font-display text-4xl tracking-tight sm:text-5xl">
              {t.exampleTitle}
            </h2>
          </Reveal>
          <div className="mt-10 rounded-[1.75rem] border border-line bg-sand/70 p-1.5 shadow-[0_40px_100px_-50px_rgba(7,22,48,0.4)]">
            <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-white">
              <ScaledPreview id={demo.slug}>
                <DemoSite demo={demo} fictionalLabel={c.demos.fictional} />
              </ScaledPreview>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-muted">{t.exampleNote}</p>
            <Link href={demoHref(lang, demo.slug)} className="group inline-flex shrink-0 items-center gap-2 font-medium">
              {t.openExample}
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="pris-tittel" className="py-20 sm:py-28">
        <div className={container}>
          <h2 id="pris-tittel" className="font-display text-4xl tracking-tight sm:text-5xl">
            {t.pricingTitle}
          </h2>
          <Reveal className="mt-10">
            <PricingCards lang={lang} c={c} />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="sporsmal-tittel" className="border-t border-line py-20 sm:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <Reveal className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <SectionHeading id="sporsmal-tittel" eyebrow={c.ui.questions} title={c.pricing.faqTitle} />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <Faq items={c.pricing.faq} />
          </Reveal>
        </div>
      </section>

      {others.length > 0 ? (
        <nav aria-labelledby="andre-tittel" className="border-t border-line py-14">
          <div className={container}>
            <h2 id="andre-tittel" className={kicker}>
              {t.otherTitle}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {others.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={industryHref(lang, d.slug)}
                    className="inline-block rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-navy/30 hover:bg-navy/5"
                  >
                    {fillIndustry(t.eyebrow, d.label[lang])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}

      <CtaBand lang={lang} c={c} />
    </>
  );
}
