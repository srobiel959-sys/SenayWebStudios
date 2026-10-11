import Link from "next/link";
import { btnArrowLight, kicker } from "@/lib/ui";
import { ArrowCircle, CheckIcon, CrossIcon } from "./Icons";
import { Reveal } from "./Reveal";

// To kort side om side: «slik er det ofte» dempet til venstre, «slik gjør vi det»
// blått med glød til høyre. Brukes av byrå-sammenligningen og «Hvorfor nettside».

type Side = { label?: string; title: string; items: string[] };

export function CompareCards({
  left,
  right,
  note,
  cta,
  ctaHref,
  downside,
  upside,
}: {
  left: Side;
  right: Side;
  note?: string;
  cta: string;
  ctaHref: string;
  downside: string;
  upside: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Reveal className="h-full rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 sm:p-10">
        {left.label ? <p className={kicker}>{left.label}</p> : null}
        <h3 className={`font-display text-3xl ${left.label ? "mt-3" : ""}`}>{left.title}</h3>
        <ul className="mt-8 space-y-4 text-lg">
          {left.items.map((item) => (
            <li key={item} className="flex gap-3 text-ink-muted">
              <CrossIcon className="mt-1.5 h-4 w-4 shrink-0" />
              <span>
                <span className="sr-only">{downside}: </span>
                {item}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120} className="relative h-full overflow-hidden rounded-[2rem] bg-navy p-8 text-cream sm:p-10">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(96,165,250,0.35),transparent)]" />
        {right.label ? <p className="relative text-xs font-medium uppercase tracking-[0.2em] text-cream-muted">{right.label}</p> : null}
        <h3 className={`relative font-display text-3xl ${right.label ? "mt-3" : ""}`}>{right.title}</h3>
        <ul className="relative mt-8 space-y-4 text-lg">
          {right.items.map((item) => (
            <li key={item} className="flex gap-3">
              <CheckIcon className="mt-1.5 h-4 w-4 shrink-0 text-[#93c5fd]" />
              <span>
                <span className="sr-only">{upside}: </span>
                {item}
              </span>
            </li>
          ))}
        </ul>
        {note ? <p className="relative mt-8 border-t border-white/15 pt-6 text-cream-muted">{note}</p> : null}
        <Link href={ctaHref} className={`${btnArrowLight} relative mt-8`}>
          {cta}
          <ArrowCircle tone="light" />
        </Link>
      </Reveal>
    </div>
  );
}
