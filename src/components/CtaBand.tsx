import Link from "next/link";
import type { Content } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { btnLight, btnOutlineLight, container } from "@/lib/ui";
import { Reveal } from "./Reveal";

// Avsluttende oppfordring nederst på sidene.

export function CtaBand({ lang, c }: { lang: Lang; c: Content }) {
  return (
    <section aria-labelledby="cta-tittel" className="relative overflow-hidden bg-navy text-cream">
      <div className={`${container} relative py-24 sm:py-32`}>
        <Reveal>
          <h2 id="cta-tittel" className="max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {c.cta.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-cream-muted">{c.cta.lead}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href={href(lang, "contact")} className={btnLight}>
              {c.cta.primary}
            </Link>
            <Link href={href(lang, "pricing")} className={btnOutlineLight}>
              {c.cta.secondary}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
