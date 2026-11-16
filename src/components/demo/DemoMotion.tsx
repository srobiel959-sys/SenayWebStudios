"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import "./demo-motion.css";

// Bevegelse i eksempelsidene: elementer med data-motion animeres inn når de
// kommer til syne. Innhold som allerede er synlig ved lasting, skjules aldri, og
// ved redusert bevegelse står alt stille (se demo-motion.css).

export function DemoMotion({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-motion]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    for (const item of items) {
      if (item.getBoundingClientRect().top < window.innerHeight * 0.88) item.setAttribute("data-shown", "");
      else observer.observe(item);
    }
    // Først nå kan elementer under skjermkanten skjules – uten JavaScript vises alt.
    root.setAttribute("data-motion-ready", "");
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`demo-motion ${className ?? ""}`} style={style}>
      {children}
    </div>
  );
}
