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
  { href: "#hvorfor", label: "Hvorfor nettside" },
  { href: "#tjenester", label: "Tjenester" },
  { href: "#pakker", label: "Priser" },
  { href: "#sporsmal", label: "Spørsmål" },
  { href: "#kontakt", label: "Kontakt" },
];

export const hero = {
  eyebrow: "Nettsider for bedrifter",
  title: "Kundene dine leter etter deg på nett. Finner de deg?",
  lead: "Før noen ringer deg, googler de deg. Senay Web Studio lager raske, profesjonelle nettsider som gjør at kundene finner deg, stoler på deg og tar kontakt – til fast pris, med én fast kontaktperson hele veien.",
  primaryCta: { href: "#kontakt", label: "Få en uforpliktende prat" },
  secondaryCta: { href: "#pakker", label: "Se prisene" },
  points: [
    "Fast pris: 4 599 kr",
    "Tilpasset mobil og PC",
    "Vi tar oss av det tekniske",
  ],
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
      text: "En ryddig, profesjonell nettside viser at bedriften er seriøs. Et dårlig eller manglende førsteinntrykk koster deg kunder du aldri får vite om.",
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
  cta: { href: "#kontakt", label: "Jeg vil bli funnet" },
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
      text: "Vi kan ta oss av hosting, oppdateringer og små endringer, så du kan bruke tiden på det du er best på.",
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

// Priser i kroner. TODO: Bekreft om prisene er inkl. mva., eks. mva., eller om firmaet
// ikke er mva.-registrert, og legg det eventuelt til i «note».
export const pricing: {
  eyebrow: string;
  title: string;
  lead: string;
  note: string;
  packages: {
    name: string;
    price: string | null;
    period: string;
    perDay?: string;
    description: string;
    features: string[];
    highlighted: boolean;
  }[];
} = {
  eyebrow: "Priser",
  title: "Én fast pris. Ingen overraskelser.",
  lead: "Én ny kunde kan være nok til å betale for hele nettsiden. Du vet nøyaktig hva du betaler før vi starter.",
  note: "Fast pris avtales før arbeidet starter. Trenger du noe utover pakkene, lager vi et tilpasset tilbud.",
  packages: [
    {
      name: "Nettside",
      price: "4 599",
      period: "engangspris",
      description: "En komplett, profesjonell nettside for bedriften din – designet og bygget for deg.",
      features: [
        "Skreddersydd design i dine farger",
        "Tilpasset mobil, nettbrett og PC",
        "Kontaktskjema",
        "Grunnleggende søkemotoroptimalisering",
        "Opplæring i å oppdatere innhold",
      ],
      highlighted: true,
    },
    {
      name: "Drift",
      price: "799",
      period: "per måned",
      perDay: "Under 27 kr om dagen",
      description: "Vi holder nettsiden oppe, trygg og oppdatert, så du kan fokusere på kundene.",
      features: [
        "Hosting",
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

export const faq = {
  eyebrow: "Spørsmål",
  title: "Det du lurer på.",
  items: [
    {
      q: "Holder det ikke med Facebook eller Instagram?",
      a: "Sosiale medier er fint i tillegg, men du eier ikke profilen, og algoritmen bestemmer hvem som ser innleggene dine. Mange kunder søker på Google, ikke på Facebook. En nettside er stedet du selv styrer, og som kundene finner når de leter.",
    },
    {
      q: "Jeg er ikke teknisk. Klarer jeg dette?",
      a: "Ja. Vi tar oss av alt det tekniske, og du får opplæring i å oppdatere innholdet selv. Har du Drift, gjør vi små endringer for deg.",
    },
    {
      q: "Hva koster det?",
      a: "Nettsiden koster 4 599 kr én gang. Vil du at vi drifter den, koster det 799 kr per måned. Prisen avtales før vi starter, så du slipper overraskelser.",
    },
    {
      q: "Hva trenger dere fra meg?",
      a: "Litt om bedriften din, hva du tilbyr, og logo og bilder hvis du har det. Resten finner vi ut av sammen i den første samtalen.",
    },
    {
      q: "Hvordan kommer vi i gang?",
      a: "Send en melding i skjemaet under eller på e-post. Da tar vi en uforpliktende prat om hva du trenger, og du får et konkret forslag med fast pris.",
    },
  ],
};

export const contact = {
  eyebrow: "Kontakt",
  title: "Klar for å bli funnet?",
  lead: "Fortell kort om bedriften din og hva du trenger. Så tar vi kontakt for en uforpliktende prat.",
};
