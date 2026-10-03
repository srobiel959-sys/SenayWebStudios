import Link from "next/link";
import { MainLogo } from "@/components/Logo";
import { getContent } from "@/content";
import { href, type Lang } from "@/lib/routes";
import { btnPrimary, container } from "@/lib/ui";

export function NotFoundView({ lang }: { lang: Lang }) {
  const c = getContent(lang);
  return (
    <section className={`${container} flex min-h-[70svh] flex-col items-center justify-center py-24 text-center`}>
      <MainLogo className="monogram-draw h-auto w-56" />
      <h1 className="mt-10 font-display text-5xl sm:text-6xl">{c.notFound.title}</h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">{c.notFound.text}</p>
      <Link href={href(lang, "home")} className={`${btnPrimary} mt-10`}>
        {c.notFound.back}
      </Link>
    </section>
  );
}
