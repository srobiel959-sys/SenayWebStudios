import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { getContent, site } from "@/content";
import type { Lang } from "@/lib/routes";
import { container, eyebrowPill } from "@/lib/ui";

export function ContactView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  const { contact } = c;
  return (
    <section aria-labelledby="side-tittel" className="bg-sand text-cream">
      <div className={`${container} grid gap-16 py-20 sm:py-28 lg:grid-cols-12 lg:py-32`}>
        <div className="lg:col-span-5">
          <p className={`hero-in ${eyebrowPill}`}>{contact.eyebrow}</p>
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
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-sm">
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
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5">
            <div className="rounded-[calc(2rem-0.375rem)] bg-[#0a1428] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] sm:p-10">
              <ContactForm labels={contact.form} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
