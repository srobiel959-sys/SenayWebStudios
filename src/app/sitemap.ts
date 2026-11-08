import type { MetadataRoute } from "next";
import { demos } from "@/content/demos";
import { site } from "@/content/shared";
import { allPageKeys, href, industryHref } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = allPageKeys.flatMap((key) =>
    (["no", "en"] as const).map((lang) => ({
      url: `${site.url}${href(lang, key)}`,
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : 0.7,
      alternates: {
        languages: { "nb-NO": `${site.url}${href("no", key)}`, en: `${site.url}${href("en", key)}` },
      },
    })),
  );
  // Egne sider per bransje («nettside for frisør»).
  const industries = demos.flatMap((d) =>
    (["no", "en"] as const).map((lang) => ({
      url: `${site.url}${industryHref(lang, d.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: { "nb-NO": `${site.url}${industryHref("no", d.slug)}`, en: `${site.url}${industryHref("en", d.slug)}` },
      },
    })),
  );
  return [...pages, ...industries];
}
