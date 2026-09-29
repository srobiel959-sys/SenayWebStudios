export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl sm:text-2xl [&::-webkit-details-marker]:hidden">
            {item.q}
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="mt-1.5 h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-45"
            >
              <path d="M10 3v14M3 10h14" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </summary>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
