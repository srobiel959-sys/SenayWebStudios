"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { reveal } from "@/lib/motion/engine";
import type { Preset } from "@/lib/motion/presets";

// Toner inn innhold når det scrolles til syne. Innhold som allerede er synlig når siden
// lastes, skjules aldri, og uten JavaScript eller med «redusert bevegelse» står alt fast.
//
//   <Reveal>…</Reveal>
//   <Reveal preset="fade" delay={120} className="lg:col-span-7">…</Reveal>

type Props = {
  children: ReactNode;
  className?: string;
  /** Venting før start, i millisekunder. */
  delay?: number;
  /** slideUp (standard), fade eller scale. */
  preset?: Preset;
};

export function Reveal({ children, className, delay = 0, preset = "slideUp" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return reveal(ref.current, { preset, delay: delay / 1000 });
  }, [preset, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
