import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { getContent, site } from "@/content";
import type { Lang } from "@/lib/routes";
import { card, container, kicker } from "@/lib/ui";

export function ContactView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { contact } = c;
  return (
    <section aria-labelledby="side-tittel" className="bg-sand">
      <div className={`${container} grid gap-10 py-12 sm:gap-16 sm:py-28 lg:grid-cols-12 lg:py-32`}>
        <div className="lg:col-span-5">
          <h1 id="side-tittel" className="hero-in font-display text-[2.25rem] leading-[1.08] tracking-tight sm:text-6xl sm:leading-[1.05]">
            {contact.title}
          </h1>
          <p className="hero-in hero-in-3 mt-8 text-lg leading-relaxed text-ink-muted">{contact.lead}</p>
          <p className="hero-in hero-in-3 mt-6 text-ink-muted">
            {contact.emailDirect}{" "}
            <a href={`mailto:${site.email}`} className="text-navy underline underline-offset-4">
              {site.email}
            </a>
          </p>

          <h2 className={`mt-14 ${kicker}`}>{contact.nextHeading}</h2>
          <ol className="mt-6 space-y-6">
            {contact.nextSteps.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-sm">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium">{step.title}</p>
                  <p className="mt-1 text-ink-muted">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <Reveal className="lg:col-span-7">
          <div className={`${card} p-6 sm:p-10`}>
            <ContactForm labels={contact.form} prefillMessage={c.builder.contactMessage} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
