import { ContactForm } from "@/components/ContactForm";
import { Header } from "@/components/Header";
import { Logo, Monogram } from "@/components/Logo";
import { SectionHeading } from "@/components/SectionHeading";
import { about, comparison, contact, faq, hero, nav, pricing, process, services, site, why } from "@/content/site";

const container = "mx-auto max-w-6xl px-5 sm:px-8";

export default function Home() {
  return (
    <>
      <a
        href="#innhold"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-cream"
      >
        Hopp til innhold
      </a>
      <Header />

      <main id="innhold" className="flex-1">
        {/* Hero */}
        <section id="top" aria-labelledby="hero-tittel" className="border-b border-line">
          <div className={`${container} grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:py-32`}>
            <div className="lg:col-span-8">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-ink-muted">
                {hero.eyebrow}
              </p>
              <h1
                id="hero-tittel"
                className="mt-6 font-display text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              >
                {hero.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
                {hero.lead}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <a
                  href={hero.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-full bg-navy px-7 py-3.5 font-medium text-cream transition-colors hover:bg-navy-soft"
                >
                  {hero.primaryCta.label}
                </a>
                <a
                  href={hero.secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-full border border-navy px-7 py-3.5 font-medium transition-colors hover:bg-navy hover:text-cream"
                >
                  {hero.secondaryCta.label}
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-10 border-t border-line pt-10 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <Monogram className="hidden h-auto w-44 self-center lg:block xl:w-52" />
              <ul className="flex flex-col gap-4">
                {hero.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-lg">
                    <span aria-hidden="true" className="h-px w-6 bg-navy" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Hvorfor nettside */}
        <section id="hvorfor" aria-labelledby="hvorfor-tittel" className="py-20 sm:py-28">
          <div className={container}>
            <SectionHeading id="hvorfor-tittel" eyebrow={why.eyebrow} title={why.title} lead={why.lead} />
            <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {why.items.map((item) => (
                <li key={item.title} className="border-t border-navy pt-6">
                  <h3 className="font-display text-2xl leading-snug">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Uten / med nettside */}
        <section aria-labelledby="forskjell-tittel" className="border-y border-line bg-sand py-20 sm:py-28">
          <div className={container}>
            <SectionHeading id="forskjell-tittel" eyebrow={comparison.eyebrow} title={comparison.title} />
            <div className="mt-14 grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-line bg-cream p-8 sm:p-10">
                <h3 className="font-display text-2xl">{comparison.without.title}</h3>
                <ul className="mt-6 space-y-4">
                  {comparison.without.items.map((item) => (
                    <li key={item} className="flex gap-3 text-ink-muted">
                      <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0" aria-hidden="true">
                        <path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                      <span>
                        <span className="sr-only">Ulempe: </span>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-navy p-8 text-cream sm:p-10">
                <h3 className="font-display text-2xl">{comparison.with.title}</h3>
                <ul className="mt-6 space-y-4">
                  {comparison.with.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0" aria-hidden="true">
                        <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                      <span>
                        <span className="sr-only">Fordel: </span>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={comparison.cta.href}
                  className="mt-10 inline-flex items-center justify-center rounded-full bg-cream px-7 py-3.5 font-medium text-navy transition-colors hover:bg-sand"
                >
                  {comparison.cta.label}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Tjenester */}
        <section id="tjenester" aria-labelledby="tjenester-tittel" className="py-20 sm:py-28">
          <div className={container}>
            <SectionHeading id="tjenester-tittel" eyebrow={services.eyebrow} title={services.title} />
            <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {services.items.map((item, i) => (
                <li key={item.title} className="bg-cream p-8 sm:p-10">
                  <span className="font-display text-sm text-ink-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prosess */}
        <section id="prosess" aria-labelledby="prosess-tittel" className="bg-navy py-20 text-cream sm:py-28">
          <div className={container}>
            <SectionHeading id="prosess-tittel" eyebrow={process.eyebrow} title={process.title} tone="dark" />
            <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              {process.steps.map((step, i) => (
                <li key={step.title} className="border-t border-cream-muted/40 pt-6">
                  <span className="font-display text-4xl" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-xl font-medium">
                    <span className="sr-only">Steg {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-cream-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pakker */}
        <section id="pakker" aria-labelledby="pakker-tittel" className="py-20 sm:py-28">
          <div className={container}>
            <SectionHeading id="pakker-tittel" eyebrow={pricing.eyebrow} title={pricing.title} lead={pricing.lead} />
            <ul className="mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
              {pricing.packages.map((pkg) => (
                <li
                  key={pkg.name}
                  className={`flex flex-col rounded-xl border p-8 ${
                    pkg.highlighted ? "border-navy bg-navy text-cream" : "border-line bg-cream"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-2xl">{pkg.name}</h3>
                    {pkg.highlighted ? (
                      <span className="rounded-full border border-cream-muted/60 px-3 py-1 text-xs uppercase tracking-wider">
                        Start her
                      </span>
                    ) : null}
                  </div>
                  <p className={`mt-3 leading-relaxed ${pkg.highlighted ? "text-cream-muted" : "text-ink-muted"}`}>
                    {pkg.description}
                  </p>
                  {pkg.price ? (
                    <p className="mt-8 flex items-baseline gap-2">
                      <span className="text-sm">kr</span>
                      <span className="text-4xl font-medium tracking-tight">{pkg.price}</span>
                      <span className={`text-sm ${pkg.highlighted ? "text-cream-muted" : "text-ink-muted"}`}>
                        {pkg.period}
                      </span>
                    </p>
                  ) : null}
                  {pkg.price && pkg.perDay ? (
                    <p className={`mt-2 text-sm ${pkg.highlighted ? "text-cream-muted" : "text-ink-muted"}`}>
                      {pkg.perDay}
                    </p>
                  ) : null}
                  {pkg.price ? null : (
                    <p className="mt-8 flex items-baseline gap-2">
                      <span className="font-display text-3xl">Pris på forespørsel</span>
                    </p>
                  )}
                  <ul className="mt-8 flex-1 space-y-3 border-t border-current/15 pt-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0" aria-hidden="true">
                          <path d="M4 10.5l4 4 8-9" fill="none" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#kontakt"
                    className={`mt-10 inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-colors ${
                      pkg.highlighted
                        ? "bg-cream text-navy hover:bg-sand"
                        : "border border-navy hover:bg-navy hover:text-cream"
                    }`}
                  >
                    Velg {pkg.name}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-ink-muted">{pricing.note}</p>
          </div>
        </section>

        {/* Om */}
        <section id="om" aria-labelledby="om-tittel" className="border-t border-line bg-sand py-20 sm:py-28">
          <div className={`${container} grid gap-12 lg:grid-cols-12`}>
            <div className="lg:col-span-6">
              <SectionHeading id="om-tittel" eyebrow={about.eyebrow} title={about.title} />
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-ink-muted lg:col-span-6 lg:pt-10">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ul className="grid gap-8 border-t border-line pt-10 sm:grid-cols-3 lg:col-span-12">
              {about.values.map((value) => (
                <li key={value.title}>
                  <h3 className="font-display text-2xl">{value.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{value.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Spørsmål */}
        <section id="sporsmal" aria-labelledby="sporsmal-tittel" className="py-20 sm:py-28">
          <div className={`${container} grid gap-12 lg:grid-cols-12`}>
            <div className="lg:col-span-4">
              <SectionHeading id="sporsmal-tittel" eyebrow={faq.eyebrow} title={faq.title} />
            </div>
            <div className="divide-y divide-line border-y border-line lg:col-span-8">
              {faq.items.map((item) => (
                <details key={item.q} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl sm:text-2xl [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <svg
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="mt-1.5 h-5 w-5 shrink-0 transition-transform group-open:rotate-45"
                    >
                      <path d="M10 3v14M3 10h14" fill="none" stroke="currentColor" strokeWidth="1.6" />
                    </svg>
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Kontakt */}
        <section id="kontakt" aria-labelledby="kontakt-tittel" className="bg-navy py-20 text-cream sm:py-28">
          <div className={`${container} grid gap-12 lg:grid-cols-12`}>
            <div className="lg:col-span-5">
              <SectionHeading
                id="kontakt-tittel"
                eyebrow={contact.eyebrow}
                title={contact.title}
                lead={contact.lead}
                tone="dark"
              />
              <p className="mt-8 text-cream-muted">
                Du kan også sende e-post direkte til{" "}
                <a href={`mailto:${site.email}`} className="text-cream underline underline-offset-4">
                  {site.email}
                </a>
              </p>
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-cream">
        <div className={`${container} flex flex-col gap-8 border-t border-cream-muted/30 py-12 md:flex-row md:items-center md:justify-between`}>
          <div className="flex flex-col items-start gap-3">
            <Logo tone="light" className="h-8 w-auto" />
            <p className="text-xs uppercase tracking-[0.3em] text-cream-muted">Nettsider for bedrifter</p>
          </div>
          <nav aria-label="Bunnmeny">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-cream-muted">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="hover:text-cream hover:underline">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm text-cream-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </footer>
    </>
  );
}
