import Image from "next/image";
import type { CSSProperties } from "react";
import { demoPhotos } from "@/content/demo-photos";
import type { Demo, DemoGroup } from "@/content/demos";
import type { Lang } from "@/lib/routes";
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
  calendar: "M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4M15.5 4v4",
  sparkle: "M12 3v5M12 16v5M3 12h5M16 12h5M12 8l1.5 2.5L16 12l-2.5 1.5L12 16l-1.5-2.5L8 12l2.5-1.5z",
  pin: "M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  clock: "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 7.5V12l3 2",
  shield: "M12 3.5l7 2.8v5.2c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6.3zM8.8 12l2.2 2.2 4.2-4.4",
  leaf: "M5 19c0-8 5-13.5 14-14 0 9-5.5 14-13 14M5 19l7-7",
  bag: "M5.5 8.5h13l-1 11h-11zM9 8.5V7a3 3 0 0 1 6 0v1.5",
  clipboard: "M8.5 5.5h-2v15h11v-15h-2M8.5 4h7v3h-7zM9.5 12h5M9.5 15.5h5",
  tag: "M3.5 12.5V4.5h8l9 9-8 8zM8 9a1 1 0 1 0 0-.01",
  chat: "M4.5 5.5h15v10h-9l-4 3.5v-3.5h-2z",
  user: "M12 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5",
  gift: "M4.5 9.5h15v3h-15zM6 12.5h12v8H6zM12 9.5v11M12 9.5C10 6 7 5.5 7 7.5s5 2 5 2 5 0 5-2-3-1.5-5 2",
} as const;

type Perk = [keyof typeof icons, string];

const perks: Record<Lang, Record<DemoGroup, Perk[]>> = {
  no: {
    beauty: [["calendar", "Book time på nett"], ["gift", "Gavekort"], ["tag", "Betal med Vipps"], ["pin", "Sentralt i byen"]],
    health: [["clock", "Kort ventetid"], ["calendar", "Book time på nett"], ["shield", "Utdannede fagfolk"], ["pin", "Parkering ved døren"]],
    food: [["leaf", "Ferske råvarer"], ["bag", "Takeaway"], ["clipboard", "Allergener merket i menyen"], ["pin", "Sentralt i byen"]],
    trades: [["clipboard", "Gratis befaring"], ["tag", "Fast pris"], ["shield", "Sertifiserte fagfolk"], ["clock", "Svar innen én dag"]],
    services: [["user", "Fast kontaktperson"], ["tag", "Pris før vi starter"], ["clock", "Svar innen én dag"], ["chat", "Forklart uten faguttrykk"]],
    retail: [["sparkle", "Nyheter hver uke"], ["gift", "Gavekort"], ["bag", "Bytterett i 30 dager"], ["pin", "Sentralt i byen"]],
  },
  en: {
    beauty: [["calendar", "Book online"], ["gift", "Gift cards"], ["tag", "Pay with Vipps"], ["pin", "Central location"]],
    health: [["clock", "Short waiting time"], ["calendar", "Book online"], ["shield", "Qualified professionals"], ["pin", "Parking by the door"]],
    food: [["leaf", "Fresh ingredients"], ["bag", "Takeaway"], ["clipboard", "Allergens marked on the menu"], ["pin", "Central location"]],
    trades: [["clipboard", "Free survey"], ["tag", "Fixed price"], ["shield", "Certified tradespeople"], ["clock", "Reply within one day"]],
    services: [["user", "One regular contact"], ["tag", "Price before we start"], ["clock", "Reply within one day"], ["chat", "Explained without jargon"]],
    retail: [["sparkle", "New arrivals every week"], ["gift", "Gift cards"], ["bag", "30-day returns"], ["pin", "Central location"]],
  },
};

// Den faste teksten i malen, på begge språk.
const ui = {
  no: {
    nav: ["Hjem", "Tjenester", "Om oss", "Kontakt"],
    seeServices: "Se våre tjenester",
    hours: "Åpningstider",
    open: "Åpent",
    services: "Tjenester og priser",
    about: "Om oss",
    welcome: "Velkommen til",
    call: "Ring oss",
  },
  en: {
    nav: ["Home", "Services", "About", "Contact"],
    seeServices: "See our services",
    hours: "Opening hours",
    open: "Open",
    services: "Services and prices",
    about: "About us",
    welcome: "Welcome to",
    call: "Call us",
  },
} satisfies Record<Lang, unknown>;

function Perks({ group, lang }: { group: DemoGroup; lang: Lang }) {
  return (
    <ul data-motion="stagger" className="grid grid-cols-2 gap-x-6 gap-y-5 px-5 py-8 @3xl:grid-cols-4 @3xl:px-12 @3xl:py-10">
      {perks[lang][group].map(([icon, label]) => (
        <li key={label} className="flex items-center gap-3 text-sm font-medium">
          <svg viewBox="0 0 24 24" className="dm-draw h-6 w-6 shrink-0 text-[var(--d-primary)]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={icons[icon]} pathLength={1} />
          </svg>
          {label}
        </li>
      ))}
    </ul>
  );
}

/** Kort «åpent»-linje under knappene: rask info for lokale kunder. */
function OpenLine({ hours, lang, light = false, className = "" }: { hours: string[]; lang: Lang; light?: boolean; className?: string }) {
  const line = hours[0] ?? "";
  // «Åpent tir–fre 09–18» / «Open Tue–Fri 9 am–6 pm». På engelsk beholder ukedagene stor bokstav.
  const first = lang === "en" ? line.replace(/^(By|Every)\b/, (word) => word.toLowerCase()) : line.charAt(0).toLowerCase() + line.slice(1);
  return (
    <p className={`mt-6 flex items-center gap-2.5 text-sm ${light ? "opacity-85" : "text-[var(--d-muted)]"} ${className}`}>
      <span className="dm-pulse h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
      {ui[lang].open} {first}
    </p>
  );
}

/** Deler «Tir–fre 09–18» / «Tue–Fri 9 am–6 pm» i dag og tid, så de kan stå i hver sin kolonne. */
function splitHours(line: string): [string, string] {
  const match = line.match(/^(.*?)\s+((?:\d|stengt|etter avtale|closed|by appointment).*)$/i);
  return match ? [match[1], match[2]] : [line, ""];
}

/** Åpningstidene som en liten tabell: dag til venstre, tid til høyre. */
function HoursList({ hours }: { hours: string[] }) {
  return (
    <ul className="divide-y divide-[var(--d-fg)]/10 text-sm">
      {hours.map((line) => {
        const [day, time] = splitHours(line);
        return (
          <li key={line} className="flex justify-between gap-6 py-2.5">
            <span className="text-[var(--d-muted)]">{day}</span>
            <span className="font-medium">{time}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** Uten foto: mørke paletter får den fargede toppen, lyse får illustrasjonen til høyre. */
function isDarkTop(demo: Demo) {
  return brightness(demo.theme.bg) < 90 || demo.slug === "restaurant" || demo.slug === "catering";
}

const btn =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg";

/** Hvor knappene står: på sidens bakgrunn, på den fargede toppen eller oppå et mørkt foto. */
type ButtonTone = "page" | "primary" | "photo";

function Buttons({ cta, lang, tone = "page", invert = false }: { cta: string; lang: Lang; tone?: ButtonTone; invert?: boolean }) {
  // På den fargede toppen byttes fargene om. Oppå et foto brukes den lyseste av de to som
  // knappefarge (invert), ellers blir knappen mørk mot det mørke bildet.
  const swapped = tone === "primary" || (tone === "photo" && !invert);
  const main = swapped ? "bg-[var(--d-on)] text-[var(--d-primary)]" : "bg-[var(--d-primary)] text-[var(--d-on)]";
  const second = tone === "photo" ? "text-white" : tone === "primary" ? "text-[var(--d-on)]" : "text-[var(--d-fg)]";
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <span className={`${btn} ${main}`}>{cta}</span>
      <span className={`${btn} px-3 ${second}`}>{ui[lang].seeServices}</span>
    </div>
  );
}

/** Lysstyrken til en farge som «#AABBCC», fra 0 (svart) til 255 (hvit). */
function brightness(color: string) {
  const [r, g, b] = channels(color);
  return r * 0.299 + g * 0.587 + b * 0.114;
}

function channels(color: string) {
  const hex = color.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

/** Fargen som gjennomsiktig lag, til skyggen som ligger over fotoet. */
function alpha(color: string, opacity: number) {
  const [r, g, b] = channels(color);
  return `rgb(${r} ${g} ${b} / ${opacity})`;
}

export function DemoSite({
  demo,
  lang,
  fictionalLabel,
  caret = false,
}: {
  /** Eksemplet, allerede på riktig språk (se localizeDemo i content/demos.ts). */
  demo: Demo;
  lang: Lang;
  fictionalLabel: string;
  /** Viser en blinkende skrivemarkør etter navnet (brukes i «Din nettside, live»). */
  caret?: boolean;
}) {
  const { theme } = demo;
  const t = ui[lang];
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
  // Skyggen over fotoet får den mørkeste fargen i paletten, så hver side beholder sin egen tone.
  const shade = brightness(theme.fg) < brightness(theme.bg) ? theme.fg : theme.bg;
  // Lange overskrifter settes litt mindre, så de holder seg på to–tre linjer.
  const titleSize = demo.title.length > 34 ? "text-4xl @3xl:text-6xl" : "text-5xl @3xl:text-7xl";

  return (
    <DemoMotion className="@container" style={vars}>
      <div className="bg-[var(--d-bg)] font-sans text-[var(--d-fg)]">
        {/* Meny */}
        <header className="flex items-center justify-between gap-4 px-5 py-4 @3xl:px-12 @3xl:py-5">
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">
            {demo.name}
            {caret ? <span className="build-caret" aria-hidden="true" /> : null}
          </span>
          <nav className="hidden items-center gap-8 text-sm text-[var(--d-muted)] @3xl:flex" aria-hidden="true">
            {t.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
          <span className={`${btn} hidden bg-[var(--d-primary)] px-5 py-2.5 text-[var(--d-on)] @md:inline-flex`}>
            {demo.cta}
          </span>
        </header>

        {/* Topp. Med foto: bildet fyller en avrundet ramme, overskriften står oppå, og
            åpningstidene ligger i et kort nede til høyre. Uten foto vises illustrasjonen. */}
        {photo ? (
          <section className="px-2 @3xl:px-4">
            {/* Rammen har selv den mørke fargen, så teksten er lesbar også før bildet er lastet. */}
            <div
              className="relative isolate flex min-h-[32rem] flex-col justify-end overflow-hidden rounded-[1.75rem] text-white @3xl:min-h-[40rem] @3xl:rounded-[2.25rem]"
              style={{ backgroundColor: shade }}
            >
              <Image src={photo} alt="" fill sizes="(min-width: 1024px) 90vw, 100vw" className="dm-kenburns -z-20 object-cover" />
              {/* På smale skjermer ligger teksten over hele bildet, så skyggen dekker mer der. */}
              <div
                className="absolute inset-0 -z-10 @3xl:hidden"
                style={{ background: `linear-gradient(to top, ${alpha(shade, 0.95)} 0%, ${alpha(shade, 0.86)} 60%, ${alpha(shade, 0.55)} 100%)` }}
              />
              <div
                className="absolute inset-0 -z-10 hidden @3xl:block"
                style={{ background: `linear-gradient(90deg, ${alpha(shade, 0.94)} 0%, ${alpha(shade, 0.84)} 45%, ${alpha(shade, 0.38)} 72%, ${alpha(shade, 0.08)} 100%)` }}
              />
              <div className="grid gap-8 p-6 pt-20 @3xl:grid-cols-[1fr_auto] @3xl:items-end @3xl:gap-12 @3xl:p-12 @3xl:pt-32">
                <div className="max-w-2xl">
                  <p className="dm-rise text-sm font-medium opacity-80">{demo.tagline}</p>
                  <h1 className={`dm-rise dm-d1 mt-4 text-balance leading-[1.04] ${titleSize} ${heading}`}>{demo.title}</h1>
                  <p className="dm-rise dm-d2 mt-6 max-w-md text-lg leading-relaxed opacity-90">{demo.text}</p>
                  <div className="dm-rise dm-d3">
                    <Buttons cta={demo.cta} lang={lang} tone="photo" invert={brightness(theme.primary) > brightness(theme.onPrimary)} />
                    <OpenLine hours={demo.hours} lang={lang} light className="@3xl:hidden" />
                  </div>
                </div>
                <div className="dm-rise dm-d4 hidden w-72 rounded-3xl bg-[var(--d-bg)] p-6 text-[var(--d-fg)] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] @3xl:block">
                  <p className="flex items-center gap-2.5 font-medium">
                    <span className="dm-pulse h-2 w-2 rounded-full bg-green-500" aria-hidden="true" />
                    {t.hours}
                  </p>
                  <div className="mt-3">
                    <HoursList hours={demo.hours} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : isDarkTop(demo) ? (
          <section className="relative overflow-hidden bg-[var(--d-primary)] text-[var(--d-on)]">
            <Pattern color={theme.onPrimary} />
            <div className="relative grid gap-10 px-5 py-16 @3xl:grid-cols-[1.3fr_1fr] @3xl:items-center @3xl:px-12 @3xl:py-28">
              <div>
                <p className="dm-rise text-sm font-medium opacity-80">{demo.tagline}</p>
                <h1 className={`dm-rise dm-d1 mt-4 leading-[1.04] ${titleSize} ${heading}`}>{demo.title}</h1>
                <p className="dm-rise dm-d2 mt-6 max-w-md text-lg leading-relaxed opacity-85">{demo.text}</p>
                <div className="dm-rise dm-d3">
                  <Buttons cta={demo.cta} lang={lang} tone="primary" />
                  <OpenLine hours={demo.hours} lang={lang} light />
                </div>
              </div>
              <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-[var(--d-soft)]">
                <Scene slug={demo.slug} className="h-full w-full p-4 @3xl:p-6" />
              </div>
            </div>
          </section>
        ) : (
          <section className="grid items-center gap-10 px-5 py-12 @3xl:min-h-[34rem] @3xl:grid-cols-2 @3xl:px-12 @3xl:py-24">
            <div>
              <p className="dm-rise text-sm font-medium text-[var(--d-muted)]">{demo.tagline}</p>
              <h1 className={`dm-rise dm-d1 mt-4 leading-[1.08] ${titleSize} ${heading}`}>{demo.title}</h1>
              <p className="dm-rise dm-d2 mt-6 max-w-md text-lg leading-relaxed text-[var(--d-muted)]">{demo.text}</p>
              <div className="dm-rise dm-d3">
                <Buttons cta={demo.cta} lang={lang} />
                <OpenLine hours={demo.hours} lang={lang} />
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[var(--d-soft)]">
              <Scene slug={demo.slug} className="absolute inset-0 h-full w-full p-4 @3xl:p-8" />
            </div>
          </section>
        )}

        <Perks group={demo.group} lang={lang} />

        {/* Tjenester og priser: overskrift og detaljbilde til venstre, prislisten til høyre */}
        <section className="grid gap-10 border-t border-[var(--d-fg)]/10 px-5 py-14 @3xl:grid-cols-[1fr_1.35fr] @3xl:gap-16 @3xl:px-12 @3xl:py-24">
          <div>
            <h2 data-motion="rise" className={`text-4xl leading-[1.08] @3xl:text-5xl ${heading}`}>
              {t.services}
            </h2>
            {photos.detalj && (
              <div data-motion="image" className="relative mt-8 aspect-square max-w-md overflow-hidden rounded-3xl">
                <Image src={photos.detalj} alt="" fill sizes="(min-width: 1024px) 35vw, 100vw" className="object-cover" />
              </div>
            )}
          </div>
          <div>
            <ul data-motion="stagger" className="divide-y divide-[var(--d-fg)]/10 border-y border-[var(--d-fg)]/10">
              {demo.services.map((s) => (
                <li key={s.name} className="flex items-baseline justify-between gap-6 py-5 @3xl:py-6">
                  <span className="text-xl @3xl:text-2xl">{s.name}</span>
                  <span className="shrink-0 text-[var(--d-muted)]">{s.price}</span>
                </li>
              ))}
            </ul>
            <span className={`${btn} mt-8 bg-[var(--d-primary)] text-[var(--d-on)]`}>{demo.cta}</span>
          </div>
        </section>

        {/* Om oss: bildet til venstre og teksten satt stort til høyre */}
        <section className="bg-[var(--d-soft)] px-5 py-14 @3xl:px-12 @3xl:py-24">
          <div className={`grid gap-10 @3xl:gap-16 ${photos.om ? "@3xl:grid-cols-[1fr_1.35fr] @3xl:items-center" : ""}`}>
            {photos.om && (
              <div data-motion="image" className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image src={photos.om} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
            )}
            <div>
              <h2 className="font-medium text-[var(--d-muted)]">{t.about}</h2>
              <p data-motion="rise" className={`mt-4 max-w-3xl text-balance text-2xl leading-snug @3xl:text-4xl @3xl:leading-[1.2] ${heading}`}>
                {demo.about}
              </p>
              {/* På store skjermer står åpningstidene i kortet øverst. */}
              <div className={`mt-10 max-w-sm ${photo ? "@3xl:hidden" : ""}`}>
                <h3 className="font-medium">{t.hours}</h3>
                <div className="mt-2">
                  <HoursList hours={demo.hours} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avslutning */}
        <section className="px-2 pt-2 @3xl:px-4 @3xl:pt-4">
          <div className="dm-sheen rounded-[1.75rem] bg-[var(--d-primary)] px-6 py-16 text-center text-[var(--d-on)] @3xl:rounded-[2.25rem] @3xl:py-24">
            <p data-motion="rise" className={`relative text-balance text-4xl leading-[1.08] @3xl:text-6xl ${heading}`}>
              {t.welcome} {demo.name}
            </p>
            <span className={`${btn} relative mt-8 bg-[var(--d-on)] text-[var(--d-primary)]`}>{demo.cta}</span>
          </div>
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
            {t.call}
          </span>
          <span className={`${btn} flex-1 bg-[var(--d-primary)] text-[var(--d-on)]`}>{demo.cta}</span>
        </div>
      </div>
    </DemoMotion>
  );
}
