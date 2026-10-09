import { generatedDemoPhotos } from "./demo-photos.generated";

// Bildene til eksempelsidene. Legg filene i public/demo/ – kartet lages automatisk
// av scripts/demo-photos.mjs før bygg. Uten bilder vises illustrasjonen som før.
//   <slug>-hero.jpg    16:9  toppbildet
//   <slug>-om.jpg      4:5   ved «Om oss»
//   <slug>-detalj.jpg  1:1   ved tjenester og priser

export type DemoPhotos = { hero?: string; om?: string; detalj?: string };

export const demoPhotos: Partial<Record<string, DemoPhotos>> = generatedDemoPhotos;

/** Bransjer med mørk, filmatisk stemning: toppbildet dekker hele flaten og teksten står oppå. */
export const bleedHero = new Set([
  "barber",
  "massasje",
  "treningssenter",
  "restaurant",
  "catering",
  "tomrer",
  "taktekker",
  "advokat",
  "fotograf",
  "bilverksted",
]);
