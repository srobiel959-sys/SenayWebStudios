import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ArrowIcon, CheckIcon, CrossIcon } from "@/components/Icons";
import { Monogram } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { comparison, faqGeneral, hero, prices, process, services, site, why } from "@/content/site";
import { businessSchema } from "@/lib/schema";
import { btnLight, btnPrimary, btnSecondary, container } from "@/lib/ui";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: `${site.name} – ${site.tagline}`, description: site.description },
};

export default function Home() {
  return (
    <>
      <JsonLd data={businessSchema()} />

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
            <p className="hero-in hero-in-3 mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
              {hero.lead}
            </p>
            <div className="hero-in hero-in-4 mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href={hero.primaryCta.href} className={btnPrimary}>
                {hero.primaryCta.label}
                <ArrowIcon />
              </Link>
              <Link href={hero.secondaryCta.href} className={btnSecondary}>
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-10 border-t border-line pt-10 lg:col-span-4 lg:h-full lg:justify-between lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <Monogram className="monogram-draw hidden h-auto w-48 self-center lg:mt-6 lg:block xl:w-60" />
            <ul className="hero-in hero-in-4 flex flex-col gap-4 lg:mb-2">
              {hero.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-lg">
                  <span aria-hidden="true" className="h-px w-6 bg-navy" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Hvorfor nettside */}
      <section aria-labelledby="hvorfor-tittel" className="py-24 sm:py-32">
        <div className={container}>
          <Reveal>
            <SectionHeading id="hvorfor-tittel" eyebrow={why.eyebrow} title={why.title} lead={why.lead} />
          </Reveal>
          <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {why.items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 90} className="h-full border-t border-navy pt-6">
                  <span className="text-sm text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-2xl leading-snug">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Uten / med nettside */}
      <section aria-labelledby="forskjell-tittel" className="border-y border-line bg-sand py-24 sm:py-32">
        <div className={container}>
          <Reveal>
            <SectionHeading id="forskjell-tittel" eyebrow={comparison.eyebrow} title={comparison.title} />
          </Reveal>
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Reveal className="h-full rounded-2xl border border-line bg-cream p-8 sm:p-10">
              <h3 className="font-display text-2xl">{comparison.without.title}</h3>
              <ul className="mt-6 space-y-4">
                {comparison.without.items.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-muted">
                    <CrossIcon />
                    <span>
                      <span className="sr-only">Ulempe: </span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120} className="h-full rounded-2xl bg-navy p-8 text-cream sm:p-10">
              <h3 className="font-display text-2xl">{comparison.with.title}</h3>
              <ul className="mt-6 space-y-4">
                {comparison.with.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon />
                    <span>
                      <span className="sr-only">Fordel: </span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/kontakt" className={`${btnLight} mt-10`}>
                Jeg vil bli funnet
                <ArrowIcon />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Tjenester (kort) */}
      <section aria-labelledby="tjenester-tittel" className="py-24 sm:py-32">
        <div className={container}>
          <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="tjenester-tittel" eyebrow={services.eyebrow} title={services.title} />
            <Link href="/tjenester" className="group inline-flex shrink-0 items-center gap-2 font-medium">
              Alle tjenester
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {services.items.map((item, i) => (
              <li key={item.title} className="bg-cream">
                <Reveal delay={i * 80} className="h-full p-8 sm:p-10">
                  <span className="text-sm text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prosess (kort) */}
      <section aria-labelledby="prosess-tittel" className="bg-navy py-24 text-cream sm:py-32">
        <div className={container}>
          <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="prosess-tittel" eyebrow={process.eyebrow} title={process.title} tone="dark" />
            <Link href="/prosess" className="group inline-flex shrink-0 items-center gap-2 font-medium">
              Se hele prosessen
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 90} className="border-t border-cream-muted/40 pt-6">
                  <span className="font-display text-5xl" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-medium">
                    <span className="sr-only">Steg {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-cream-muted">{step.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Priser (kort) */}
      <section aria-labelledby="priser-tittel" className="py-24 sm:py-32">
        <div className={`${container} grid gap-12 lg:grid-cols-12 lg:items-end`}>
          <Reveal className="lg:col-span-5">
            <SectionHeading
              id="priser-tittel"
              eyebrow="Priser"
              title="Én fast pris. Ingen overraskelser."
              lead="Én ny kunde kan være nok til å betale for hele nettsiden."
            />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              <div className="bg-cream p-8">
                <dt className="font-display text-2xl">Nettside</dt>
                <dd className="mt-6 flex items-baseline gap-2">
                  <span className="text-sm">kr</span>
                  <span className="text-5xl font-medium tracking-tight">{prices.website}</span>
                  <span className="text-sm text-ink-muted">engangspris</span>
                </dd>
              </div>
              <div className="bg-cream p-8">
                <dt className="font-display text-2xl">Drift</dt>
                <dd className="mt-6 flex items-baseline gap-2">
                  <span className="text-sm">kr</span>
                  <span className="text-5xl font-medium tracking-tight">{prices.hosting}</span>
                  <span className="text-sm text-ink-muted">per måned</span>
                </dd>
              </div>
            </dl>
            <Link href="/priser" className={`${btnSecondary} mt-6`}>
              Se hva som er inkludert
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Spørsmål */}
      <section aria-labelledby="sporsmal-tittel" className="border-t border-line py-24 sm:py-32">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <Reveal className="lg:col-span-4">
            <SectionHeading id="sporsmal-tittel" eyebrow="Spørsmål" title="Det du lurer på." />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <Faq items={faqGeneral} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
