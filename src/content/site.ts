// Alt innhold på nettsiden samlet på ett sted, så det er enkelt å oppdatere.
// Felter merket «TODO» må fylles inn før lansering.

export const site = {
  name: "Senay Web Studio",
  url: "https://senaywebstudio.no",
  // TODO: Bytt til riktig e-postadresse.
  email: "post@senaywebstudio.no",
  description:
    "Senay Web Studio lager raske, moderne og brukervennlige nettsider for små bedrifter – med tydelig prosess, fast pris og personlig oppfølging.",
  locale: "nb_NO",
};

export const nav = [
  { href: "#tjenester", label: "Tjenester" },
  { href: "#prosess", label: "Prosess" },
  { href: "#pakker", label: "Pakker" },
  { href: "#om", label: "Om" },
  { href: "#kontakt", label: "Kontakt" },
];

export const hero = {
  eyebrow: "Webbyrå for små bedrifter",
  title: "Nettsider som er raske, ryddige og laget for å gi deg kunder.",
  lead: "Vi designer og utvikler moderne nettsider for små bedrifter som vil fremstå profesjonelt på nett – uten unødvendig kompleksitet, og med én fast kontaktperson hele veien.",
  primaryCta: { href: "#kontakt", label: "Be om et tilbud" },
  secondaryCta: { href: "#pakker", label: "Se pakkene" },
  points: [
    "Skreddersydd design",
    "Rask på mobil og data",
    "Enkel å oppdatere",
  ],
};

export const services = {
  eyebrow: "Tjenester",
  title: "Alt du trenger for en god nettside, samlet hos oss.",
  items: [
    {
      title: "Design",
      text: "Et visuelt uttrykk som passer bedriften din. Vi jobber med typografi, farger og struktur som gjør det lett for besøkende å forstå hva du tilbyr.",
    },
    {
      title: "Utvikling",
      text: "Moderne teknologi som gir raske sider, god sikkerhet og en løsning som fungerer like godt på mobil, nettbrett og PC.",
    },
    {
      title: "Synlighet i søk",
      text: "Solid teknisk grunnmur for søkemotorer: riktig struktur, metadata, hastighet og innhold som svarer på det kundene dine faktisk søker etter.",
    },
    {
      title: "Drift og videre utvikling",
      text: "Vi kan ta oss av hosting, domene, oppdateringer og små endringer, så du kan bruke tiden på det du er best på.",
    },
  ],
};

export const process = {
  eyebrow: "Prosess",
  title: "En enkel og forutsigbar vei fra idé til ferdig nettside.",
  steps: [
    {
      title: "Samtale",
      text: "Vi starter med en uforpliktende prat om bedriften din, målene dine og hva nettsiden skal oppnå.",
    },
    {
      title: "Forslag og plan",
      text: "Du får et konkret forslag med innhold, struktur, tidsplan og fast pris – før noe arbeid settes i gang.",
    },
    {
      title: "Design og utvikling",
      text: "Vi lager design og bygger siden. Du får se underveis og gi tilbakemeldinger før vi går videre.",
    },
    {
      title: "Lansering",
      text: "Vi tester grundig, publiserer siden og viser deg hvordan du oppdaterer den. Vi er tilgjengelige også etter lansering.",
    },
  ],
};

// TODO: Fyll inn priser. Alle verdier i hakeparentes er plassholdere.
export const pricing = {
  eyebrow: "Pakker",
  title: "Tydelige pakker med fast pris.",
  lead: "Alle pakkene inkluderer responsivt design, grunnleggende søkemotoroptimalisering og opplæring. Trenger du noe annet, lager vi et tilpasset tilbud.",
  note: "Alle priser er oppgitt eks. mva.",
  packages: [
    {
      name: "Start",
      price: "[PRIS]",
      period: "engangspris",
      description: "For deg som trenger en enkel og profesjonell tilstedeværelse på nett.",
      features: [
        "Én side med de viktigste seksjonene",
        "Kontaktskjema",
        "Tilpasset mobil og PC",
        "Grunnleggende søkemotoroptimalisering",
      ],
      highlighted: false,
    },
    {
      name: "Standard",
      price: "[PRIS]",
      period: "engangspris",
      description: "For bedrifter som vil presentere flere tjenester og bygge tillit.",
      features: [
        "Flere undersider",
        "Skreddersydd design",
        "Kontaktskjema og kart",
        "Søkemotoroptimalisering per side",
        "Opplæring i å oppdatere innhold",
      ],
      highlighted: true,
    },
    {
      name: "Drift",
      price: "[PRIS]",
      period: "per måned",
      description: "Løpende hjelp etter lansering, så siden alltid er oppdatert og trygg.",
      features: [
        "Hosting og domene",
        "Sikkerhetsoppdateringer",
        "Små endringer ved behov",
        "Fast kontaktperson",
      ],
      highlighted: false,
    },
  ],
};

export const about = {
  eyebrow: "Om oss",
  title: "Et lite studio med stor omtanke for detaljene.",
  paragraphs: [
    "Senay Web Studio er et lite webbyrå som hjelper små bedrifter med å fremstå profesjonelt på nett. Vi tror at en god nettside skal være rask, enkel å bruke og tydelig på hva du tilbyr – ikke full av unødvendige funksjoner.",
    "Når du jobber med oss, snakker du direkte med den som designer og bygger siden din. Det gir korte beslutningsveier, ærlige råd og en løsning som er tilpasset akkurat din bedrift.",
  ],
  values: [
    { title: "Personlig", text: "Én fast kontaktperson fra første samtale til lansering." },
    { title: "Ærlig", text: "Fast pris og tydelige avtaler – ingen overraskelser." },
    { title: "Grundig", text: "Hastighet, tilgjengelighet og kvalitet i hver detalj." },
  ],
};

export const contact = {
  eyebrow: "Kontakt",
  title: "Klar for en ny nettside?",
  lead: "Fortell kort om bedriften din og hva du trenger, så tar vi kontakt for en uforpliktende prat.",
};
