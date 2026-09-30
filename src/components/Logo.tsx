import Image from "next/image";

// Logofilene ligger i /public/brand/. All tekst i SVG-ene er konvertert til former,
// så logoen er uavhengig av fonter.

type Tone = "dark" | "light";

type LogoProps = {
  className?: string;
  /** "dark" = navy logo på lys bakgrunn, "light" = krem logo på mørk bakgrunn */
  tone?: Tone;
  /** Sett tom alt når logoen står i en lenke som allerede har tilgjengelig tekst */
  alt?: string;
  /** Last inn tidlig (logoen øverst på siden) */
  preload?: boolean;
  loading?: "eager" | "lazy";
};

export function Logo({
  className = "h-8 w-auto",
  tone = "dark",
  alt = "Senay Web Studio",
  preload,
  loading,
}: LogoProps) {
  return (
    <Image
      src={tone === "dark" ? "/brand/logo-horizontal-navy.svg" : "/brand/logo-horizontal-cream.svg"}
      alt={alt}
      width={484}
      height={80}
      className={className}
      preload={preload}
      loading={loading}
    />
  );
}

type MonogramProps = {
  className?: string;
  tone?: Tone;
};

export function Monogram({ className, tone = "dark" }: MonogramProps) {
  return (
    <Image
      src={tone === "dark" ? "/brand/monogram-navy.svg" : "/brand/monogram-cream.svg"}
      alt=""
      width={230}
      height={200}
      className={className}
    />
  );
}
