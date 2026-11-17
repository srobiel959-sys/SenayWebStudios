type SectionHeadingProps = {
  id: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
};

export function SectionHeading({ id, title, lead, tone = "light", align = "left" }: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-cream-muted" : "text-ink-muted";
  const center = align === "center";

  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <h2 id={id} className="text-balance font-display text-[2rem] leading-[1.1] tracking-tight sm:text-5xl sm:leading-[1.05] lg:text-6xl">
        {title}
      </h2>
      {lead ? <p className={`mt-4 text-pretty text-base leading-relaxed sm:mt-6 sm:text-lg ${muted}`}>{lead}</p> : null}
    </div>
  );
}
