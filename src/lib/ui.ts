// Felles klasser, så knapper og marger ser like ut på alle sider.

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

/** Myk «fjær»-kurve for all bevegelse i grensesnittet. */
export const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]";

const button = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium transition-[background-color,color,translate,scale,box-shadow,border-color] duration-500 ${ease} hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0`;

export const btnPrimary = `${button} bg-navy text-cream hover:bg-navy-soft`;
export const btnSecondary = `${button} border border-navy/40 hover:border-navy hover:bg-white/5`;

const arrowButton = `group inline-flex items-center justify-between gap-4 rounded-full py-2 pl-7 pr-2 font-medium transition-[background-color,translate,scale,box-shadow] duration-500 ${ease} hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0`;
/** Hovedknapp med pilen i en egen sirkel til høyre – bruk sammen med <ArrowCircle />. */
export const btnArrow = `${arrowButton} bg-navy text-cream hover:bg-navy-soft`;
/** Hvit variant til de blå kortene – bruk sammen med <ArrowCircle tone="light" />. */
export const btnArrowLight = `${arrowButton} bg-white text-[#050d1a] hover:bg-[#dbe6ff]`;

/** Pille-merkelapp over overskrifter. */
export const eyebrowPill =
  "inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-muted";

/** Kort med dobbel ramme: et tynt ytre skall rundt en mørk kjerne. */
export const bezel = "rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5";
export const bezelCore = "rounded-[calc(2rem-0.375rem)] bg-[#0a1428] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]";

/** Liten etikett i versaler, for eksempel inne i kort. */
export const kicker = "text-xs font-medium uppercase tracking-[0.2em] text-ink-muted";
