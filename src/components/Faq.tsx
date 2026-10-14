import { ease } from "@/lib/ui";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl transition-colors duration-300 hover:text-accent sm:text-2xl [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-[rotate,background-color,border-color,color] duration-500 ${ease} group-open:rotate-45 group-open:border-navy group-open:bg-navy group-open:text-cream`}
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4">
                <path d="M10 3v14M3 10h14" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </summary>
          <p className="max-w-2xl pb-7 leading-relaxed text-ink-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
