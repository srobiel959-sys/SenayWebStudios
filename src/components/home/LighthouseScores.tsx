import type { Content } from "@/content";
import { lighthouse } from "@/content/shared";
import { container } from "@/lib/ui";
import { Reveal } from "../Reveal";
import { SectionHeading } from "../SectionHeading";

// Fire målte Lighthouse-tall som ringer, i samme stil som Google viser dem.

type Key = keyof typeof lighthouse.scores;
const order: Key[] = ["performance", "accessibility", "bestPractices", "seo"];

function Ring({ value }: { value: number }) {
  const r = 34;
  const length = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 80 80" className="h-24 w-24" aria-hidden="true">
      <circle cx="40" cy="40" r={r} fill="none" stroke="currentColor" strokeWidth="6" className="text-[#0c7d4c]/12" />
      <circle
        cx="40"
        cy="40"
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${(value / 100) * length} ${length}`}
        transform="rotate(-90 40 40)"
        className="text-[#0c7d4c]"
      />
      <text x="40" y="47" textAnchor="middle" className="fill-[#0a5c38] font-sans text-[22px] font-medium">
        {value}
      </text>
    </svg>
  );
}

export function LighthouseScores({ proof }: { proof: Content["proof"] }) {
  return (
    <section aria-labelledby="malt-tittel" className="border-t border-line py-24 sm:py-32">
      <div className={`${container} grid items-center gap-14 lg:grid-cols-12`}>
        <Reveal className="lg:col-span-5">
          <SectionHeading id="malt-tittel" eyebrow={proof.eyebrow} title={proof.title} lead={proof.lead} />
        </Reveal>
        <Reveal delay={100} className="lg:col-span-7">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {order.map((key) => (
              <li key={key} className="flex flex-col items-center gap-3 rounded-[1.5rem] border border-line bg-white p-5 text-center">
                <Ring value={lighthouse.scores[key]} />
                <span className="text-sm font-medium">
                  <span className="sr-only">
                    {lighthouse.scores[key]} {proof.outOf} –{" "}
                  </span>
                  {proof.labels[key]}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink-muted">{proof.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
