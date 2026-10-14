import Link from "next/link";
import type { Content } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { btnArrowLight, btnSecondaryLight, container } from "@/lib/ui";
import { ArrowCircle } from "./Icons";
import { Reveal } from "./Reveal";

// Avsluttende oppfordring nederst på sidene: et mørkeblått kort med hvit tekst.

export function CtaBand({ lang, c }: { lang: Lang; c: Content }) {
  return (
    <section aria-labelledby="cta-tittel" className="py-16 sm:py-24">
      <div className={container}>
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-navy px-6 py-20 text-center text-cream sm:px-12 sm:py-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.28),transparent)]" />
          <div className="relative">
            <h2 id="cta-tittel" className="mx-auto max-w-4xl text-balance font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              {c.cta.title}
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-pretty text-lg text-cream-muted">{c.cta.lead}</p>
            <div className="mt-11 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link href={href(lang, "contact")} className={btnArrowLight}>
                {c.cta.primary}
                <ArrowCircle tone="light" />
              </Link>
              <Link href={href(lang, "pricing")} className={btnSecondaryLight}>
                {c.cta.secondary}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
