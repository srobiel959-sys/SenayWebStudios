import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { getContent } from "@/content";
import type { Lang } from "@/lib/routes";
import { container, kicker } from "@/lib/ui";

export function ProcessView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { process } = c;
  return (
    <>
      <PageHero eyebrow={process.eyebrow} title={process.title} lead={process.lead} />

      <section aria-label={process.listLabel} className="py-20 sm:py-28">
        <ol className={`${container} relative`}>
          {process.steps.map((step, i) => (
            <li key={step.title} className="relative grid gap-6 pb-16 last:pb-0 md:grid-cols-12 md:gap-10">
              <div className="flex items-start gap-6 md:col-span-4">
                <div className="relative flex flex-col items-center self-stretch">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#3b82f6]/60 bg-[#3b82f6]/10 font-display text-xl text-white shadow-[0_0_28px_rgba(59,130,246,0.35)]">
                    {i + 1}
                  </span>
                  {i < process.steps.length - 1 ? <span aria-hidden="true" className="mt-2 w-px flex-1 bg-gradient-to-b from-[#3b82f6]/50 to-white/10" /> : null}
                </div>
                <Reveal className="pt-2.5">
                  <h2 className="font-display text-3xl sm:text-4xl">
                    <span className="sr-only">
                      {c.ui.step} {i + 1}:{" "}
                    </span>
                    {step.title}
                  </h2>
                </Reveal>
              </div>

              <Reveal delay={100} className="pl-20 md:col-span-8 md:pl-0 md:pt-2.5">
                <p className="text-lg leading-relaxed text-ink-muted sm:text-xl">{step.text}</p>
                <dl className="mt-8 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-2">
                  <div className="bg-[#0a1428] p-6">
                    <dt className={kicker}>{c.ui.you}</dt>
                    <dd className="mt-2">{step.you}</dd>
                  </div>
                  <div className="bg-[#0d1b38] p-6">
                    <dt className="text-xs font-medium uppercase tracking-[0.2em] text-[#93c5fd]">{c.ui.we}</dt>
                    <dd className="mt-2">{step.we}</dd>
                  </div>
                </dl>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <CtaBand lang={lang} c={c} />
    </>
  );
}
