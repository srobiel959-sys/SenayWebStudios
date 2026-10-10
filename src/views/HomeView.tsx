import Link from "next/link";
import { Fragment } from "react";
import { AgencyCompare } from "@/components/AgencyCompare";
import { CtaBand } from "@/components/CtaBand";
import { DemoGallery } from "@/components/demo/DemoGallery";
import { CountUp } from "@/components/home/CountUp";
import { GoogleStory } from "@/components/home/GoogleStory";
import { NetworkCanvas } from "@/components/home/NetworkCanvas";
import { ProcessLine } from "@/components/home/ProcessLine";
import { WordReveal } from "@/components/home/WordReveal";
import { ArrowCircle, ArrowIcon, CheckIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/content";
import { href, type Lang, type PageKey } from "@/lib/routes";
import { businessSchema } from "@/lib/schema";
import { btnArrow, btnSecondary, container, eyebrowPill } from "@/lib/ui";

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

      {/* 1. Hero: pitchen, alene, over et levende nettverk */}
      <section aria-labelledby="hero-tittel" className="relative -mt-[4.25rem] overflow-hidden sm:-mt-20">
        <NetworkCanvas />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_42%,rgba(59,130,246,0.16),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050d1a]" />

        <div className={`${container} relative flex min-h-[100dvh] flex-col items-center justify-center pb-24 pt-32 text-center`}>
          <p className={`hero-in ${eyebrowPill}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] shadow-[0_0_10px_#3b82f6]" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1
            id="hero-tittel"
            className="mt-8 max-w-6xl text-balance font-display text-[3.1rem] leading-[1] tracking-tight sm:text-7xl lg:text-[5.9rem]"
          >
            <RisingWords text={hero.title} />{" "}
            <span className="block text-ink-muted">
              <RisingWords text={hero.titleAccent} start={titleWords + 1} />
            </span>
          </h1>
          <p className="hero-in hero-in-3 mt-8 max-w-xl text-balance text-lg leading-relaxed text-ink-muted sm:text-xl">{hero.lead}</p>
          <div className="hero-in hero-in-4 mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <Link href={href(lang, "contact")} className={btnArrow}>
              {hero.primaryCta}
              <ArrowCircle />
            </Link>
            <a href="#slik" className={btnSecondary}>
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <a
          href="#slik"
          className="hero-in hero-in-4 absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-ink-muted transition-colors hover:text-white"
        >
          {hero.scrollHint}
          <span className="scroll-line relative h-10 w-px overflow-hidden bg-white/15" aria-hidden="true" />
        </a>
      </section>

      {/* 2. Google-historien: spilles av mens man scroller */}
      <GoogleStory story={c.story} id="historien-tittel" />

      {/* 3. Utsagnet: ordene lyser opp */}
      <section aria-label={c.why.eyebrow} className="py-32 sm:py-48">
        <div className={container}>
          <WordReveal
            text={c.statement}
            className="mx-auto max-w-5xl text-balance text-center font-display text-4xl leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl"
          />
        </div>
      </section>

      {/* 4. Eksempler */}
      <section id="eksempler" aria-labelledby="eksempler-tittel" className="scroll-mt-24 border-t border-line py-28 sm:py-36">
        <div className={container}>
          <Reveal>
            <SectionHeading id="eksempler-tittel" eyebrow={c.demos.eyebrow} title={c.demos.title} lead={c.demos.lead} />
          </Reveal>
          <div className="mt-14">
            <DemoGallery lang={lang} labels={c.demos} />
          </div>
        </div>
      </section>

      {/* 5. Prisen: «0 kr» som blikkfang, resten teller opp */}
      <section aria-labelledby="pris-tittel" className="relative overflow-hidden border-t border-line py-28 sm:py-40">
        <div className="pointer-events-none absolute -left-40 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.14),transparent)]" />
        <div className={`${container} relative grid items-center gap-14 lg:grid-cols-12`}>
          <Reveal className="lg:col-span-7">
            <p className={eyebrowPill}>{numbers.eyebrow}</p>
            <h2 id="pris-tittel" className="mt-6 font-display text-3xl tracking-tight sm:text-4xl">
              {numbers.title}
            </h2>
            <p className="mt-6 font-display text-[7.5rem] leading-[0.85] tracking-tight [text-shadow:0_0_60px_rgba(59,130,246,0.35)] sm:text-[11rem] lg:text-[13rem]">
              <CountUp value={numbers.items[0].value} prefix={numbers.items[0].prefix} suffix={numbers.items[0].suffix} />
            </p>
            <p className="mt-4 text-xl text-ink-muted">{numbers.items[0].label}</p>
          </Reveal>

          <div className="space-y-4 lg:col-span-5">
            {numbers.items.slice(1).map((item, i) => (
              <Reveal key={item.label} delay={i * 120}>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5">
                  <div className="rounded-[calc(2rem-0.375rem)] bg-[#0a1428] p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] sm:p-8">
                    <p className="font-display text-5xl tracking-tight sm:text-6xl">
                      <CountUp value={item.value} prefix={item.prefix} suffix={item.suffix} />
                    </p>
                    <p className="mt-2 text-ink-muted">{item.label}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={240}>
              <p className="flex items-center gap-2.5 pt-2 text-ink-muted">
                <CheckIcon className="h-4 w-4 shrink-0 text-[#60a5fa]" />
                {numbers.note}
              </p>
              <Link
                href={href(lang, "pricing")}
                className="group mt-6 inline-flex items-center gap-2 font-medium underline decoration-white/30 underline-offset-8 transition-colors hover:decoration-white"
              >
                {numbers.link}
                <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. Forskjellen fra byråer */}
      <AgencyCompare lang={lang} c={c} />

      {/* 7. Prosessen langs en linje som fylles opp */}
      <section aria-labelledby="prosess-tittel" className="border-t border-line py-28 sm:py-40">
        <div className={`${container} grid gap-16 lg:grid-cols-12`}>
          <Reveal className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <SectionHeading id="prosess-tittel" eyebrow={c.process.eyebrow} title={c.process.title} lead={c.process.lead} />
          </Reveal>
          <div className="lg:col-span-7">
            <ProcessLine steps={c.process.steps} />
          </div>
        </div>
      </section>

      {/* 8. Innganger til sidene */}
      <section aria-labelledby="utforsk-tittel" className="border-t border-line py-28 sm:py-36">
        <div className={container}>
          <Reveal>
            <SectionHeading id="utforsk-tittel" eyebrow={c.explore.eyebrow} title={c.explore.title} lead={c.explore.lead} />
          </Reveal>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.explore.items.map((item, i) => {
              const last = i === c.explore.items.length - 1;
              return (
                <li key={item.key}>
                  <Reveal delay={(i % 3) * 90} className="h-full">
                    <Link
                      href={href(lang, item.key as PageKey)}
                      className="group block h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 transition-colors duration-500 hover:border-white/20"
                    >
                      <span
                        className={`flex h-full flex-col rounded-[calc(2rem-0.375rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] transition-colors duration-500 ${
                          last ? "bg-navy" : "bg-[#0a1428] group-hover:bg-[#0d1a33]"
                        }`}
                      >
                        <span className="text-sm tabular-nums text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                        <span className="mt-4 font-display text-3xl">{item.title}</span>
                        <span className={`mt-3 flex-1 leading-relaxed ${last ? "text-cream-muted" : "text-ink-muted"}`}>{item.text}</span>
                        <span className="mt-8 inline-flex items-center gap-2 font-medium">
                          {last ? c.ui.getInTouch : c.ui.readMore}
                          <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 9. Avslutning */}
      <CtaBand lang={lang} c={c} />
    </>
  );
}
