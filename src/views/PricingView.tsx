import { AgencyCompare } from "@/components/AgencyCompare";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PricingCards } from "@/components/PricingCards";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent } from "@/content";
import type { Lang } from "@/lib/routes";
import { pricingFaqSchema } from "@/lib/schema";
import { container } from "@/lib/ui";

export function PricingView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { pricing } = c;
  return (
    <>
      <JsonLd data={pricingFaqSchema(lang)} />
      <PageHero eyebrow={pricing.eyebrow} title={pricing.title} lead={pricing.lead} />

      <section aria-labelledby="pakker-tittel" className="py-20 sm:py-28">
        <div className={container}>
          <h2 id="pakker-tittel" className="sr-only">
            {pricing.packagesHeading}
          </h2>
          <Reveal>
            <PricingCards lang={lang} c={c} />
          </Reveal>
          <p className="mt-8 max-w-2xl text-ink-muted">{pricing.note}</p>
        </div>
      </section>

      <AgencyCompare lang={lang} c={c} />

      <section aria-labelledby="prisfaq-tittel" className="py-20 sm:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <Reveal className="lg:col-span-4">
            <SectionHeading id="prisfaq-tittel" eyebrow={c.ui.questions} title={pricing.faqTitle} />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <Faq items={pricing.faq} />
          </Reveal>
        </div>
      </section>

      <CtaBand lang={lang} c={c} />
    </>
  );
}
