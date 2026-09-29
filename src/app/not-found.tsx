import Link from "next/link";
import { Monogram } from "@/components/Logo";
import { btnPrimary, container } from "@/lib/ui";

export default function NotFound() {
  return (
    <section className={`${container} flex min-h-[70svh] flex-col items-center justify-center py-24 text-center`}>
      <Monogram className="monogram-draw h-auto w-32" />
      <h1 className="mt-10 font-display text-5xl sm:text-6xl">Siden finnes ikke.</h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">Lenken kan være feil, eller siden er flyttet.</p>
      <Link href="/" className={`${btnPrimary} mt-10`}>
        Til forsiden
      </Link>
    </section>
  );
}
