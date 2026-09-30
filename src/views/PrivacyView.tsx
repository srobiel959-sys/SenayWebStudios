import { PageHero } from "@/components/PageHero";
import { getContent, site } from "@/content";
import type { Lang } from "@/lib/routes";
import { container } from "@/lib/ui";

export function PrivacyView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  return (
    <>
      <PageHero eyebrow={c.privacy.eyebrow} title={c.privacy.title} />
      <section className="py-16 sm:py-24">
        <div className={`${container} max-w-3xl space-y-10 text-lg leading-relaxed text-ink-muted`}>
          {c.privacy.sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-3xl text-navy">{s.title}</h2>
              <p className="mt-3">{s.text}</p>
            </div>
          ))}
          <p>
            <a href={`mailto:${site.email}`} className="text-navy underline underline-offset-4">
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
