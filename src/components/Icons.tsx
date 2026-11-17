export function CheckIcon({ className = "mt-1 h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function CrossIcon({ className = "mt-1 h-4 w-4 shrink-0" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** Pil i egen sirkel, til knapper med btnArrow. Ved hover glir pilen litt frem, og ved trykk
    presses sirkelen rolig ned. */
export function ArrowCircle({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ease-calm group-hover:scale-105 group-active:scale-95 group-active:duration-100 ${
        tone === "light" ? "bg-navy text-white" : "bg-white/15"
      }`}
    >
      <span className="arrow-nudge flex">
        <ArrowIcon className="h-4 w-4" />
      </span>
    </span>
  );
}
