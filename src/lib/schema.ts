import { faqPricing, packages, site } from "@/content/site";

const toNumber = (price: string) => Number(price.replace(/\s/g, ""));

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    logo: `${site.url}/brand/icon-512.png`,
    image: `${site.url}/opengraph-image`,
    description: site.description,
    slogan: site.tagline,
    areaServed: { "@type": "Country", name: "Norge" },
    makesOffer: packages.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      description: pkg.description,
      price: toNumber(pkg.price),
      priceCurrency: "NOK",
      ...(pkg.period === "per måned"
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

export function pricingFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPricing.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
