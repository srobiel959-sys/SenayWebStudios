"use client";

import { useEffect, useRef } from "react";

// En stor setning der ordene fylles inn, fra grått til mørkeblått, i takt med scrollen.
// Uten JavaScript eller med redusert bevegelse står hele setningen fullt synlig.

/** Laveste synlighet for ord som ikke er nådd ennå. */
const MIN = 0.47;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-word]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Starter når setningen kommer inn nederst, ferdig når den er litt over midten.
      const p = clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.4));
      const lit = p * spans.length * 1.1;
      // Ord som ikke er tent ennå, står i grått med minst 3:1 kontrast mot hvitt (stor tekst, WCAG AA).
      spans.forEach((span, i) => {
        span.style.opacity = String(MIN + (1 - MIN) * clamp(lit - i));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} data-word className="transition-opacity duration-200">
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
