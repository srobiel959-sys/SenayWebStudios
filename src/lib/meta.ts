import type { Metadata } from "next";
import { site } from "@/content/site";

// Metadata per side: tittel, beskrivelse og riktig kanonisk adresse.
export function pageMeta(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      url: path,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
    },
  };
}
