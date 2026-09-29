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

- `src/content/site.ts` – **all tekst**, e-post, pakker og priser. Felt merket `TODO` må fylles inn.
- `src/app/page.tsx` – forsiden (hero, tjenester, prosess, pakker, om, kontakt).
- `src/components/` – header, logo, kontaktskjema m.m.
- `src/app/opengraph-image.tsx`, `robots.ts`, `sitemap.ts`, `icon.svg` – metadata og deling.
- `public/brand/` – logofilene (navy/krem, liggende, monogram, app-ikoner). Navy #071630 · Krem #FAF8F5.

## Før lansering

- [ ] Fyll inn priser (`price: null` → f.eks. `"9 900"`) i `src/content/site.ts`
- [ ] Bekreft e-postadresse (`site.email`)
- [ ] Kontaktskjemaet åpner e-postprogrammet (mailto). Koble til et skjema-API ved behov.
- [ ] Koble domenet `senaywebstudio.no` i Vercel

## Deploy

Importer repoet i Vercel – ingen ekstra konfigurasjon trengs.
