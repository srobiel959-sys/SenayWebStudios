import { CtaBand } from "@/components/CtaBand";
import { Monogram } from "@/components/Logo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { about } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { container } from "@/lib/ui";

export const metadata = pageMeta(
  "Om oss",
  "Senay Web Studio er et lite studio som lager raske, profesjonelle nettsider for bedrifter – med én fast kontaktperson hele veien.",
  "/om",
);

export default function OmPage() {
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.title} />

      <section aria-label="Om Senay Web Studio" className="py-20 sm:py-28">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <Reveal className="flex items-start justify-center lg:col-span-5">
            <Monogram className="h-auto w-40 sm:w-56" />
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
          <h2 id="verdier-tittel" className="text-sm font-medium uppercase tracking-[0.22em] text-ink-muted">
            Slik jobber vi
          </h2>
          <ul className="mt-10 grid gap-10 sm:grid-cols-3">
            {about.values.map((value, i) => (
              <li key={value.title}>
                <Reveal delay={i * 90} className="border-t border-navy pt-6">
                  <h3 className="font-display text-4xl">{value.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{value.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
