import type { Metadata, Viewport } from "next";
import { getContent, site } from "@/content";
import { bodoni, jost } from "@/lib/fonts";
import type { Lang } from "@/lib/routes";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "../app/globals.css";

// Felles rot-layout for begge språk. Hvert språk har sin egen rot-layout
// (app/(no) og app/(en)), så <html lang> alltid er riktig.

export function rootMetadata(lang: Lang): Metadata {
  const c = getContent(lang);
  const title = `${site.name} – ${c.site.tagline}`;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}` },
    description: c.site.description,
    applicationName: site.name,
    openGraph: { type: "website", locale: c.site.locale, siteName: site.name, title, description: c.site.description },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

export const rootViewport: Viewport = { themeColor: "#071630" };

export function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const c = getContent(lang);
  return (
    <html lang={lang === "no" ? "nb" : "en"} className={`${bodoni.variable} ${jost.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#innhold"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-cream"
        >
          {c.ui.skipToContent}
        </a>
        <Header lang={lang} nav={c.nav} ui={c.ui} />
        <main id="innhold" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} c={c} />
      </body>
    </html>
  );
}
