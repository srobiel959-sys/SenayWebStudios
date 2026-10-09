// Finner bildene til eksempelsidene i public/demo/ og skriver et kart over dem til
// src/content/demo-photos.generated.ts. Kjøres automatisk før bygg (prebuild/predev),
// så nye bilder dukker opp bare ved å legge filene i mappa.
//
// Filnavn: <slug>-hero.jpg (16:9), <slug>-om.jpg (4:5), <slug>-detalj.jpg (1:1).
// .jpg, .jpeg, .png og .webp fungerer.

import { existsSync, readdirSync, writeFileSync } from "node:fs";

const dir = "public/demo";
const out = "src/content/demo-photos.generated.ts";
const pattern = /^([a-z0-9]+)-(hero|om|detalj)\.(jpe?g|png|webp)$/i;

const photos = {};
if (existsSync(dir)) {
  for (const file of readdirSync(dir).sort()) {
    const match = file.match(pattern);
    if (!match) continue;
    const [, slug, kind] = match;
    photos[slug.toLowerCase()] ??= {};
    photos[slug.toLowerCase()][kind.toLowerCase()] = `/demo/${file}`;
  }
}

const body = JSON.stringify(photos, null, 2);
writeFileSync(
  out,
  `// Generert av scripts/demo-photos.mjs – ikke rediger for hånd.\n\nexport const generatedDemoPhotos: Record<string, { hero?: string; om?: string; detalj?: string }> = ${body};\n`,
);
console.log(`demo-photos: ${Object.keys(photos).length} eksempler med bilder`);
