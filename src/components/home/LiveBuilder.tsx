"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { Content } from "@/content";
import { demoGroups, demos } from "@/content/demos";
import type { Lang } from "@/lib/routes";
import { btnArrow } from "@/lib/ui";
import { DemoSite } from "../demo/DemoSite";
import { ScaledPreview } from "../demo/ScaledPreview";
import { ArrowCircle } from "../Icons";

// «Din nettside, live»: kunden skriver inn bedriftsnavnet og velger bransje, og ser
// sin egen nettside med en gang. «Bygg nettsiden min» spiller av byggingen på nytt
// og viser veien videre til kontaktskjemaet, ferdig utfylt.

const MAX_NAME = 40;

/** «Bjørn Rør AS» → «bjornror.no»: brukes i adressefeltet i forhåndsvisningen. */
export function domainFor(name: string) {
  const base = name
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\b(as|asa|ans|da|enk)\b/g, "")
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 30);
  return `${base || "dinbedrift"}.no`;
}

type Labels = Content["builder"];

export function LiveBuilder({
  lang,
  labels,
  fictionalLabel,
  contactPath,
}: {
  lang: Lang;
  labels: Labels;
  fictionalLabel: string;
  contactPath: string;
}) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState(demos[0].slug);
  const [run, setRun] = useState(0);
  const [stage, setStage] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const ids = useId();

  // Stopp byggeanimasjonen hvis komponenten forsvinner.
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const base = demos.find((d) => d.slug === slug) ?? demos[0];
  const shownName = name.trim() || labels.fallbackName;
  const demo = { ...base, name: shownName };
  const done = stage >= labels.steps.length - 1;
  const contactHref = `${contactPath}?${new URLSearchParams({ bedrift: name.trim(), bransje: base.label[lang] }).toString()}`;

  function build(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    timers.current.forEach(clearTimeout);
    setRun((r) => r + 1);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStage(labels.steps.length - 1);
    } else {
      setStage(0);
      timers.current = labels.steps.slice(1).map((_, i) => setTimeout(() => setStage(i + 1), 650 * (i + 1)));
    }
    previewRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

  return (
    <div className="w-full">
      <form
        onSubmit={build}
        className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-[1.75rem] border border-line bg-white p-2 text-left shadow-[0_24px_60px_-30px_rgba(7,22,48,0.35)] sm:flex-row sm:items-center sm:rounded-full"
      >
        <label htmlFor={`${ids}-navn`} className="sr-only">
          {labels.nameLabel}
        </label>
        <input
          id={`${ids}-navn`}
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, MAX_NAME))}
          maxLength={MAX_NAME}
          autoComplete="organization"
          placeholder={labels.namePlaceholder}
          className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3 text-lg text-navy placeholder:text-ink-muted focus:bg-sand/60"
        />
        <label htmlFor={`${ids}-bransje`} className="sr-only">
          {labels.industryLabel}
        </label>
        <select
          id={`${ids}-bransje`}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="rounded-full border border-line bg-sand/60 px-4 py-3 text-navy sm:max-w-[13rem]"
        >
          {demoGroups.map((g) => (
            <optgroup key={g.key} label={g[lang]}>
              {demos
                .filter((d) => d.group === g.key)
                .map((d) => (
                  <option key={d.slug} value={d.slug}>
                    {d.label[lang]}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <button type="submit" className={`${btnArrow} shrink-0`}>
          {labels.build}
          <ArrowCircle />
        </button>
      </form>

      <div ref={previewRef} className="mx-auto mt-10 max-w-5xl scroll-mt-28 sm:mt-14">
        <p className="sr-only" aria-live="polite">
          {labels.srPreview.replace("{navn}", shownName)}
          {stage >= 0 ? ` ${labels.steps[stage]}` : ""}
        </p>
        <div className="relative rounded-[1.75rem] border border-line bg-sand/70 p-1.5 text-left shadow-[0_50px_120px_-50px_rgba(7,22,48,0.45)]">
          <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-white">
            <div className="flex items-center gap-3 border-b border-line px-4 py-3" aria-hidden="true">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-navy/15" />
              </span>
              <span className="min-w-0 flex-1 truncate rounded-full bg-sand px-3 py-1 text-center text-xs text-ink-muted">
                {domainFor(name)}
              </span>
              <span className="w-[2.625rem]" />
            </div>
            <ScaledPreview id={`${slug}-${run}`}>
              <DemoSite demo={demo} fictionalLabel={fictionalLabel} />
            </ScaledPreview>
          </div>

          {/* Byggestatus, og til slutt veien videre, flytende nederst i rammen */}
          {stage >= 0 ? (
            <div className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6">
              {!done ? (
                <ol className="flex flex-wrap justify-center gap-2 text-sm" aria-hidden="true">
                  {labels.steps.map((step, i) => (
                    <li
                      key={step}
                      className={`rounded-full border px-3 py-1 shadow-sm transition-colors duration-300 ${
                        i <= stage ? "border-navy bg-navy text-cream" : "border-line bg-white text-ink-muted"
                      }`}
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <div
                  className="build-done flex flex-col items-center gap-4 rounded-[1.5rem] border border-line bg-white/95 p-5 text-center shadow-[0_24px_60px_-24px_rgba(7,22,48,0.45)] backdrop-blur sm:flex-row sm:justify-between sm:text-left"
                >
                  <p className="text-balance">
                    <span className="font-medium">{labels.doneTitle}</span>{" "}
                    <span className="text-ink-muted">{labels.doneText}</span>
                  </p>
                  <Link href={contactHref} className={`${btnArrow} shrink-0`}>
                    {labels.doneCta}
                    <ArrowCircle />
                  </Link>
                </div>
              )}
            </div>
          ) : null}
        </div>
        {stage < 0 ? <p className="mt-5 text-center text-sm text-ink-muted">{labels.hint}</p> : null}
      </div>
    </div>
  );
}
