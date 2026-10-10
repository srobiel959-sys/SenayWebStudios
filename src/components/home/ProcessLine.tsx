"use client";

import { useEffect, useRef } from "react";

// Prosessen langs en linje som fylles opp mens man scroller. Hvert steg tennes når
// linja når det. Uten JavaScript eller med redusert bevegelse er alle steg tent.

type Step = { title: string; text: string };

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function ProcessLine({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = ref.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = Array.from(list.querySelectorAll<HTMLLIElement>("[data-step]"));
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const line = window.innerHeight * 0.6; // «lesepunktet» på skjermen
      const p = clamp((line - rect.top) / rect.height);
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
      items.forEach((item) => {
        const at = (item.offsetTop + 12) / rect.height;
        item.toggleAttribute("data-lit", p >= at);
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    list.setAttribute("data-ready", "");
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
    <ol ref={ref} className="process-line relative space-y-14 pl-14 sm:pl-20">
      <span className="absolute bottom-2 left-[1.1rem] top-2 w-px bg-white/10 sm:left-[1.6rem]" aria-hidden="true">
        <span
          ref={fillRef}
          className="absolute inset-0 origin-top bg-[#3b82f6] shadow-[0_0_14px_rgba(59,130,246,0.9)]"
          style={{ transform: "scaleY(1)" }}
        />
      </span>
      {steps.map((step, i) => (
        <li key={step.title} data-step className="relative">
          <span className="process-dot absolute -left-14 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#050d1a] text-sm tabular-nums text-ink-muted sm:-left-20 sm:h-[3.25rem] sm:w-[3.25rem]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="process-body">
            <h3 className="font-display text-3xl sm:text-4xl">{step.title}</h3>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-ink-muted">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
