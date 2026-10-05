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

## AI-chat

«Spør oss»-boblen nederst til høyre er en AI-assistent som bruker Claude (Opus 5.5).

- `src/components/ChatWidget.tsx` – chatvinduet. `src/app/api/chat/route.ts` – API-ruten som strømmer svaret.
- `src/lib/chat-prompt.ts` – instruksjonene til assistenten. De bygges fra innholdet i `src/content/`, så pris, prosess og FAQ alltid er de samme som på sidene.
- Krever miljøvariabelen `ANTHROPIC_API_KEY` (se `.env.example`). Lokalt: legg den i `.env.local`. På Vercel: Settings → Environment Variables (Production og Preview). Uten nøkkel viser chatten en melding med lenke til kontaktsiden.
- Sett en månedlig utgiftsgrense i Anthropic Console.

## Før lansering

- [ ] Bekreft e-postadresse (`site.email`) og legg inn org.nr. (`site.orgNr`) i `src/content/shared.ts`
- [ ] Les gjennom personvernsiden (`src/app/personvern/page.tsx`)
- [ ] Kontaktskjemaet åpner e-postprogrammet (mailto). Koble til et skjema-API ved behov.
- [ ] Koble domenet `senaystudio.no` i Vercel
- [ ] Legg inn `ANTHROPIC_API_KEY` i Vercel for AI-chatten

## Deploy

Importer repoet i Vercel – ingen ekstra konfigurasjon trengs.
