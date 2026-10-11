"use client";

import Link from "next/link";
import { useState } from "react";
import type { Content } from "@/content";
import { demoGroups, demos, type DemoGroup } from "@/content/demos";
import { demoHref, type Lang } from "@/lib/routes";
import { kicker } from "@/lib/ui";
import { ArrowIcon } from "../Icons";
import { DemoSite } from "./DemoSite";
import { ScaledPreview } from "./ScaledPreview";

type Labels = Content["demos"];

export function DemoGallery({ lang, labels }: { lang: Lang; labels: Labels }) {
  const [group, setGroup] = useState<DemoGroup | "all">("all");
  const [slug, setSlug] = useState(demos[0].slug);
  const visible = group === "all" ? demos : demos.filter((d) => d.group === group);
  const current = demos.find((d) => d.slug === slug) ?? demos[0];

  const chooseGroup = (g: DemoGroup | "all") => {
    setGroup(g);
    const first = g === "all" ? demos[0] : demos.find((d) => d.group === g);
    if (first && g !== "all" && current.group !== g) setSlug(first.slug);
  };

  const tab = (active: boolean) =>
    `shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
      active ? "bg-navy text-cream" : "border border-white/10 text-ink-muted hover:border-white/30 hover:text-white"
    }`;

  return (
    <div>
      {/* Kategorier */}
      <div role="group" aria-label={labels.choose} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        <button type="button" aria-pressed={group === "all"} onClick={() => chooseGroup("all")} className={tab(group === "all")}>
          {labels.all} · {demos.length}
        </button>
        {demoGroups.map((g) => (
          <button key={g.key} type="button" aria-pressed={group === g.key} onClick={() => chooseGroup(g.key)} className={tab(group === g.key)}>
            {g[lang]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Bransjer */}
        <div className="min-w-0 lg:col-span-3">
          <p className={kicker}>{labels.choose}</p>
          <ul className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:max-h-[34rem] lg:flex-col lg:gap-0 lg:overflow-y-auto lg:px-0 lg:pb-0">
            {visible.map((d) => {
              const active = d.slug === current.slug;
              return (
                <li key={d.slug} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSlug(d.slug)}
                    className={`w-full rounded-full px-4 py-2 text-left text-sm transition-colors lg:rounded-lg lg:py-2.5 ${
                      active ? "bg-navy text-cream" : "text-ink-muted hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {d.label[lang]}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Forhåndsvisning */}
        <div className="min-w-0 lg:col-span-9">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-1.5 shadow-[0_40px_120px_-50px_rgba(59,130,246,0.45)]">
            <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-[#0a1428]">
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                </span>
                <span className="min-w-0 flex-1 truncate rounded-full bg-white/[0.06] px-3 py-1 text-center text-xs text-ink-muted">
                  demo.senaystudio.no/{current.slug}
                </span>
                <span className="w-[2.625rem]" aria-hidden="true" />
              </div>
              <ScaledPreview id={current.slug}>
                <DemoSite demo={current} fictionalLabel={labels.fictional} />
              </ScaledPreview>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink-muted" aria-live="polite">
              {labels.showing} <span className="font-medium text-navy">{current.label[lang]}</span> · {current.name} ·{" "}
              <span className="text-sm">{labels.fictional}</span>
            </p>
            <Link
              href={demoHref(lang, current.slug)}
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 px-5 py-2.5 font-medium transition-colors hover:border-white/30 hover:bg-white/5 sm:self-auto"
            >
              {labels.open}
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
