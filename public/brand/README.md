# Logofiler

Legg de endelige logofilene her (f.eks. `logo.svg`, `logo-hvit.svg`, `monogram.svg`).

Til da brukes et midlertidig SVG-wordmark:
- `src/components/Logo.tsx` – logo i header og footer
- `src/app/icon.svg` – favicon

Når ekte filer er på plass: bytt ut innholdet i `Logo.tsx` med `<Image src="/brand/…" />`
og erstatt `src/app/icon.svg`.
