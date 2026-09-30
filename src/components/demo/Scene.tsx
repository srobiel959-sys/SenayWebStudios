import { scenesA } from "./scenes/a";
import { scenesB } from "./scenes/b";

const scenes = { ...scenesA, ...scenesB };

/** Bransjeillustrasjonen for et eksempel. Ren pynt, derfor skjult for skjermlesere. */
export function Scene({ slug, className = "" }: { slug: string; className?: string }) {
  const Draw = scenes[slug];
  if (!Draw) return null;
  return (
    <svg viewBox="0 0 480 360" className={`demo-scene ${className}`} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
      <Draw />
    </svg>
  );
}

export const sceneSlugs = Object.keys(scenes);
