# Senay Studio

Nettsiden til [senaystudio.no](https://senaystudio.no) – Next.js (App Router), TypeScript og Tailwind CSS, klar for Vercel.

## Kom i gang

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Struktur

- **To språk:** norsk på `/`, engelsk på `/en`. Hvert språk har sin egen rot-layout (`src/app/(no)` og `src/app/(en)`), så `<html lang>` alltid er riktig.
- `src/content/no.ts` og `src/content/en.ts` – **all tekst**, med samme oppbygning. `src/content/shared.ts` – e-post, org.nr. og priser.
- `src/content/demos.ts` – de 30 eksempelbedriftene (alle oppdiktet) i demo-galleriet.
- `src/views/` – sidene, skrevet én gang og brukt på begge språk. `src/app/(no|en)/…/page.tsx` er tynne innganger med metadata.
- `src/lib/routes.ts` – adressene på begge språk og språkvelgeren.
- `src/components/` – felles deler: `Header`, `Footer`, `PageHero`, `PricingCards`, `AgencyCompare`, `Faq`, `CtaBand`, `Reveal`, og `demo/` (galleri og eksempelnettside).
- `public/brand/` – logofilene. Navy #071630 · Krem #FAF8F5.

## Bilder til eksempelsidene

Legg bildene i `public/demo/` med disse navnene, så kobles de til automatisk ved neste bygg (`scripts/demo-photos.mjs` kjøres før `dev` og `build`):

- `<slug>-hero.jpg` – toppbildet, liggende 16:9
- `<slug>-om.jpg` – ved «Om oss», stående 4:5
- `<slug>-detalj.jpg` – ved tjenester og priser, kvadratisk 1:1

`<slug>` er bransjen i adressen, f.eks. `frisor`, `pizzeria`, `bilverksted` (se `src/content/demos.ts`). Mangler et bilde, vises illustrasjonen som før. Bransjene i `bleedHero` (`src/content/demo-photos.ts`) får toppbildet over hele flaten med teksten oppå.

## Chat-assistent

«Spør oss»-boblen nederst til høyre er en chat-assistent med ferdige svar – ingen AI, ingen API-nøkkel og ingen kostnad. Alt skjer i nettleseren, og ingenting lagres.

- `src/content/chat-knowledge.ts` – emnene: nøkkelord og svar på norsk og engelsk. Svar om pris, prosess og innhold hentes fra resten av `src/content/`, så de alltid stemmer med sidene. Legg til et emne her for å lære assistenten noe nytt.
- `src/lib/chat-match.ts` – finner emnet som passer best (tåler bøyninger og én skrivefeil). Finner den ingenting, henviser den til kontaktsiden.
- `src/components/ChatWidget.tsx` – chatvinduet.

## Før lansering

- [ ] Bekreft e-postadresse (`site.email`) og legg inn org.nr. (`site.orgNr`) i `src/content/shared.ts`
- [ ] Les gjennom personvernsiden (`src/app/personvern/page.tsx`)
- [ ] Kontaktskjemaet åpner e-postprogrammet (mailto). Koble til et skjema-API ved behov.
- [ ] Koble domenet `senaystudio.no` i Vercel

## Deploy

Importer repoet i Vercel – ingen ekstra konfigurasjon trengs.
