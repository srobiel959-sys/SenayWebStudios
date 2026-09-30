import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { DemoGallery } from "@/components/demo/DemoGallery";
import { PageHero } from "@/components/PageHero";
import { getContent } from "@/content";
import { demoGroups, demos } from "@/content/demos";
import { demoHref, type Lang } from "@/lib/routes";
import { container } from "@/lib/ui";

export function DemosView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  return (
    <>
      <PageHero eyebrow={c.demos.eyebrow} title={c.demos.title} lead={c.demos.lead} />

      <section aria-label={c.demos.choose} className="py-20 sm:py-28">
        <div className={container}>
          <DemoGallery lang={lang} labels={c.demos} />
        </div>
      </section>

      {/* Alle eksempler som lenker, gruppert */}
      <section aria-labelledby="alle-tittel" className="border-t border-line bg-sand py-20 sm:py-28">
        <div className={container}>
          <h2 id="alle-tittel" className="font-display text-4xl">
            {c.demos.allExamples} <span className="font-sans text-lg text-ink-muted">· {demos.length} {c.demos.count}</span>
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {demoGroups.map((g) => (
              <div key={g.key}>
                <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">{g[lang]}</h3>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {demos
                    .filter((d) => d.group === g.key)
                    .map((d) => (
                      <li key={d.slug}>
                        <Link href={demoHref(lang, d.slug)} className="group flex items-center justify-between gap-4 py-3">
                          <span>
                            <span className="font-medium">{d.label[lang]}</span>
                            <span className="block text-sm text-ink-muted">{d.name}</span>
                          </span>
                          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} c={c} />
    </>
  );
}
