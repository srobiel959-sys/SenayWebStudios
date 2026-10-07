"use client";

import { useEffect, useRef, useState } from "react";

/** Skalerer en full nettside ned så den passer i rammen. */
export function ScaledPreview({
  children,
  id,
  className,
}: {
  children: React.ReactNode;
  id: string;
  /** Overstyrer høyden på rammen. */
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ base: number; scale: number } | null>(null);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      const base = w < 640 ? 390 : 1280;
      setSize({ base, scale: w / base });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const mobile = size ? size.base === 390 : false;
  return (
    <div
      ref={outer}
      className={`relative overflow-hidden ${className ?? (mobile ? "h-[34rem]" : "aspect-[16/10]")}`}
      // Forhåndsvisningen er dekor: skjult for skjermlesere og ikke fokuserbar.
      aria-hidden="true"
      inert
    >
      {size ? (
        <div
          key={id}
          className="demo-swap origin-top-left"
          style={{ width: size.base, transform: `scale(${size.scale})` }}
        >
          {children}
        </div>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}
