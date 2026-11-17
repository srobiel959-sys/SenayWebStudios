# CLAUDE.md – Senay Studio

Les denne filen først i hver økt. Next.js-reglene (les dokumentasjonen i `node_modules/next/dist/docs/` før du skriver kode) står i @AGENTS.md. Oppbygningen av prosjektet står i README.md.

## Låste regler

- **Aldri push til `main`.** Jobb på en egen gren. Lag pull request bare når eieren ber om det, og merge aldri uten et klart ja.
- **Spør først** før alt som koster penger, krever en konto eller API-nøkkel, eller publiserer noe (gå live, sende lenker ut, endringer i produksjon på Vercel).
- Siden går ikke live før eieren sier fra («not going live before I'm 100% locked in»).
- Receptria skal ikke røres.
- Logofilene i `public/brand/` er endelige. Brand-kit: la det være.
- Ingen oppdiktede anmeldelser, tall eller kundelogoer.
- Chatten heter «assistent», ikke AI.
- Aldri modell-ID i commits, PR-er eller kode.
- Eierens e-postadresse er privat.

## Verktøy

MCP-serverne står i `.mcp.json` og er slått på i `.claude/settings.json`. De lastes når en økt starter.

| Verktøy | Hva det gir | Merk |
|---|---|---|
| **playwright** (`@playwright/mcp`, låst versjon i `scripts/playwright-mcp.sh`) | Se resultatet: `browser_navigate`, `browser_resize` (390×844 = mobil, 1440×900 = PC), `browser_take_screenshot`, `browser_evaluate`, `browser_console_messages`, `browser_emulate_media` (redusert bevegelse) | Bruker Chromium i `/opt/pw-browsers` med `--no-sandbox` (vi kjører som root). Test uten Claude: `scripts/playwright-mcp.sh --port 8931` |
| **context7** (`https://mcp.context7.com/mcp`) | Oppdatert dokumentasjon for Motion, React, Tailwind osv.: `resolve-library-id`, så `query-docs` | Den delte gratiskvoten er brukt opp. Trenger en gratis nøkkel fra context7.com, lagret som nettverkshemmelighet for `mcp.context7.com` (Authorization: Bearer). For Next.js: bruk `node_modules/next/dist/docs/` |
| Figma (connector) | Lese rammer eieren designer | View-sete: bare 6–20 kall i måneden. Bruk sparsomt |
| Vercel (connector) | Utrullinger og logger | Koblet til feil konto (ser bare receptria) til eieren kobler på nytt |
| Bilder | Eksempelsidene: `public/demo/<slug>-hero.jpg` osv. (se README) | Pexels API er valgt (gratis), men venter på nøkkel: header `Authorization: <nøkkel>` uten prefiks for `api.pexels.com`, og `images.pexels.com` må åpnes i nettverket. Last ned og legg bildene i `public/` – aldri lenk direkte. Higgsfield er nesten tom for kreditter |

Lokal testing: `npm run build`, så `npx next start -p 3200`. Stopp gamle servere først (`pkill -f next-server`). En gammel server som fortsatt kjører, viser gammel HTML som peker på filer som ikke finnes lenger, og alle målinger blir feil.

## Bevegelse

Ett felles system for Senay-siden og alle eksempelsidene. Biblioteket er **Motion** (`motion`, låst versjon i `package.json`), men bare de små delene.

| Fil | Innhold |
|---|---|
| `src/lib/motion/presets.ts` | `EASE`, `DURATION` (0.2 / 0.4 / 0.6 s), `DISTANCE` (24 px PC, 12 px mobil), `STAGGER` (0.08 s), presetene `fade`, `slideUp`, `scale` |
| `src/app/globals.css` | De samme verdiene som CSS-variabler (`--motion-ease`, `--motion-fast/base/slow`, `--motion-distance`), Tailwind-klassen `ease-calm`, det skjulte utgangspunktet (`[data-motion-pending]`), sideovergangene og reglene for redusert bevegelse |
| `src/lib/motion/engine.ts` | `reveal()` og `revealWithCss()` – motoren. Henter `motion/mini` (3 kB) først når siden er ferdig lastet |
| `src/lib/motion/parallax.ts` | `parallax()` med `scroll` fra hovedpakken. Lastes bare med `import()` på store skjermer |
| `src/components/motion/` | `Reveal`, `Stagger`, `ScrollParallax`, `PageTransition`, `useReducedMotion`, `useIsSmallScreen`, `useMediaQuery` |
| `src/app/(no)/template.tsx`, `src/app/(en)/en/template.tsx` | Sideovergangene (lages på nytt ved hver navigasjon) |
| `src/components/demo/DemoMotion.tsx` + `demo-motion.css` | Eksempelsidene: merk elementer med `data-motion="rise"`, `"stagger"` eller `"image"` |

### Slik brukes det

```tsx
import { Reveal, Stagger, ScrollParallax } from "@/components/motion";

// Tones inn når det scrolles til syne (standard: slideUp, 600 ms).
<Reveal>…</Reveal>
<Reveal preset="fade" delay={120} className="lg:col-span-7">…</Reveal>

// Barna kommer etter hverandre. Rader i et rutenett kommer samlet, på mobil kort for kort.
<Stagger as="ul" className="grid gap-6 md:grid-cols-3" step={80}>
  {items.map((item) => <li key={item.id}>…</li>)}
</Stagger>

// Rolig parallakse, bare fra 1024 px. Gjør laget litt større enn rammen, så kantene aldri vises.
<div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
  <ScrollParallax amount={20} className="absolute inset-x-0 -inset-y-6">
    <Image src={…} alt="" fill className="object-cover" />
  </ScrollParallax>
</div>
```

- **Toppen av siden** (det første man ser) animeres med CSS, ikke med JavaScript: `.hero-in` + `.hero-in-2/3/4`, `.word-rise` (forsiden), `.dm-rise` + `.dm-d1–d4` (eksempelsidene). De starter på opasitet 0.01, aldri 0, så nettleseren regner innholdet som synlig med en gang (LCP).
- **Egen kode:** `useEffect(() => reveal(el, { preset: "scale" }), [])`. Funksjonen returnerer oppryddingen selv.
- **Sideoverganger** er automatiske for alle lenker (React `<ViewTransition>`). Den gamle siden tones ut på 200 ms, og den nye tones inn og glir 12 px opp på 400 ms. Nettlesere uten støtte bytter side som vanlig.
- **Små overganger** i Tailwind: `transition-… duration-200 ease-calm`. Felles knappeklasser står i `src/lib/ui.ts`.

### Reglene (må holdes)

1. **Rolig, mykt og premium.** Én kurve (`--motion-ease` / `EASE` / `ease-calm`) og tre varigheter.
2. **Aldri sprett.** Ingen kurve eller keyframe går forbi målet og tilbake (ikke `cubic-bezier` med y over 1, ingen `scale(1.08)` på vei til 1). Feilristingen i skjemaet (`.shake`) er det eneste unntaket.
3. **Siden ser ferdig ut uten animasjon.** Serveren viser alt. Bare innhold under skjermkanten skjules, og bare av JavaScript (`data-motion-pending`). Uten JavaScript, ved utskrift og ved redusert bevegelse vises alt.
4. **`prefers-reduced-motion`: ingenting beveger seg.** Hver ny CSS-animasjon skal ha `motion-reduce:` eller en linje i reduced-motion-blokken i `globals.css`. Også løkker som `animate-pulse`.
5. **Mobil:** kortere avstand (12 px), ingen parallakse, mindre zoom.
6. **Lighthouse (mobil) skal ikke under 90** på `/`, `/en`, `/priser` og `/demo/frisor`. All JavaScript som lastes ved oppstart, forsinker LCP i målingen, så hver kB teller.
7. **Ingen Motion-kode ved oppstart.** Motoren henter `motion/mini` med `import()` etter at siden er lastet (ingenting animeres før man scroller). Hovedpakken (`import … from "motion"`) bare i filer som lastes med `import()`: Turbopack klarer ikke å fjerne ubrukt kode fra den (målt: 25–54 kB ekstra). Ikke bruk `motion/react` / `<motion.div>` (rundt 43 kB). Statisk `import { animate } from "motion/mini"` kostet 3–4 kB ved oppstart og nok til at forsiden falt under 90.
8. **Toppbildet på en side** (LCP) skal ha `preload`, ikke lazy loading. `DemoSite` har `preloadHero` til dette, bare på selve eksempelsiden.

### Sjekk før du pusher

```bash
npx tsc --noEmit && npm run lint && npm run build
npx next start -p 3200 &
node scripts/motion-check.mjs   # uten JS, redusert bevegelse, alt synlig etter scrolling, parallakse, sideoverganger
```

Lighthouse (mobil): ta median av minst tre kjøringer. Én kjøring svinger ±3–4 poeng. Sammenlign helst gammel og ny versjon vekselvis på to porter.

Målt 17.11.2026 (Lighthouse 13.5, mobil, lokal produksjonsbygg):

| Side | Før bevegelsessystemet | Etter |
|---|---|---|
| `/` | 89–91 | 91 |
| `/en` | 90–91 | 90–93 |
| `/priser` | 94 | 93 |
| `/demo/frisor` | 91 | 91 |

JavaScript ved oppstart: +0,9–1,5 kB gzip per side (174,4 → 175,9 kB på forsiden).
