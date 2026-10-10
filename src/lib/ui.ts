// Felles klasser, så knapper og marger ser like ut på alle sider.

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

/** Myk «fjær»-kurve for all bevegelse i grensesnittet. */
export const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]";

const button = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium transition-[background-color,color,translate,scale,box-shadow,border-color] duration-500 ${ease} hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:hover:translate-y-0`;

export const btnPrimary = `${button} bg-navy text-cream hover:bg-navy-soft`;
export const btnSecondary = `${button} border border-navy/40 hover:border-navy hover:bg-white/5`;
/** Hvit knapp til de blå kortene. */
export const btnLight = `${button} bg-white text-[#050d1a] hover:bg-[#dbe6ff]`;
export const btnOutlineLight = `${button} border border-cream-muted/60 text-cream hover:bg-white/10`;

/** Hovedknapp med pilen i en egen sirkel til høyre – bruk sammen med <ArrowCircle />. */
export const btnArrow = `group inline-flex items-center justify-between gap-4 rounded-full bg-navy py-2 pl-7 pr-2 font-medium text-cream transition-[background-color,translate,scale,box-shadow] duration-500 ${ease} hover:-translate-y-0.5 hover:bg-navy-soft active:scale-[0.98] motion-reduce:hover:translate-y-0`;

/** Pille-merkelapp over overskrifter. */
export const eyebrowPill =
  "inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-muted";
