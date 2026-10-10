"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Content } from "@/content";
import { href, navKeys, translatePath, type Lang } from "@/lib/routes";
import { ease } from "@/lib/ui";
import { Logo } from "./Logo";

// Flytende «glasspille»-meny. På mobil åpnes en meny over hele skjermen der
// lenkene glir inn etter hverandre, og hamburgeren blir til et kryss.

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
  const mobileItems = [...items, { key: "contact", href: href(lang, "contact"), label: nav.contact }];

  // Lås scrollingen bak menyen, og lukk den med Esc.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`sticky top-0 px-3 pt-3 sm:px-5 sm:pt-4 ${open ? "z-[60]" : "z-40"}`}>
      <div className="relative z-10 mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 rounded-full border border-white/10 bg-[#050d1a]/75 pl-5 pr-2 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:h-16 sm:pl-7">
        <Link href={href(lang, "home")} aria-label={ui.homeLabel} onClick={close}>
          <Logo alt="" tone="light" preload className="h-6 w-auto sm:h-7" />
        </Link>

        <nav aria-label={ui.mainMenu} className="hidden xl:block">
          <ul className="flex items-center gap-1 text-[0.95rem]">
            {items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`whitespace-nowrap rounded-full px-3.5 py-2 transition-colors duration-300 ${
                      active ? "bg-white/10 text-white" : "text-ink-muted hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            hrefLang={other === "no" ? "nb" : "en"}
            aria-label={ui.switchLanguageLabel}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-ink-muted transition-colors hover:border-white/30 hover:text-white"
          >
            {other === "no" ? "NO" : "EN"}
          </Link>
          <Link
            href={href(lang, "contact")}
            className={`hidden whitespace-nowrap rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream transition-[background-color,scale] duration-500 ${ease} hover:bg-navy-soft active:scale-[0.97] sm:inline-block`}
          >
            {ui.requestQuote}
          </Link>
          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full xl:hidden"
            aria-expanded={open}
            aria-controls="mobilmeny"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? ui.closeMenu : ui.openMenu}</span>
            <span
              aria-hidden="true"
              className={`absolute h-px w-5 bg-current transition-transform duration-500 ${ease} ${open ? "rotate-45" : "-translate-y-1"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute h-px w-5 bg-current transition-transform duration-500 ${ease} ${open ? "-rotate-45" : "translate-y-1"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobilmeny over hele skjermen */}
      <nav
        id="mobilmeny"
        aria-label={ui.mobileMenu}
        inert={!open}
        className={`fixed inset-0 bg-[#050d1a]/95 px-6 pt-28 backdrop-blur-2xl transition-opacity duration-500 xl:hidden ${ease} ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="mx-auto flex max-w-xl flex-col">
          {mobileItems.map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <li
                key={item.key}
                className={`border-b border-white/10 transition-[opacity,translate] duration-700 ${ease} ${
                  open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between py-4 font-display text-3xl ${active ? "text-white" : "text-ink-muted"}`}
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
