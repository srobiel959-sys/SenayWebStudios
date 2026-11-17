"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { reveal, revealWithCss } from "@/lib/motion/engine";
import "./demo-motion.css";

// Bevegelse i eksempelsidene, på samme motor og med samme verdier som Senay-siden
// (src/lib/motion). Merk elementer i DemoSite med:
//   data-motion="rise"     tones inn og glir opp
//   data-motion="stagger"  barna kommer inn etter hverandre
//   data-motion="image"    bildet avsløres nedenfra (CSS i demo-motion.css)
// Innhold som allerede er synlig ved lasting, skjules aldri, og ved «redusert bevegelse»
// står alt stille.

export function DemoMotion({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const all = (selector: string) => Array.from(root.querySelectorAll<HTMLElement>(selector));
    const stops = [
      reveal(all('[data-motion="rise"]')),
      ...all('[data-motion="stagger"]').map((list) => reveal(list.children)),
      revealWithCss(all('[data-motion="image"]')),
    ];
    return () => stops.forEach((stop) => stop());
  }, []);

  return (
    <div ref={ref} className={`demo-motion ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}
