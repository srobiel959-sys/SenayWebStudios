import type { Metadata } from "next";
import { getContent } from "@/content";
import { demos, getDemo } from "@/content/demos";
import { industryHref } from "@/lib/routes";
import { fillIndustry, IndustryView } from "@/views/IndustryView";

// Ukjente bransjer gir 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return { title: "Page not found" };
  const t = getContent("en").industry;
  return {
    title: fillIndustry(t.title, demo.label.en),
    description: fillIndustry(t.metaDescription, demo.label.en),
    alternates: {
      canonical: industryHref("en", slug),
      languages: { "nb-NO": industryHref("no", slug), en: industryHref("en", slug) },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <IndustryView lang="en" slug={slug} />;
}
