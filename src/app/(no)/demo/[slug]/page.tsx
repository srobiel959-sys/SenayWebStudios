import type { Metadata } from "next";
import { demos, getDemo } from "@/content/demos";
import { demoHref } from "@/lib/routes";
import { DemoPageView } from "@/views/DemoPageView";

// Ukjente bransjer gir 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  return {
    title: demo ? `Eksempel: ${demo.label.no}` : "Siden finnes ikke",
    alternates: { canonical: demoHref("no", slug) },
    // Oppdiktede bedrifter skal ikke dukke opp i Google.
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DemoPageView lang="no" slug={slug} />;
}
