// Felles bevegelse for Senay-siden og eksempelsidene.
//
// Én kurve, tre varigheter og to avstander. De samme verdiene finnes som CSS-variabler
// i globals.css (--motion-ease, --motion-fast/base/slow, --motion-distance), så CSS-animasjoner
// og Motion-animasjoner føles like. Endrer du noe her, endre det der også.
//
// Reglene (se CLAUDE.md): rolig og kort, aldri sprett forbi målet, ingenting skjules uten
// JavaScript, alt står stille ved «redusert bevegelse», og mindre bevegelse på mobil.

/** Rolig ease-out: rask start, myk landing. Går aldri forbi målet (ingen sprett). */
export const EASE = [0.32, 0.72, 0, 1] as const;
export const EASE_CSS = "cubic-bezier(0.32, 0.72, 0, 1)";

/** Varigheter i sekunder (Motion bruker sekunder). fast: små ting · base: kort og kort · slow: store flater. */
export const DURATION = { fast: 0.2, base: 0.4, slow: 0.6 } as const;

/** Hvor langt ting glir inn, i piksler. Kortere på mobil. */
export const DISTANCE = { desktop: 24, mobile: 12 } as const;

/** Tid mellom hvert element i en liste, i sekunder. */
export const STAGGER = 0.08;

export const SMALL_SCREEN = "(max-width: 767px)";
export const LARGE_SCREEN = "(min-width: 1024px)";
export const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * fade: bare inntoning · slideUp: tones inn og glir opp (standard) · scale: tones inn og vokser litt.
 * Skjult utgangspunkt for hvert preset står i globals.css ([data-motion-pending]).
 */
export type Preset = "fade" | "slideUp" | "scale";

/** Keyframes fra skjult til synlig for et preset. */
export function presetKeyframes(preset: Preset, distance: number) {
  switch (preset) {
    case "fade":
      return { opacity: [0, 1] };
    case "scale":
      return { opacity: [0, 1], transform: ["scale(0.96)", "none"] };
    case "slideUp":
    default:
      return { opacity: [0, 1], transform: [`translate3d(0, ${distance}px, 0)`, "none"] };
  }
}
