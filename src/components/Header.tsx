"use client";

import { useState } from "react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="Senay Web Studio – til toppen" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Hovedmeny" className="hidden md:block">
          <ul className="flex items-center gap-8 text-[0.95rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="underline-offset-8 hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#kontakt"
          className="hidden rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-navy-soft md:inline-block"
        >
          Be om tilbud
        </a>

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
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id="mobilmeny"
        aria-label="Mobilmeny"
        hidden={!open}
        className="border-t border-line bg-cream md:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block py-3 text-lg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
