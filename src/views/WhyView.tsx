import { CompareCards } from "@/components/CompareCards";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { bezel, bezelCore, container } from "@/lib/ui";

export function WhyView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { why, comparison } = c;
  return (
    <>
      <PageHero eyebrow={why.eyebrow} title={why.title} lead={why.lead} />

      <section aria-labelledby="grunner-tittel" className="py-20 sm:py-28">
        <div className={container}>
          <h2 id="grunner-tittel" className="sr-only">
            {why.reasonsHeading}
          </h2>
          <ol className="grid gap-4 md:grid-cols-2">
            {why.items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={(i % 2) * 90} className={`h-full ${bezel}`}>
                  <div className={`${bezelCore} h-full p-8 sm:p-10`}>
                    <span className="font-display text-5xl leading-none text-[#60a5fa] [text-shadow:0_0_24px_rgba(59,130,246,0.45)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-6 font-display text-3xl leading-snug sm:text-4xl">{item.title}</h3>
                    <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="forskjell-tittel" className="border-y border-line bg-sand py-20 sm:py-28">
        <div className={container}>
          <Reveal>
            <SectionHeading id="forskjell-tittel" eyebrow={comparison.eyebrow} title={comparison.title} />
          </Reveal>
          <div className="mt-14">
            <CompareCards
              left={comparison.without}
              right={comparison.with}
              cta={comparison.cta}
              ctaHref={href(lang, "contact")}
              downside={c.ui.downside}
              upside={c.ui.upside}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="sporsmal-tittel" className="py-20 sm:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <Reveal className="lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <SectionHeading id="sporsmal-tittel" eyebrow={c.ui.questions} title={c.ui.whatYouWonder} />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <Faq items={c.faqGeneral} />
          </Reveal>
        </div>
      </section>

      <CtaBand lang={lang} c={c} />
    </>
  );
}
