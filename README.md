# Senay Web Studio

Nettsiden til [senaywebstudio.no](https://senaywebstudio.no) – Next.js (App Router), TypeScript og Tailwind CSS, klar for Vercel.

## Kom i gang

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Struktur

- `src/content/site.ts` – **all tekst og alle priser** på ett sted.
- `src/app/` – sidene: forside (`page.tsx`), `tjenester`, `prosess`, `priser`, `om`, `kontakt`, `personvern` og `not-found`.
- `src/app/layout.tsx` – felles meny (`Header`) og bunn (`Footer`) for alle sider.
- `src/components/` – gjenbrukbare deler: `PageHero`, `PricingCards`, `Faq`, `CtaBand`, `Reveal` (inntoning), `Logo`.
- `src/lib/ui.ts` – felles knapper og marger. `src/lib/meta.ts` – tittel og beskrivelse per side.
- `public/brand/` – logofilene (navy/krem, liggende, monogram, app-ikoner). Navy #071630 · Krem #FAF8F5.

## Før lansering

- [ ] Bekreft e-postadresse (`site.email`) og legg inn org.nr. (`site.orgNr`)
- [ ] Les gjennom personvernsiden (`src/app/personvern/page.tsx`)
- [ ] Kontaktskjemaet åpner e-postprogrammet (mailto). Koble til et skjema-API ved behov.
- [ ] Koble domenet `senaywebstudio.no` i Vercel

## Deploy

Importer repoet i Vercel – ingen ekstra konfigurasjon trengs.
