"use client";

import { useEffect, useRef } from "react";

// Tall som teller opp når de kommer til syne. Serveren viser sluttverdien,
// så tallet alltid står riktig uten JavaScript og for søkemotorer.

const format = (n: number) => new Intl.NumberFormat("nb-NO").format(n).replace(/\s/g, " ");

export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || value === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Allerede synlig ved lasting: la tallet stå.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.textContent = `${prefix}${format(0)}${suffix}`;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(2, -10 * t); // rask start, myk landing
          el.textContent = `${prefix}${format(Math.round(value * (t === 1 ? 1 : eased)))}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {format(value)}
      {suffix}
    </span>
  );
}
