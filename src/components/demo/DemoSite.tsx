import Image from "next/image";
import type { CSSProperties } from "react";
import { bleedHero, demoPhotos } from "@/content/demo-photos";
import type { Demo, DemoGroup } from "@/content/demos";
import { DemoMotion } from "./DemoMotion";
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

// Tynne strekikoner til fordelsraden under toppen.
const icons = {
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9z",
  calendar: "M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4M15.5 4v4",
  sparkle: "M12 3v5M12 16v5M3 12h5M16 12h5M12 8l1.5 2.5L16 12l-2.5 1.5L12 16l-1.5-2.5L8 12l2.5-1.5z",
  pin: "M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  clock: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 7.5V12l3 2",
  shield: "M12 3.5l7 2.8v5.2c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6.3zM8.8 12l2.2 2.2 4.2-4.4",
  heart: "M12 19.5s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10z",
  leaf: "M5 19c0-8 5-13.5 14-14 0 9-5.5 14-13 14M5 19l7-7",
  bag: "M5.5 8.5h13l-1 11h-11zM9 8.5V7a3 3 0 0 1 6 0v1.5",
  clipboard: "M8.5 5.5h-2v15h11v-15h-2M8.5 4h7v3h-7zM9.5 12h5M9.5 15.5h5",
  tag: "M3.5 12.5V4.5h8l9 9-8 8zM8 9a1 1 0 1 0 0-.01",
  chat: "M4.5 5.5h15v10h-9l-4 3.5v-3.5h-2z",
  user: "M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5",
  gift: "M4.5 9.5h15v3h-15zM6 12.5h12v8H6zM12 9.5v11M12 9.5C10 6 7 5.5 7 7.5s5 2 5 2 5 0 5-2-3-1.5-5 2",
} as const;

const perks: Record<DemoGroup, [keyof typeof icons, string][]> = {
  beauty: [["star", "Erfarne fagfolk"], ["calendar", "Book time på nett"], ["sparkle", "Kvalitetsprodukter"], ["pin", "Sentralt i byen"]],
  health: [["clock", "Kort ventetid"], ["shield", "Faglig trygghet"], ["heart", "Personlig oppfølging"], ["calendar", "Book time på nett"]],
  food: [["leaf", "Ferske råvarer"], ["bag", "Takeaway"], ["heart", "God stemning"], ["pin", "Sentralt i byen"]],
  trades: [["clipboard", "Gratis befaring"], ["tag", "Fast pris"], ["shield", "Sertifiserte fagfolk"], ["clock", "Rask respons"]],
  services: [["chat", "Personlig rådgivning"], ["user", "Fast kontaktperson"], ["shield", "Trygt og diskret"], ["clock", "Rask respons"]],
  retail: [["sparkle", "Nyheter hver uke"], ["heart", "Personlig service"], ["gift", "Gavekort"], ["pin", "Sentralt i byen"]],
};

function Perks({ group }: { group: DemoGroup }) {
  return (
    <ul data-motion="stagger" className="grid grid-cols-2 gap-y-6 border-y border-[var(--d-fg)]/10 px-5 py-8 @3xl:grid-cols-4 @3xl:px-12">
      {perks[group].map(([icon, label]) => (
        <li key={label} className="flex flex-col items-center gap-2.5 text-center text-sm text-[var(--d-muted)]">
          <svg viewBox="0 0 24 24" className="dm-draw h-7 w-7 text-[var(--d-primary)]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={icons[icon]} pathLength={1} />
          </svg>
          {label}
        </li>
      ))}
    </ul>
  );
}

/** Kort «åpent»-linje under knappene: rask info for lokale kunder. */
function OpenLine({ hours, light = false }: { hours: string[]; light?: boolean }) {
  const first = hours[0] ?? "";
  return (
    <p className={`mt-6 flex items-center gap-2.5 text-sm ${light ? "opacity-85" : "text-[var(--d-muted)]"}`}>
      <span className="dm-pulse h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
      Åpent {first.charAt(0).toLowerCase() + first.slice(1)}
    </p>
  );
}

/** Foto over hele toppen for bransjer med mørk stemning (se bleedHero). Uten foto
    styres det av fargene: mørke paletter får den fargede toppen. */
function isBleed(demo: Demo, hasPhoto: boolean) {
  if (hasPhoto) return bleedHero.has(demo.slug);
  const hex = demo.theme.bg.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return r * 0.299 + g * 0.587 + b * 0.114 < 90 || demo.slug === "restaurant" || demo.slug === "catering";
}

const btn =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg";

function Buttons({ cta, light = false }: { cta: string; light?: boolean }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <span
        className={`${btn} ${light ? "bg-[var(--d-on)] text-[var(--d-primary)]" : "bg-[var(--d-primary)] text-[var(--d-on)]"}`}
      >
        {cta}
      </span>
      <span className={`${btn} px-3 ${light ? "text-[var(--d-on)]" : "text-[var(--d-fg)]"}`}>Se våre tjenester</span>
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
  const photos = demoPhotos[demo.slug] ?? {};
  const photo = photos.hero;
  const bleed = isBleed(demo, Boolean(photo));

  return (
    <DemoMotion className="@container" style={vars}>
      <div className="bg-[var(--d-bg)] font-sans text-[var(--d-fg)]">
        {/* Meny */}
        <header className="flex items-center justify-between gap-4 border-b border-[var(--d-fg)]/10 px-5 py-4 @3xl:px-12 @3xl:py-5">
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">{demo.name}</span>
          <nav className="hidden items-center gap-8 text-sm text-[var(--d-muted)] @3xl:flex" aria-hidden="true">
            <span>Hjem</span>
            <span>Tjenester</span>
            <span>Om oss</span>
            <span>Kontakt</span>
          </nav>
          <span className={`${btn} hidden bg-[var(--d-primary)] px-5 py-2.5 text-[var(--d-on)] @md:inline-flex`}>
            {demo.cta}
          </span>
        </header>

        {/* Hero: tekst til venstre og foto til høyre som toner inn i bakgrunnen.
            Mørke paletter får foto over hele flaten. Uten foto vises illustrasjonen. */}
        {bleed ? (
          <section className="relative overflow-hidden bg-[var(--d-primary)] text-[var(--d-on)]">
            {photo ? (
              <>
                <Image src={photo} alt="" fill sizes="(min-width: 1024px) 80vw, 100vw" className="dm-kenburns object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />
              </>
            ) : (
              <Pattern color={theme.onPrimary} />
            )}
            <div className="relative grid gap-10 px-5 py-16 @3xl:grid-cols-[1.3fr_1fr] @3xl:items-center @3xl:px-12 @3xl:py-28">
              <div className={photo ? "text-white" : ""}>
                <p className="dm-rise text-xs font-medium uppercase tracking-[0.2em] opacity-75">{demo.tagline}</p>
                <h1 className={`dm-rise dm-d1 mt-4 text-5xl leading-[1.04] @3xl:text-7xl ${heading}`}>{demo.title}</h1>
                <p className="dm-rise dm-d2 mt-6 max-w-md text-lg leading-relaxed opacity-85">{demo.text}</p>
                <div className="dm-rise dm-d3">
                  <Buttons cta={demo.cta} light />
                  <OpenLine hours={demo.hours} light />
                </div>
              </div>
              {!photo && (
                <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-[var(--d-soft)]">
                  <Scene slug={demo.slug} className="h-full w-full p-4 @3xl:p-6" />
                </div>
              )}
            </div>
          </section>
        ) : (
          <section className="relative overflow-hidden">
            {photo && (
              <div className="relative aspect-[3/2] @3xl:absolute @3xl:inset-y-0 @3xl:right-0 @3xl:aspect-auto @3xl:w-[58%]">
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="dm-kenburns object-cover [mask-image:linear-gradient(to_bottom,black_70%,transparent)] @3xl:[mask-image:linear-gradient(to_right,transparent,black_35%)]"
                />
              </div>
            )}
            <div className="relative grid items-center gap-10 px-5 py-12 @3xl:min-h-[34rem] @3xl:grid-cols-2 @3xl:px-12 @3xl:py-24">
              <div>
                <p className="dm-rise text-xs font-medium uppercase tracking-[0.2em] text-[var(--d-muted)]">{demo.tagline}</p>
                <h1 className={`dm-rise dm-d1 mt-4 text-4xl leading-[1.08] @3xl:text-6xl ${heading}`}>{demo.title}</h1>
                <p className="dm-rise dm-d2 mt-6 max-w-md text-lg leading-relaxed text-[var(--d-muted)]">{demo.text}</p>
                <div className="dm-rise dm-d3">
                  <Buttons cta={demo.cta} />
                  <OpenLine hours={demo.hours} />
                </div>
              </div>
              {!photo && (
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
              )}
            </div>
          </section>
        )}

        <Perks group={demo.group} />

        {/* Tjenester og priser – med detaljbilde ved siden av når det finnes */}
        <section
          className={`grid gap-10 px-5 py-14 @3xl:px-12 @3xl:py-20 ${photos.detalj ? "@3xl:grid-cols-[1.5fr_1fr] @3xl:items-center" : ""}`}
        >
          <div>
            <h2 data-motion="rise" className={`text-3xl @3xl:text-4xl ${heading}`}>
              Tjenester og priser
            </h2>
            <ul data-motion="stagger" className={`mt-8 grid gap-4 ${photos.detalj ? "" : "@3xl:grid-cols-2"}`}>
              {demo.services.map((s) => (
                <li
                  key={s.name}
                  className="flex items-baseline justify-between gap-4 rounded-2xl bg-[var(--d-soft)] px-6 py-5 hover:-translate-y-0.5 hover:shadow-[inset_4px_0_0_var(--d-primary)]"
                >
                  <span className="font-medium">{s.name}</span>
                  <span className="text-sm text-[var(--d-muted)]">{s.price}</span>
                </li>
              ))}
            </ul>
          </div>
          {photos.detalj && (
            <div data-motion="image" className="relative aspect-square overflow-hidden rounded-3xl">
              <Image src={photos.detalj} alt="" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
            </div>
          )}
        </section>

        {/* Om oss og åpningstider – med portrettbilde når det finnes */}
        <section
          className={`grid gap-10 border-t border-[var(--d-fg)]/10 px-5 py-14 @3xl:px-12 @3xl:py-20 ${
            photos.om ? "@3xl:grid-cols-[1fr_1.2fr] @3xl:items-center" : "@3xl:grid-cols-[1.4fr_1fr]"
          }`}
        >
          {photos.om && (
            <div data-motion="image" className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image src={photos.om} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          )}
          <div>
            <h2 data-motion="rise" className={`text-3xl @3xl:text-4xl ${heading}`}>
              Om oss
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--d-muted)]">{demo.about}</p>
            {photos.om && (
              <div className="mt-8 max-w-sm rounded-2xl border border-[var(--d-fg)]/10 p-6">
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--d-muted)]">Åpningstider</h3>
                <ul className="mt-3 space-y-1">
                  {demo.hours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {!photos.om && (
            <div className="rounded-2xl border border-[var(--d-fg)]/10 p-6">
              <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--d-muted)]">Åpningstider</h2>
              <ul className="mt-3 space-y-1">
                {demo.hours.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Avslutning */}
        <section className="dm-sheen bg-[var(--d-primary)] px-5 py-14 text-center text-[var(--d-on)] @3xl:px-12">
          <p data-motion="rise" className={`relative text-3xl @3xl:text-4xl ${heading}`}>
            Velkommen til {demo.name}
          </p>
          <span className={`${btn} relative mt-6 bg-[var(--d-on)] text-[var(--d-primary)]`}>{demo.cta}</span>
        </section>

        <footer className="flex flex-col gap-1 px-5 py-6 text-xs text-[var(--d-muted)] @md:flex-row @md:justify-between @3xl:px-12">
          <span>© {demo.name}</span>
          <span>{fictionalLabel}</span>
        </footer>

        {/* Klebrig handlingslinje på mobil: ring eller bestill med tommelen. */}
        <div className="sticky bottom-0 z-10 flex gap-2 border-t border-[var(--d-fg)]/10 bg-[var(--d-bg)]/95 p-3 backdrop-blur @md:hidden">
          <span className={`${btn} flex-1 gap-2 border border-[var(--d-fg)]/20`}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M6.5 3.5h3l1.5 4-2 1.2a11 11 0 0 0 6.3 6.3l1.2-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" strokeLinejoin="round" />
            </svg>
            Ring oss
          </span>
          <span className={`${btn} flex-1 bg-[var(--d-primary)] text-[var(--d-on)]`}>{demo.cta}</span>
        </div>
      </div>
    </DemoMotion>
  );
}
