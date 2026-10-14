// Felles klasser, så knapper og marger ser like ut på alle sider.

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

/** Myk «fjær»-kurve for all bevegelse i grensesnittet. */
export const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]";

const button = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium transition-[background-color,color,translate,scale,box-shadow,border-color] duration-500 ${ease} hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0`;

/** Mørkeblå knapp med hvit tekst og en myk skygge. */
const navyFill = "bg-navy text-cream shadow-[0_10px_24px_-12px_rgba(7,22,48,0.55)] hover:bg-navy-soft";

export const btnPrimary = `${button} ${navyFill}`;
export const btnSecondary = `${button} border border-navy/20 hover:border-navy/40 hover:bg-navy/5`;
/** Kantknapp til de mørkeblå feltene. */
export const btnSecondaryLight = `${button} border border-white/25 text-cream hover:border-white/50 hover:bg-white/10`;

const arrowButton = `group inline-flex items-center justify-between gap-4 rounded-full py-2 pl-7 pr-2 font-medium transition-[background-color,translate,scale,box-shadow] duration-500 ${ease} hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0`;
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
