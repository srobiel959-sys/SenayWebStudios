import type { Metadata } from "next";
import { getContent } from "@/content";
import { site } from "@/content/shared";
import { alternates, href, type Lang, type PageKey } from "./routes";

/** Delingsbildet (logoen på mørkeblå bunn) som vises når en lenke deles i WhatsApp, Messenger, Slack osv.
    Ligger fast i public/og/, ett per språk. Hver side må ta det med selv, fordi en side som setter
    egne delingsdata, overskriver det den arver. */
export function shareImage(lang: Lang) {
  const c = getContent(lang);
  return { url: `/og/${lang}.png`, width: 1200, height: 630, alt: `${site.name} – ${c.site.tagline}` };
}

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
      images: [shareImage(lang)],
    },
    twitter: { card: "summary_large_image", images: [shareImage(lang).url] },
  };
}
