// Felles for begge språk.

function productionUrl() {
  const host = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return host ? `https://${host.replace(/^https?:\/\//, "").replace(/\/$/, "")}` : "https://senaystudio.no";
}

export const site = {
  name: "Senay Studio",
  // Den ekte adressen kommer fra Vercel: kortest mulige produksjonsdomene, altså senaywebstudios.vercel.app
  // til senaystudio.no er koblet til, og deretter senaystudio.no. Brukes til delingsbilder, sidekart og Google.
  url: productionUrl(),
  email: "post@senaystudio.no",
  // TODO: Legg inn organisasjonsnummer, f.eks. "123 456 789".
  orgNr: null as string | null,
};

/** Løftet om leveringstid: gratis utkast innen så mange virkedager. Brukes i all tekst. */
export const draftDays = 3;

/** Målte Lighthouse-tall for forsiden (mobil). Mål på nytt før tallene endres – vis aldri gjettede tall. */
export const lighthouse = {
  measured: "2026-11-15",
  scores: { performance: 90, accessibility: 100, bestPractices: 100, seo: 100 },
};

// Låste priser: kunden betaler akkurat det som står.
export const prices = {
  website: "4 599",
  hosting: "799",
};

/** Samme priser skrevet på engelsk: «4,599» i stedet for «4 599». */
export const pricesEn = {
  website: prices.website.replace(/\s/g, ","),
  hosting: prices.hosting.replace(/\s/g, ","),
};
