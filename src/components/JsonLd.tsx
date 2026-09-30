// Strukturerte data (schema.org) som hjelper Google å forstå hvem vi er og hva vi tilbyr.

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // «<» escapes slik at innholdet aldri kan avslutte script-taggen.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
