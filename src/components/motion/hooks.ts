"use client";

import { useCallback, useSyncExternalStore } from "react";
import { REDUCED_MOTION, SMALL_SCREEN } from "@/lib/motion/presets";

/** Følger en mediespørring. På serveren (og før hydrering) er svaret alltid false. */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** true når brukeren har bedt om redusert bevegelse. Da skal ingenting bevege seg. */
export const useReducedMotion = () => useMediaQuery(REDUCED_MOTION);

/** true på telefoner (under 768 px). Bruk det til å korte ned eller skru av tunge effekter. */
export const useIsSmallScreen = () => useMediaQuery(SMALL_SCREEN);
