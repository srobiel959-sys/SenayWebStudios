import { getContent } from "@/content";
import { site } from "@/content/shared";
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
    makesOffer: c.pricing.packages.map((pkg, i) => ({
      "@type": "Offer",
      name: pkg.name,
      description: pkg.description,
      price: toNumber(pkg.price),
      priceCurrency: "NOK",
      ...(i === 1
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: toNumber(pkg.price),
              priceCurrency: "NOK",
              unitCode: "MON",
            },
          }
        : {}),
    })),
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
