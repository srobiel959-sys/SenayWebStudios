// Felles klasser, så knapper og marger ser like ut på alle sider.

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

// Bevegelse: tre faste varigheter og tre kurver, så alt føles likt (se også globals.css).
//   fast 150 ms: farge og hover · base 250 ms: knapper og små overganger · slow 500 ms: store flater
/** Ting som kommer inn: rask start, myk landing (slow out). */
export const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]";
/** Ting som forsvinner: myk start, rask slutt (slow in). */
export const easeIn = "ease-[cubic-bezier(0.55,0,0.85,0.3)]";
/** Tilbakemelding: litt forbi målet og tilbake (follow through). Bare til små elementer. */
export const spring = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";

/** Felles trykk: knappen presses ned og fjærer tilbake. */
const press = `transition-[background-color,color,translate,scale,box-shadow,border-color] duration-200 ${spring} hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.96] active:duration-100 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100`;

const button = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium ${press}`;

/** Mørkeblå knapp med hvit tekst og en myk skygge. */
const navyFill = "bg-navy text-cream shadow-[0_10px_24px_-12px_rgba(7,22,48,0.55)] hover:bg-navy-soft";

export const btnPrimary = `${button} ${navyFill}`;
export const btnSecondary = `${button} border border-navy/20 hover:border-navy/40 hover:bg-navy/5`;
/** Kantknapp til de mørkeblå feltene. */
export const btnSecondaryLight = `${button} border border-white/25 text-cream hover:border-white/50 hover:bg-white/10`;

const arrowButton = `group inline-flex min-h-12 items-center justify-between gap-4 rounded-full py-2 pl-7 pr-2 font-medium ${press}`;
/** Hovedknapp med pilen i en egen sirkel til høyre – bruk sammen med <ArrowCircle />. */
export const btnArrow = `${arrowButton} ${navyFill}`;
/** Hvit variant til de mørkeblå feltene – bruk sammen med <ArrowCircle tone="light" />. */
export const btnArrowLight = `${arrowButton} bg-white text-navy hover:bg-sand`;

/** Pille-merkelapp over overskrifter. */
export const eyebrowPill =
  "inline-flex items-center gap-2 rounded-full border border-line bg-sand px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-muted";

/** Kort med dobbel ramme: et tynt, lyst skall rundt en hvit kjerne. */
export const bezel = "rounded-[2rem] border border-line bg-sand/70 p-1.5";
export const bezelCore = "rounded-[calc(2rem-0.375rem)] bg-white shadow-[0_1px_2px_rgba(7,22,48,0.06),0_12px_32px_-20px_rgba(7,22,48,0.25)]";

/** Liten etikett i versaler, for eksempel inne i kort. */
export const kicker = "text-xs font-medium uppercase tracking-[0.2em] text-ink-muted";
