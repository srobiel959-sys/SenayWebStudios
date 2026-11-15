// English content. Same shape as no.ts (enforced by the Content type).

import type { Content } from "./no";
import { draftDays, lighthouse, prices } from "./shared";

export const en: Content = {
  site: {
    tagline: "Websites for businesses",
    description:
      "Senay Studio builds fast websites for businesses. We build your website for free. If you are happy, you pay NOK 4,599 when it goes live and NOK 799/mo for hosting. No lock-in.",
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
    homeLabel: "Senay Studio, home",
    mainMenu: "Main menu",
    mobileMenu: "Mobile menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    requestQuote: "Get a free draft",
    requestQuoteShort: "Free draft",
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
    whatYouWonder: "Common questions",
  },

  meta: {
    home: { title: "Senay Studio – Websites for businesses", description: "" },
    why: {
      title: "Why a website",
      description:
        "Customers search before they call. With a website, your business shows up when they look.",
    },
    demos: {
      title: "Examples",
      description: "Example websites for 30 industries, from hair salons and cafés to electricians and carpenters.",
    },
    services: {
      title: "Services",
      description: "Design, development, search visibility and hosting for your website, from one supplier.",
    },
    process: {
      title: "Process",
      description: "Four steps from the first conversation to a finished website. You know the price before we start.",
    },
    pricing: {
      title: "Pricing",
      description: `One package: NOK 0 to build your website, NOK ${prices.website} when it goes live and NOK ${prices.hosting}/mo for hosting and maintenance. No lock-in.`,
    },
    about: {
      title: "About",
      description:
        "Senay Studio builds fast websites for businesses. You deal with the same person all the way.",
    },
    contact: {
      title: "Contact",
      description: "Tell us briefly about your business and we'll get in touch about your new website.",
    },
    privacy: { title: "Privacy", description: "How Senay Studio handles personal data." },
  },

  hero: {
    title: "Customers google you.",
    titleAccent: "What do they find?",
    lead: "Type the name of your business and see what your website could look like.",
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
    hint: "The website updates as you type.",
    steps: ["Design", "Text", "Mobile", "Done"],
    srPreview: "Preview of the website for {navn}.",
    doneTitle: "This is a quick sketch.",
    doneText: `We build the real website for free within ${draftDays} business days.`,
    doneCta: "Build my website",
    contactMessage: "I would like a website like the sketch for {bransje}.",
  },
  industry: {
    eyebrow: "Website for {bransje}",
    title: "Website for {bransje}",
    lead: `We build your website for free. You get a draft within ${draftDays} business days and only pay if you want it live: NOK ${prices.website} at launch and NOK ${prices.hosting}/mo for hosting. No lock-in.`,
    metaDescription: `Website for {bransje}: free draft within ${draftDays} business days, NOK ${prices.website} at launch and NOK ${prices.hosting}/mo. No lock-in, and you own the site.`,
    primaryCta: "Get a free draft",
    needsTitle: "What your website should have",
    needsLead: "This is what customers look for when they find you on Google. We build it in from the start.",
    exampleTitle: "How it could look",
    exampleNote: "The business in the example is fictional. Your website is built from scratch.",
    openExample: "Open the example in full size",
    pricingTitle: "One package. Everything included.",
    otherTitle: "Other industries",
    footerTitle: "Industries",
    allIndustries: "All industries",
    needs: {
      beauty: ["Online booking, around the clock", "Treatments and prices in one place", "Photos that show the atmosphere", "Opening hours and directions"],
      health: ["Online booking or easy contact", "What you treat, explained simply", "Who works there", "Address, parking and opening hours"],
      food: ["A menu with prices that is easy to read", "Opening hours and where you are", "Table booking or ordering", "Photos of the food and the place"],
      trades: ["Your services explained briefly", "A form to request a quote", "Photos from jobs you have done", "Which areas you cover"],
      services: ["What you offer, and for whom", "An easy way to get in touch", "Who you are", "Answers to the most common questions"],
      retail: ["Your range shown with good photos", "Opening hours and where the shop is", "News and offers", "Contact and ordering"],
    },
  },
  proof: {
    title: "The scores for this website",
    lead: "We measure the websites we build with Google Lighthouse. This is how the page you are reading scores.",
    outOf: "out of 100",
    labels: { performance: "Performance", accessibility: "Accessibility", bestPractices: "Best practices", seo: "SEO" },
    note: `Measured on mobile on ${lighthouse.measured}.`,
  },
  story: {
    label: "How customers choose",
    query: "hairdresser near me",
    searchLabel: "Search",
    steps: [
      { kicker: "It's 8:14 pm", text: "A customer needs a hairdresser and searches on her phone." },
      { kicker: "Three seconds later", text: "She looks at the first results and picks one of them." },
      { kicker: "Your business", text: "You have no website, so you don't show up." },
      { kicker: "With a website", text: "Now you show up in the search, and she calls you." },
    ],
    results: [
      { name: "Salong Lykke", url: "salonglykke.no", text: "Hair salon in the city centre · Open now · Book online" },
      { name: "Klipp & Co", url: "klippogco.no", text: "Women's and men's cuts · Book online" },
      { name: "Hårstudio Nord", url: "harstudionord.no", text: "Colour, highlights and styling · Open until 9 pm" },
    ],
    you: { name: "Your business", missing: "No website found", url: "yourbusiness.no", text: "Your hair salon · Open now · Book online" },
    fictional: "Example with fictional businesses",
  },

  statement: "When people need what you offer, they search first. What they find decides who they call.",

  numbers: {
    title: "What it costs",
    items: [
      { value: 0, suffix: "", prefix: "NOK ", label: "to build your website" },
      { value: Number(prices.website.replace(/\s/g, "")), suffix: "", prefix: "NOK ", label: "when it goes live" },
      { value: Number(prices.hosting), suffix: "/mo", prefix: "NOK ", label: "for hosting and changes" },
    ],
    note: "No lock-in. You own the website.",
    link: "See what's included",
  },

  demos: {
    title: "Example websites",
    homeTitle: "Examples from 30 industries",
    homeLead: "The businesses are fictional. Your website is built from scratch.",
    lead: "Pick an industry. The businesses are fictional, and your website is built from scratch.",
    all: "All",
    open: "Open full size",
    choose: "Choose industry",
    showing: "Showing example for",
    fictional: "Example, fictional business",
    allExamples: "See all examples",
    bannerText: "This is an example made by Senay Studio. The business is fictional.",
    bannerCta: "Want a website like this?",
    backToExamples: "← All examples",
    count: "industries",
  },

  agencies: {
    title: "How we differ from a typical agency",
    others: {
      label: "",
      title: "Typical agency",
      items: [
        "Tens of thousands of kroner upfront before you see anything",
        "Weeks of waiting",
        "You pay before you know if it's any good",
        "Lock-in periods and long contracts",
        "The agency often owns your website",
      ],
    },
    us: {
      label: "",
      title: "Senay Studio",
      items: [
        "NOK 0 to get started",
        `First draft within ${draftDays} business days`,
        "You see the result before you pay",
        "No lock-in, no hidden fees",
        "You own the website, domain and content",
      ],
    },
    note: `We build your website for free. You pay NOK ${prices.website} only when it goes live, and then NOK ${prices.hosting}/mo for hosting.`,
    cta: "Get a free draft",
  },

  why: {
    eyebrow: "Why a website",
    title: "Why your business needs a website",
    lead: "People check businesses online before they buy. If you're not there, they choose someone who is.",
    reasonsHeading: "Four reasons",
    items: [
      {
        title: "Customers search before they call",
        text: "When someone needs what you offer, they start on Google. Without a website, it's your competitors who get found.",
      },
      {
        title: "A serious first impression",
        text: "A tidy website shows that your business is serious. A poor first impression costs you customers you never hear about.",
      },
      {
        title: "Answers when you are closed",
        text: "Your website answers the common questions and takes inquiries when you are busy or closed.",
      },
      {
        title: "You decide",
        text: "Facebook and Instagram are owned by others, and the algorithm decides who sees you. On your own website, you decide.",
      },
    ],
  },

  comparison: {
    title: "Without and with a website",
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
        "A tidy first impression",
        "Services, prices and contact details in one place",
        "Inquiries even when you are closed",
      ],
    },
    cta: "Get a free draft",
  },

  services: {
    title: "What we do",
    lead: "We build your website and keep it running afterwards. You deal with one supplier.",
    listLabel: "Our services",
    items: [
      {
        title: "Design",
        text: "A design that fits your business. Visitors should quickly see what you offer and how to get in touch.",
        includes: ["Design in your colours and style", "Clear structure and navigation", "Works on mobile, tablet and desktop"],
      },
      {
        title: "Development",
        text: "Pages load fast and work as well on a phone as on a computer.",
        includes: ["Fast loading", "Contact form", "Training in updating content"],
      },
      {
        title: "Search visibility",
        text: "Technical setup that helps Google understand your site, so you can be found when people search for what you offer.",
        includes: ["Correct structure and metadata", "Image and text when the site is shared", "Basic search engine optimisation"],
      },
      {
        title: "Hosting and care",
        text: "We keep the website live and up to date, and make the changes you ask for. The website is still yours.",
        includes: ["Hosting and operation", "Security updates", "Changes whenever you need them"],
      },
    ],
  },

  process: {
    title: "From the first conversation to a finished website",
    lead: "Four steps. You always know what comes next and what it costs.",
    listLabel: "The steps",
    steps: [
      {
        title: "Conversation",
        text: "We start with a chat about your business and what the website should do for you.",
        you: "Tell us about your business and what you need.",
        we: "Ask questions and tell you what we would do.",
      },
      {
        title: "Free draft",
        text: `Within ${draftDays} business days you get a first draft of your website. It is free and commits you to nothing.`,
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
        text: "If you are happy, we publish the website. Only then do you pay. We show you how to update it.",
        you: "Share the website with your customers.",
        we: "Publish, train you and keep the site up to date.",
      },
    ],
  },

  pricing: {
    title: "What it costs",
    lead: `We build your website for free. If you are happy, you pay NOK ${prices.website} when it goes live, and then NOK ${prices.hosting} a month for hosting and maintenance. No lock-in.`,
    packagesHeading: "The package",
    note: "If you are not happy, you pay nothing. If you want something completely new, like an online shop, you get a separate fixed-price quote first.",
    faqTitle: "Questions about price",
    bundle: {
      name: "Website + hosting",
      badge: "Hosting included",
      description:
        "We build your website for free and take care of hosting afterwards.",
      steps: [
        { price: "0", label: "to build your website", note: "You see the result before you pay" },
        { price: prices.website, label: "when the website goes live", note: "One-off, only if you are happy" },
        { price: prices.hosting, label: "per month", note: "Hosting and maintenance · less than NOK 27 a day" },
      ],
      guarantee: {
        title: "You own the website",
        text: "If you cancel, you take the domain, texts and images with you, and we help you move.",
      },
      featuresTitle: "What's included",
      featureGroups: [
        {
          title: "The website",
          items: [`First draft within ${draftDays} business days`, "A design made for you, in your colours", "Works on mobile, tablet and desktop", "Contact form"],
        },
        {
          title: "Hosting and peace of mind",
          items: ["Basic search engine optimisation", "Hosting and operation", "Security updates", "Changes whenever you need them"],
        },
        {
          title: "You and us",
          items: ["Training in updating content", "One dedicated contact", "You own the website, domain and content", "No lock-in, cancel anytime"],
        },
      ],
      cta: "Get a free draft",
    },
    faq: [
      {
        q: "How much does it cost?",
        a: `It costs NOK 0 to have your website built. If you are happy and want it live, you pay NOK ${prices.website} once, and then NOK ${prices.hosting} a month for hosting and maintenance. No lock-in.`,
      },
      {
        q: `What do I get for NOK ${prices.hosting} a month?`,
        a: "Hosting, security updates and the changes you need. Let us know and we'll take care of it.",
      },
      {
        q: "What if I'm not happy?",
        a: "Then you pay nothing. You are not committed to anything until you choose to put the website live.",
      },
      {
        q: "Who owns the website?",
        a: "You do. The website, domain and content are yours. We run it for you, but ownership stays with you, even if you one day want to switch provider.",
      },
      {
        q: "Is there anything extra?",
        a: `No. NOK ${prices.website} when the site goes live and NOK ${prices.hosting} a month. That's it. If you want something completely new, like an online shop, you get a separate fixed-price quote first, and you decide whether you want it.`,
      },
      {
        q: "Can I cancel?",
        a: "Yes, whenever you like. There is no lock-in on the monthly price. If you cancel, you take the domain, texts and images with you, and we help you move the website.",
      },
    ],
  },

  about: {
    title: "About Senay Studio",
    sectionLabel: "About Senay Studio",
    paragraphs: [
      "Senay Studio builds websites for businesses. A good website loads fast and says clearly what you offer. It rarely needs more.",
      "When you work with us, you talk directly to the person who designs and builds your site. When you ask something, the answer comes from the person doing the work.",
    ],
    valuesHeading: "How we work",
    values: [
      { title: "One contact", text: "You talk to the same person from the first conversation to launch, and after." },
      { title: "A known price", text: "NOK 0 to build your website, no lock-in and no hidden fees." },
      { title: "Measured quality", text: "We measure speed and accessibility on everything we build before it goes live." },
    ],
  },

  faqGeneral: [
    {
      q: "Isn't Facebook or Instagram enough?",
      a: "Social media works well alongside. But you don't own the profile, and the algorithm decides who sees your posts. Many people search on Google, not Facebook, and there it is your website they find.",
    },
    {
      q: "I'm not technical. Can I manage this?",
      a: "Yes. We handle the technical side. If you want something changed, we do it for you. It's included in the hosting. You can also get training and do it yourself.",
    },
    {
      q: "What do you need from me?",
      a: "A little about your business, what you offer, and your logo and images if you have them. We figure out the rest together in the first conversation.",
    },
    {
      q: "How do we get started?",
      a: `Send a message through the contact page or by email. We'll have a chat, and within ${draftDays} business days you'll get a free draft.`,
    },
  ],

  contact: {
    title: "Get in touch",
    lead: "Tell us briefly about your business and what you need, and we'll get in touch.",
    emailDirect: "You can also email us directly at",
    nextHeading: "What happens next?",
    nextSteps: [
      { title: "You send a message", text: "Through the form or by email. A couple of sentences is enough." },
      { title: "We get in touch", text: "We have a chat about what you need. It commits you to nothing." },
      { title: "You get a free draft", text: `Within ${draftDays} business days. You pay nothing until you want the site live.` },
    ],
    form: {
      company: "Company",
      contact: "Email or phone",
      name: "Name",
      optional: "(optional)",
      message: "What do you need help with?",
      submit: "Get a free draft",
      sending: "Sending …",
      sentButton: "Sent",
      contactInvalid: "Enter an email address (name@company.com) or a phone number with at least 8 digits.",
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
    title: "Get a free draft of your website",
    lead: `NOK 0 to build it. NOK ${prices.website} when it goes live, and NOK ${prices.hosting}/mo for hosting. No lock-in.`,
    primary: "Get a free draft",
    secondary: "See what's included",
  },

  chat: {
    open: "Ask us",
    openLabel: "Open chat with Senay Studio's assistant",
    close: "Close chat",
    title: "Ask about websites",
    subtitle: "Assistant · replies instantly",
    welcome:
      "Hi! I'm Senay Studio's assistant. Ask about price, domains, Google or design, and I'll answer right away.",
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
    title: "How we handle your data",
    sections: [
      {
        title: "Who is responsible",
        text: "Senay Studio is responsible for processing personal data on this website. You can reach us at the email address at the bottom of the page.",
      },
      {
        title: "What we collect",
        text: "When you contact us, we receive your company name, your email address or phone number, and your name and message if you give them. We only use this to reply to your inquiry and to follow up on any assignment.",
      },
      {
        title: "How the form works",
        text: "Messages from the contact form reach us by email through the service Formspree, or through your own email app. The website does not store them.",
      },
      {
        title: "The chat assistant",
        text: "The chat assistant gives automatic answers and runs only in your browser. What you write is not sent to us or anyone else and is not stored. The conversation disappears when you close or reload the page.",
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
    title: "Page not found",
    text: "The link may be wrong, or the page has moved.",
    back: "Back to home",
  },
};
