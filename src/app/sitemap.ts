import type { MetadataRoute } from "next";
import { site } from "@/content/shared";
import { allPageKeys, href } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return allPageKeys.flatMap((key) =>
    (["no", "en"] as const).map((lang) => ({
      url: `${site.url}${href(lang, key)}`,
      changeFrequency: "monthly" as const,
      priority: key === "home" ? 1 : 0.7,
      alternates: {
        languages: { "nb-NO": `${site.url}${href("no", key)}`, en: `${site.url}${href("en", key)}` },
      },
    })),
  );
}
