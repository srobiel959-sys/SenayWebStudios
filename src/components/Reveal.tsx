"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Diskret inntoning når innholdet kommer inn i skjermbildet.
// Innhold som allerede er synlig når siden lastes, skjules aldri – det gir rask
// visning og fungerer uten JavaScript. Kun innhold lenger ned tones inn.

type State = "idle" | "hidden" | "shown";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Allerede i skjermbildet: la det stå.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    // Skjules mens det er utenfor skjermen, tones inn når man scroller dit.
    setState("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("shown");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state}
      style={delay && state === "shown" ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}
