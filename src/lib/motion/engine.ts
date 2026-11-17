// Motoren bak inntoningene. Brukes av komponentene i src/components/motion og av
// eksempelsidene (DemoMotion). Bare nettleser-kode: kalles fra useEffect.
//
// Slik holdes reglene:
// - Serveren viser alltid den ferdige siden. Ingenting er skjult uten JavaScript.
// - Bare innhold som ligger under skjermkanten når siden lastes, skjules (data-motion-pending,
//   se globals.css), og bare til det scrolles til syne.
// - Ved «redusert bevegelse» gjøres ingenting.
// - Animasjonene kjører i nettleserens egen motor (Web Animations API via motion/mini),
//   ikke i JavaScript for hvert bilde.
//
// Importer bare fra "motion/mini" her (3 kB). Hovedpakken "motion" drar med seg langt mer,
// og den skal bare lastes der den trengs (parallax.ts, som lastes etter behov).

import { animate } from "motion/mini";
import { DISTANCE, DURATION, EASE, REDUCED_MOTION, SMALL_SCREEN, STAGGER, presetKeyframes, type Preset } from "./presets";

const noop = () => {};

const matches = (query: string) => typeof window !== "undefined" && window.matchMedia(query).matches;
export const prefersReducedMotion = () => matches(REDUCED_MOTION);
export const isSmallScreen = () => matches(SMALL_SCREEN);
export const motionDistance = () => (isSmallScreen() ? DISTANCE.mobile : DISTANCE.desktop);

type Targets = Element | Iterable<Element> | ArrayLike<Element>;

const toList = (targets: Targets) => (targets instanceof Element ? [targets] : Array.from(targets as Iterable<Element>));

const documentOrder = (a: Element, b: Element) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);

/**
 * Felles kjerne: skjuler elementene som ligger under skjermkanten, og kaller onEnter med dem
 * som kommer til syne i samme bilde (i dokumentrekkefølge), så de kan komme etter hverandre.
 */
function whenRevealed(targets: Targets, pendingValue: string, onEnter: (batch: HTMLElement[]) => void) {
  if (typeof window === "undefined" || prefersReducedMotion()) return noop;

  const pending = toList(targets).filter(
    (el): el is HTMLElement => el instanceof HTMLElement && el.getBoundingClientRect().top >= window.innerHeight,
  );
  if (pending.length === 0) return noop;
  for (const el of pending) el.dataset.motionPending = pendingValue;

  let queue: HTMLElement[] = [];
  let frame = 0;
  const flush = () => {
    frame = 0;
    const batch = queue.sort(documentOrder);
    queue = [];
    onEnter(batch);
  };

  // Hvert element følges til det kommer til syne én gang. Vanligvis når det er 10 % opp på
  // skjermen. Elementer helt nederst på siden når kanskje aldri så høyt; de vises så fort de
  // er innenfor skjermen.
  const watch = (margin: string) =>
    new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          queue.push(entry.target as HTMLElement);
        }
        if (queue.length && !frame) frame = requestAnimationFrame(flush);
      },
      { rootMargin: margin },
    );
  const observers = [watch("0px 0px -10% 0px"), watch("0px")];
  const pageEnd = document.documentElement.scrollHeight - window.innerHeight * 0.1;
  for (const el of pending) {
    const nearEnd = el.getBoundingClientRect().top + window.scrollY > pageEnd;
    observers[nearEnd ? 1 : 0].observe(el);
  }

  return () => {
    for (const observer of observers) observer.disconnect();
    if (frame) cancelAnimationFrame(frame);
    for (const el of pending) delete el.dataset.motionPending;
  };
}

export type RevealOptions = {
  /** fade, slideUp (standard) eller scale. */
  preset?: Preset;
  /** Venting før start, i sekunder. */
  delay?: number;
  /** Tid mellom elementer som kommer til syne samtidig, i sekunder. 0 = samtidig. */
  stagger?: number;
  /** Varighet i sekunder. Standard DURATION.slow. */
  duration?: number;
};

/**
 * Toner inn elementer når de scrolles til syne. Returnerer en oppryddingsfunksjon (til useEffect).
 *
 *   useEffect(() => reveal(ref.current!, { preset: "fade" }), []);
 *   useEffect(() => reveal(listRef.current!.children, { stagger: 0.08 }), []);
 */
export function reveal(targets: Targets, options: RevealOptions = {}) {
  const { preset = "slideUp", delay = 0, stagger: step = STAGGER, duration = DURATION.slow } = options;
  const distance = motionDistance();

  return whenRevealed(targets, preset, (batch) => {
    const controls = animate(batch, presetKeyframes(preset, distance) as Parameters<typeof animate>[1], {
      duration,
      ease: EASE,
      // Elementer som kommer til syne samtidig, kommer etter hverandre.
      delay: (i: number) => delay + i * step,
    });
    // Animasjonen holder første bilde mens den venter (fill: both), så det skjulte
    // utgangspunktet kan tas bort med en gang uten at noe blinker.
    for (const el of batch) delete el.dataset.motionPending;
    controls.then(() => {
      for (const el of batch) {
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
      }
    });
  });
}

/**
 * Som reveal, men selve bevegelsen står i CSS: [data-motion-pending="css"] beskriver det skjulte
 * utgangspunktet, og en CSS-overgang tar elementet til ferdig tilstand når merket fjernes.
 * Brukes til effekter som klipping av bilder (se demo-motion.css).
 */
export function revealWithCss(targets: Targets, { stagger: step = STAGGER } = {}) {
  return whenRevealed(targets, "css", (batch) => {
    batch.forEach((el, i) => {
      if (step > 0 && i > 0) el.style.transitionDelay = `${Math.round(i * step * 1000)}ms`;
      delete el.dataset.motionPending;
    });
  });
}
