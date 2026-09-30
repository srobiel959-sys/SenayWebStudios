// Alle sider på begge språk. Norsk ligger på roten, engelsk under /en.

export type Lang = "no" | "en";
export const langs: Lang[] = ["no", "en"];

export type PageKey =
  | "home"
  | "why"
  | "demos"
  | "services"
  | "process"
  | "pricing"
  | "about"
  | "contact"
  | "privacy";

const paths: Record<PageKey, Record<Lang, string>> = {
  home: { no: "/", en: "/en" },
  why: { no: "/hvorfor", en: "/en/why" },
  demos: { no: "/demoer", en: "/en/demos" },
  services: { no: "/tjenester", en: "/en/services" },
  process: { no: "/prosess", en: "/en/process" },
  pricing: { no: "/priser", en: "/en/pricing" },
  about: { no: "/om", en: "/en/about" },
  contact: { no: "/kontakt", en: "/en/contact" },
  privacy: { no: "/personvern", en: "/en/privacy" },
};

export function href(lang: Lang, key: PageKey) {
  return paths[key][lang];
}

export function demoHref(lang: Lang, slug: string) {
  return lang === "no" ? `/demo/${slug}` : `/en/demo/${slug}`;
}

/** Sidene i menyen, i rekkefølge. */
export const navKeys: PageKey[] = ["why", "demos", "services", "process", "pricing", "about"];

/** Samme side på det andre språket (brukes av språkvelgeren). */
export function translatePath(pathname: string, to: Lang): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  const demo = clean.match(/^(?:\/en)?\/demo\/([^/]+)$/);
  if (demo) return demoHref(to, demo[1]);
  for (const key of Object.keys(paths) as PageKey[]) {
    if (paths[key].no === clean || paths[key].en === clean) return paths[key][to];
  }
  return paths.home[to];
}

export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "no";
}

/** Alle sider med språkversjoner, til sitemap og hreflang. */
export const allPageKeys = Object.keys(paths) as PageKey[];
export function alternates(key: PageKey) {
  return { "nb-NO": paths[key].no, en: paths[key].en, "x-default": paths[key].no };
}
