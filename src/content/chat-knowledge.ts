import type { Lang, PageKey } from "@/lib/routes";
import { demos } from "./demos";
import { en } from "./en";
import { no } from "./no";
import { prices, site } from "./shared";

// Kunnskapsbasen til chat-assistenten. Ingen AI: spørsmålet matches mot
// nøkkelordene under (se src/lib/chat-match.ts), og beste emne gir svaret.
//
// - strong: ord som tydelig peker på emnet (3 poeng). weak: hjelpeord (1 poeng).
// - Ord på 4+ bokstaver matcher også bøyninger («domen» → domene, domenet).
// - Ved likt antall poeng vinner emnet som står først i lista. Derfor står
//   konkrete emner (domene, hosting …) før pris, og småprat helt til slutt.
// - Fakta om Senay Studio hentes fra innholdet på sidene, så de alltid stemmer.
//   Lov aldri noe her som ikke står på nettsiden.

export type Topic = {
  id: string;
  strong: string[];
  weak?: string[];
  answer: Record<Lang, string>;
  links?: PageKey[];
  followUps?: Record<Lang, string[]>;
};

const W = prices.website;
const M = prices.hosting;
const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n");
const demoLabels = demos.flatMap((d) => [d.label.no.toLowerCase(), d.label.en.toLowerCase()]);

export const fallback: Topic = {
  id: "fallback",
  strong: [],
  answer: {
    no: `Det er jeg ikke sikker på, og jeg vil ikke gjette. Send oss en melding, så svarer et menneske deg – eller spør meg om pris, domene, Google, design eller hvordan vi jobber.`,
    en: `I'm not sure about that, and I'd rather not guess. Send us a message and a human will reply – or ask me about price, domains, Google, design or how we work.`,
  },
  links: ["contact"],
  followUps: {
    no: ["Hva koster en nettside?", "Hvordan blir jeg synlig på Google?", "Hvordan foregår det?"],
    en: ["What does a website cost?", "How do I show up on Google?", "How does it work?"],
  },
};

export const topics: Topic[] = [
  // ------------------------------------------------------------- Generelt om nettsider
  {
    id: "why",
    strong: ["hvorfor nettside", "flere kunder", "nye kunder", "more customers", "new customers", "trenger jeg en nettside", "verdt det", "lønner", "why a website", "do i need a website", "worth it"],
    weak: ["hvorfor", "why", "nødvendig", "necessary"],
    answer: {
      no: "Folk sjekker bedrifter på nett før de handler. Står du ikke der, velger de ofte noen som gjør det. En god nettside gjør at kundene finner deg, gir et seriøst førsteinntrykk og tar imot henvendelser døgnet rundt.",
      en: "People check businesses online before they buy. If you're not there, they often choose someone who is. A good website helps customers find you, makes a professional first impression and takes inquiries around the clock.",
    },
    links: ["why"],
  },
  {
    id: "social",
    strong: ["facebook", "instagram", "sosiale medier", "tiktok", "linkedin", "social media", "snapchat"],
    answer: {
      no: no.faqGeneral[0].a,
      en: en.faqGeneral[0].a,
    },
    links: ["why"],
  },
  {
    id: "domain",
    strong: ["domene", "domenet", "domener", "domain", "domains", "nettadresse", "web address", "url"],
    weak: ["kjøpe", "buy", "adresse", "address", "registrere", "register", "koste", "pris", "cost", "price", "eget", "egen", "own", "trenger", "need"],
    answer: {
      no: "Domenet er adressen til nettsiden, for eksempel dinbedrift.no. Et .no-domene koster vanligvis et par hundre kroner i året hos en domeneleverandør. Hos oss eier du domenet selv – og har du ikke ett ennå, hjelper vi deg gjerne i gang.",
      en: "The domain is your website's address, for example yourbusiness.no. A .no domain usually costs a couple of hundred kroner a year from a domain registrar. With us you own the domain yourself – and if you don't have one yet, we're happy to help you get started.",
    },
    followUps: {
      no: ["Hva er hosting?", "Kan jeg få e-post på domenet?"],
      en: ["What is hosting?", "Can I get email on my domain?"],
    },
  },
  {
    id: "businessEmail",
    strong: ["e-post på domenet", "epost på domenet", "e-post", "epost", "email address", "bedrifts-epost", "firma-epost", "email on my domain", "business email", "professional email"],
    answer: {
      no: "En e-postadresse på eget domene (som post@dinbedrift.no) gjør bedriften mer profesjonell. Den settes vanligvis opp hos domeneleverandøren eller en e-posttjeneste. Spør oss gjerne, så ser vi på hva som passer for deg.",
      en: "An email address on your own domain (like post@yourbusiness.no) makes your business look more professional. It's usually set up with your domain registrar or an email service. Ask us and we'll look at what suits you.",
    },
    links: ["contact"],
  },
  {
    id: "hosting",
    strong: ["hosting", "host", "webhotell", "server", "servere", "web host", "nede", "oppetid", "uptime", "downtime"],
    answer: {
      no: `Hosting er der nettsiden «bor» på internett, så den er tilgjengelig for alle. Hos oss er hosting og drift inkludert i ${M} kr i måneden – du trenger ikke tenke på det.`,
      en: `Hosting is where your website "lives" on the internet so everyone can reach it. With us, hosting and maintenance are included in NOK ${M} a month – you don't need to think about it.`,
    },
    links: ["pricing"],
  },
  {
    id: "https",
    strong: ["ssl", "https", "sertifikat", "hengelås", "certificate", "padlock", "ikke sikker", "not secure"],
    answer: {
      no: "https (hengelåsen i adressefeltet) betyr at forbindelsen er kryptert. Uten det merker nettleseren siden som «ikke sikker», og det skremmer bort besøkende. Hos oss er det en del av hostingen og driften.",
      en: "https (the padlock in the address bar) means the connection is encrypted. Without it, browsers mark the site as \"not secure\", which scares visitors away. With us it's part of the hosting and maintenance.",
    },
  },
  {
    id: "seo",
    strong: ["seo", "søkemotor", "søkemotoroptimalisering", "google", "rangering", "rangere", "synlig", "synlighet", "search engine", "search", "rank", "ranking", "visible", "visibility", "søkeresultat", "toppen"],
    weak: ["finne", "find", "found", "søk", "søke"],
    answer: {
      no: "For å bli funnet på Google trenger du en rask nettside med riktig struktur, gode titler og tekst som bruker ordene kundene dine søker på – for eksempel «frisør Bergen». Grunnleggende søkemotoroptimalisering er inkludert hos oss. Lag også en gratis Google-bedriftsprofil, og be fornøyde kunder om omtaler.",
      en: "To be found on Google you need a fast website with the right structure, good titles and text that uses the words your customers search for – like \"hairdresser Bergen\". Basic SEO is included with us. Also create a free Google Business Profile and ask happy customers for reviews.",
    },
    links: ["services"],
    followUps: {
      no: ["Hva er Google-bedriftsprofil?", "Hvor rask bør nettsiden være?"],
      en: ["What is a Google Business Profile?", "How fast should my website be?"],
    },
  },
  {
    id: "businessProfile",
    strong: ["bedriftsprofil", "google bedrift", "google maps", "maps", "kart", "kartet", "business profile", "my business", "omtaler", "reviews", "anmeldelser"],
    weak: ["google"],
    answer: {
      no: "En Google-bedriftsprofil er gratis og gjør at du dukker opp i Google Maps og i søk i nærområdet, med adresse, åpningstider og omtaler. Lenk til nettsiden din fra profilen – sammen gir de deg mye bedre synlighet lokalt.",
      en: "A Google Business Profile is free and makes you show up in Google Maps and local search, with your address, opening hours and reviews. Link to your website from the profile – together they give you much better local visibility.",
    },
  },
  {
    id: "mobile",
    strong: ["mobil", "mobilen", "mobiltilpasset", "responsiv", "nettbrett", "mobile", "responsive", "tablet", "smartphone"],
    answer: {
      no: "De fleste besøker nettsider fra mobilen, så siden må fungere like godt der som på PC. Alle nettsidene vi lager er tilpasset mobil, nettbrett og PC.",
      en: "Most people visit websites on their phone, so the site has to work just as well there as on a computer. Every website we make is adapted for phone, tablet and computer.",
    },
  },
  {
    id: "speed",
    strong: ["hastighet", "rask", "treg", "tregt", "lastetid", "laster", "ytelse", "speed", "slow", "loading", "load time", "performance", "rask nettside", "fast website"],
    answer: {
      no: "En nettside bør laste på et par sekunder – ellers går mange videre, og Google rangerer raske sider høyere. Små bilder, enkel kode og god hosting gjør mye. Rask innlasting er en del av det vi leverer.",
      en: "A website should load in a couple of seconds – otherwise many people leave, and Google ranks fast sites higher. Small images, lean code and good hosting make a big difference. Fast loading is part of what we deliver.",
    },
  },
  {
    id: "security",
    strong: ["sikkerhet", "sikker", "hacket", "hacking", "trygt", "trygg", "hacke", "virus", "backup", "sikkerhetskopi", "security", "secure", "hacked", "safe"],
    answer: {
      no: "En nettside må holdes oppdatert for å være trygg – utdaterte systemer er den vanligste veien inn for angripere. Sikkerhetsoppdateringer er inkludert i driften hos oss.",
      en: "A website must be kept up to date to stay safe – outdated systems are the most common way in for attackers. Security updates are included in our hosting and maintenance.",
    },
  },
  {
    id: "accessibility",
    strong: ["universell utforming", "tilgjengelig", "tilgjengelighet", "uu", "wcag", "accessibility", "accessible", "skjermleser", "screen reader", "blind", "svaksynt"],
    answer: {
      no: "Universell utforming betyr at alle kan bruke nettsiden – også med skjermleser, tastatur eller nedsatt syn. Det handler om god kontrast, tydelig struktur og tekst på bilder. Vi bygger med tilgjengelighet i hver detalj.",
      en: "Accessibility means everyone can use the website – including with a screen reader, keyboard or reduced vision. It's about good contrast, clear structure and text for images. We build with accessibility in every detail.",
    },
  },
  {
    id: "content",
    strong: ["tekst", "tekster", "bilder", "bilde", "foto", "fotograf", "bildene", "images", "image", "photos", "photo", "pictures", "text", "copy", "copywriting"],
    weak: ["skrive", "write"],
    answer: {
      no: "Gode bilder og korte, tydelige tekster selger mest. Fortell hva du tilbyr, hvem det er for og hvordan man tar kontakt. Har du egne bilder og logo, bruker vi dem – ellers finner vi ut av det sammen i første samtale.",
      en: "Good photos and short, clear text sell best. Say what you offer, who it's for and how to get in touch. If you have your own photos and logo, we use them – otherwise we'll figure it out together in the first conversation.",
    },
  },
  {
    id: "brand",
    strong: ["logo", "logoen", "grafisk profil", "branding", "brand", "farger", "fargene", "colors", "colours", "font", "skrifttype"],
    answer: {
      no: "Nettsiden får design i dine farger og din stil. Har du logo og farger fra før, bygger vi videre på dem. Trenger du noe nytt, som en logo, så spør oss om hva som er mulig.",
      en: "Your website gets a design in your colours and style. If you already have a logo and colours, we build on them. If you need something new, like a logo, ask us what's possible.",
    },
    links: ["contact"],
  },
  {
    id: "design",
    strong: ["design", "designet", "utseende", "layout", "mal", "template", "stil", "style", "look"],
    weak: ["pen", "fin", "moderne", "modern", "beautiful"],
    answer: {
      no: "Vi lager et skreddersydd design i dine farger – ikke en ferdig mal. Typografi, farger og struktur skal gjøre det lett for besøkende å forstå hva du tilbyr og få dem til å ta kontakt.",
      en: "We create a custom design in your colours – not an off-the-shelf template. Typography, colours and structure should make it easy for visitors to understand what you offer and get in touch.",
    },
    links: ["demos"],
  },
  {
    id: "privacy",
    strong: ["personvern", "gdpr", "cookies", "informasjonskapsler", "privacy", "personopplysninger", "personal data", "cookie"],
    answer: {
      no: "Nettsider som samler inn personopplysninger, for eksempel via skjema, bør ha en personvernerklæring. Bruker du cookies til sporing eller annonser, må besøkende samtykke. Spør oss gjerne hvis du er usikker på hva som gjelder for din side.",
      en: "Websites that collect personal data, for example through a form, should have a privacy policy. If you use cookies for tracking or ads, visitors must give consent. Ask us if you're unsure what applies to your site.",
    },
    links: ["privacy"],
  },
  {
    id: "analytics",
    strong: ["statistikk", "besøkende", "analytics", "trafikk", "besøkstall", "visitors", "traffic", "stats", "statistics"],
    answer: {
      no: "Besøksstatistikk viser hvor mange som besøker nettsiden og hva de ser på. Det finnes personvernvennlige verktøy som ikke trenger cookies. Spør oss gjerne hvis du vil ha det på din side.",
      en: "Visitor statistics show how many people visit your website and what they look at. There are privacy-friendly tools that don't need cookies. Ask us if you'd like it on your site.",
    },
    links: ["contact"],
  },
  {
    id: "booking",
    strong: ["booking", "timebestilling", "bestille time", "reservasjon", "book", "reservation", "appointment", "kontaktskjema", "skjema", "form", "contact form"],
    answer: {
      no: "Kontaktskjema er inkludert. Trenger du timebestilling eller bordreservasjon, kan vi ofte koble til løsningen du bruker i dag. Fortell oss hva du bruker, så finner vi ut av det.",
      en: "A contact form is included. If you need appointment booking or table reservations, we can often connect the solution you already use. Tell us what you use and we'll work it out.",
    },
    links: ["contact"],
  },
  {
    id: "languages",
    strong: ["språk", "engelsk", "flerspråklig", "oversette", "oversettelse", "language", "languages", "english", "norwegian", "translate", "multilingual"],
    answer: {
      no: "En nettside kan godt ha flere språk – denne har både norsk og engelsk. Ønsker du flere språk på din side, si fra, så tar vi det med i forslaget.",
      en: "A website can easily have several languages – this one has both Norwegian and English. If you'd like more languages on your site, let us know and we'll include it in the proposal.",
    },
    links: ["contact"],
  },
  {
    id: "diy",
    strong: ["wix", "wordpress", "squarespace", "webflow", "lage selv", "selv lage", "gjøre det selv", "diy", "builder", "byrå", "byråer", "agency", "agencies"],
    weak: ["forskjell", "forskjellen", "difference", "andre", "others"],
    answer: {
      no: `Du kan lage en nettside selv med Wix eller WordPress, men det tar tid, og du må selv holde den oppdatert og synlig. Byråer tar ofte mange tusen kroner før du har sett noe. Hos oss koster det 0 kr å få den laget, ${W} kr når den går live og ${M} kr i måneden – og vi tar oss av alt.`,
      en: `You can build a website yourself with Wix or WordPress, but it takes time, and you have to keep it updated and visible yourself. Agencies often charge thousands before you've seen anything. With us it costs NOK 0 to build, NOK ${W} when it goes live and NOK ${M} a month – and we take care of everything.`,
    },
    links: ["why"],
  },
  // ------------------------------------------------------------- Pris og vilkår
  {
    id: "monthly",
    strong: ["måned", "månedlig", "mnd", "month", "monthly", "799", "drift", "vedlikehold", "maintenance", "abonnement", "subscription"],
    answer: {
      no: `For ${M} kr i måneden holder vi nettsiden oppe, trygg og oppdatert: hosting, sikkerhetsoppdateringer og endringene du trenger. Du sier bare fra, så fikser vi det. Det er under 27 kr om dagen, og ingen binding.`,
      en: `For NOK ${M} a month we keep your website up, secure and up to date: hosting, security updates and the changes you need. Just tell us, and we'll fix it. No lock-in.`,
    },
    links: ["pricing"],
    followUps: {
      no: ["Kan jeg si opp?", "Kan jeg endre nettsiden selv?", "Hva er inkludert?"],
      en: ["Can I cancel?", "Can I edit the website myself?", "What's included?"],
    },
  },
  {
    id: "price",
    strong: ["pris", "priser", "koste", "koster", "kostnad", "kostnader", "price", "prices", "pricing", "cost", "costs", "betale", "pay", "billig", "dyr", "dyrt", "cheap", "expensive", "4599"],
    weak: ["kr", "kroner", "nok", "penger", "money"],
    answer: {
      no: `Det koster 0 kr å få laget nettsiden, og du ser resultatet før du betaler noe. Er du fornøyd, betaler du ${W} kr én gang når den går live, og deretter ${M} kr i måneden for drift og vedlikehold. Ingen binding.`,
      en: `It costs NOK 0 to get your website built, and you see the result before you pay anything. If you're happy, you pay NOK ${W} once when it goes live, then NOK ${M} a month for hosting and maintenance. No lock-in.`,
    },
    links: ["pricing"],
    followUps: {
      no: ["Hva er inkludert?", `Hva får jeg for ${M} kr i måneden?`, "Kan jeg si opp?"],
      en: ["What's included?", `What do I get for NOK ${M} a month?`, "Can I cancel?"],
    },
  },
  {
    id: "included",
    strong: ["inkludert", "inkluderer", "inneholder", "included", "include", "includes", "hva får jeg", "what do i get", "pakken", "pakke", "package"],
    answer: {
      no: `Dette er inkludert i pakken:\n${list(no.pricing.bundle.features)}`,
      en: `This is included in the package:\n${list(en.pricing.bundle.features)}`,
    },
    links: ["pricing"],
    followUps: {
      no: ["Hva koster det?", "Hvor lang tid tar det?"],
      en: ["What does it cost?", "How long does it take?"],
    },
  },
  {
    id: "lockIn",
    strong: ["binding", "bindingstid", "bundet", "oppsigelse", "si opp", "kontrakt", "lock", "lockin", "contract", "cancel", "commitment", "termination"],
    weak: ["avtale", "agreement"],
    answer: {
      no: "Det er ingen binding. Du kan si opp den månedlige prisen når du vil – og nettsiden er fortsatt din.",
      en: "There's no lock-in. You can cancel the monthly price whenever you like – and the website is still yours.",
    },
    links: ["pricing"],
  },
  {
    id: "ownership",
    strong: ["eier", "eie", "eierskap", "own", "owner", "owns", "ownership", "bytte leverandør", "switch provider", "flytte nettsiden", "move my website"],
    answer: {
      no: "Du eier nettsiden, domenet og innholdet. Vi drifter den for deg, men eierskapet blir alltid hos deg – også hvis du en dag vil bytte leverandør.",
      en: "You own the website, the domain and the content. We run it for you, but ownership always stays with you – even if you want to switch provider one day.",
    },
  },
  {
    id: "notHappy",
    strong: ["fornøyd", "misfornøyd", "angre", "ikke liker", "don t like", "not happy", "satisfied", "unhappy", "garanti", "guarantee", "risiko", "risk"],
    weak: ["liker", "like"],
    answer: {
      no: "Blir du ikke fornøyd, betaler du ingenting. Du er ikke forpliktet til noe før du selv velger å legge nettsiden ut live.",
      en: "If you're not happy, you pay nothing. You're not committed to anything until you choose to put the website live.",
    },
    links: ["pricing"],
  },
  {
    id: "shop",
    strong: ["nettbutikk", "netthandel", "nettbutikken", "ehandel", "e-handel", "webshop", "shop", "online store", "ecommerce", "selge på nett", "sell online", "checkout"],
    weak: ["selge", "sell", "butikk", "store", "betaling", "payment", "vipps"],
    answer: {
      no: "Ønsker du noe helt nytt, som en nettbutikk, får du et eget tilbud med fast pris først – og du bestemmer selv om du vil ha det. Send oss en melding om hva du trenger.",
      en: "If you want something completely new, like an online store, you get a separate fixed-price quote first – and you decide whether you want it. Send us a message about what you need.",
    },
    links: ["contact"],
  },

  // ------------------------------------------------------------- Prosess
  {
    id: "time",
    strong: ["hvor lang tid", "hvor fort", "hvor raskt", "leveringstid", "how long", "how fast", "how quickly", "timeline", "ferdig", "levering", "delivery"],
    weak: ["tid", "time", "dager", "uker", "days", "weeks", "raskt", "fast"],
    answer: {
      no: "Du får et første forslag på få dager, helt gratis. Deretter justerer vi til du er fornøyd. Hvor lang tid resten tar, avhenger litt av hvor raskt vi får tekst og bilder – men du vet alltid hva som er neste steg.",
      en: "You get a first proposal within a few days, completely free. Then we adjust it until you're happy. How long the rest takes depends a bit on how quickly we get text and images – but you always know what the next step is.",
    },
    links: ["process"],
  },
  {
    id: "process",
    strong: ["prosess", "prosessen", "steg", "fremgangsmåte", "hvordan foregår", "hvordan fungerer", "how does it work", "process", "steps", "workflow"],
    answer: {
      no: `Slik foregår det:\n${no.process.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join("\n")}`,
      en: `This is how it works:\n${en.process.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join("\n")}`,
    },
    links: ["process"],
    followUps: {
      no: ["Hva trenger dere fra meg?", "Hva koster det?"],
      en: ["What do you need from me?", "What does it cost?"],
    },
  },
  {
    id: "needFromMe",
    strong: ["trenger dere", "fra meg", "what do you need", "from me", "materiell", "forberede", "prepare"],
    answer: {
      no: no.faqGeneral[2].a,
      en: en.faqGeneral[2].a,
    },
    links: ["contact"],
  },
  {
    id: "changes",
    strong: ["endre", "endring", "endringer", "oppdatere", "oppdatering", "redigere", "change", "changes", "update", "updates", "edit", "cms", "opplæring", "training"],
    weak: ["selv", "myself", "teknisk", "technical"],
    answer: {
      no: "Endringer gjør vi for deg – det er inkludert i driften. Du får også opplæring, så du kan oppdatere innholdet selv hvis du vil. Du trenger ikke være teknisk.",
      en: "We make changes for you – it's included in the hosting and maintenance. You also get training so you can update the content yourself if you want. You don't need to be technical.",
    },
  },
  {
    id: "start",
    strong: ["komme i gang", "i gang", "starte", "bestille", "kontakt", "kontakte", "ring", "ringe", "telefon", "tilbud", "møte", "get started", "start", "order", "contact", "call", "phone", "quote", "meeting", "e-post", "epost", "email", "mail"],
    answer: {
      no: `Send en melding via kontaktsiden eller på e-post til ${site.email}. Da tar vi en uforpliktende prat, og på få dager får du et gratis forslag til nettsiden din.`,
      en: `Send a message via the contact page or email ${site.email}. We'll have a no-obligation chat, and within a few days you'll get a free proposal for your website.`,
    },
    links: ["contact"],
  },

  // ------------------------------------------------------------- Om oss
  {
    id: "demos",
    strong: ["eksempel", "eksempler", "demo", "demoer", "portefølje", "referanser", "tidligere arbeid", "example", "examples", "portfolio", "bransje", "bransjer", "industry", "industries", ...demoLabels],
    answer: {
      no: `Vi har eksempelsider for rundt ${demos.length} bransjer – blant annet frisør, kafé, elektriker, tømrer og regnskap. Ta en titt for å se hvordan en nettside for din bransje kan se ut.`,
      en: `We have example websites for around ${demos.length} industries – including hair salons, cafés, electricians, carpenters and accountants. Take a look to see what a website for your industry could look like.`,
    },
    links: ["demos"],
  },
  {
    id: "services",
    strong: ["tjenester", "tjeneste", "hva gjør dere", "hva tilbyr", "services", "service", "what do you do", "what do you offer"],
    answer: {
      no: `Vi tar hele jobben:\n${list(no.services.items.map((s) => `${s.title}: ${s.text}`))}`,
      en: `We do the whole job:\n${list(en.services.items.map((s) => `${s.title}: ${s.text}`))}`,
    },
    links: ["services"],
  },
  {
    id: "about",
    strong: ["hvem er dere", "om dere", "who are you", "about you", "senay"],
    weak: ["studio", "dere", "you"],
    answer: {
      no: no.about.paragraphs.join(" "),
      en: en.about.paragraphs.join(" "),
    },
    links: ["about"],
  },

  // ------------------------------------------------------------- Småprat
  {
    id: "greeting",
    strong: ["hei", "hallo", "heisann", "hello", "hi", "hey", "god morgen", "god dag", "good morning"],
    answer: {
      no: "Hei! Hva lurer du på? Jeg kan svare på det meste om nettsider – og om hva vi tilbyr.",
      en: "Hi! What would you like to know? I can answer most things about websites – and about what we offer.",
    },
    followUps: {
      no: ["Hva koster en nettside?", "Hva er inkludert?", "Trenger jeg eget domene?"],
      en: ["What does a website cost?", "What's included?", "Do I need my own domain?"],
    },
  },
  {
    id: "thanks",
    strong: ["takk", "tusen takk", "thanks", "thank you", "takker"],
    weak: ["flott", "supert", "great", "perfekt", "perfect"],
    answer: {
      no: "Bare hyggelig! Er det noe mer du lurer på, er det bare å spørre. Vil du komme i gang, er kontaktsiden neste steg.",
      en: "You're welcome! Ask away if there's anything else. If you'd like to get started, the contact page is the next step.",
    },
    links: ["contact"],
  },
  {
    id: "human",
    strong: ["menneske", "robot", "bot", "ai", "chatbot", "human", "ekte person", "real person", "snakke med noen", "talk to someone"],
    answer: {
      no: "Jeg er en automatisk assistent med ferdige svar om nettsider og om Senay Studio – ikke et menneske. Vil du snakke med en ekte person, send en melding via kontaktsiden, så svarer vi deg selv.",
      en: "I'm an automatic assistant with ready-made answers about websites and Senay Studio – not a human. To talk to a real person, send us a message via the contact page and we'll reply ourselves.",
    },
    links: ["contact"],
  },

];
