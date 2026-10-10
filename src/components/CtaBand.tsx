import Link from "next/link";
import type { Content } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { btnArrow, btnSecondary, container } from "@/lib/ui";
import { ArrowCircle } from "./Icons";
import { Reveal } from "./Reveal";

// Avsluttende oppfordring nederst på sidene: sentrert, med blå glød bak.

export function CtaBand({ lang, c }: { lang: Lang; c: Content }) {
  return (
    <section aria-labelledby="cta-tittel" className="relative overflow-hidden border-t border-line">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.22),transparent)]" />
      <div className={`${container} relative py-28 text-center sm:py-40`}>
        <Reveal>
          <h2 id="cta-tittel" className="mx-auto max-w-4xl text-balance font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {c.cta.title}
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-lg text-ink-muted">{c.cta.lead}</p>
          <div className="mt-11 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link href={href(lang, "contact")} className={btnArrow}>
              {c.cta.primary}
              <ArrowCircle />
            </Link>
            <Link href={href(lang, "pricing")} className={btnSecondary}>
              {c.cta.secondary}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
