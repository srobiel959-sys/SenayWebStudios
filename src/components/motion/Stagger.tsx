"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { reveal } from "@/lib/motion/engine";
import type { Preset } from "@/lib/motion/presets";

// En liste der hvert barn kommer inn etter det forrige når de scrolles til syne.
// Barn som kommer til syne samtidig (en rad i et rutenett), kommer etter hverandre;
// på mobil, der kortene står under hverandre, kommer hvert kort når det når skjermen.
//
//   <Stagger as="ul" className="grid gap-6 md:grid-cols-3">
//     {items.map((item) => <li key={item.id}>…</li>)}
//   </Stagger>

type Props = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
  /** slideUp (standard), fade eller scale. */
  preset?: Preset;
  /** Tid mellom hvert barn, i millisekunder. */
  step?: number;
  /** Venting før det første barnet, i millisekunder. */
  delay?: number;
};

export function Stagger({ children, className, as = "div", preset = "slideUp", step = 80, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const Tag = as as "div";

  useEffect(() => {
    if (!ref.current) return;
    return reveal(ref.current.children, { preset, stagger: step / 1000, delay: delay / 1000 });
  }, [preset, step, delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
