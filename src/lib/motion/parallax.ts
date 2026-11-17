// Rolig parallakse ved scrolling. Egen fil, så scroll-delen av Motion bare lastes når
// ScrollParallax faktisk trengs: på store skjermer og uten «redusert bevegelse».
// Telefoner laster den aldri.

import { scroll } from "motion";
import { animate } from "motion/mini";

/**
 * Flytter `layer` fra +amount til −amount piksler mens `target` passerer skjermen.
 * Bruker nettleserens egen scroll-tidslinje når den finnes (går på skjermkortet).
 */
export function parallax(target: HTMLElement, layer: HTMLElement, amount: number) {
  const controls = animate(
    layer,
    { transform: [`translate3d(0, ${amount}px, 0)`, `translate3d(0, ${-amount}px, 0)`] },
    { ease: "linear", duration: 1 },
  );
  const stop = scroll(controls, { target, offset: ["start end", "end start"] });
  return () => {
    stop();
    controls.cancel();
    layer.style.removeProperty("transform");
  };
}
