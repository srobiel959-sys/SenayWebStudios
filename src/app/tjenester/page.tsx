import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { services } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { btnPrimary, btnSecondary, container } from "@/lib/ui";

export const metadata = pageMeta(
  "Tjenester",
  "Design, utvikling, synlighet i søk og drift – alt du trenger for en god nettside, samlet hos Senay Web Studio.",
  "/tjenester",
);

export default function TjenesterPage() {
  return (
    <>
      <PageHero eyebrow={services.eyebrow} title={services.title} lead={services.lead}>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href="/kontakt" className={btnPrimary}>
            Få en uforpliktende prat
            <ArrowIcon />
          </Link>
          <Link href="/priser" className={btnSecondary}>
            Se prisene
          </Link>
        </div>
      </PageHero>

      <section aria-label="Tjenestene våre" className="py-20 sm:py-28">
        <ol className={`${container} divide-y divide-line border-y border-line`}>
          {services.items.map((item, i) => (
            <li key={item.title}>
              <Reveal className="grid gap-8 py-14 lg:grid-cols-12 lg:py-20">
                <div className="lg:col-span-5">
                  <span className="text-sm text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 font-display text-4xl sm:text-5xl">{item.title}</h2>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-lg leading-relaxed text-ink-muted sm:text-xl">{item.text}</p>
                  <h3 className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">Du får</h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {item.includes.map((inc) => (
                      <li key={inc} className="flex gap-3">
                        <CheckIcon />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand />
    </>
  );
}
