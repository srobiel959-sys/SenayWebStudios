type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
};

export function SectionHeading({ id, eyebrow, title, lead, tone = "light" }: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-cream-muted" : "text-ink-muted";

  return (
    <div className="max-w-2xl">
      <p className={`text-sm font-medium uppercase tracking-[0.18em] ${muted}`}>{eyebrow}</p>
      <h2 id={id} className="mt-4 font-display text-3xl leading-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {lead ? <p className={`mt-5 text-lg leading-relaxed ${muted}`}>{lead}</p> : null}
    </div>
  );
}
