import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowCircle, CheckIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { bezel, bezelCore, btnArrow, btnSecondary, container, kicker } from "@/lib/ui";

export function ServicesView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { services } = c;
  return (
    <>
      <PageHero eyebrow={services.eyebrow} title={services.title} lead={services.lead}>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link href={href(lang, "contact")} className={btnArrow}>
            {c.hero.primaryCta}
            <ArrowCircle />
          </Link>
          <Link href={href(lang, "pricing")} className={btnSecondary}>
            {c.nav.pricing}
          </Link>
        </div>
      </PageHero>

      <section aria-label={services.listLabel} className="py-8 sm:py-12">
        <ol className={`${container} divide-y divide-line`}>
          {services.items.map((item, i) => (
            <li key={item.title}>
              <Reveal className="grid gap-8 py-14 lg:grid-cols-12 lg:py-20">
                <div className="lg:col-span-5">
                  <span className="text-sm tabular-nums text-[#60a5fa]">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">{item.title}</h2>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-lg leading-relaxed text-ink-muted sm:text-xl">{item.text}</p>
                  <div className={`mt-8 ${bezel}`}>
                    <div className={`${bezelCore} p-6 sm:p-8`}>
                      <h3 className={kicker}>{c.ui.youGet}</h3>
                      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                        {item.includes.map((inc) => (
                          <li key={inc} className="flex gap-3">
                            <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-[#60a5fa]" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand lang={lang} c={c} />
    </>
  );
}
