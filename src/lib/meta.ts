import type { Metadata } from "next";
import { getContent } from "@/content";
import { site } from "@/content/shared";
import { alternates, href, type Lang, type PageKey } from "./routes";

// Metadata per side og språk: tittel, beskrivelse, kanonisk adresse og språkversjoner.
export function pageMeta(lang: Lang, key: PageKey): Metadata {
  const c = getContent(lang);
  const m = c.meta[key];
  const description = m.description || c.site.description;
  const path = href(lang, key);
  return {
    title: key === "home" ? { absolute: m.title } : m.title,
    description,
    alternates: { canonical: path, languages: alternates(key) },
    openGraph: {
      type: "website",
      locale: c.site.locale,
      url: path,
      siteName: site.name,
      title: key === "home" ? m.title : `${m.title} | ${site.name}`,
      description,
    },
  };
}
