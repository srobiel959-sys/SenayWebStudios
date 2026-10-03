import Image from "next/image";

// Logofilene ligger i /public/brand/ og er endelige – de skal aldri endres.
// All tekst i SVG-ene er konvertert til former, så logoen er uavhengig av fonter.
// width/height under matcher filenes viewBox, så logoen aldri strekkes.
//   logo-horizontal-*.svg  378×70   «Senay Studio» (navigasjon)
//   logo-*.svg             390×114  «Senay Studio» + «Nettsider for bedrifter» (hovedlogo)
// S/-monogrammet brukes bare som ikon (favicon, app-ikon, profilbilde), ikke på sidene.

type Tone = "dark" | "light";

type LogoProps = {
  className?: string;
  /** "dark" = navy logo på lys bakgrunn, "light" = krem logo på mørk bakgrunn */
  tone?: Tone;
  /** Sett tom alt når logoen står i en lenke som allerede har tilgjengelig tekst, eller er pynt */
  alt?: string;
  /** Last inn tidlig (logoen øverst på siden) */
  preload?: boolean;
  loading?: "eager" | "lazy";
};

/** Navigasjonslogoen: bare «Senay Studio». */
export function Logo({ className = "h-8 w-auto", tone = "dark", alt = "Senay Studio", preload, loading }: LogoProps) {
  return (
    <Image
      src={tone === "dark" ? "/brand/logo-horizontal-navy.svg" : "/brand/logo-horizontal-cream.svg"}
      alt={alt}
      width={378}
      height={70}
      className={className}
      preload={preload}
      loading={loading}
    />
  );
}

/** Hovedlogoen: «Senay Studio» + «Nettsider for bedrifter». */
export function MainLogo({ className = "h-auto w-60", tone = "dark", alt = "Senay Studio", preload, loading }: LogoProps) {
  return (
    <Image
      src={tone === "dark" ? "/brand/logo-navy.svg" : "/brand/logo-cream.svg"}
      alt={alt}
      width={390}
      height={114}
      className={className}
      preload={preload}
      loading={loading}
    />
  );
}
