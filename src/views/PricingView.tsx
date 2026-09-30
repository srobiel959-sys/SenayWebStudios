import { AgencyCompare } from "@/components/AgencyCompare";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { CheckIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PricingCards } from "@/components/PricingCards";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { getContent, prices } from "@/content";
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

      <section aria-labelledby="inkludert-tittel" className="border-y border-line bg-sand py-20 sm:py-28">
        <div className={container}>
          <Reveal>
            <SectionHeading id="inkludert-tittel" eyebrow={pricing.overview} title={pricing.included.title} />
          </Reveal>
          <Reveal delay={100} className="mt-12 overflow-x-auto rounded-2xl border border-line bg-cream">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="py-4 pl-4 pr-2 text-sm font-medium text-ink-muted sm:p-6">
                    <span className="sr-only">{c.ui.whatsIncluded}</span>
                  </th>
                  {pricing.packages.map((pkg, i) => (
                    <th
                      key={pkg.name}
                      scope="col"
                      className="w-[4.75rem] px-2 py-4 font-display text-base font-normal sm:w-48 sm:p-6 sm:text-xl"
                    >
                      {pkg.name}
                      <span className="hidden font-sans text-sm text-ink-muted sm:block">
                        {i === 0 ? `${prices.website} ${c.ui.oneTime}` : `${prices.hosting} ${c.ui.perMonthShort}`}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {pricing.included.rows.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row" className="py-4 pl-4 pr-2 font-normal sm:p-6">
                      {row.feature}
                    </th>
                    {[row.website, row.hosting].map((has, i) => (
                      <td key={i} className="px-2 py-4 sm:p-6">
                        {has ? (
                          <>
                            <CheckIcon className="h-5 w-5" />
                            <span className="sr-only">{c.ui.included}</span>
                          </>
                        ) : (
                          <>
                            <span aria-hidden="true" className="text-ink-muted">
                              –
                            </span>
                            <span className="sr-only">{c.ui.notIncluded}</span>
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

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
