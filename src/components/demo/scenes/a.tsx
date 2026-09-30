// Bransjeillustrasjoner, del 1: skjønnhet, helse og mat.
// Alle tegnes i viewBox 0 0 480 360 og bruker demoens farger via CSS-variabler,
// så hver illustrasjon automatisk matcher paletten til eksempelnettsiden.

export const P = "var(--d-primary)";
export const A = "var(--d-accent)";
export const F = "var(--d-fg)";
export const B = "var(--d-bg)";
export const O = "var(--d-on)";
export const M = "var(--d-muted)";

/** Myk skygge under motivene, så de «står» på noe. */
export function Ground({ cx = 240, cy = 318, rx = 170 }: { cx?: number; cy?: number; rx?: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={14} fill={F} opacity={0.08} />;
}

export const scenesA: Record<string, () => React.ReactElement> = {
  // ------------------------------------------------------------------ Frisør
  frisor: () => (
    <>
      <Ground />
      {/* Hårlokk */}
      <path d="M300 70c60 10 90 70 60 120s-90 40-80-10 60-40 70 0" fill="none" stroke={A} strokeWidth={16} strokeLinecap="round" />
      <path d="M320 60c70 20 95 90 55 140" fill="none" stroke={P} strokeWidth={8} strokeLinecap="round" opacity={0.6} />
      {/* Saks */}
      <g transform="rotate(-28 190 190)">
        <path d="M120 150 L300 205" stroke={F} strokeWidth={10} strokeLinecap="round" />
        <path d="M120 230 L300 175" stroke={F} strokeWidth={10} strokeLinecap="round" />
        <circle cx={100} cy={140} r={30} fill="none" stroke={P} strokeWidth={14} />
        <circle cx={100} cy={240} r={30} fill="none" stroke={P} strokeWidth={14} />
        <circle cx={214} cy={190} r={8} fill={A} />
      </g>
      {/* Kam */}
      <g transform="rotate(8 250 290)">
        <rect x={150} y={268} width={200} height={22} rx={8} fill={P} />
        {Array.from({ length: 16 }, (_, i) => (
          <rect key={i} x={158 + i * 12} y={288} width={6} height={22} rx={3} fill={P} />
        ))}
      </g>
    </>
  ),

  // ----------------------------------------------------------------- Barber
  barber: () => (
    <>
      <Ground />
      <defs>
        <clipPath id="scene-pole">
          <rect x={80} y={70} width={70} height={220} rx={35} />
        </clipPath>
      </defs>
      {/* Barberstang */}
      <rect x={80} y={70} width={70} height={220} rx={35} fill={B} />
      <g clipPath="url(#scene-pole)" className="scene-slide">
        {Array.from({ length: 9 }, (_, i) => (
          <rect key={i} x={40} y={40 + i * 50} width={150} height={18} fill={i % 2 ? P : A} transform={`skewY(-30)`} />
        ))}
      </g>
      <rect x={72} y={56} width={86} height={22} rx={11} fill={F} />
      <rect x={72} y={282} width={86} height={22} rx={11} fill={F} />
      {/* Barberkost */}
      <path d="M230 160c0-40 70-40 70 0l-8 50h-54z" fill={M} opacity={0.35} />
      <rect x={236} y={206} width={58} height={20} rx={6} fill={A} />
      <path d="M244 226h42l8 70h-58z" fill={P} />
      {/* Kniv */}
      <g transform="rotate(-20 380 200)">
        <rect x={330} y={180} width={110} height={30} rx={6} fill={B} stroke={F} strokeWidth={5} />
        <rect x={300} y={186} width={40} height={18} rx={9} fill={F} />
        <line x1={340} y1={200} x2={430} y2={200} stroke={A} strokeWidth={4} />
      </g>
    </>
  ),

  // ------------------------------------------------------------- Neglsalong
  neglsalong: () => (
    <>
      <Ground />
      {[
        { x: 110, c: P, h: 150 },
        { x: 210, c: A, h: 180 },
        { x: 310, c: F, h: 140 },
      ].map((b) => (
        <g key={b.x}>
          <rect x={b.x + 18} y={300 - b.h - 70} width={24} height={70} rx={6} fill={F} opacity={0.85} />
          <rect x={b.x} y={300 - b.h} width={60} height={b.h} rx={16} fill={b.c} />
          <rect x={b.x + 10} y={300 - b.h + 16} width={10} height={b.h - 40} rx={5} fill={B} opacity={0.45} />
        </g>
      ))}
      {/* Neglefil */}
      <rect x={380} y={120} width={20} height={180} rx={10} fill={A} transform="rotate(18 390 210)" />
      {/* Glans */}
      <path d="M90 90l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill={A} className="scene-glow" />
      <path d="M400 70l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill={P} className="scene-glow" />
    </>
  ),

  // --------------------------------------------------------------- Hudpleie
  hudpleie: () => (
    <>
      <Ground />
      {/* Blader */}
      <path d="M90 300c-10-90 40-160 110-180-10 80-50 150-110 180z" fill={A} />
      <path d="M100 290c30-50 60-100 95-160" stroke={P} strokeWidth={4} fill="none" />
      {/* Krukke */}
      <rect x={200} y={210} width={120} height={90} rx={20} fill={P} />
      <rect x={194} y={186} width={132} height={34} rx={12} fill={F} />
      <rect x={220} y={240} width={80} height={30} rx={6} fill={B} opacity={0.5} />
      {/* Pipetteflaske */}
      <rect x={340} y={170} width={70} height={130} rx={18} fill={A} />
      <rect x={358} y={130} width={34} height={44} rx={8} fill={F} />
      <ellipse cx={375} cy={122} rx={22} ry={16} fill={P} />
      <circle cx={375} cy={70} r={8} fill={A} className="scene-drip" />
    </>
  ),

  // --------------------------------------------------------------- Massasje
  massasje: () => (
    <>
      <Ground />
      {/* Steiner */}
      <ellipse cx={200} cy={290} rx={110} ry={28} fill={F} />
      <ellipse cx={200} cy={246} rx={88} ry={24} fill={P} />
      <ellipse cx={200} cy={208} rx={66} ry={20} fill={M} />
      <ellipse cx={200} cy={176} rx={44} ry={16} fill={A} />
      {/* Stearinlys */}
      <rect x={340} y={200} width={60} height={100} rx={10} fill={B} stroke={F} strokeWidth={4} />
      <line x1={370} y1={200} x2={370} y2={184} stroke={F} strokeWidth={4} />
      <path d="M370 140c14 18 14 34 0 44-14-10-14-26 0-44z" fill={A} className="scene-flicker" />
      {/* Blad */}
      <path d="M60 150c40-40 100-30 120 0-40 30-90 30-120 0z" fill={A} opacity={0.8} />
    </>
  ),

  // --------------------------------------------------------------- Tannlege
  tannlege: () => (
    <>
      <Ground />
      {/* Tann */}
      <path
        d="M170 90c30-20 60 0 70 0s40-20 70 0c34 22 20 90 4 120-10 20-12 70-30 90-14 16-24-10-30-50-4-24-24-24-28 0-6 40-16 66-30 50-18-20-20-70-30-90-16-30-30-98 4-120z"
        fill={B}
        stroke={P}
        strokeWidth={8}
      />
      <path d="M200 120c10-8 24-8 30 0" fill="none" stroke={A} strokeWidth={8} strokeLinecap="round" />
      {/* Glimt */}
      <path d="M340 80l7 16 16 7-16 7-7 16-7-16-16-7 16-7z" fill={A} className="scene-glow" />
      <path d="M120 70l5 11 11 5-11 5-5 11-5-11-11-5 11-5z" fill={P} className="scene-glow" />
      {/* Tannbørste */}
      <g transform="rotate(-35 380 260)">
        <rect x={320} y={250} width={150} height={20} rx={10} fill={P} />
        <rect x={430} y={226} width={40} height={26} rx={4} fill={A} />
      </g>
    </>
  ),

  // ---------------------------------------------------------- Fysioterapeut
  fysioterapeut: () => (
    <>
      <Ground />
      {/* Skumrulle */}
      <rect x={80} y={240} width={220} height={64} rx={32} fill={P} />
      <ellipse cx={112} cy={272} rx={20} ry={30} fill={A} />
      {/* Manual */}
      <rect x={300} y={270} width={110} height={16} rx={8} fill={F} />
      <rect x={292} y={246} width={26} height={64} rx={8} fill={A} />
      <rect x={392} y={246} width={26} height={64} rx={8} fill={A} />
      {/* Puls */}
      <path d="M60 150h90l20-50 30 100 26-70 18 20h176" fill="none" stroke={P} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={420} cy={150} r={12} fill={A} className="scene-glow" />
    </>
  ),

  // -------------------------------------------------------------- Veterinær
  veterinaer: () => (
    <>
      <Ground />
      {/* Hund */}
      <g>
        <ellipse cx={170} cy={250} rx={90} ry={60} fill={A} />
        <circle cx={170} cy={170} r={70} fill={A} />
        <ellipse cx={106} cy={160} rx={26} ry={52} fill={P} transform="rotate(18 106 160)" />
        <ellipse cx={234} cy={160} rx={26} ry={52} fill={P} transform="rotate(-18 234 160)" />
        <ellipse cx={170} cy={200} rx={34} ry={26} fill={B} />
        <ellipse cx={170} cy={188} rx={14} ry={10} fill={F} />
        <circle cx={146} cy={156} r={8} fill={F} />
        <circle cx={194} cy={156} r={8} fill={F} />
        <path d="M156 212q14 12 28 0" stroke={F} strokeWidth={4} fill="none" strokeLinecap="round" />
      </g>
      {/* Katt */}
      <g>
        <ellipse cx={340} cy={270} rx={62} ry={44} fill={F} />
        <circle cx={340} cy={204} r={52} fill={F} />
        <path d="M296 176l-6-56 44 30z" fill={F} />
        <path d="M384 176l6-56-44 30z" fill={F} />
        <circle cx={322} cy={200} r={7} fill={A} />
        <circle cx={358} cy={200} r={7} fill={A} />
        <path d="M334 222h12l-6 8z" fill={P} />
        <path d="M300 226h-30M300 234h-28M380 226h30M380 234h28" stroke={B} strokeWidth={3} strokeLinecap="round" />
      </g>
      {/* Hjerte og stetoskop */}
      <path d="M252 70c10-18 38-12 38 10 0 22-38 40-38 40s-38-18-38-40c0-22 28-28 38-10z" fill={P} className="scene-glow" />
      <path d="M60 60c0 60 40 80 70 80" fill="none" stroke={P} strokeWidth={6} strokeLinecap="round" />
      <circle cx={134} cy={140} r={12} fill={P} />
    </>
  ),

  // ------------------------------------------------------- Treningssenter
  treningssenter: () => (
    <>
      <Ground />
      {/* Vektstang */}
      <rect x={60} y={150} width={360} height={14} rx={7} fill={F} />
      <rect x={90} y={96} width={34} height={122} rx={8} fill={P} />
      <rect x={128} y={112} width={22} height={90} rx={6} fill={A} />
      <rect x={356} y={96} width={34} height={122} rx={8} fill={P} />
      <rect x={330} y={112} width={22} height={90} rx={6} fill={A} />
      {/* Kettlebell */}
      <path d="M210 240a30 30 0 0 1 60 0" fill="none" stroke={F} strokeWidth={14} />
      <circle cx={240} cy={272} r={46} fill={P} />
      <circle cx={226} cy={258} r={10} fill={B} opacity={0.3} />
      {/* Lyn */}
      <path d="M400 250l-30 40h24l-14 30 36-44h-24l16-26z" fill={A} className="scene-glow" />
    </>
  ),

  // ------------------------------------------------------------------- Yoga
  yoga: () => (
    <>
      <Ground />
      <circle cx={370} cy={100} r={46} fill={A} opacity={0.7} className="scene-glow" />
      {/* Lotus */}
      <path d="M240 280c-20-40-20-90 0-130 20 40 20 90 0 130z" fill={P} />
      <path d="M240 280c-40-20-70-60-70-110 40 20 64 60 70 110z" fill={A} />
      <path d="M240 280c40-20 70-60 70-110-40 20-64 60-70 110z" fill={A} />
      <path d="M240 284c-60 0-110-24-130-60 50-4 100 20 130 60z" fill={P} opacity={0.8} />
      <path d="M240 284c60 0 110-24 130-60-50-4-100 20-130 60z" fill={P} opacity={0.8} />
      {/* Matte */}
      <rect x={70} y={298} width={340} height={16} rx={8} fill={F} opacity={0.8} />
      <circle cx={70} cy={306} r={16} fill={M} />
    </>
  ),

  // ------------------------------------------------------------------- Kafé
  kafe: () => (
    <>
      <Ground />
      {/* Damp */}
      {[190, 230, 270].map((x, i) => (
        <path
          key={x}
          d={`M${x} 150c-16-20 16-30 0-50s16-30 0-50`}
          fill="none"
          stroke={M}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={0.5}
          className="scene-steam"
          style={{ animationDelay: `${i * 0.6}s` }}
        />
      ))}
      {/* Kopp */}
      <ellipse cx={230} cy={300} rx={120} ry={18} fill={F} opacity={0.9} />
      <path d="M150 170h160v70c0 40-36 64-80 64s-80-24-80-64z" fill={P} />
      <path d="M310 190c40 0 44 60 0 60" fill="none" stroke={P} strokeWidth={14} />
      <ellipse cx={230} cy={170} rx={80} ry={14} fill={A} />
      {/* Bønner */}
      {[
        [80, 280],
        [110, 300],
        [390, 290],
      ].map(([x, y]) => (
        <g key={x} transform={`rotate(30 ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx={14} ry={20} fill={F} />
          <path d={`M${x} ${y - 16}q-6 16 0 32`} stroke={A} strokeWidth={3} fill="none" />
        </g>
      ))}
      {/* Kanelbolle */}
      <circle cx={400} cy={220} r={40} fill={A} />
      <path d="M400 220m-6 0a6 6 0 1 1 12 0a14 14 0 1 1-26 0a22 22 0 1 1 42 0a30 30 0 1 1-58 0" fill="none" stroke={P} strokeWidth={5} />
    </>
  ),

  // ------------------------------------------------------------- Restaurant
  restaurant: () => (
    <>
      <Ground />
      {/* Tallerken */}
      <ellipse cx={220} cy={240} rx={140} ry={62} fill={B} />
      <ellipse cx={220} cy={240} rx={104} ry={44} fill={O} opacity={0.15} stroke={M} strokeWidth={3} />
      {/* Fisk */}
      <path d="M150 240c30-40 100-40 130 0-30 40-100 40-130 0z" fill={A} />
      <path d="M280 240l36-26v52z" fill={A} />
      <circle cx={174} cy={234} r={5} fill={F} />
      <path d="M200 226q10 14 0 28M224 224q10 16 0 32" stroke={P} strokeWidth={3} fill="none" />
      {/* Bestikk */}
      <rect x={60} y={170} width={10} height={130} rx={5} fill={F} />
      <path d="M52 170v-40M65 170v-40M78 170v-40" stroke={F} strokeWidth={5} strokeLinecap="round" />
      <path d="M392 300V140c24 10 24 60 0 80" fill={F} />
      {/* Vinglass */}
      <path d="M380 60h60c0 50-12 70-30 70s-30-20-30-70z" fill={P} opacity={0.9} />
      <line x1={410} y1={130} x2={410} y2={176} stroke={F} strokeWidth={5} />
    </>
  ),

  // ----------------------------------------------------------------- Bakeri
  bakeri: () => (
    <>
      <Ground />
      {/* Brød */}
      <path d="M70 280c0-70 60-110 130-110s130 40 130 110z" fill={A} />
      {[130, 180, 230, 280].map((x) => (
        <path key={x} d={`M${x} 200q16 20 0 50`} stroke={P} strokeWidth={6} fill="none" strokeLinecap="round" />
      ))}
      {/* Croissant */}
      <path d="M300 250c20-60 110-60 130 0-20-14-40-18-65-18s-45 4-65 18z" fill={P} />
      <path d="M335 214l10 30M365 206v34M395 214l-10 30" stroke={A} strokeWidth={5} strokeLinecap="round" />
      {/* Hvetestrå */}
      <path d="M400 150V60" stroke={F} strokeWidth={4} />
      {[70, 90, 110, 130].map((y) => (
        <g key={y}>
          <ellipse cx={390} cy={y} rx={7} ry={12} fill={F} transform={`rotate(-30 390 ${y})`} />
          <ellipse cx={410} cy={y} rx={7} ry={12} fill={F} transform={`rotate(30 410 ${y})`} />
        </g>
      ))}
      {/* Mel */}
      {[
        [110, 120],
        [140, 90],
        [90, 100],
        [170, 130],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={4} fill={M} opacity={0.5} className="scene-float" />
      ))}
    </>
  ),

  // --------------------------------------------------------------- Pizzeria
  pizzeria: () => (
    <>
      <Ground />
      {/* Steinovn */}
      <path d="M40 300V190c0-80 60-130 130-130s130 50 130 130v110z" fill={F} />
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 4 }, (_, c) => (
          <rect key={`${r}-${c}`} x={56 + c * 60 + (r % 2) * 30} y={110 + r * 38} width={48} height={26} rx={4} fill={M} opacity={0.35} />
        )),
      )}
      <path d="M100 300v-70c0-40 30-70 70-70s70 30 70 70v70z" fill={B} opacity={0.15} />
      {/* Flammer */}
      <g className="scene-flicker">
        <path d="M130 300c-10-40 20-50 14-80 30 20 40 50 26 80z" fill={P} />
        <path d="M170 300c-8-30 16-40 12-64 24 16 30 40 20 64z" fill={A} />
        <path d="M140 300c0-20 14-26 12-40 14 12 18 26 12 40z" fill={B} opacity={0.8} />
      </g>
      {/* Pizza på spade */}
      <rect x={250} y={268} width={200} height={12} rx={6} fill={A} opacity={0.9} />
      <circle cx={340} cy={250} r={72} fill={A} />
      <circle cx={340} cy={250} r={60} fill={P} />
      {[
        [320, 225],
        [365, 235],
        [335, 275],
        [372, 270],
        [305, 258],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={10} fill={B} opacity={0.9} />
      ))}
      {[
        [345, 212],
        [310, 285],
        [385, 250],
      ].map(([x, y]) => (
        <path key={x} d={`M${x} ${y}c6-8 14-8 16 0-6 6-12 6-16 0z`} fill={A} />
      ))}
      {/* Deigkule */}
      <ellipse cx={430} cy={150} rx={34} ry={26} fill={B} />
      <ellipse cx={420} cy={142} rx={10} ry={6} fill={O} opacity={0.4} />
      {[
        [400, 110],
        [456, 118],
        [440, 94],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={3} fill={M} opacity={0.6} className="scene-float" />
      ))}
    </>
  ),

  // --------------------------------------------------------------- Catering
  catering: () => (
    <>
      <Ground />
      {/* Kuppel */}
      <path d="M120 250c0-80 50-120 110-120s110 40 110 120z" fill={P} />
      <path d="M160 220c10-40 34-58 60-64" stroke={B} strokeWidth={8} fill="none" strokeLinecap="round" opacity={0.4} />
      <circle cx={230} cy={122} r={12} fill={A} />
      <rect x={90} y={250} width={280} height={18} rx={9} fill={F} />
      {/* Brett med småretter */}
      <rect x={60} y={296} width={360} height={10} rx={5} fill={M} opacity={0.5} />
      {[100, 170, 240, 310, 380].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={292} rx={22} ry={8} fill={i % 2 ? A : B} />
          <circle cx={x} cy={284} r={7} fill={i % 2 ? P : A} />
        </g>
      ))}
      <path d="M390 90l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill={A} className="scene-glow" />
    </>
  ),
};
