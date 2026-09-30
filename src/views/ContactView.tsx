import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { getContent, site } from "@/content";
import type { Lang } from "@/lib/routes";
import { container } from "@/lib/ui";

export function ContactView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { contact } = c;
  return (
    <section aria-labelledby="side-tittel" className="bg-navy text-cream">
      <div className={`${container} grid gap-16 py-20 sm:py-28 lg:grid-cols-12 lg:py-32`}>
        <div className="lg:col-span-5">
          <p className="hero-in text-sm font-medium uppercase tracking-[0.22em] text-cream-muted">{contact.eyebrow}</p>
          <h1 id="side-tittel" className="hero-in hero-in-2 mt-6 font-display text-[2.6rem] leading-[1.05] tracking-tight sm:text-6xl">
            {contact.title}
          </h1>
          <p className="hero-in hero-in-3 mt-8 text-lg leading-relaxed text-cream-muted">{contact.lead}</p>
          <p className="hero-in hero-in-3 mt-6 text-cream-muted">
            {contact.emailDirect}{" "}
            <a href={`mailto:${site.email}`} className="text-cream underline underline-offset-4">
              {site.email}
            </a>
          </p>

          <h2 className="mt-14 text-xs font-medium uppercase tracking-[0.2em] text-cream-muted">{contact.nextHeading}</h2>
          <ol className="mt-6 space-y-6">
            {contact.nextSteps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cream-muted/60 text-sm">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="mt-1 text-cream-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="rounded-2xl border border-cream-muted/25 bg-navy-soft/40 p-6 sm:p-10">
            <ContactForm labels={contact.form} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
