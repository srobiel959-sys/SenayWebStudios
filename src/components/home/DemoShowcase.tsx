import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { demoPhotos } from "@/content/demo-photos";
import { getDemo } from "@/content/demos";
import { demoHref, type Lang } from "@/lib/routes";

// Fem eksempelsider vist som store bilder på forsiden. Den første er størst.
const featured = ["restaurant", "blomsterbutikk", "tannlege", "tomrer", "kafe"];

// Plassen hver rute får: én stor og én smal øverst, tre like under. På mobil: én bred, så to og to.
const layout = [
  { cell: "col-span-2 lg:col-span-7", shape: "aspect-[16/10]", sizes: "(min-width: 1024px) 58vw, 100vw" },
  { cell: "lg:col-span-5", shape: "aspect-square lg:aspect-auto", sizes: "(min-width: 1024px) 42vw, 50vw" },
  { cell: "lg:col-span-4", shape: "aspect-square lg:aspect-[4/3]", sizes: "(min-width: 1024px) 33vw, 50vw" },
  { cell: "lg:col-span-4", shape: "aspect-square lg:aspect-[4/3]", sizes: "(min-width: 1024px) 33vw, 50vw" },
  { cell: "lg:col-span-4", shape: "aspect-square lg:aspect-[4/3]", sizes: "(min-width: 1024px) 33vw, 50vw" },
];

export function DemoShowcase({ lang }: { lang: Lang }) {
  const tiles = featured.flatMap((slug) => {
    const demo = getDemo(slug);
    const photo = demoPhotos[slug]?.hero;
    return demo && photo ? [{ demo, photo }] : [];
  });

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12">
      {tiles.map(({ demo, photo }, i) => {
        const { cell, shape, sizes } = layout[i];
        return (
          <li key={demo.slug} className={cell}>
            <Reveal delay={(i % 3) * 90} className="h-full">
              <Link
                href={demoHref(lang, demo.slug)}
                className={`group relative block h-full overflow-hidden rounded-3xl bg-navy text-cream ${shape}`}
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes={sizes}
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 motion-reduce:group-hover:scale-100"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-transparent" aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-6">
                  <span>
                    <span className="block text-sm text-cream-muted">{demo.label[lang]}</span>
                    <span className="mt-1 block font-display text-xl leading-tight sm:text-3xl">{demo.name}</span>
                  </span>
                  <ArrowIcon className="mb-1 hidden h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:block" />
                </span>
              </Link>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
