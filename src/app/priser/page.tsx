import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { CheckIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { PricingCards } from "@/components/PricingCards";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { faqPricing, included, prices } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { container } from "@/lib/ui";

export const metadata = pageMeta(
  "Priser",
  `Fast pris: nettside ${prices.website} kr og drift ${prices.hosting} kr per måned. Prisen du ser er prisen du betaler.`,
  "/priser",
);

export default function PriserPage() {
  return (
    <>
      <PageHero
        eyebrow="Priser"
        title="Prisen du ser er prisen du betaler."
        lead="To tydelige pakker med fast pris. Ingen timepriser, ingen skjulte tillegg og ingen overraskelser."
      />

      <section aria-label="Pakker" className="py-20 sm:py-28">
        <div className={container}>
          <Reveal>
            <PricingCards />
          </Reveal>
          <p className="mt-8 max-w-2xl text-ink-muted">
            Én ny kunde kan være nok til å betale for hele nettsiden. Trenger du noe utover pakkene, får du et eget tilbud
            med fast pris før vi starter.
          </p>
        </div>
      </section>

      <section aria-labelledby="inkludert-tittel" className="border-y border-line bg-sand py-20 sm:py-28">
        <div className={container}>
          <Reveal>
            <SectionHeading id="inkludert-tittel" eyebrow="Oversikt" title={included.title} />
          </Reveal>
          <Reveal delay={100} className="mt-12 overflow-x-auto rounded-2xl border border-line bg-cream">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="py-4 pl-4 pr-2 text-sm font-medium text-ink-muted sm:p-6">
                    <span className="sr-only">Hva som er inkludert</span>
                  </th>
                  <th scope="col" className="w-[4.75rem] px-2 py-4 font-display text-base font-normal sm:w-48 sm:p-6 sm:text-xl">
                    Nettside
                    <span className="hidden font-sans text-sm text-ink-muted sm:block">{prices.website} kr</span>
                  </th>
                  <th scope="col" className="w-[4.75rem] px-2 py-4 font-display text-base font-normal sm:w-48 sm:p-6 sm:text-xl">
                    Drift
                    <span className="hidden font-sans text-sm text-ink-muted sm:block">{prices.hosting} kr/mnd</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {included.rows.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row" className="py-4 pl-4 pr-2 font-normal sm:p-6">
                      {row.feature}
                    </th>
                    {[row.website, row.hosting].map((has, i) => (
                      <td key={i} className="px-2 py-4 sm:p-6">
                        {has ? (
                          <>
                            <CheckIcon className="h-5 w-5" />
                            <span className="sr-only">Inkludert</span>
                          </>
                        ) : (
                          <>
                            <span aria-hidden="true" className="text-ink-muted">
                              –
                            </span>
                            <span className="sr-only">Ikke inkludert</span>
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
            <SectionHeading id="prisfaq-tittel" eyebrow="Spørsmål" title="Om pris og betaling." />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-8">
            <Faq items={faqPricing} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
