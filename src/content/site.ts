// Alt innhold på nettsiden samlet på ett sted, så det er enkelt å oppdatere.
// Felter merket «TODO» må bekreftes før lansering.

export const site = {
  name: "Senay Web Studio",
  url: "https://senaywebstudio.no",
  // TODO: Bytt til riktig e-postadresse.
  email: "post@senaywebstudio.no",
  // TODO: Legg inn organisasjonsnummer, f.eks. "123 456 789".
  orgNr: null as string | null,
  tagline: "Nettsider for bedrifter",
  description:
    "Senay Web Studio lager raske, profesjonelle nettsider for bedrifter. Fast pris: 4 599 kr for nettside og 799 kr i måneden for drift.",
  locale: "nb_NO",
};

export const nav = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/prosess", label: "Prosess" },
  { href: "/priser", label: "Priser" },
  { href: "/om", label: "Om" },
  { href: "/kontakt", label: "Kontakt" },
];

// ---------------------------------------------------------------------------
// Priser. Låst: kunden betaler akkurat det som står.
// ---------------------------------------------------------------------------

export const prices = {
  website: "4 599",
  hosting: "799",
  hostingPerDay: "Under 27 kr om dagen",
};

export const packages: {
  name: string;
  price: string;
  period: string;
  perDay: string | null;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}[] = [
  {
    name: "Nettside",
    price: prices.website,
    period: "engangspris",
    perDay: null,
    description: "En komplett, profesjonell nettside for bedriften din – designet og bygget for deg.",
    features: [
      "Skreddersydd design i dine farger",
      "Tilpasset mobil, nettbrett og PC",
      "Kontaktskjema",
      "Grunnleggende søkemotoroptimalisering",
      "Opplæring i å oppdatere innhold",
    ],
    cta: "Bestill nettside",
    highlighted: true,
  },
  {
    name: "Drift",
    price: prices.hosting,
    period: "per måned",
    perDay: prices.hostingPerDay,
    description: "Vi holder nettsiden oppe, trygg og oppdatert, så du kan fokusere på kundene.",
    features: ["Hosting", "Sikkerhetsoppdateringer", "Små endringer ved behov", "Fast kontaktperson"],
    cta: "Legg til drift",
    highlighted: false,
  },
];

export const included = {
  title: "Hva er inkludert?",
  rows: [
    { feature: "Skreddersydd design", website: true, hosting: false },
    { feature: "Tilpasset mobil, nettbrett og PC", website: true, hosting: false },
    { feature: "Kontaktskjema", website: true, hosting: false },
    { feature: "Grunnleggende søkemotoroptimalisering", website: true, hosting: false },
    { feature: "Opplæring i å oppdatere innhold", website: true, hosting: false },
    { feature: "Hosting", website: false, hosting: true },
    { feature: "Sikkerhetsoppdateringer", website: false, hosting: true },
    { feature: "Små endringer ved behov", website: false, hosting: true },
    { feature: "Fast kontaktperson", website: true, hosting: true },
  ],
};

// ---------------------------------------------------------------------------
// Forside
// ---------------------------------------------------------------------------

export const hero = {
  eyebrow: "Nettsider for bedrifter",
  title: "Kundene dine leter etter deg på nett.",
  titleAccent: "Finner de deg?",
  lead: "Før noen ringer deg, googler de deg. Vi lager raske, profesjonelle nettsider som gjør at kundene finner deg, stoler på deg og tar kontakt.",
  primaryCta: { href: "/kontakt", label: "Få en uforpliktende prat" },
  secondaryCta: { href: "/priser", label: "Se prisene" },
  points: [`Nettside ${prices.website} kr`, `Drift ${prices.hosting} kr/mnd`, "Én fast kontaktperson"],
};

export const why = {
  eyebrow: "Hvorfor nettside",
  title: "En nettside er ikke pynt. Den er din beste selger.",
  lead: "Folk sjekker bedrifter på nett før de handler. Står du ikke der, velger de noen som gjør det.",
  items: [
    {
      title: "Kundene søker før de ringer",
      text: "Når noen trenger det du tilbyr, begynner de på Google. Uten en nettside er det konkurrentene dine som blir funnet.",
    },
    {
      title: "Tillit på sekunder",
      text: "En ryddig, profesjonell nettside viser at bedriften er seriøs. Et dårlig førsteinntrykk koster deg kunder du aldri får vite om.",
    },
    {
      title: "Åpent døgnet rundt",
      text: "Nettsiden svarer på spørsmål og tar imot henvendelser mens du jobber, sover eller har ferie.",
    },
    {
      title: "Din egen plattform",
      text: "Facebook og Instagram eies av andre, og algoritmen bestemmer hvem som ser deg. På din egen nettside er det du som bestemmer.",
    },
  ],
};

export const comparison = {
  eyebrow: "Forskjellen",
  title: "Uten nettside og med nettside.",
  without: {
    title: "Uten nettside",
    items: [
      "Kundene finner konkurrenten din på Google",
      "Du virker mindre seriøs enn du er",
      "Informasjonen er spredt og vanskelig å finne",
      "Du går glipp av henvendelser utenfor arbeidstid",
    ],
  },
  with: {
    title: "Med nettside fra Senay Web Studio",
    items: [
      "Du dukker opp når kundene søker",
      "Et profesjonelt førsteinntrykk hver gang",
      "Tjenester, priser og kontaktinfo samlet ett sted",
      "Nye henvendelser døgnet rundt",
    ],
  },
};

// ---------------------------------------------------------------------------
// Tjenester
// ---------------------------------------------------------------------------

export const services = {
  eyebrow: "Tjenester",
  title: "Alt du trenger for en god nettside, samlet ett sted.",
  lead: "Vi tar hele jobben – fra første skisse til en nettside som er oppe, trygg og oppdatert. Du slipper å koordinere flere leverandører.",
  items: [
    {
      title: "Design",
      text: "Et visuelt uttrykk som passer bedriften din. Typografi, farger og struktur som gjør det lett for besøkende å forstå hva du tilbyr – og får dem til å ta kontakt.",
      includes: ["Design i dine farger og din stil", "Tydelig struktur og navigasjon", "Tilpasset mobil, nettbrett og PC"],
    },
    {
      title: "Utvikling",
      text: "Moderne teknologi som gir raske sider, god sikkerhet og en løsning som fungerer like godt på alle skjermer.",
      includes: ["Rask innlasting", "Kontaktskjema", "Opplæring i å oppdatere innhold"],
    },
    {
      title: "Synlighet i søk",
      text: "En solid teknisk grunnmur for søkemotorer, så kundene finner deg når de leter etter det du tilbyr.",
      includes: ["Riktig struktur og metadata", "Bilde og tekst når siden deles", "Grunnleggende søkemotoroptimalisering"],
    },
    {
      title: "Drift",
      text: "Vi holder nettsiden oppe, trygg og oppdatert, og tar oss av små endringer, så du kan bruke tiden på det du er best på.",
      includes: ["Hosting", "Sikkerhetsoppdateringer", "Små endringer ved behov"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Prosess
// ---------------------------------------------------------------------------

export const process = {
  eyebrow: "Prosess",
  title: "En enkel og forutsigbar vei fra idé til ferdig nettside.",
  lead: "Du vet hele tiden hva som skjer, hva som er neste steg, og hva det koster.",
  steps: [
    {
      title: "Samtale",
      text: "Vi starter med en uforpliktende prat om bedriften din, målene dine og hva nettsiden skal oppnå.",
      you: "Forteller om bedriften og hva du trenger.",
      we: "Lytter, stiller spørsmål og gir ærlige råd.",
    },
    {
      title: "Forslag",
      text: "Du får et konkret forslag med innhold og struktur – til fast pris, før noe arbeid settes i gang.",
      you: "Sier ja, eller ber om justeringer.",
      we: "Lager forslaget og svarer på alt du lurer på.",
    },
    {
      title: "Design og utvikling",
      text: "Vi lager design og bygger siden. Du får se underveis og gi tilbakemeldinger før vi går videre.",
      you: "Sender tekst, logo og bilder, og gir tilbakemeldinger.",
      we: "Designer, bygger og tester på mobil og PC.",
    },
    {
      title: "Lansering",
      text: "Vi publiserer siden og viser deg hvordan du oppdaterer den. Med Drift tar vi oss av resten.",
      you: "Deler nettsiden med kundene dine.",
      we: "Publiserer, lærer deg opp og holder siden oppdatert.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Om
// ---------------------------------------------------------------------------

export const about = {
  eyebrow: "Om oss",
  title: "Et lite studio med stor omtanke for detaljene.",
  paragraphs: [
    "Senay Web Studio hjelper bedrifter med å fremstå profesjonelt på nett. Vi mener en god nettside skal være rask, enkel å bruke og tydelig på hva du tilbyr – ikke full av unødvendige funksjoner.",
    "Når du jobber med oss, snakker du direkte med den som designer og bygger siden din. Det gir korte beslutningsveier, ærlige råd og en løsning som er tilpasset akkurat din bedrift.",
  ],
  values: [
    { title: "Personlig", text: "Én fast kontaktperson fra første samtale til lansering – og etterpå." },
    { title: "Ærlig", text: "Fast pris og tydelige avtaler. Prisen du ser er prisen du betaler." },
    { title: "Grundig", text: "Hastighet, tilgjengelighet og kvalitet i hver detalj." },
  ],
};

// ---------------------------------------------------------------------------
// Spørsmål
// ---------------------------------------------------------------------------

export const faqGeneral = [
  {
    q: "Holder det ikke med Facebook eller Instagram?",
    a: "Sosiale medier er fint i tillegg, men du eier ikke profilen, og algoritmen bestemmer hvem som ser innleggene dine. Mange kunder søker på Google, ikke på Facebook. En nettside er stedet du selv styrer, og som kundene finner når de leter.",
  },
  {
    q: "Jeg er ikke teknisk. Klarer jeg dette?",
    a: "Ja. Vi tar oss av alt det tekniske, og du får opplæring i å oppdatere innholdet selv. Har du Drift, gjør vi små endringer for deg.",
  },
  {
    q: "Hva trenger dere fra meg?",
    a: "Litt om bedriften din, hva du tilbyr, og logo og bilder hvis du har det. Resten finner vi ut av sammen i den første samtalen.",
  },
  {
    q: "Hvordan kommer vi i gang?",
    a: "Send en melding via kontaktsiden eller på e-post. Da tar vi en uforpliktende prat om hva du trenger, og du får et konkret forslag.",
  },
];

export const faqPricing = [
  {
    q: "Hva koster det?",
    a: `Nettsiden koster ${prices.website} kr én gang. Vil du at vi drifter den, koster det ${prices.hosting} kr per måned.`,
  },
  {
    q: "Kommer det noe i tillegg?",
    a: "Nei. Prisen du ser er prisen du betaler. Trenger du noe utover pakkene, får du et eget tilbud med fast pris før vi starter – og du bestemmer selv om du vil ha det.",
  },
  {
    q: "Hva er forskjellen på Nettside og Drift?",
    a: "Nettside er selve jobben: design, utvikling og lansering, betalt én gang. Drift er det som skjer etterpå: hosting, sikkerhetsoppdateringer og små endringer, betalt månedlig.",
  },
  {
    q: "Hva om jeg vil endre noe senere?",
    a: "Du kan oppdatere innholdet selv etter opplæringen. Med Drift gjør vi små endringer for deg. Større endringer avtaler vi en fast pris for på forhånd.",
  },
];

// ---------------------------------------------------------------------------
// Kontakt
// ---------------------------------------------------------------------------

export const contact = {
  eyebrow: "Kontakt",
  title: "Klar for å bli funnet?",
  lead: "Fortell kort om bedriften din og hva du trenger. Så tar vi kontakt for en uforpliktende prat.",
  nextSteps: [
    { title: "Du sender en melding", text: "Via skjemaet eller på e-post – et par setninger holder." },
    { title: "Vi tar kontakt", text: "Vi avtaler en uforpliktende prat om hva du trenger." },
    { title: "Du får et forslag", text: "Konkret innhold, struktur og fast pris – før noe arbeid starter." },
  ],
};

export const cta = {
  title: "Klar for en nettside som jobber for deg?",
  lead: `Nettside ${prices.website} kr. Drift ${prices.hosting} kr/mnd. Ingen overraskelser.`,
  primary: { href: "/kontakt", label: "Få en uforpliktende prat" },
  secondary: { href: "/priser", label: "Se hva som er inkludert" },
};
