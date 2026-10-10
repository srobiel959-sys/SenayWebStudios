"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Content } from "@/content";
import { container, eyebrowPill } from "@/lib/ui";

// «Google-historien» på forsiden: en festet seksjon som spilles av mens man scroller.
// Søket skrives, konkurrentene dukker opp, «Din bedrift» mangler – og til slutt
// glir den til toppen. Alt styres av scroll-posisjonen (bare transform og opacity).
// Uten JavaScript eller med redusert bevegelse vises sluttbildet som en vanlig seksjon.

type Story = Content["story"];

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smooth = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

const reducedQuery = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(reducedQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" strokeLinecap="round" />
    </svg>
  );
}

function Favicon({ letter, tone = "muted" }: { letter: string; tone?: "muted" | "glow" }) {
  return (
    <span
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
        tone === "glow" ? "bg-[#3b82f6] text-white" : "bg-white/10 text-white/80"
      }`}
    >
      {letter}
    </span>
  );
}

function Result({ name, url, text }: { name: string; url: string; text: string }) {
  return (
    <div className="h-full rounded-2xl px-3.5 py-3">
      <p className="flex items-center gap-2 text-[11px] text-white/55">
        <Favicon letter={name.charAt(0)} />
        {url}
      </p>
      <p className="mt-1.5 text-[15px] leading-tight text-[#8ab4f8]">{name}</p>
      <p className="mt-1 truncate text-[12px] text-white/55">{text}</p>
    </div>
  );
}

/** «Din bedrift»: to lag som tones over i hverandre – først mangler den, så er den der. */
function YouRow({ you, missingRef, foundRef, final = false }: {
  you: Story["you"];
  missingRef?: React.Ref<HTMLDivElement>;
  foundRef?: React.Ref<HTMLDivElement>;
  final?: boolean;
}) {
  return (
    <div className="relative h-full">
      <div ref={missingRef} className="absolute inset-0 rounded-2xl px-3.5 py-3" style={final ? { opacity: 0 } : undefined}>
        <p className="flex items-center gap-2 text-[11px] text-white/35">
          <Favicon letter={you.name.charAt(0)} />—
        </p>
        <p className="mt-1.5 text-[15px] leading-tight text-white/40">{you.name}</p>
        <p className="mt-1 flex items-center gap-1.5 text-[12px] text-[#f28b82]">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
          </svg>
          {you.missing}
        </p>
      </div>
      <div
        ref={foundRef}
        className="absolute inset-0 rounded-2xl bg-[#3b82f6]/12 px-3.5 py-3 shadow-[0_0_0_1px_rgba(59,130,246,0.6),0_0_32px_-4px_rgba(59,130,246,0.55)]"
        style={final ? undefined : { opacity: 0 }}
      >
        <p className="flex items-center gap-2 text-[11px] text-white/70">
          <Favicon letter={you.name.charAt(0)} tone="glow" />
          {you.url}
        </p>
        <p className="mt-1.5 text-[15px] font-medium leading-tight text-white">{you.name}</p>
        <p className="mt-1 truncate text-[12px] text-white/70">{you.text}</p>
      </div>
    </div>
  );
}

export function GoogleStory({ story, id }: { story: Story; id: string }) {
  // På serveren (og uten JavaScript) vises sluttbildet; i nettleseren spilles historien av.
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(reducedQuery).matches,
    () => true,
  );
  const scrub = !reduced;

  const [step, setStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const queryRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const resultRefs = useRef<(HTMLDivElement | null)[]>([]);
  const youRef = useRef<HTMLDivElement>(null);
  const missingRef = useRef<HTMLDivElement>(null);
  const foundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrub) return;
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    let rowStep = 0;

    const measure = () => {
      const first = resultRefs.current[0];
      rowStep = first ? first.offsetHeight + 10 : 90;
    };

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = clamp(total > 0 ? -rect.top / total : 0);

      // 1) Søket skrives.
      const typed = Math.round(story.query.length * clamp(p / 0.18));
      if (queryRef.current) queryRef.current.textContent = story.query.slice(0, typed);
      if (caretRef.current) caretRef.current.style.opacity = typed < story.query.length ? "1" : "0";

      // 2) Konkurrentene dukker opp, 3) «Din bedrift» mangler, 4) og glir til toppen.
      const swap = smooth((p - 0.7) / 0.14);
      resultRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = smooth((p - 0.2 - i * 0.06) / 0.08);
        el.style.opacity = String(t);
        el.style.transform = `translateY(${(i + swap) * rowStep + (1 - t) * 18}px)`;
      });
      const youIn = smooth((p - 0.42) / 0.08);
      if (youRef.current) {
        youRef.current.style.opacity = String(youIn);
        youRef.current.style.transform = `translateY(${(3 - 3 * swap) * rowStep + (1 - youIn) * 18}px)`;
      }
      if (missingRef.current) missingRef.current.style.opacity = String(1 - swap);
      if (foundRef.current) foundRef.current.style.opacity = String(swap);
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;

      const next = p < 0.19 ? 0 : p < 0.41 ? 1 : p < 0.66 ? 2 : 3;
      setStep((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [scrub, story.query]);

  const phone = (
    <div className="relative mx-auto w-[min(19rem,82vw)] sm:w-[21rem]" aria-hidden="true">
      {/* Blå glød bak telefonen */}
      <div className="pointer-events-none absolute -inset-16 rounded-full bg-[radial-gradient(closest-side,rgba(59,130,246,0.28),transparent)]" />
      <div className="relative rounded-[3rem] border border-white/15 bg-gradient-to-b from-white/12 to-white/[0.02] p-2 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0b1220] px-3.5 pb-5 pt-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] sm:pb-6 sm:pt-11">
          <span className="absolute left-1/2 top-3 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] px-4 py-3 text-[14px] text-white">
            <SearchIcon />
            <span className="min-w-0 flex-1 truncate">
              <span ref={queryRef}>{scrub ? "" : story.query}</span>
              <span ref={caretRef} className="ml-px inline-block translate-y-0.5" style={scrub ? undefined : { opacity: 0 }}>
                <span className="block h-4 w-px animate-pulse bg-white" />
              </span>
            </span>
          </div>
          <p className="mt-3 flex gap-4 px-2 text-[11px] text-white/45">
            <span className="border-b border-white/70 pb-1 text-white/85">Alle</span>
            <span>Kart</span>
            <span>Bilder</span>
          </p>

          {scrub ? (
            <div ref={rowsRef} className="relative mt-3 h-[calc(4*4.6rem+30px)] sm:h-[calc(4*5.25rem+30px)]">
              {story.results.map((r, i) => (
                <div
                  key={r.name}
                  ref={(el) => {
                    resultRefs.current[i] = el;
                  }}
                  className="absolute inset-x-0 top-0 h-[4.6rem] will-change-transform sm:h-[5.25rem]"
                  style={{ opacity: 0 }}
                >
                  <Result {...r} />
                </div>
              ))}
              <div ref={youRef} className="absolute inset-x-0 top-0 h-[4.6rem] will-change-transform sm:h-[5.25rem]" style={{ opacity: 0 }}>
                <YouRow you={story.you} missingRef={missingRef} foundRef={foundRef} />
              </div>
            </div>
          ) : (
            <div className="mt-3 flex flex-col gap-2.5">
              <div className="h-[4.6rem] sm:h-[5.25rem]">
                <YouRow you={story.you} final />
              </div>
              {story.results.map((r) => (
                <div key={r.name} className="h-[4.6rem] sm:h-[5.25rem]">
                  <Result {...r} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="mt-5 text-center text-xs text-ink-muted max-lg:hidden">{story.fictional}</p>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="slik"
      aria-labelledby={id}
      className="relative scroll-mt-0 border-t border-line"
      style={scrub ? { height: "400vh" } : undefined}
    >
      <div className={scrub ? "sticky top-0 flex h-[100dvh] items-center overflow-hidden pb-4 pt-20 sm:pt-24" : "py-24 sm:py-32"}>
        <div className={`${container} grid items-center gap-6 sm:gap-10 lg:grid-cols-[1fr_auto] lg:gap-24`}>
          <div>
            <h2 id={id} className={`${eyebrowPill} ${scrub ? "max-lg:sr-only" : ""}`}>
              {story.label}
            </h2>
            <div className="flex gap-6 lg:mt-8">
              {/* Fremdriftslinje */}
              {scrub && (
                <span className="relative hidden w-px shrink-0 bg-white/10 lg:block" aria-hidden="true">
                  <span ref={fillRef} className="absolute inset-0 origin-top bg-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.8)]" style={{ transform: "scaleY(0)" }} />
                </span>
              )}
              <ol className={scrub ? "relative min-h-[6.5rem] flex-1 lg:min-h-0 lg:space-y-7" : "space-y-8"}>
                {story.steps.map((s, i) => {
                  const active = !scrub || i === step;
                  return (
                    <li
                      key={s.kicker}
                      className={`transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        scrub ? "max-lg:absolute max-lg:inset-x-0 max-lg:top-0" : ""
                      } ${active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 lg:translate-y-0 lg:opacity-25"}`}
                      aria-current={scrub && active ? "step" : undefined}
                    >
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#60a5fa]">{s.kicker}</p>
                      <p className="mt-2 max-w-lg text-balance font-display text-xl leading-snug sm:text-3xl lg:mt-3 lg:text-[2rem]">{s.text}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
          {phone}
        </div>
      </div>
    </section>
  );
}
