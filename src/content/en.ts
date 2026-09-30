// English content. Same shape as no.ts (enforced by the Content type).

import type { Content } from "./no";
import { prices } from "./shared";

export const en: Content = {
  site: {
    tagline: "Websites for businesses",
    description:
      "Senay Web Studio builds fast, professional websites for businesses. We build your website for free – you pay NOK 4,599 only when you are happy and it goes live. Hosting NOK 799/mo, no lock-in.",
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
    homeLabel: "Senay Web Studio – home",
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
    home: { title: "Senay Web Studio – Websites for businesses", description: "" },
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
      description: `NOK 0 to build your website. NOK ${prices.website} only when you are happy and it goes live. Hosting NOK ${prices.hosting}/mo with no lock-in.`,
    },
    about: {
      title: "About",
      description:
        "Senay Web Studio is a small studio building fast, professional websites for businesses – with one dedicated contact all the way.",
    },
    contact: {
      title: "Contact",
      description: "Tell us briefly about your business and we'll get in touch for a no-obligation chat about your new website.",
    },
    privacy: { title: "Privacy", description: "How Senay Web Studio handles personal data." },
  },

  hero: {
    eyebrow: "Websites for businesses",
    title: "Your customers are looking for you online.",
    titleAccent: "Can they find you?",
    lead: "Before anyone calls you, they google you. We build fast, professional websites that help customers find you, trust you and get in touch.",
    primaryCta: "Get a free proposal",
    secondaryCta: "See examples",
    points: ["NOK 0 to build your website", `NOK ${prices.website} when it goes live`, "No lock-in"],
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
        text: `NOK 0 to build your website. NOK ${prices.website} when it goes live. Hosting NOK ${prices.hosting}/mo.`,
      },
      { key: "about", title: "About", text: "A small studio with one dedicated contact all the way." },
      { key: "contact", title: "Contact", text: "Tell us briefly what you need and we'll have a no-obligation chat." },
    ],
  },

  demos: {
    eyebrow: "Examples",
    title: "See what your website could look like.",
    lead: "Pick your industry and see an example. All businesses are fictional – your website is always built from scratch for you.",
    all: "All",
    open: "Open full size",
    choose: "Choose industry",
    showing: "Showing example for",
    fictional: "Example – fictional business",
    allExamples: "See all examples",
    bannerText: "This is an example made by Senay Web Studio. The business is fictional.",
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
      label: "Senay Web Studio",
      title: "How we do it",
      items: [
        "NOK 0 to get started – no obligation",
        "First proposal within a few days",
        "You see the result before you pay",
        "No lock-in, no hidden fees",
        "You own the website, domain and content",
      ],
    },
    note: `We build your website for free. If you are happy and want it live, you pay NOK ${prices.website} – not before.`,
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
      title: "With a website from Senay Web Studio",
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
        text: "Within a few days you get a first proposal for your website – completely free and without obligation.",
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
    title: "NOK 0 to build your website.",
    lead: "We build your website completely free and without obligation. You only pay when you are happy and want it live. No lock-in and no hidden fees.",
    packagesHeading: "Packages",
    note: "If you are not happy, you pay nothing. If you need something beyond the packages, you get a separate fixed-price quote before we start.",
    overview: "Overview",
    faqTitle: "About price and payment.",
    packages: [
      {
        name: "Website",
        price: prices.website,
        period: "when the site goes live",
        perDay: "NOK 0 to build it – you only pay if you want it live",
        description: "A complete, professional website – built for free, paid for only when you are happy.",
        features: [
          "First proposal within a few days",
          "Custom design in your colours",
          "Works on mobile, tablet and desktop",
          "Contact form",
          "Basic search engine optimisation",
          "Training in updating content",
          "You own the website, domain and content",
        ],
        cta: "Get a free proposal",
        highlighted: true,
      },
      {
        name: "Hosting",
        price: prices.hosting,
        period: "per month",
        perDay: "Less than NOK 27 a day · no lock-in",
        description: "The website is yours – we run it. We keep it live, secure and up to date, and make the changes you need.",
        features: ["Hosting and operation", "Security updates", "Changes whenever you need them", "One dedicated contact", "No lock-in – cancel anytime"],
        cta: "Add hosting",
        highlighted: false,
      },
    ],
    included: {
      title: "What's included?",
      rows: [
        { feature: "Free proposal before you decide", website: true, hosting: false },
        { feature: "Custom design", website: true, hosting: false },
        { feature: "Works on mobile, tablet and desktop", website: true, hosting: false },
        { feature: "Contact form", website: true, hosting: false },
        { feature: "Basic search engine optimisation", website: true, hosting: false },
        { feature: "Training in updating content", website: true, hosting: false },
        { feature: "Hosting", website: false, hosting: true },
        { feature: "Security updates", website: false, hosting: true },
        { feature: "Changes whenever you need them", website: false, hosting: true },
        { feature: "You own the website", website: true, hosting: true },
        { feature: "One dedicated contact", website: true, hosting: true },
        { feature: "No lock-in", website: true, hosting: true },
      ],
    },
    faq: [
      {
        q: "How much does it cost?",
        a: `It costs NOK 0 to have your website built. If you are happy and want it live, you pay NOK ${prices.website} once. If you'd like us to host and look after it, that's NOK ${prices.hosting} per month – with no lock-in.`,
      },
      {
        q: "What if I'm not happy?",
        a: "Then you pay nothing. You are not committed to anything until you choose to put the website live.",
      },
      {
        q: "Who owns the website?",
        a: "You do. The website, domain and content are yours. With Hosting, we take care of running it for you – ownership always stays with you, even if you one day want to switch provider.",
      },
      {
        q: "Is there anything extra?",
        a: "No. The price you see is the price you pay. If you need something beyond the packages, you get a separate fixed-price quote before we start – and you decide whether you want it.",
      },
      {
        q: "What's the difference between Website and Hosting?",
        a: "Website is the job itself: design, development and launch, paid once. Hosting is what happens afterwards: we run your website, keep it up to date and make the changes you need, for a fixed monthly price.",
      },
      {
        q: "What if I want to change something later?",
        a: "With Hosting, just let us know and we make the changes for you – it's included in the monthly price. If you want something completely new, like an online shop, you get a separate fixed-price quote first.",
      },
    ],
  },

  about: {
    eyebrow: "About",
    title: "A small studio with great care for the details.",
    sectionLabel: "About Senay Web Studio",
    paragraphs: [
      "Senay Web Studio helps businesses look professional online. We believe a good website should be fast, easy to use and clear about what you offer – not full of features nobody needs.",
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
      a: "Yes. We handle everything technical, and you get training in updating the content yourself. With Hosting, we make the changes for you.",
    },
    {
      q: "What do you need from me?",
      a: "A little about your business, what you offer, and your logo and images if you have them. We figure out the rest together in the first conversation.",
    },
    {
      q: "How do we get started?",
      a: "Send a message through the contact page or by email. We'll have a no-obligation chat, and within a few days you'll get a free proposal for your website.",
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
      { title: "You get a free proposal", text: "Within a few days – and you pay nothing until you want the site live." },
    ],
    form: {
      name: "Name",
      email: "Email",
      company: "Company",
      optional: "(optional)",
      message: "What do you need help with?",
      submit: "Send inquiry",
      sent: "Thank you! Your email app should now open with the message ready to send.",
      fallback: "Nothing opened? Send the message directly to",
      copy: "Copy email address",
      copied: "Copied!",
      subject: "Inquiry from the website",
      bodyName: "Name",
      bodyEmail: "Email",
      bodyCompany: "Company",
    },
  },

  cta: {
    title: "Get your website built – for free.",
    lead: `NOK 0 to build it. NOK ${prices.website} only when you are happy and want it live. No lock-in.`,
    primary: "Get a free proposal",
    secondary: "See what's included",
  },

  privacy: {
    eyebrow: "Privacy",
    title: "How we handle your data.",
    sections: [
      {
        title: "Who is responsible",
        text: "Senay Web Studio is responsible for processing personal data on this website. You can reach us at the email address at the bottom of the page.",
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
