import Link from "next/link";
import { cta } from "@/content/site";
import { btnLight, btnOutlineLight, container } from "@/lib/ui";
import { Monogram } from "./Logo";
import { Reveal } from "./Reveal";

// Avsluttende oppfordring nederst på sidene.

export function CtaBand() {
  return (
    <section aria-labelledby="cta-tittel" className="relative overflow-hidden bg-navy text-cream">
      <Monogram
        tone="light"
        className="pointer-events-none absolute -right-10 -bottom-16 hidden h-auto w-[26rem] opacity-[0.07] lg:block"
      />
      <div className={`${container} relative py-24 sm:py-32`}>
        <Reveal>
          <h2 id="cta-tittel" className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {cta.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-cream-muted">{cta.lead}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href={cta.primary.href} className={btnLight}>
              {cta.primary.label}
            </Link>
            <Link href={cta.secondary.href} className={btnOutlineLight}>
              {cta.secondary.label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
