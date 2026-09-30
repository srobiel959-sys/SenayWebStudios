import { getContent } from "@/content";
import { prices, site } from "@/content/shared";
import type { Lang } from "./routes";

const toNumber = (price: string) => Number(price.replace(/\s/g, ""));

export function businessSchema(lang: Lang) {
  const c = getContent(lang);
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    logo: `${site.url}/brand/icon-512.png`,
    image: `${site.url}/opengraph-image`,
    description: c.site.description,
    slogan: c.site.tagline,
    areaServed: { "@type": "Country", name: "Norge" },
    makesOffer: {
      "@type": "Offer",
      name: c.pricing.bundle.name,
      description: c.pricing.bundle.description,
      price: toNumber(prices.website),
      priceCurrency: "NOK",
      priceSpecification: [
        { "@type": "UnitPriceSpecification", price: toNumber(prices.website), priceCurrency: "NOK" },
        { "@type": "UnitPriceSpecification", price: toNumber(prices.hosting), priceCurrency: "NOK", unitCode: "MON" },
      ],
    },
  };
}

export function pricingFaqSchema(lang: Lang) {
  const c = getContent(lang);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.pricing.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
