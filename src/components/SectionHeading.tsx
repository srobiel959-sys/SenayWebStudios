import { eyebrowPill } from "@/lib/ui";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
};

export function SectionHeading({ id, eyebrow, title, lead, tone = "light", align = "left" }: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-cream-muted" : "text-ink-muted";
  const center = align === "center";

  return (
    <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <p className={eyebrowPill}>{eyebrow}</p>
      <h2 id={id} className="mt-6 text-balance font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {lead ? <p className={`mt-6 text-pretty text-lg leading-relaxed ${muted}`}>{lead}</p> : null}
    </div>
  );
}
