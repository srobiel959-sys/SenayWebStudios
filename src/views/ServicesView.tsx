import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ArrowIcon, CheckIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { btnPrimary, btnSecondary, container } from "@/lib/ui";

export function ServicesView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { services } = c;
  return (
    <>
      <PageHero eyebrow={services.eyebrow} title={services.title} lead={services.lead}>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href={href(lang, "contact")} className={btnPrimary}>
            {c.hero.primaryCta}
            <ArrowIcon />
          </Link>
          <Link href={href(lang, "pricing")} className={btnSecondary}>
            {c.nav.pricing}
          </Link>
        </div>
      </PageHero>

      <section aria-label={services.listLabel} className="py-20 sm:py-28">
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
                  <h3 className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">{c.ui.youGet}</h3>
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

      <CtaBand lang={lang} c={c} />
    </>
  );
}
