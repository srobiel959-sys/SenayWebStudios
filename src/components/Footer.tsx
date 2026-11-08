import Link from "next/link";
import type { Content } from "@/content";
import { getDemo } from "@/content/demos";
import { site } from "@/content/shared";
import { href, industryHref, navKeys, type Lang } from "@/lib/routes";
import { container } from "@/lib/ui";
import { MainLogo } from "./Logo";

/** Bransjene som lenkes fra footeren. */
const footerIndustries = ["frisor", "tannlege", "restaurant", "elektriker", "rorlegger", "tomrer"];

export function Footer({ lang, c }: { lang: Lang; c: Content }) {
  return (
    <footer className="bg-navy text-cream">
      <div className={`${container} grid gap-12 py-16 md:grid-cols-12`}>
        <div className="flex flex-col items-start gap-4 md:col-span-3">
          {/* Hovedlogoen (med tagline). Krem-varianten, fordi footeren har mørk bakgrunn. */}
          <MainLogo tone="light" loading="eager" className="h-auto w-56" />
        </div>

        <nav aria-label={c.ui.footerMenu} className="md:col-span-3">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream-muted">{c.ui.footerPages}</h2>
          <ul className="mt-4 space-y-2">
            {(["home", ...navKeys, "contact"] as const).map((key) => (
              <li key={key}>
                <Link href={href(lang, key)} className="hover:underline hover:underline-offset-4">
                  {c.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={c.industry.footerTitle} className="md:col-span-3">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream-muted">{c.industry.footerTitle}</h2>
          <ul className="mt-4 space-y-2">
            {footerIndustries.map((slug) => {
              const demo = getDemo(slug);
              return demo ? (
                <li key={slug}>
                  <Link href={industryHref(lang, slug)} className="hover:underline hover:underline-offset-4">
                    {demo.label[lang]}
                  </Link>
                </li>
              ) : null;
            })}
            <li>
              <Link href={href(lang, "demos")} className="hover:underline hover:underline-offset-4">
                {c.industry.allIndustries} →
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream-muted">{c.ui.footerContact}</h2>
          <p className="mt-4">
            <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-cream-muted">
              {site.email}
            </a>
          </p>
          <p className="mt-2">
            <Link href={href(lang, "contact")} className="hover:underline hover:underline-offset-4">
              {c.ui.sendInquiry}
            </Link>
          </p>
        </div>
      </div>

      <div
        className={`${container} flex flex-col gap-3 border-t border-cream-muted/20 py-6 text-sm text-cream-muted sm:flex-row sm:items-center sm:justify-between`}
      >
        <p>
          © {new Date().getFullYear()} {site.name}
          {site.orgNr ? ` · ${c.ui.orgNr} ${site.orgNr}` : null}
        </p>
        <Link href={href(lang, "privacy")} className="hover:text-cream hover:underline hover:underline-offset-4">
          {c.nav.privacy}
        </Link>
      </div>
    </footer>
  );
}
