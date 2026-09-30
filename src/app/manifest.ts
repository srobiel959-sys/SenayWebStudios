import type { MetadataRoute } from "next";
import { no } from "@/content/no";
import { site } from "@/content/shared";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Senay Web",
    description: no.site.description,
    lang: "nb",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F5",
    theme_color: "#071630",
    icons: [
      { src: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
