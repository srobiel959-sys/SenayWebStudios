import { PageHero } from "@/components/PageHero";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";
import { container } from "@/lib/ui";

// TODO: Les gjennom og tilpass før lansering.

export const metadata = pageMeta("Personvern", `Slik behandler ${site.name} personopplysninger.`, "/personvern");

export default function PersonvernPage() {
  return (
    <>
      <PageHero eyebrow="Personvern" title="Slik behandler vi opplysningene dine." />
      <section className="py-16 sm:py-24">
        <div className={`${container} max-w-3xl space-y-10 text-lg leading-relaxed text-ink-muted [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-navy`}>
          <div>
            <h2>Hvem er ansvarlig</h2>
            <p className="mt-3">
              {site.name} er ansvarlig for behandlingen av personopplysninger på denne nettsiden. Du når oss på{" "}
              <a href={`mailto:${site.email}`} className="text-navy underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          </div>
          <div>
            <h2>Hva vi samler inn</h2>
            <p className="mt-3">
              Når du tar kontakt, får vi navnet ditt, e-postadressen din, eventuelt bedriftsnavn og meldingen du skriver. Vi
              bruker opplysningene kun til å svare på henvendelsen din og til å følge opp et eventuelt oppdrag.
            </p>
          </div>
          <div>
            <h2>Hvordan skjemaet fungerer</h2>
            <p className="mt-3">
              Kontaktskjemaet lagrer ingenting på nettsiden. Det åpner e-postprogrammet ditt med meldingen ferdig utfylt, og du
              sender den selv.
            </p>
          </div>
          <div>
            <h2>Informasjonskapsler</h2>
            <p className="mt-3">Nettsiden bruker ikke informasjonskapsler (cookies) til sporing eller annonser.</p>
          </div>
          <div>
            <h2>Hvor lenge vi lagrer</h2>
            <p className="mt-3">
              Vi beholder e-poster så lenge det er nødvendig for å svare deg og følge opp et eventuelt oppdrag, og sletter dem
              når de ikke lenger trengs.
            </p>
          </div>
          <div>
            <h2>Dine rettigheter</h2>
            <p className="mt-3">
              Du kan be om innsyn i, retting av eller sletting av opplysningene vi har om deg. Send en e-post til{" "}
              <a href={`mailto:${site.email}`} className="text-navy underline underline-offset-4">
                {site.email}
              </a>
              . Mener du at vi behandler opplysningene dine i strid med regelverket, kan du klage til Datatilsynet.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
