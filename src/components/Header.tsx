"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md supports-[backdrop-filter]:bg-cream/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link href="/" aria-label="Senay Web Studio – til forsiden" onClick={close}>
          <Logo alt="" priority className="h-7 w-auto sm:h-8" />
        </Link>

        <nav aria-label="Hovedmeny" className="hidden md:block">
          <ul className="flex items-center gap-9 text-[0.95rem]">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-navy after:transition-transform after:duration-300 ${
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

        <Link
          href="/kontakt"
          className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-navy-soft md:inline-block"
        >
          Be om tilbud
        </Link>

        <button
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobilmeny"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Lukk meny" : "Åpne meny"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <nav id="mobilmeny" aria-label="Mobilmeny" hidden={!open} className="border-t border-line bg-cream md:hidden">
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href} className="border-b border-line last:border-b-0">
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
          <li className="pt-4">
            <Link
              href="/kontakt"
              onClick={close}
              className="flex w-full items-center justify-center rounded-full bg-navy px-6 py-3.5 font-medium text-cream"
            >
              Be om tilbud
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
