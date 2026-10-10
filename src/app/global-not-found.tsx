import type { Metadata } from "next";
import Link from "next/link";
import { MainLogo } from "@/components/Logo";
import { bodoni, jost } from "@/lib/fonts";
import { btnPrimary } from "@/lib/ui";
import "./globals.css";

// 404 for adresser som ikke finnes i det hele tatt (to rot-layouter gjør at vi trenger denne).
export const metadata: Metadata = {
  title: "Siden finnes ikke | Senay Studio",
};

export default function GlobalNotFound() {
  return (
    <html lang="nb" className={`${bodoni.variable} ${jost.variable} h-full antialiased`}>
      <body className="h-full">
        <main className="flex min-h-full flex-col items-center justify-center px-5 py-24 text-center">
        <MainLogo tone="light" className="monogram-draw h-auto w-56" />
        <h1 className="mt-10 font-display text-5xl sm:text-6xl">Siden finnes ikke.</h1>
        <p className="mt-4 max-w-md text-lg text-ink-muted">
          Lenken kan være feil, eller siden er flyttet. <span lang="en">Page not found.</span>
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className={btnPrimary}>
            Til forsiden
          </Link>
          <Link href="/en" className="inline-flex items-center rounded-full border border-navy px-7 py-3.5 font-medium" lang="en">
            English
          </Link>
        </div>
        </main>
      </body>
    </html>
  );
}
