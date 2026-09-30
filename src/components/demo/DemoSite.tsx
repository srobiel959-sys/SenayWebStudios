import type { CSSProperties } from "react";
import type { Demo } from "@/content/demos";
import { Scene } from "./Scene";

// En komplett eksempelnettside bygget fra bransjedataene i content/demos.ts.
// Bruker container queries (@container), så den tilpasser seg bredden den får –
// både som forhåndsvisning i galleriet og i full størrelse.

function Pattern({ color }: { color: string }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 400"
    >
      {[60, 110, 160, 210, 260].map((r) => (
        <circle key={r} cx="330" cy="330" r={r} fill="none" stroke={color} strokeOpacity="0.2" strokeWidth="1" />
      ))}
      <line x1="0" y1="400" x2="400" y2="0" stroke={color} strokeOpacity="0.2" strokeWidth="1" />
    </svg>
  );
}

const btn = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium";

function Buttons({ cta, light = false }: { cta: string; light?: boolean }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <span
        className={`${btn} ${light ? "bg-[var(--d-on)] text-[var(--d-primary)]" : "bg-[var(--d-primary)] text-[var(--d-on)]"}`}
      >
        {cta}
      </span>
      <span
        className={`${btn} border ${light ? "border-[var(--d-on)]/50 text-[var(--d-on)]" : "border-[var(--d-fg)]/25 text-[var(--d-fg)]"}`}
      >
        Våre tjenester
      </span>
    </div>
  );
}

export function DemoSite({ demo, fictionalLabel }: { demo: Demo; fictionalLabel: string }) {
  const { theme } = demo;
  const vars = {
    "--d-bg": theme.bg,
    "--d-fg": theme.fg,
    "--d-muted": theme.muted,
    "--d-primary": theme.primary,
    "--d-on": theme.onPrimary,
    "--d-soft": theme.soft,
    "--d-accent": theme.accent,
  } as CSSProperties;

  const heading = demo.font === "serif" ? "font-display" : "font-sans font-semibold tracking-tight";
  const initial = demo.name.charAt(0);

  return (
    <div className="@container" style={vars}>
      <div className="bg-[var(--d-bg)] font-sans text-[var(--d-fg)]">
        {/* Meny */}
        <header className="flex items-center justify-between gap-4 border-b border-[var(--d-fg)]/10 px-5 py-4 @3xl:px-12 @3xl:py-5">
          <span className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full bg-[var(--d-primary)] text-base text-[var(--d-on)] ${heading}`}
            >
              {initial}
            </span>
            <span className={`text-lg ${heading}`}>{demo.name}</span>
          </span>
          <nav className="hidden items-center gap-8 text-sm text-[var(--d-muted)] @3xl:flex" aria-hidden="true">
            <span>Tjenester</span>
            <span>Om oss</span>
            <span>Kontakt</span>
          </nav>
          <span className={`${btn} hidden bg-[var(--d-primary)] px-5 py-2.5 text-[var(--d-on)] @md:inline-flex`}>
            {demo.cta}
          </span>
        </header>

        {/* Hero – tre varianter */}
        {demo.layout === "split" ? (
          <section className="grid items-center gap-10 px-5 py-14 @3xl:grid-cols-2 @3xl:px-12 @3xl:py-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--d-muted)]">{demo.tagline}</p>
              <h1 className={`mt-4 text-4xl leading-[1.08] @3xl:text-6xl ${heading}`}>{demo.title}</h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--d-muted)]">{demo.text}</p>
              <Buttons cta={demo.cta} />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[var(--d-soft)]">
              <Scene slug={demo.slug} className="absolute inset-0 h-full w-full p-4 pb-16 @3xl:p-8 @3xl:pb-20" />
              <div className="absolute bottom-5 right-5 rounded-2xl bg-[var(--d-bg)] p-5 text-[var(--d-fg)] shadow-lg">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--d-muted)]">Åpningstider</p>
                <ul className="mt-2 space-y-0.5 text-sm">
                  {demo.hours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : demo.layout === "center" ? (
          <section className="relative overflow-hidden bg-[var(--d-soft)] px-5 py-16 text-center @3xl:px-12 @3xl:py-28">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--d-muted)]">{demo.tagline}</p>
            <h1 className={`mx-auto mt-4 max-w-3xl text-4xl leading-[1.08] @3xl:text-6xl ${heading}`}>{demo.title}</h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--d-muted)]">{demo.text}</p>
            <div className="flex justify-center">
              <Buttons cta={demo.cta} />
            </div>
            <div className="mx-auto mt-12 aspect-[16/8] max-w-3xl overflow-hidden rounded-3xl bg-[var(--d-bg)]">
              <Scene slug={demo.slug} className="h-full w-full p-4 @3xl:p-6" />
            </div>
            <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
              {demo.services.slice(0, 3).map((s) => (
                <li
                  key={s.name}
                  className="rounded-full border border-[var(--d-fg)]/15 bg-[var(--d-bg)] px-4 py-2 text-sm"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="relative overflow-hidden bg-[var(--d-primary)] px-5 py-16 text-[var(--d-on)] @3xl:px-12 @3xl:py-24">
            <Pattern color={theme.onPrimary} />
            <div className="relative grid gap-10 @3xl:grid-cols-[1.3fr_1fr] @3xl:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] opacity-75">{demo.tagline}</p>
                <h1 className={`mt-4 text-5xl leading-[1.02] @3xl:text-7xl ${heading}`}>{demo.title}</h1>
                <p className="mt-6 max-w-md text-lg leading-relaxed opacity-80">{demo.text}</p>
                <Buttons cta={demo.cta} light />
              </div>
              <div>
                <div className="mb-6 aspect-[4/3] overflow-hidden rounded-3xl bg-[var(--d-soft)]">
                  <Scene slug={demo.slug} className="h-full w-full p-4 @3xl:p-6" />
                </div>
                <ul className="divide-y divide-[var(--d-on)]/20 border-y border-[var(--d-on)]/20">
                  {demo.services.slice(0, 3).map((s) => (
                    <li key={s.name} className="flex items-baseline justify-between gap-4 py-3">
                      <span>{s.name}</span>
                      <span className="text-sm opacity-75">{s.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Tjenester og priser */}
        <section className="px-5 py-14 @3xl:px-12 @3xl:py-20">
          <h2 className={`text-3xl @3xl:text-4xl ${heading}`}>Tjenester og priser</h2>
          <ul className="mt-8 grid gap-4 @3xl:grid-cols-2">
            {demo.services.map((s) => (
              <li
                key={s.name}
                className="flex items-baseline justify-between gap-4 rounded-2xl bg-[var(--d-soft)] px-6 py-5"
              >
                <span className="font-medium">{s.name}</span>
                <span className="text-sm text-[var(--d-muted)]">{s.price}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Om oss og åpningstider */}
        <section className="grid gap-10 border-t border-[var(--d-fg)]/10 px-5 py-14 @3xl:grid-cols-[1.4fr_1fr] @3xl:px-12 @3xl:py-20">
          <div>
            <h2 className={`text-3xl @3xl:text-4xl ${heading}`}>Om oss</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--d-muted)]">{demo.about}</p>
          </div>
          <div className="rounded-2xl border border-[var(--d-fg)]/10 p-6">
            <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--d-muted)]">Åpningstider</h2>
            <ul className="mt-3 space-y-1">
              {demo.hours.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Avslutning */}
        <section className="bg-[var(--d-primary)] px-5 py-14 text-center text-[var(--d-on)] @3xl:px-12">
          <p className={`text-3xl @3xl:text-4xl ${heading}`}>Velkommen til {demo.name}</p>
          <span className={`${btn} mt-6 bg-[var(--d-on)] text-[var(--d-primary)]`}>{demo.cta}</span>
        </section>

        <footer className="flex flex-col gap-1 px-5 py-6 text-xs text-[var(--d-muted)] @md:flex-row @md:justify-between @3xl:px-12">
          <span>© {demo.name}</span>
          <span>{fictionalLabel}</span>
        </footer>
      </div>
    </div>
  );
}
