import { CtaBand } from "@/components/CtaBand";
import { MainLogo } from "@/components/Logo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/content";
import type { Lang } from "@/lib/routes";
import { bezel, bezelCore, container, eyebrowPill } from "@/lib/ui";

export function AboutView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { about } = c;
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} />

      <section aria-label={about.sectionLabel} className="py-20 sm:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <Reveal className={`lg:col-span-5 lg:self-start ${bezel}`}>
            <div className={`${bezelCore} relative flex items-center justify-center overflow-hidden px-8 py-14 sm:py-20`}>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,rgba(59,130,246,0.18),transparent_70%)]" />
              <MainLogo alt="" tone="light" className="relative h-auto w-56 sm:w-64" />
            </div>
          </Reveal>
          <Reveal delay={100} className="space-y-6 text-lg leading-relaxed text-ink-muted sm:text-xl lg:col-span-7">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="verdier-tittel" className="border-t border-line bg-sand py-20 sm:py-28">
        <div className={container}>
          <h2 id="verdier-tittel" className={eyebrowPill}>
            {about.valuesHeading}
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {about.values.map((value, i) => (
              <li key={value.title}>
                <Reveal delay={i * 90} className={`h-full ${bezel}`}>
                  <div className={`${bezelCore} h-full p-8`}>
                    <span className="block h-px w-10 bg-[#3b82f6] shadow-[0_0_12px_#3b82f6]" aria-hidden="true" />
                    <h3 className="mt-6 font-display text-4xl">{value.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-muted">{value.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand lang={lang} c={c} />
    </>
  );
}
