// English content. Same shape as no.ts (enforced by the Content type).

import type { Content } from "./no";
import { draftDays, lighthouse, prices } from "./shared";

export const en: Content = {
  site: {
    tagline: "Websites for businesses",
    description:
      "Senay Studio builds fast, professional websites for businesses. We build your website for free – if you are happy, you pay NOK 4,599 when it goes live and NOK 799/mo for hosting and maintenance. No lock-in.",
    locale: "en_GB",
  },

  nav: {
    home: "Home",
    why: "Why a website",
    demos: "Examples",
    services: "Services",
    process: "Process",
    pricing: "Pricing",
    about: "About",
    contact: "Contact",
    privacy: "Privacy",
  },

  ui: {
    skipToContent: "Skip to content",
    homeLabel: "Senay Studio – home",
    mainMenu: "Main menu",
    mobileMenu: "Mobile menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    requestQuote: "Get a quote",
    switchLanguage: "Norsk",
    switchLanguageLabel: "Bytt til norsk",
    readMore: "Read more",
    getInTouch: "Get in touch",
    footerPages: "Pages",
    footerContact: "Contact",
    sendInquiry: "Send an inquiry →",
    footerMenu: "Footer menu",
    orgNr: "Org. no.",
    startHere: "Start here",
    youGet: "You get",
    you: "You",
    we: "Us",
    step: "Step",
    included: "Included",
    notIncluded: "Not included",
    whatsIncluded: "What's included",
    downside: "Downside",
    upside: "Upside",
    kr: "NOK",
    perMonthShort: "NOK/mo",
    oneTime: "NOK",
    questions: "Questions",
    whatYouWonder: "What you might be wondering.",
  },

  meta: {
    home: { title: "Senay Studio – Websites for businesses", description: "" },
    why: {
      title: "Why a website",
      description:
        "Customers search before they call. How a professional website helps your business get found, earn trust and win more inquiries.",
    },
    demos: {
      title: "Examples",
      description: "See example websites for around 30 industries – from hair salons and cafés to electricians and carpenters.",
    },
    services: {
      title: "Services",
      description: "Design, development, search visibility and hosting – everything you need for a great website, in one place.",
    },
    process: {
      title: "Process",
      description: "From the first conversation to a finished website in four clear steps – with a fixed price before work starts.",
    },
    pricing: {
      title: "Pricing",
      description: `One package: NOK 0 to build your website, NOK ${prices.website} when it goes live and NOK ${prices.hosting}/mo for hosting and maintenance. No lock-in.`,
    },
    about: {
      title: "About",
      description:
        "Senay Studio is a small studio building fast, professional websites for businesses – with one dedicated contact all the way.",
    },
    contact: {
      title: "Contact",
      description: "Tell us briefly about your business and we'll get in touch for a no-obligation chat about your new website.",
    },
    privacy: { title: "Privacy", description: "How Senay Studio handles personal data." },
  },

  hero: {
    eyebrow: "Websites for businesses",
    title: "Customers google you.",
    titleAccent: "What do they find?",
    lead: "Type in your business, and we will show you your website. Right now.",
    primaryCta: "Get a free draft",
    secondaryCta: "See how it works",
    scrollHint: "Scroll down",
  },
  builder: {
    nameLabel: "Business name",
    namePlaceholder: "Your business name",
    industryLabel: "Industry",
    build: "Build my website",
    fallbackName: "Your business",
    hint: "Type the name – the website updates as you type.",
    steps: ["Design", "Text", "Mobile", "Done"],
    srPreview: "Preview of the website for {navn}.",
    doneTitle: "This is a sketch made in seconds.",
    doneText: `Want the real thing? We build it for free within ${draftDays} business days.`,
    doneCta: "Yes, build my website",
    contactMessage: "I would like a website like the sketch for {bransje}.",
  },
  industry: {
    eyebrow: "Website for {bransje}",
    title: "A website for {bransje} – see it before you pay.",
    lead: `We build your website for free. You get a draft within ${draftDays} business days and only pay if you want it live: NOK ${prices.website} at launch and NOK ${prices.hosting}/mo for hosting. No lock-in.`,
    metaDescription: `Website for {bransje}: free draft within ${draftDays} business days, NOK ${prices.website} at launch and NOK ${prices.hosting}/mo. No lock-in, and you own the site.`,
    primaryCta: "Get a free draft",
    needsTitle: "What your website should have",
    needsLead: "What your customers look for when they find you on Google – and what we build in from the start.",
    exampleTitle: "How it could look",
    exampleNote: "Example – the business is fictional. Your website is built from scratch for you.",
    openExample: "Open the example in full size",
    pricingTitle: "One package. Everything included.",
    otherTitle: "Other industries",
    footerTitle: "Industries",
    allIndustries: "All industries",
    needs: {
      beauty: ["Online booking, around the clock", "Treatments and prices in one place", "Photos that show the atmosphere", "Opening hours and directions"],
      health: ["Online booking or easy contact", "What you treat, explained simply", "Trust: who works there", "Address, parking and opening hours"],
      food: ["A menu with prices that is easy to read", "Opening hours and where you are", "Table booking or ordering", "Photos of the food and the place"],
      trades: ["Your services explained briefly", "A form to request a quote", "Photos from jobs you have done", "Which areas you cover"],
      services: ["What you offer, and for whom", "An easy way to get in touch", "Trust: who you are", "Answers to the most common questions"],
      retail: ["Your range shown with good photos", "Opening hours and where the shop is", "News and offers", "Contact and ordering"],
    },
  },
  proof: {
    eyebrow: "Measured, not promised",
    title: "Fast websites win more customers.",
    lead: "We measure every website with Google Lighthouse, the same tool Google uses. These are the scores for the website you are reading now.",
    outOf: "out of 100",
    labels: { performance: "Performance", accessibility: "Accessibility", bestPractices: "Best practices", seo: "SEO" },
    note: `Measured on mobile on ${lighthouse.measured}.`,
  },
  story: {
    label: "How customers choose",
    query: "hairdresser near me",
    searchLabel: "Search",
    steps: [
      { kicker: "It's 8:14 pm", text: "A customer needs a hairdresser. She picks up her phone and searches." },
      { kicker: "Three seconds later", text: "She looks at the first results. She doesn't look any further." },
      { kicker: "And you?", text: "Your business isn't there. To her, you don't exist." },
      { kicker: "With Senay Studio", text: "Now it's you she finds – and you she calls." },
    ],
    results: [
      { name: "Salong Lykke", url: "salonglykke.no", text: "Hair salon in the city centre · Open now · Book online" },
      { name: "Klipp & Co", url: "klippogco.no", text: "Women's and men's cuts · Book online" },
      { name: "Hårstudio Nord", url: "harstudionord.no", text: "Colour, highlights and styling · Open until 9 pm" },
    ],
    you: { name: "Your business", missing: "No website found", url: "yourbusiness.no", text: "Your hair salon · Open now · Book online" },
    fictional: "Example – the businesses are fictional",
  },

  statement: "A website isn't decoration. It's your best salesperson – it answers customers while you work, sleep and go on holiday.",

  numbers: {
    eyebrow: "The price",
    title: "As simple as it sounds.",
    items: [
      { value: 0, suffix: "", prefix: "NOK ", label: "to build your website" },
      { value: Number(prices.website.replace(/\s/g, "")), suffix: "", prefix: "NOK ", label: "when it goes live" },
      { value: Number(prices.hosting), suffix: "/mo", prefix: "NOK ", label: "for hosting and changes" },
    ],
    note: "No lock-in. You own the website.",
    link: "See what's included",
  },



  explore: {
    eyebrow: "Explore",
    title: "Everything you need to know, one page at a time.",
    lead: "Read up at your own pace – or go straight to pricing.",
    items: [
      { key: "why", title: "Why a website", text: "What a website does for your business – and what it costs not to have one." },
      { key: "services", title: "Services", text: "Design, development, search visibility and hosting. All in one place." },
      { key: "process", title: "Process", text: "Four clear steps from the first conversation to a finished website." },
      {
        key: "pricing",
        title: "Pricing",
        text: `One package: NOK 0 to build your website, NOK ${prices.website} when it goes live and NOK ${prices.hosting}/mo for hosting.`,
      },
      { key: "about", title: "About", text: "A small studio with one dedicated contact all the way." },
      { key: "contact", title: "Contact", text: "Tell us briefly what you need and we'll have a no-obligation chat." },
    ],
  },

  demos: {
    eyebrow: "Examples",
    title: "See what your website could look like.",
    homeTitle: "Or browse 30 finished examples.",
    lead: "Pick your industry and see an example. All businesses are fictional – your website is always built from scratch for you.",
    all: "All",
    open: "Open full size",
    choose: "Choose industry",
    showing: "Showing example for",
    fictional: "Example – fictional business",
    allExamples: "See all examples",
    bannerText: "This is an example made by Senay Studio. The business is fictional.",
    bannerCta: "Want a website like this?",
    backToExamples: "← All examples",
    count: "industries",
  },

  agencies: {
    eyebrow: "Why us",
    title: "How agencies often do it. How we do it.",
    others: {
      label: "Other agencies",
      title: "How it's often done",
      items: [
        "Tens of thousands of kroner upfront before you see anything",
        "Weeks of waiting",
        "You pay before you know if it's any good",
        "Lock-in periods and long contracts",
        "The agency often owns your website",
      ],
    },
    us: {
      label: "Senay Studio",
      title: "How we do it",
      items: [
        "NOK 0 to get started – no obligation",
        `First draft within ${draftDays} business days`,
        "You see the result before you pay",
        "No lock-in, no hidden fees",
        "You own the website, domain and content",
      ],
    },
    note: `We build your website for free. If you are happy, you pay NOK ${prices.website} when it goes live and NOK ${prices.hosting}/mo for hosting – not before.`,
    cta: "Get a free proposal",
  },

  why: {
    eyebrow: "Why a website",
    title: "A website isn't decoration. It's your best salesperson.",
    lead: "People check businesses online before they buy. If you're not there, they choose someone who is.",
    reasonsHeading: "Four reasons",
    items: [
      {
        title: "Customers search before they call",
        text: "When someone needs what you offer, they start on Google. Without a website, it's your competitors who get found.",
      },
      {
        title: "Trust in seconds",
        text: "A clean, professional website shows that your business is serious. A poor first impression costs you customers you never hear about.",
      },
      {
        title: "Open around the clock",
        text: "Your website answers questions and takes inquiries while you work, sleep or are on holiday.",
      },
      {
        title: "Your own platform",
        text: "Facebook and Instagram are owned by others, and the algorithm decides who sees you. On your own website, you decide.",
      },
    ],
  },

  comparison: {
    eyebrow: "The difference",
    title: "Without a website and with one.",
    without: {
      title: "Without a website",
      items: [
        "Customers find your competitor on Google",
        "You seem less serious than you are",
        "Information is scattered and hard to find",
        "You miss inquiries outside business hours",
      ],
    },
    with: {
      title: "With a website from Senay Studio",
      items: [
        "You show up when customers search",
        "A professional first impression every time",
        "Services, prices and contact details in one place",
        "New inquiries around the clock",
      ],
    },
    cta: "I want to be found",
  },

  services: {
    eyebrow: "Services",
    title: "Everything you need for a great website, in one place.",
    lead: "We handle the whole job – from the first sketch to a website that is live, secure and up to date. No juggling several suppliers.",
    listLabel: "Our services",
    items: [
      {
        title: "Design",
        text: "A visual identity that fits your business. Typography, colours and structure that make it easy for visitors to understand what you offer – and to get in touch.",
        includes: ["Design in your colours and style", "Clear structure and navigation", "Works on mobile, tablet and desktop"],
      },
      {
        title: "Development",
        text: "Modern technology for fast pages, solid security and a site that works just as well on every screen.",
        includes: ["Fast loading", "Contact form", "Training in updating content"],
      },
      {
        title: "Search visibility",
        text: "A solid technical foundation for search engines, so customers find you when they look for what you offer.",
        includes: ["Correct structure and metadata", "Image and text when the site is shared", "Basic search engine optimisation"],
      },
      {
        title: "Hosting and care",
        text: "The website is yours – we run it for you. We keep it live, secure and up to date, and make the changes you need, so you can spend your time on what you do best.",
        includes: ["Hosting and operation", "Security updates", "Changes whenever you need them"],
      },
    ],
  },

  process: {
    eyebrow: "Process",
    title: "A simple, predictable path from idea to finished website.",
    lead: "You always know what's happening, what comes next and what it costs.",
    listLabel: "The steps",
    steps: [
      {
        title: "Conversation",
        text: "We start with a no-obligation chat about your business, your goals and what the website should achieve.",
        you: "Tell us about your business and what you need.",
        we: "Listen, ask questions and give honest advice.",
      },
      {
        title: "Free proposal",
        text: `Within ${draftDays} business days you get a first draft of your website – completely free and without obligation.`,
        you: "Look at the proposal and tell us what to change.",
        we: "Build the proposal and adjust it until you are happy.",
      },
      {
        title: "Design and development",
        text: "We design and build the site. You see it along the way and give feedback before we move on.",
        you: "Send text, logo and images, and give feedback.",
        we: "Design, build and test on mobile and desktop.",
      },
      {
        title: "Launch",
        text: "If you are happy, we put the website live – only then do you pay. We show you how to update it.",
        you: "Share the website with your customers.",
        we: "Publish, train you and keep the site up to date.",
      },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    title: "One package. Everything included.",
    lead: `We build your website completely free and without obligation. If you are happy, you pay NOK ${prices.website} when it goes live – and NOK ${prices.hosting} a month for us to run and maintain it. No lock-in.`,
    packagesHeading: "The package",
    note: "If you are not happy, you pay nothing. If you want something completely new, like an online shop, you get a separate fixed-price quote first.",
    faqTitle: "About price and payment.",
    bundle: {
      name: "Website + hosting",
      badge: "All in one package",
      description:
        "A complete, professional website that we build for free – and then run, keep up to date and change for you afterwards.",
      steps: [
        { price: "0", label: "to build your website", note: "You see the result before you pay" },
        { price: prices.website, label: "when the website goes live", note: "One-off – only if you are happy" },
        { price: prices.hosting, label: "per month", note: "Hosting and maintenance · less than NOK 27 a day" },
      ],
      guarantee: {
        title: "You own the website",
        text: "If you cancel, you take the domain, texts and images with you, and we help you move.",
      },
      featuresTitle: "What's included",
      features: [
        `First draft within ${draftDays} business days`,
        "Custom design in your colours",
        "Works on mobile, tablet and desktop",
        "Contact form",
        "Basic search engine optimisation",
        "Hosting and operation",
        "Security updates",
        "Changes whenever you need them",
        "Training in updating content",
        "One dedicated contact",
        "You own the website, domain and content",
        "No lock-in – cancel anytime",
      ],
      cta: "Get a free proposal",
    },
    faq: [
      {
        q: "How much does it cost?",
        a: `It costs NOK 0 to have your website built. If you are happy and want it live, you pay NOK ${prices.website} once, and then NOK ${prices.hosting} a month for hosting and maintenance. No lock-in.`,
      },
      {
        q: `What do I get for NOK ${prices.hosting} a month?`,
        a: "We keep your website live, secure and up to date: hosting, security updates and the changes you need. Just let us know and we'll take care of it.",
      },
      {
        q: "What if I'm not happy?",
        a: "Then you pay nothing. You are not committed to anything until you choose to put the website live.",
      },
      {
        q: "Who owns the website?",
        a: "You do. The website, domain and content are yours. We run it for you – ownership always stays with you, even if you one day want to switch provider.",
      },
      {
        q: "Is there anything extra?",
        a: `No. NOK ${prices.website} when the site goes live and NOK ${prices.hosting} a month – that's it. If you want something completely new, like an online shop, you get a separate fixed-price quote first, and you decide whether you want it.`,
      },
      {
        q: "Can I cancel?",
        a: "Yes, whenever you like. There is no lock-in on the monthly price. If you cancel, you take the domain, texts and images with you, and we help you move the website.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: "A small studio with great care for the details.",
    sectionLabel: "About Senay Studio",
    paragraphs: [
      "Senay Studio helps businesses look professional online. We believe a good website should be fast, easy to use and clear about what you offer – not full of features nobody needs.",
      "When you work with us, you talk directly to the person who designs and builds your site. That means short decision paths, honest advice and a solution made for your business.",
    ],
    valuesHeading: "How we work",
    values: [
      { title: "Personal", text: "One dedicated contact from the first conversation to launch – and after." },
      { title: "Honest", text: "NOK 0 to build your website, no lock-in and no hidden fees." },
      { title: "Thorough", text: "Speed, accessibility and quality in every detail." },
    ],
  },

  faqGeneral: [
    {
      q: "Isn't Facebook or Instagram enough?",
      a: "Social media is great in addition, but you don't own the profile, and the algorithm decides who sees your posts. Many customers search on Google, not Facebook. A website is the place you control, and the one customers find when they search.",
    },
    {
      q: "I'm not technical. Can I manage this?",
      a: "Yes. We handle everything technical, and you get training in updating the content yourself. We make the changes for you – it's included in the hosting.",
    },
    {
      q: "What do you need from me?",
      a: "A little about your business, what you offer, and your logo and images if you have them. We figure out the rest together in the first conversation.",
    },
    {
      q: "How do we get started?",
      a: `Send a message through the contact page or by email. We'll have a no-obligation chat, and within ${draftDays} business days you'll get a free draft of your website.`,
    },
  ],

  contact: {
    eyebrow: "Contact",
    title: "Ready to be found?",
    lead: "Tell us briefly about your business and what you need. We'll get in touch for a no-obligation chat.",
    emailDirect: "You can also email us directly at",
    nextHeading: "What happens next?",
    nextSteps: [
      { title: "You send a message", text: "Through the form or by email – a couple of sentences is enough." },
      { title: "We get in touch", text: "We set up a no-obligation chat about what you need." },
      { title: "You get a free draft", text: `Within ${draftDays} business days – and you pay nothing until you want the site live.` },
    ],
    form: {
      company: "Company",
      contact: "Email or phone",
      name: "Name",
      optional: "(optional)",
      message: "What do you need help with?",
      submit: "Get a free draft",
      sending: "Sending …",
      sent: "Thank you! We have received your inquiry and will be in touch soon.",
      sentMailto: "Thank you! Your email app should now open with the message ready to send.",
      error: "Something went wrong and the message was not sent. Try again, or send us an email.",
      fallback: "You can also send the message directly to",
      copy: "Copy email address",
      copied: "Copied!",
      subject: "Inquiry from the website",
      bodyCompany: "Company",
      bodyContact: "Email or phone",
      bodyName: "Name",
      bodyMessage: "Message",
    },
  },

  cta: {
    title: "Get your website built – for free.",
    lead: `NOK 0 to build it. NOK ${prices.website} when it goes live, and NOK ${prices.hosting}/mo for hosting. No lock-in.`,
    primary: "Get a free proposal",
    secondary: "See what's included",
  },

  chat: {
    open: "Ask us",
    openLabel: "Open chat with Senay Studio's assistant",
    close: "Close chat",
    title: "Ask us anything about websites",
    subtitle: "Assistant · replies instantly",
    welcome:
      "Hi! I'm Senay Studio's assistant. Ask me about websites – price, domains, Google, design – and I'll answer right away.",
    suggestions: ["What does a website cost?", "How do I show up on Google?", "Do I need my own domain?"],
    placeholder: "Write your question …",
    send: "Send",
    inputLabel: "Your question",
    suggestionsLabel: "Suggested questions",
    thinking: "Writing …",
    disclaimer: "Automatic answers. For a specific quote, get in touch.",
    contact: "Contact a human",
    assistantLabel: "Assistant",
    youLabel: "You",
  },

  privacy: {
    eyebrow: "Privacy",
    title: "How we handle your data.",
    sections: [
      {
        title: "Who is responsible",
        text: "Senay Studio is responsible for processing personal data on this website. You can reach us at the email address at the bottom of the page.",
      },
      {
        title: "What we collect",
        text: "When you contact us, we receive your name, your email address, your company name if given, and your message. We only use this to reply to your inquiry and to follow up on any assignment.",
      },
      {
        title: "How the form works",
        text: "The contact form stores nothing on the website. It opens your email app with the message filled in, and you send it yourself.",
      },
      {
        title: "The chat assistant",
        text: "The chat assistant gives automatic answers and runs only in your browser. What you write is not sent to us or anyone else and is not stored – the conversation disappears when you close or reload the page.",
      },
      {
        title: "Cookies",
        text: "This website does not use cookies for tracking or advertising.",
      },
      {
        title: "How long we keep data",
        text: "We keep emails for as long as needed to reply to you and follow up on any assignment, and delete them when they are no longer needed.",
      },
      {
        title: "Your rights",
        text: "You can request access to, correction of or deletion of the data we hold about you. If you believe we process your data unlawfully, you can complain to the Norwegian Data Protection Authority (Datatilsynet).",
      },
    ],
  },

  notFound: {
    title: "Page not found.",
    text: "The link may be wrong, or the page has moved.",
    back: "Back to home",
  },
};
