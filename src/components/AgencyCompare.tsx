import type { Content } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { container } from "@/lib/ui";
import { CompareCards } from "./CompareCards";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// «Andre byråer» mot «Senay Studio», side om side.

export function AgencyCompare({ lang, c }: { lang: Lang; c: Content }) {
  const a = c.agencies;
  return (
    <section aria-labelledby="byraer-tittel" className="border-t border-line py-28 sm:py-40">
      <div className={container}>
        <Reveal>
          <SectionHeading id="byraer-tittel" eyebrow={a.eyebrow} title={a.title} />
        </Reveal>

        <div className="mt-14">
          <CompareCards
            left={a.others}
            right={a.us}
            note={a.note}
            cta={a.cta}
            ctaHref={href(lang, "contact")}
            downside={c.ui.downside}
            upside={c.ui.upside}
          />
        </div>
      </div>
    </section>
  );
}
