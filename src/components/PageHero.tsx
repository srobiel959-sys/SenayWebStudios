import type { ReactNode } from "react";
import { container, eyebrowPill } from "@/lib/ui";

// Felles topp for undersidene.

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="side-tittel" className="relative overflow-hidden border-b border-line">
      <div className={`${container} py-20 sm:py-28 lg:py-32`}>
        <p className={`hero-in ${eyebrowPill}`}>{eyebrow}</p>
        <h1
          id="side-tittel"
          className="hero-in hero-in-2 mt-6 max-w-4xl font-display text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          {title}
        </h1>
        {lead ? (
          <p className="hero-in hero-in-3 mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">{lead}</p>
        ) : null}
        {children ? <div className="hero-in hero-in-3 mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
