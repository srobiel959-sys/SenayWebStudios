"use client";

import Link from "next/link";
import { useState } from "react";
import type { Content } from "@/content";
import { demoGroups, demos, type DemoGroup } from "@/content/demos";
import { demoHref, type Lang } from "@/lib/routes";
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
      active ? "bg-navy text-cream" : "border border-line text-ink-muted hover:border-navy hover:text-navy"
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
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-ink-muted">{labels.choose}</p>
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
                      active ? "bg-navy text-cream" : "text-navy hover:bg-sand"
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
          <div className="overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_30px_80px_-40px_rgba(7,22,48,0.45)]">
            <div className="flex items-center gap-3 border-b border-line bg-sand px-4 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E36A5C]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E9B949]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#62B36B]" />
              </span>
              <span className="min-w-0 flex-1 truncate rounded-md bg-cream px-3 py-1 text-xs text-ink-muted">
                demo.senaystudio.no/{current.slug}
              </span>
            </div>
            <ScaledPreview id={current.slug}>
              <DemoSite demo={current} fictionalLabel={labels.fictional} />
            </ScaledPreview>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink-muted" aria-live="polite">
              {labels.showing} <span className="font-medium text-navy">{current.label[lang]}</span> · {current.name} ·{" "}
              <span className="text-sm">{labels.fictional}</span>
            </p>
            <Link href={demoHref(lang, current.slug)} className="group inline-flex shrink-0 items-center gap-2 font-medium">
              {labels.open}
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
