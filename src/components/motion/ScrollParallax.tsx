"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { LARGE_SCREEN, REDUCED_MOTION } from "@/lib/motion/presets";

// Rolig parallakse: innholdet flyttes litt saktere enn siden når man scroller.
// Bare på store skjermer (fra 1024 px) og uten «redusert bevegelse». På mobil står det
// stille, og koden for det lastes aldri.
//
// Legg den rundt et bilde som er litt større enn rammen, så kantene aldri vises:
//   <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
//     <ScrollParallax className="absolute -inset-y-10 inset-x-0">
//       <Image src={…} alt="" fill className="object-cover" />
//     </ScrollParallax>
//   </div>

type Props = {
  children: ReactNode;
  className?: string;
  /** Hvor langt innholdet flyttes hver vei, i piksler. Hold det lite (20–48). */
  amount?: number;
};

export function ScrollParallax({ children, className, amount = 32 }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = outer.current;
    const layer = inner.current;
    if (!target || !layer) return;
    if (window.matchMedia(REDUCED_MOTION).matches || !window.matchMedia(LARGE_SCREEN).matches) return;

    let stop: (() => void) | undefined;
    let cancelled = false;
    import("@/lib/motion/parallax").then(({ parallax }) => {
      if (!cancelled) stop = parallax(target, layer, amount);
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [amount]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="relative h-full w-full">
        {children}
      </div>
    </div>
  );
}
