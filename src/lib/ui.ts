// Felles klasser, så knapper og marger ser like ut på alle sider.

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

// Bevegelse: samme kurve og varigheter som src/lib/motion/presets.ts og globals.css.
//   200 ms: farge, hover og trykk · 400 ms: små overganger · 600 ms: store flater
// Ingen kurve går forbi målet og tilbake (ingen sprett).
/** Ting som kommer inn: rask start, myk landing. Samme som --motion-ease. */
export const ease = "ease-calm";
/** Ting som forsvinner: myk start, rask slutt. */
export const easeIn = "ease-[cubic-bezier(0.55,0,0.85,0.3)]";

/** Felles trykk: knappen løftes litt ved hover og presses rolig ned ved klikk. */
const press = `transition-[background-color,color,translate,scale,box-shadow,border-color] duration-200 ${ease} hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] active:duration-100 motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100`;

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

/** Hvitt kort med tynn kant. */
export const card = "rounded-2xl border border-line bg-white";

/** Liten etikett, for eksempel inne i kort. */
export const kicker = "text-sm font-medium text-ink-muted";
