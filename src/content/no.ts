// Norsk innhold. Den engelske filen (en.ts) har nøyaktig samme oppbygning.
// Felter merket «TODO» må bekreftes før lansering.

import { prices } from "./shared";

export const no = {
  site: {
    tagline: "Nettsider for bedrifter",
    description:
      "Senay Studio lager raske, profesjonelle nettsider for bedrifter. Vi lager nettsiden gratis – er du fornøyd, betaler du 4 599 kr når den går live og 799 kr/mnd for drift og vedlikehold. Ingen binding.",
    locale: "nb_NO",
  },

  nav: {
    home: "Forside",
    why: "Hvorfor nettside",
    demos: "Eksempler",
    services: "Tjenester",
    process: "Prosess",
    pricing: "Priser",
    about: "Om",
    contact: "Kontakt",
    privacy: "Personvern",
  },

  ui: {
    skipToContent: "Hopp til innhold",
    homeLabel: "Senay Studio – til forsiden",
    mainMenu: "Hovedmeny",
    mobileMenu: "Mobilmeny",
    openMenu: "Åpne meny",
    closeMenu: "Lukk meny",
    requestQuote: "Be om tilbud",
    switchLanguage: "English",
    switchLanguageLabel: "Switch to English",
    readMore: "Les mer",
    getInTouch: "Ta kontakt",
    footerPages: "Sider",
    footerContact: "Kontakt",
    sendInquiry: "Send en henvendelse →",
    footerMenu: "Bunnmeny",
    orgNr: "Org.nr.",
    startHere: "Start her",
    youGet: "Du får",
    you: "Du",
    we: "Vi",
    step: "Steg",
    included: "Inkludert",
    notIncluded: "Ikke inkludert",
    whatsIncluded: "Hva som er inkludert",
    downside: "Ulempe",
    upside: "Fordel",
    kr: "kr",
    perMonthShort: "kr/mnd",
    oneTime: "kr",
    questions: "Spørsmål",
    whatYouWonder: "Det du lurer på.",
  },

  meta: {
    home: { title: "Senay Studio – Nettsider for bedrifter", description: "" },
    why: {
      title: "Hvorfor nettside",
      description:
        "Kundene søker før de ringer. Slik hjelper en profesjonell nettside bedriften din å bli funnet, få tillit og få flere henvendelser.",
    },
    demos: {
      title: "Eksempler",
      description: "Se eksempler på nettsider for rundt 30 bransjer – fra frisør og kafé til elektriker og tømrer.",
    },
    services: {
      title: "Tjenester",
      description:
        "Design, utvikling, synlighet i søk og drift – alt du trenger for en god nettside, samlet hos Senay Studio.",
    },
    process: {
      title: "Prosess",
      description: "Fra første samtale til ferdig nettside i fire tydelige steg – med fast pris før arbeidet starter.",
    },
    pricing: {
      title: "Priser",
      description: `Én pakke: 0 kr for å lage nettsiden, ${prices.website} kr når den går live og ${prices.hosting} kr/mnd for drift og vedlikehold. Ingen binding.`,
    },
    about: {
      title: "Om oss",
      description:
        "Senay Studio er et lite studio som lager raske, profesjonelle nettsider for bedrifter – med én fast kontaktperson hele veien.",
    },
    contact: {
      title: "Kontakt",
      description: "Fortell kort om bedriften din, så tar vi kontakt for en uforpliktende prat om ny nettside.",
    },
    privacy: { title: "Personvern", description: "Slik behandler Senay Studio personopplysninger." },
  },

  // -------------------------------------------------------------------------
  // Forside
  // -------------------------------------------------------------------------
  hero: {
    eyebrow: "Nettsider for bedrifter",
    title: "Kundene dine leter etter deg på nett.",
    titleAccent: "Finner de deg?",
    lead: "Før noen ringer deg, googler de deg. Vi lager raske, profesjonelle nettsider som gjør at kundene finner deg, stoler på deg og tar kontakt.",
    primaryCta: "Få et gratis forslag",
    secondaryCta: "Se eksempler",
    points: ["0 kr for å lage nettsiden", `${prices.website} kr når den går live`, `${prices.hosting} kr/mnd for drift`, "Ingen binding"],
  },

  explore: {
    eyebrow: "Utforsk",
    title: "Alt du trenger å vite, én side om gangen.",
    lead: "Les deg opp i ditt eget tempo – eller gå rett til prisene.",
    items: [
      { key: "why", title: "Hvorfor nettside", text: "Hva en nettside gjør for bedriften din – og hva det koster å ikke ha en." },
      { key: "services", title: "Tjenester", text: "Design, utvikling, synlighet i søk og drift. Alt samlet ett sted." },
      { key: "process", title: "Prosess", text: "Fire tydelige steg fra første samtale til ferdig nettside." },
      {
        key: "pricing",
        title: "Priser",
        text: `Én pakke: 0 kr for å lage nettsiden, ${prices.website} kr når den går live og ${prices.hosting} kr/mnd for drift.`,
      },
      { key: "about", title: "Om oss", text: "Et lite studio med én fast kontaktperson hele veien." },
      { key: "contact", title: "Kontakt", text: "Fortell kort hva du trenger, så tar vi en uforpliktende prat." },
    ],
  },

  // -------------------------------------------------------------------------
  // Eksempler (demo-galleri)
  // -------------------------------------------------------------------------
  demos: {
    eyebrow: "Eksempler",
    title: "Se hvordan nettsiden din kan bli.",
    lead: "Velg bransjen din og se et eksempel. Alle bedriftene er oppdiktet – nettsiden din lages alltid fra bunnen av for deg.",
    all: "Alle",
    open: "Åpne i full størrelse",
    choose: "Velg bransje",
    showing: "Viser eksempel for",
    fictional: "Eksempel – fiktiv bedrift",
    allExamples: "Se alle eksempler",
    bannerText: "Dette er et eksempel laget av Senay Studio. Bedriften er oppdiktet.",
    bannerCta: "Vil du ha en slik nettside?",
    backToExamples: "← Alle eksempler",
    count: "bransjer",
  },

  // -------------------------------------------------------------------------
  // Andre byråer mot oss
  // -------------------------------------------------------------------------
  agencies: {
    eyebrow: "Hvorfor oss",
    title: "Slik er det ofte hos byråer. Slik gjør vi det.",
    others: {
      label: "Andre byråer",
      title: "Slik gjøres det ofte",
      items: [
        "Titusenvis av kroner i forskudd før du ser noe",
        "Uker med venting",
        "Du betaler før du vet om det blir bra",
        "Bindingstid og lange kontrakter",
        "Byrået eier ofte nettsiden din",
      ],
    },
    us: {
      label: "Senay Studio",
      title: "Slik gjør vi det",
      items: [
        "0 kr i oppstart – helt uforpliktende",
        "Første forslag på få dager",
        "Du ser resultatet før du betaler",
        "Ingen binding, ingen skjulte gebyrer",
        "Du eier nettside, domene og innhold",
      ],
    },
    note: `Vi lager nettsiden helt gratis. Er du fornøyd, betaler du ${prices.website} kr når den går live og ${prices.hosting} kr/mnd for drift – ikke før.`,
    cta: "Få et gratis forslag",
  },

  // -------------------------------------------------------------------------
  // Hvorfor nettside
  // -------------------------------------------------------------------------
  why: {
    eyebrow: "Hvorfor nettside",
    title: "En nettside er ikke pynt. Den er din beste selger.",
    lead: "Folk sjekker bedrifter på nett før de handler. Står du ikke der, velger de noen som gjør det.",
    reasonsHeading: "Fire grunner",
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
  },

  comparison: {
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
      title: "Med nettside fra Senay Studio",
      items: [
        "Du dukker opp når kundene søker",
        "Et profesjonelt førsteinntrykk hver gang",
        "Tjenester, priser og kontaktinfo samlet ett sted",
        "Nye henvendelser døgnet rundt",
      ],
    },
    cta: "Jeg vil bli funnet",
  },

  // -------------------------------------------------------------------------
  // Tjenester
  // -------------------------------------------------------------------------
  services: {
    eyebrow: "Tjenester",
    title: "Alt du trenger for en god nettside, samlet ett sted.",
    lead: "Vi tar hele jobben – fra første skisse til en nettside som er oppe, trygg og oppdatert. Du slipper å koordinere flere leverandører.",
    listLabel: "Tjenestene våre",
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
        text: "Nettsiden er din – vi drifter den for deg. Vi holder den oppe, trygg og oppdatert, og gjør endringene du trenger, så du kan bruke tiden på det du er best på.",
        includes: ["Hosting og drift", "Sikkerhetsoppdateringer", "Endringer når du trenger dem"],
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Prosess
  // -------------------------------------------------------------------------
  process: {
    eyebrow: "Prosess",
    title: "En enkel og forutsigbar vei fra idé til ferdig nettside.",
    lead: "Du vet hele tiden hva som skjer, hva som er neste steg, og hva det koster.",
    listLabel: "Stegene",
    steps: [
      {
        title: "Samtale",
        text: "Vi starter med en uforpliktende prat om bedriften din, målene dine og hva nettsiden skal oppnå.",
        you: "Forteller om bedriften og hva du trenger.",
        we: "Lytter, stiller spørsmål og gir ærlige råd.",
      },
      {
        title: "Gratis forslag",
        text: "På få dager får du et første forslag til nettsiden din – helt gratis og uforpliktende.",
        you: "Ser på forslaget og sier hva du vil endre.",
        we: "Lager forslaget og justerer til du er fornøyd.",
      },
      {
        title: "Design og utvikling",
        text: "Vi lager design og bygger siden. Du får se underveis og gi tilbakemeldinger før vi går videre.",
        you: "Sender tekst, logo og bilder, og gir tilbakemeldinger.",
        we: "Designer, bygger og tester på mobil og PC.",
      },
      {
        title: "Lansering",
        text: "Er du fornøyd, legger vi nettsiden ut live – først da betaler du. Vi viser deg hvordan du oppdaterer den.",
        you: "Deler nettsiden med kundene dine.",
        we: "Publiserer, lærer deg opp og holder siden oppdatert.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Priser
  // -------------------------------------------------------------------------
  pricing: {
    eyebrow: "Priser",
    title: "Én pakke. Alt inkludert.",
    lead: `Vi lager nettsiden helt gratis og uforpliktende. Er du fornøyd, betaler du ${prices.website} kr når den går live – og ${prices.hosting} kr i måneden for at vi drifter og vedlikeholder den. Ingen binding.`,
    packagesHeading: "Pakken",
    note: "Er du ikke fornøyd, betaler du ingenting. Ønsker du noe helt nytt, som en nettbutikk, får du et eget tilbud med fast pris først.",
    faqTitle: "Om pris og betaling.",
    bundle: {
      name: "Nettside + drift",
      badge: "Alt i én pakke",
      description:
        "En komplett, profesjonell nettside som vi lager gratis – og som vi drifter, holder oppdatert og endrer for deg etterpå.",
      steps: [
        { price: "0", label: "for å lage nettsiden", note: "Du ser resultatet før du betaler" },
        { price: prices.website, label: "når nettsiden går live", note: "Engangsbeløp – bare hvis du er fornøyd" },
        { price: prices.hosting, label: "per måned", note: "Drift og vedlikehold · under 27 kr om dagen" },
      ],
      featuresTitle: "Dette er inkludert",
      features: [
        "Første forslag på få dager",
        "Skreddersydd design i dine farger",
        "Tilpasset mobil, nettbrett og PC",
        "Kontaktskjema",
        "Grunnleggende søkemotoroptimalisering",
        "Hosting og drift",
        "Sikkerhetsoppdateringer",
        "Endringer når du trenger dem",
        "Opplæring i å oppdatere innhold",
        "Fast kontaktperson",
        "Du eier nettside, domene og innhold",
        "Ingen binding – si opp når du vil",
      ],
      cta: "Få et gratis forslag",
    },
    faq: [
      {
        q: "Hva koster det?",
        a: `Det koster 0 kr å få laget nettsiden. Er du fornøyd og vil ha den ut live, betaler du ${prices.website} kr én gang, og deretter ${prices.hosting} kr i måneden for drift og vedlikehold. Ingen binding.`,
      },
      {
        q: `Hva får jeg for ${prices.hosting} kr i måneden?`,
        a: "Vi holder nettsiden oppe, trygg og oppdatert: hosting, sikkerhetsoppdateringer og endringene du trenger. Du sier bare fra, så fikser vi det.",
      },
      {
        q: "Hva om jeg ikke blir fornøyd?",
        a: "Da betaler du ingenting. Du er ikke forpliktet til noe før du selv velger å legge nettsiden ut live.",
      },
      {
        q: "Hvem eier nettsiden?",
        a: "Du. Nettsiden, domenet og innholdet er ditt. Vi drifter den for deg – eierskapet blir alltid hos deg, også hvis du en dag vil bytte leverandør.",
      },
      {
        q: "Kommer det noe i tillegg?",
        a: `Nei. ${prices.website} kr når siden går live og ${prices.hosting} kr i måneden – det er alt. Ønsker du noe helt nytt, som en nettbutikk, får du et eget tilbud med fast pris først, og du bestemmer selv om du vil ha det.`,
      },
      {
        q: "Kan jeg si opp?",
        a: "Ja. Det er ingen binding på den månedlige prisen. Nettsiden er fortsatt din.",
      },
    ],
  },

  // -------------------------------------------------------------------------
  // Om
  // -------------------------------------------------------------------------
  about: {
    eyebrow: "Om oss",
    title: "Et lite studio med stor omtanke for detaljene.",
    sectionLabel: "Om Senay Studio",
    paragraphs: [
      "Senay Studio hjelper bedrifter med å fremstå profesjonelt på nett. Vi mener en god nettside skal være rask, enkel å bruke og tydelig på hva du tilbyr – ikke full av unødvendige funksjoner.",
      "Når du jobber med oss, snakker du direkte med den som designer og bygger siden din. Det gir korte beslutningsveier, ærlige råd og en løsning som er tilpasset akkurat din bedrift.",
    ],
    valuesHeading: "Slik jobber vi",
    values: [
      { title: "Personlig", text: "Én fast kontaktperson fra første samtale til lansering – og etterpå." },
      { title: "Ærlig", text: "0 kr for å lage nettsiden, ingen binding og ingen skjulte gebyrer." },
      { title: "Grundig", text: "Hastighet, tilgjengelighet og kvalitet i hver detalj." },
    ],
  },

  // -------------------------------------------------------------------------
  // Spørsmål (generelle)
  // -------------------------------------------------------------------------
  faqGeneral: [
    {
      q: "Holder det ikke med Facebook eller Instagram?",
      a: "Sosiale medier er fint i tillegg, men du eier ikke profilen, og algoritmen bestemmer hvem som ser innleggene dine. Mange kunder søker på Google, ikke på Facebook. En nettside er stedet du selv styrer, og som kundene finner når de leter.",
    },
    {
      q: "Jeg er ikke teknisk. Klarer jeg dette?",
      a: "Ja. Vi tar oss av alt det tekniske, og du får opplæring i å oppdatere innholdet selv. Endringene gjør vi for deg – det er inkludert i driften.",
    },
    {
      q: "Hva trenger dere fra meg?",
      a: "Litt om bedriften din, hva du tilbyr, og logo og bilder hvis du har det. Resten finner vi ut av sammen i den første samtalen.",
    },
    {
      q: "Hvordan kommer vi i gang?",
      a: "Send en melding via kontaktsiden eller på e-post. Da tar vi en uforpliktende prat, og på få dager får du et gratis forslag til nettsiden din.",
    },
  ],

  // -------------------------------------------------------------------------
  // Kontakt
  // -------------------------------------------------------------------------
  contact: {
    eyebrow: "Kontakt",
    title: "Klar for å bli funnet?",
    lead: "Fortell kort om bedriften din og hva du trenger. Så tar vi kontakt for en uforpliktende prat.",
    emailDirect: "Du kan også sende e-post direkte til",
    nextHeading: "Hva skjer videre?",
    nextSteps: [
      { title: "Du sender en melding", text: "Via skjemaet eller på e-post – et par setninger holder." },
      { title: "Vi tar kontakt", text: "Vi avtaler en uforpliktende prat om hva du trenger." },
      { title: "Du får et gratis forslag", text: "På få dager – og du betaler ingenting før du vil ha siden live." },
    ],
    form: {
      name: "Navn",
      email: "E-post",
      company: "Bedrift",
      optional: "(valgfritt)",
      message: "Hva trenger du hjelp med?",
      submit: "Send henvendelse",
      sent: "Takk! E-postprogrammet ditt skal nå åpne seg med meldingen klar til sending.",
      fallback: "Åpnet det seg ikke noe? Send meldingen direkte til",
      copy: "Kopier e-postadressen",
      copied: "Kopiert!",
      subject: "Henvendelse fra nettsiden",
      bodyName: "Navn",
      bodyEmail: "E-post",
      bodyCompany: "Bedrift",
    },
  },

  cta: {
    title: "Få nettsiden laget – helt gratis.",
    lead: `0 kr for å lage den. ${prices.website} kr når den går live, og ${prices.hosting} kr/mnd for drift. Ingen binding.`,
    primary: "Få et gratis forslag",
    secondary: "Se hva som er inkludert",
  },

  // -------------------------------------------------------------------------
  // AI-chat
  // -------------------------------------------------------------------------
  chat: {
    open: "Spør oss",
    openLabel: "Åpne chat med Senay Studios AI-assistent",
    close: "Lukk chat",
    title: "Spør om alt som har med nettsider å gjøre",
    subtitle: "AI-assistent · svarer med en gang",
    welcome:
      "Hei! Jeg er AI-assistenten til Senay Studio. Spør meg om hva som helst om nettsider – pris, domene, Google, design – så svarer jeg med en gang.",
    suggestions: ["Hva koster en nettside?", "Hvordan blir jeg synlig på Google?", "Trenger jeg eget domene?"],
    placeholder: "Skriv spørsmålet ditt …",
    send: "Send",
    inputLabel: "Spørsmålet ditt",
    thinking: "Skriver …",
    disclaimer: "AI kan ta feil. Ikke del sensitive opplysninger.",
    contact: "Snakk med et menneske",
    errorNotConfigured: "Chatten er ikke tilgjengelig akkurat nå. Send oss en melding i stedet, så svarer vi deg.",
    errorRateLimited: "Du har sendt mange meldinger på kort tid. Vent litt, eller ta kontakt med oss direkte.",
    errorGeneric: "Noe gikk galt. Prøv igjen, eller ta kontakt med oss direkte.",
    assistantLabel: "Assistent",
    youLabel: "Du",
  },

  // -------------------------------------------------------------------------
  // Personvern. TODO: Les gjennom og tilpass før lansering.
  // -------------------------------------------------------------------------
  privacy: {
    eyebrow: "Personvern",
    title: "Slik behandler vi opplysningene dine.",
    sections: [
      {
        title: "Hvem er ansvarlig",
        text: "Senay Studio er ansvarlig for behandlingen av personopplysninger på denne nettsiden. Du når oss på e-postadressen nederst på siden.",
      },
      {
        title: "Hva vi samler inn",
        text: "Når du tar kontakt, får vi navnet ditt, e-postadressen din, eventuelt bedriftsnavn og meldingen du skriver. Vi bruker opplysningene kun til å svare på henvendelsen din og til å følge opp et eventuelt oppdrag.",
      },
      {
        title: "Hvordan skjemaet fungerer",
        text: "Kontaktskjemaet lagrer ingenting på nettsiden. Det åpner e-postprogrammet ditt med meldingen ferdig utfylt, og du sender den selv.",
      },
      {
        title: "AI-chatten",
        text: "Når du bruker chatten, sendes meldingene dine til Anthropic (Claude) for å lage svaret. Vi lagrer ikke samtalen, og den forsvinner når du lukker eller laster inn siden på nytt. Ikke del sensitive personopplysninger i chatten.",
      },
      {
        title: "Informasjonskapsler",
        text: "Nettsiden bruker ikke informasjonskapsler (cookies) til sporing eller annonser.",
      },
      {
        title: "Hvor lenge vi lagrer",
        text: "Vi beholder e-poster så lenge det er nødvendig for å svare deg og følge opp et eventuelt oppdrag, og sletter dem når de ikke lenger trengs.",
      },
      {
        title: "Dine rettigheter",
        text: "Du kan be om innsyn i, retting av eller sletting av opplysningene vi har om deg. Mener du at vi behandler opplysningene dine i strid med regelverket, kan du klage til Datatilsynet.",
      },
    ],
  },

  notFound: {
    title: "Siden finnes ikke.",
    text: "Lenken kan være feil, eller siden er flyttet.",
    back: "Til forsiden",
  },
};

export type Content = typeof no;
