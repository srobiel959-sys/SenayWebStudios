// Felles klasser, så knapper og marger ser like ut på alle sider.

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

const button =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0";

export const btnPrimary = `${button} bg-navy text-cream hover:bg-navy-soft`;
export const btnSecondary = `${button} border border-navy hover:bg-navy hover:text-cream`;
export const btnLight = `${button} bg-cream text-navy hover:bg-sand`;
export const btnOutlineLight = `${button} border border-cream-muted/60 text-cream hover:bg-cream hover:text-navy`;
