// Felles for begge språk.

export const site = {
  name: "Senay Studio",
  url: "https://senaystudio.no",
  email: "post@senaystudio.no",
  // TODO: Legg inn organisasjonsnummer, f.eks. "123 456 789".
  orgNr: null as string | null,
};

/** Løftet om leveringstid: gratis utkast innen så mange virkedager. Brukes i all tekst. */
export const draftDays = 3;

/** Målte Lighthouse-tall for forsiden (mobil). Mål på nytt før tallene endres – vis aldri gjettede tall. */
export const lighthouse = {
  measured: "2026-11-08",
  scores: { performance: 90, accessibility: 100, bestPractices: 100, seo: 100 },
};

// Låste priser: kunden betaler akkurat det som står.
export const prices = {
  website: "4 599",
  hosting: "799",
};
