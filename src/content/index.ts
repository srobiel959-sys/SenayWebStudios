import type { Lang } from "@/lib/routes";
import { en } from "./en";
import { no, type Content } from "./no";

export type { Content };
export { prices, site } from "./shared";

export function getContent(lang: Lang): Content {
  return lang === "en" ? en : no;
}
