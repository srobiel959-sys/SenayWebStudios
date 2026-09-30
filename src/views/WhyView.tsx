import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { ArrowIcon, CheckIcon, CrossIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { btnLight, container } from "@/lib/ui";

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
          <ol className="grid gap-x-12 gap-y-14 md:grid-cols-2">
            {why.items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={(i % 2) * 90} className="border-t border-navy pt-8">
                  <span className="text-sm font-medium text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-3xl leading-snug sm:text-4xl">{item.title}</h3>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">{item.text}</p>
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
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Reveal className="h-full rounded-2xl border border-line bg-cream p-8 sm:p-10">
              <h3 className="text-xl font-medium">{comparison.without.title}</h3>
              <ul className="mt-6 space-y-4 text-lg">
                {comparison.without.items.map((item) => (
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
              <h3 className="text-xl font-medium">{comparison.with.title}</h3>
              <ul className="mt-6 space-y-4 text-lg">
                {comparison.with.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckIcon className="mt-1.5 h-4 w-4 shrink-0" />
                    <span>
                      <span className="sr-only">{c.ui.upside}: </span>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <Link href={href(lang, "contact")} className={`${btnLight} mt-10`}>
                {comparison.cta}
                <ArrowIcon />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="sporsmal-tittel" className="py-20 sm:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <Reveal className="lg:col-span-4">
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
