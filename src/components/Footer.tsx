import Link from "next/link";
import { nav, site } from "@/content/site";
import { container } from "@/lib/ui";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className={`${container} grid gap-12 border-t border-cream-muted/20 py-16 md:grid-cols-12`}>
        <div className="flex flex-col items-start gap-4 md:col-span-5">
          <Logo tone="light" loading="eager" className="h-8 w-auto" />
          <p className="text-xs uppercase tracking-[0.3em] text-cream-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Bunnmeny" className="md:col-span-3">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream-muted">Sider</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/" className="hover:underline hover:underline-offset-4">
                Forside
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cream-muted">Kontakt</h2>
          <p className="mt-4">
            <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-cream-muted">
              {site.email}
            </a>
          </p>
          <p className="mt-2">
            <Link href="/kontakt" className="hover:underline hover:underline-offset-4">
              Send en henvendelse →
            </Link>
          </p>
        </div>
      </div>

      <div className={`${container} flex flex-col gap-3 border-t border-cream-muted/20 py-6 text-sm text-cream-muted sm:flex-row sm:items-center sm:justify-between`}>
        <p>
          © {new Date().getFullYear()} {site.name}
          {site.orgNr ? ` · Org.nr. ${site.orgNr}` : null}
        </p>
        <Link href="/personvern" className="hover:text-cream hover:underline hover:underline-offset-4">
          Personvern
        </Link>
      </div>
    </footer>
  );
}
