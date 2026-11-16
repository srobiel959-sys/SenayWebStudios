import { notFound } from "next/navigation";

// Adresser under /en som ikke finnes: vis den engelske 404-siden ((en)/not-found.tsx)
// i stedet for den tospråklige global-not-found.
export default function MissingPage() {
  notFound();
}
