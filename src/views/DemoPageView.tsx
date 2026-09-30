import Link from "next/link";
import { notFound } from "next/navigation";
import { DemoSite } from "@/components/demo/DemoSite";
import { getContent } from "@/content";
import { getDemo } from "@/content/demos";
import { href, type Lang } from "@/lib/routes";
import { container } from "@/lib/ui";

export function DemoPageView({ lang, slug }: { lang: Lang; slug: string }) {
  const demo = getDemo(slug);
  if (!demo) notFound();
  const c = getContent(lang);

  return (
    <>
      <div className="border-b border-line bg-sand">
        <div className={`${container} flex flex-col gap-3 py-4 text-sm sm:flex-row sm:items-center sm:justify-between`}>
          <Link href={href(lang, "demos")} className="font-medium hover:underline hover:underline-offset-4">
            {c.demos.backToExamples}
          </Link>
          <p className="text-ink-muted">
            <span className="font-medium text-navy">{demo.label[lang]}</span> · {c.demos.bannerText}
          </p>
          <Link href={href(lang, "contact")} className="font-medium underline underline-offset-4">
            {c.demos.bannerCta}
          </Link>
        </div>
      </div>
      <DemoSite demo={demo} fictionalLabel={c.demos.fictional} />
    </>
  );
}
