"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Content } from "@/content";
import { href, navKeys, translatePath, type Lang } from "@/lib/routes";
import { Logo } from "./Logo";

function isActive(pathname: string, target: string) {
  return pathname === target || pathname.startsWith(`${target}/`);
}

export function Header({ lang, nav, ui }: { lang: Lang; nav: Content["nav"]; ui: Content["ui"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const other: Lang = lang === "no" ? "en" : "no";
  const switchHref = translatePath(pathname, other);
  const items = navKeys.map((key) => ({ key, href: href(lang, key), label: nav[key] }));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md supports-[backdrop-filter]:bg-cream/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:h-20 sm:px-8">
        <Link href={href(lang, "home")} aria-label={ui.homeLabel} onClick={close}>
          <Logo alt="" preload className="h-7 w-auto sm:h-8" />
        </Link>

        <nav aria-label={ui.mainMenu} className="hidden xl:block">
          <ul className="flex items-center gap-7 text-[0.95rem]">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative whitespace-nowrap py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-navy after:transition-transform after:duration-300 ${
                      active ? "after:scale-x-100" : "text-ink-muted hover:text-navy after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={switchHref}
            hrefLang={other === "no" ? "nb" : "en"}
            aria-label={ui.switchLanguageLabel}
            className="rounded-full border border-line px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-ink-muted transition-colors hover:border-navy hover:text-navy"
          >
            {other === "no" ? "NO" : "EN"}
          </Link>
          <Link
            href={href(lang, "contact")}
            className="hidden whitespace-nowrap rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-navy-soft sm:inline-block"
          >
            {ui.requestQuote}
          </Link>
          <button
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center xl:hidden"
            aria-expanded={open}
            aria-controls="mobilmeny"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? ui.closeMenu : ui.openMenu}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav id="mobilmeny" aria-label={ui.mobileMenu} hidden={!open} className="border-t border-line bg-cream xl:hidden">
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4 sm:px-8">
          {[...items, { key: "contact", href: href(lang, "contact"), label: nav.contact }].map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.key} className="border-b border-line last:border-b-0">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between py-4 font-display text-2xl ${active ? "" : "text-ink-muted"}`}
                  onClick={close}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-base">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
