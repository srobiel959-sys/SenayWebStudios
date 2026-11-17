import Link from "next/link";
import { Fragment } from "react";
import { CtaBand } from "@/components/CtaBand";
import { CountUp } from "@/components/home/CountUp";
import { DemoShowcase } from "@/components/home/DemoShowcase";
import { GoogleStory } from "@/components/home/GoogleStory";
import { LiveBuilder } from "@/components/home/LiveBuilder";
import { LighthouseScores } from "@/components/home/LighthouseScores";
import { ProcessLine } from "@/components/home/ProcessLine";
import { WordReveal } from "@/components/home/WordReveal";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Reveal, Stagger } from "@/components/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { businessSchema } from "@/lib/schema";
import { container } from "@/lib/ui";

/** Ordene i overskriften reiser seg ett og ett (se .word-rise i globals.css). */
function RisingWords({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(" ");
  // Mellomrommet står utenfor masken, ellers forsvinner det i inline-block.
  return words.map((word, i) => (
    <Fragment key={i}>
      <span className="word-mask">
        <span className="word-rise" style={{ animationDelay: `${(start + i) * 70}ms` }}>
          {word}
        </span>
      </span>
      {i < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function HomeView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { hero, numbers } = c;
  const titleWords = hero.title.split(" ").length;

  return (
    <>
      <JsonLd data={businessSchema(lang)} />

      {/* 1. Hero: pitchen, og så bygger kundens egen nettside seg opp mens hen skriver */}
      <section aria-labelledby="hero-tittel" className="relative -mt-[4.25rem] sm:-mt-20">
        <div className={`${container} relative flex flex-col items-center pb-14 pt-28 text-center sm:pb-24 sm:pt-40`}>
          {/* Tones ned mens byggeren jobber, så blikket går til rammen (se LiveBuilder). */}
          <div className="hero-dim flex flex-col items-center">
            <h1
              id="hero-tittel"
              className="max-w-6xl text-balance font-display text-[2.5rem] leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.9rem]"
            >
              <RisingWords text={hero.title} />{" "}
              <span className="block text-ink-muted">
                <RisingWords text={hero.titleAccent} start={titleWords + 1} />
              </span>
            </h1>
            <p className="hero-in hero-in-3 mt-5 max-w-xl text-balance text-base leading-relaxed text-ink-muted sm:mt-8 sm:text-xl">{hero.lead}</p>
          </div>
          <div className="hero-in hero-in-4 mt-7 w-full sm:mt-10">
            <LiveBuilder lang={lang} labels={c.builder} fictionalLabel={c.demos.fictional} contactPath={href(lang, "contact")} />
          </div>
        </div>
      </section>

      {/* 2. Google-historien: spilles av mens man scroller */}
      <GoogleStory story={c.story} id="historien-tittel" />

      {/* 3. Utsagnet: ordene lyser opp */}
      <section aria-label={c.why.eyebrow} className="py-20 sm:py-48">
        <div className={container}>
          <WordReveal
            text={c.statement}
            className="mx-auto max-w-5xl text-balance text-center font-display text-[1.75rem] leading-[1.2] tracking-tight sm:text-6xl lg:text-7xl"
          />
        </div>
      </section>

      {/* 4. Eksempler */}
      <section id="eksempler" aria-labelledby="eksempler-tittel" className="scroll-mt-24 border-t border-line py-16 sm:py-36">
        <div className={container}>
          <Reveal>
            <SectionHeading id="eksempler-tittel" title={c.demos.homeTitle} lead={c.demos.homeLead} />
          </Reveal>
          <div className="mt-8 sm:mt-14">
            <DemoShowcase lang={lang} />
          </div>
          <Link
            href={href(lang, "demos")}
            className="group mt-8 inline-flex min-h-11 items-center gap-2 font-medium underline decoration-navy/25 underline-offset-8 transition-colors duration-150 hover:decoration-navy"
          >
            {c.demos.allExamples}
            <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* 5. Prisen: «0 kr» som blikkfang på mørk bunn, resten teller opp */}
      <section aria-labelledby="pris-tittel" className="relative overflow-hidden bg-navy py-16 text-cream sm:py-40">
        <div className={`${container} relative grid items-center gap-10 sm:gap-14 lg:grid-cols-12`}>
          <Reveal className="lg:col-span-7">
            <h2 id="pris-tittel" className="font-display text-3xl tracking-tight sm:text-4xl">
              {numbers.title}
            </h2>
            <p className="mt-4 whitespace-nowrap font-display text-[4.5rem] leading-[0.9] tracking-tight sm:mt-6 sm:text-[11rem] sm:leading-[0.85] lg:text-[13rem]">
              <CountUp value={numbers.items[0].value} prefix={numbers.items[0].prefix} suffix={numbers.items[0].suffix} lang={lang} />
            </p>
            <p className="mt-4 text-xl text-cream-muted">{numbers.items[0].label}</p>
          </Reveal>

          <Stagger className="space-y-4 lg:col-span-5" step={120}>
            {numbers.items.slice(1).map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/15 bg-white/[0.06] p-7 sm:p-8">
                <p className="whitespace-nowrap font-display text-[2.5rem] tracking-tight sm:text-6xl">
                  <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} lang={lang} />
                </p>
                <p className="mt-2 text-cream-muted">{item.label}</p>
              </div>
            ))}
            <div>
              <p className="flex items-center gap-2.5 pt-2 text-cream-muted">
                <CheckIcon className="h-4 w-4 shrink-0 text-sky" />
                {numbers.note}
              </p>
              <Link
                href={href(lang, "pricing")}
                className="group mt-4 inline-flex min-h-11 items-center gap-2 font-medium underline decoration-white/30 underline-offset-8 transition-colors duration-150 hover:decoration-white"
              >
                {numbers.link}
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          </Stagger>
        </div>
      </section>

      {/* Målte tall: bevis i stedet for skryt */}
      <LighthouseScores proof={c.proof} />

      {/* 6. Prosessen langs en linje som fylles opp */}
      <section aria-labelledby="prosess-tittel" className="border-t border-line py-16 sm:py-40">
        <div className={`${container} grid gap-10 sm:gap-16 lg:grid-cols-12`}>
          <Reveal className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <SectionHeading id="prosess-tittel" title={c.process.title} lead={c.process.lead} />
          </Reveal>
          <div className="lg:col-span-7">
            <ProcessLine steps={c.process.steps} />
          </div>
        </div>
      </section>

      {/* 7. Avslutning */}
      <CtaBand lang={lang} c={c} />
    </>
  );
}
