import { ease } from "@/lib/ui";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-white/10">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-white/10">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl transition-colors duration-300 hover:text-white sm:text-2xl [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-[rotate,background-color,border-color] duration-500 ${ease} group-open:rotate-45 group-open:border-[#3b82f6] group-open:bg-[#3b82f6]/15`}
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
