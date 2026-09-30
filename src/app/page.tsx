import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { ArrowIcon } from "@/components/Icons";
import { Monogram } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { explore, hero, site } from "@/content/site";
import { businessSchema } from "@/lib/schema";
import { btnPrimary, btnSecondary, container } from "@/lib/ui";

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

      {/* Innganger til sidene */}
      <section aria-labelledby="utforsk-tittel" className="py-24 sm:py-32">
        <div className={container}>
          <Reveal>
            <SectionHeading
              id="utforsk-tittel"
              eyebrow="Utforsk"
              title="Alt du trenger å vite, én side om gangen."
              lead="Les deg opp i ditt eget tempo – eller gå rett til prisene."
            />
          </Reveal>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {explore.map((item, i) => {
              const last = i === explore.length - 1;
              return (
                <li key={item.href} className={last ? "bg-navy text-cream" : "bg-cream"}>
                  <Link
                    href={item.href}
                    className={`group flex h-full flex-col p-8 transition-colors duration-300 sm:p-10 ${
                      last ? "hover:bg-navy-soft" : "hover:bg-sand"
                    }`}
                  >
                    <span className={`text-sm font-medium ${last ? "text-cream-muted" : "text-ink-muted"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 font-display text-3xl">{item.title}</h3>
                    <p className={`mt-3 flex-1 leading-relaxed ${last ? "text-cream-muted" : "text-ink-muted"}`}>
                      {item.text}
                    </p>
                    <span className="mt-8 inline-flex items-center gap-2 font-medium">
                      {last ? "Ta kontakt" : "Les mer"}
                      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
