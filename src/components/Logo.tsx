// Midlertidig logo. Erstattes av de ekte logofilene i /public/brand/ når de er klare.

type MonogramProps = {
  className?: string;
  /** "dark" = navy flate med krem tegn, "light" = krem flate med navy tegn */
  tone?: "dark" | "light";
};

export function Monogram({ className, tone = "dark" }: MonogramProps) {
  const bg = tone === "dark" ? "var(--color-navy)" : "var(--color-cream)";
  const fg = tone === "dark" ? "var(--color-cream)" : "var(--color-navy)";

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="10" fill={bg} />
      <g
        fill={fg}
        style={{ fontFamily: "var(--font-bodoni), 'Bodoni Moda', Didot, Georgia, serif" }}
        fontWeight={500}
        textAnchor="middle"
      >
        <text x="20" y="31" fontSize="27">
          S
        </text>
        <text x="43" y="54" fontSize="25">
          W
        </text>
      </g>
      <line
        x1="13"
        y1="55"
        x2="51"
        y2="9"
        stroke={fg}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  tone?: "dark" | "light";
};

export function Logo({ className = "", tone = "dark" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram tone={tone} className="h-9 w-9 shrink-0" />
      <span className="font-display text-lg leading-none tracking-tight sm:text-xl">
        Senay Web Studio
      </span>
    </span>
  );
}
