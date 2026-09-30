// Bransjeillustrasjoner, del 2: håndverk, tjenester og butikk.

import { A, B, F, Ground, M, O, P } from "./a";

export const scenesB: Record<string, () => React.ReactElement> = {
  // ------------------------------------------------------------- Elektriker
  elektriker: () => (
    <>
      <Ground />
      {/* Sikringsskap */}
      <rect x={70} y={60} width={200} height={240} rx={14} fill={F} />
      <rect x={86} y={76} width={168} height={208} rx={8} fill={B} />
      {[0, 1, 2].map((r) =>
        Array.from({ length: 5 }, (_, c) => (
          <g key={`${r}-${c}`}>
            <rect x={98 + c * 30} y={96 + r * 62} width={22} height={44} rx={4} fill={M} opacity={0.35} />
            <rect x={102 + c * 30} y={(r + c) % 3 === 0 ? 104 + r * 62 : 118 + r * 62} width={14} height={14} rx={3} fill={(r + c) % 4 === 0 ? P : F} />
          </g>
        )),
      )}
      {/* Åpen dør */}
      <path d="M270 60l40 20v200l-40 20z" fill={F} opacity={0.75} />
      {/* Kabler */}
      <path d="M130 300c0 30 60 30 90 0s70-60 120-30" fill="none" stroke={P} strokeWidth={8} strokeLinecap="round" />
      <path d="M180 300c10 20 50 24 80 4s80-40 120-10" fill="none" stroke={A} strokeWidth={8} strokeLinecap="round" />
      {/* Lyspære */}
      <g className="scene-glow">
        <circle cx={380} cy={130} r={46} fill={P} />
        <path d="M380 70v-24M330 88l-16-16M430 88l16-16M320 130h-24M440 130h24" stroke={P} strokeWidth={6} strokeLinecap="round" />
      </g>
      <rect x={362} y={172} width={36} height={30} rx={6} fill={F} />
      <path d="M372 112l12 20h-12l12 20" stroke={O} strokeWidth={5} fill="none" strokeLinejoin="round" />
    </>
  ),

  // --------------------------------------------------------------- Rørlegger
  rorlegger: () => (
    <>
      <Ground />
      {/* Rør */}
      <path d="M40 100h220v120" fill="none" stroke={P} strokeWidth={34} strokeLinejoin="round" />
      <rect x={120} y={80} width={20} height={40} rx={4} fill={F} />
      <rect x={240} y={150} width={40} height={20} rx={4} fill={F} />
      {/* Kran */}
      <rect x={230} y={220} width={60} height={26} rx={8} fill={F} />
      <rect x={248} y={66} width={24} height={18} rx={4} fill={A} />
      {/* Dråper */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d="M260 262c8 12 10 18 10 22a10 10 0 0 1-20 0c0-4 2-10 10-22z"
          fill={A}
          className="scene-drip"
          style={{ animationDelay: `${i * 0.7}s` }}
        />
      ))}
      <ellipse cx={260} cy={316} rx={40} ry={8} fill={A} opacity={0.5} />
      {/* Skiftenøkkel */}
      <g transform="rotate(-40 380 200)">
        <rect x={350} y={120} width={26} height={170} rx={13} fill={F} />
        <path d="M340 100c0-30 46-30 46 0v30h-12v-24h-22v24h-12z" fill={F} />
      </g>
    </>
  ),

  // ----------------------------------------------------------------- Tømrer
  tomrer: () => (
    <>
      <Ground />
      {/* Planker */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={60 + i * 10} y={250 - i * 34} width={260} height={30} rx={4} fill={i === 1 ? A : P} />
          <path d={`M${90 + i * 10} ${262 - i * 34}q30 8 60 0M${180 + i * 10} ${268 - i * 34}q40-8 80 0`} stroke={F} strokeWidth={2} fill="none" opacity={0.3} />
        </g>
      ))}
      {/* Vater */}
      <rect x={70} y={120} width={220} height={30} rx={6} fill={F} />
      <rect x={160} y={126} width={40} height={18} rx={9} fill={A} />
      <circle cx={180} cy={135} r={5} fill={B} className="scene-slide-x" />
      {/* Hammer */}
      <g transform="rotate(30 380 190)">
        <rect x={368} y={150} width={24} height={170} rx={8} fill={A} />
        <path d="M320 120h110v44H340c-10 0-20-10-20-22z" fill={F} />
      </g>
    </>
  ),

  // ------------------------------------------------------------------ Maler
  maler: () => (
    <>
      <Ground />
      {/* Malingsstriper */}
      <path d="M40 90h260" stroke={P} strokeWidth={50} strokeLinecap="round" />
      <path d="M60 160h200" stroke={A} strokeWidth={50} strokeLinecap="round" />
      {/* Rulle */}
      <rect x={290} y={70} width={140} height={46} rx={12} fill={P} />
      <path d="M430 93h20v70h-90v40" fill="none" stroke={F} strokeWidth={8} strokeLinejoin="round" />
      <rect x={346} y={200} width={28} height={90} rx={10} fill={F} />
      {/* Spann */}
      <path d="M90 220h150l-12 90h-126z" fill={F} />
      <ellipse cx={165} cy={220} rx={75} ry={14} fill={P} />
      <path d="M120 226v30a8 8 0 0 0 16 0v-26M190 226v44a8 8 0 0 0 16 0v-40" fill={P} />
      <path d="M92 218c0-40 146-40 146 0" fill="none" stroke={M} strokeWidth={4} />
    </>
  ),

  // -------------------------------------------------------------- Taktekker
  taktekker: () => (
    <>
      <Ground />
      {/* Hus */}
      <rect x={110} y={180} width={220} height={130} fill={B} />
      <rect x={200} y={236} width={44} height={74} rx={4} fill={F} />
      <rect x={140} y={210} width={40} height={36} rx={4} fill={A} />
      <rect x={262} y={210} width={40} height={36} rx={4} fill={A} />
      {/* Tak med takstein */}
      <defs>
        <clipPath id="scene-roof">
          <path d="M80 190L220 70l140 120z" />
        </clipPath>
      </defs>
      <path d="M80 190L220 70l140 120z" fill={P} />
      <g clipPath="url(#scene-roof)">
        {[96, 118, 140, 162, 184].map((y) => (
          <line key={y} x1={60} y1={y} x2={380} y2={y} stroke={O} strokeOpacity={0.35} strokeWidth={3} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <line key={i} x1={80 + i * 24} y1={70} x2={80 + i * 24} y2={190} stroke={O} strokeOpacity={0.15} strokeWidth={2} />
        ))}
      </g>
      <rect x={290} y={90} width={26} height={60} fill={F} />
      {/* Takrenne */}
      <rect x={76} y={188} width={290} height={10} rx={5} fill={F} />
      {/* Stige */}
      <g transform="rotate(12 400 220)">
        <rect x={370} y={100} width={8} height={220} fill={A} />
        <rect x={420} y={100} width={8} height={220} fill={A} />
        {[130, 170, 210, 250, 290].map((y) => (
          <rect key={y} x={370} y={y} width={58} height={7} fill={A} />
        ))}
      </g>
    </>
  ),

  // --------------------------------------------------------- Anleggsgartner
  anleggsgartner: () => (
    <>
      <circle cx={400} cy={80} r={36} fill={A} className="scene-glow" />
      {/* Belegningsstein */}
      {Array.from({ length: 3 }, (_, r) =>
        Array.from({ length: 6 }, (_, c) => (
          <rect key={`${r}-${c}`} x={40 + c * 70 + (r % 2) * 35} y={262 + r * 22} width={64} height={18} rx={3} fill={r % 2 ? M : F} opacity={0.45} />
        )),
      )}
      {/* Tre */}
      <rect x={128} y={170} width={20} height={96} rx={6} fill={F} />
      <circle cx={138} cy={140} r={60} fill={P} />
      <circle cx={100} cy={170} r={34} fill={P} />
      <circle cx={180} cy={168} r={38} fill={A} />
      {/* Vannkanne */}
      <path d="M270 200h90v60h-90z" fill={A} />
      <path d="M360 214l60-40" stroke={A} strokeWidth={12} strokeLinecap="round" />
      <path d="M280 200c0-36 70-36 70 0" fill="none" stroke={F} strokeWidth={8} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={430 + i * 8} cy={186 + i * 14} r={4} fill={A} className="scene-drip" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
      {/* Spirer */}
      {[240, 260, 450].map((x) => (
        <path key={x} d={`M${x} 262v-24m0 10c-10-10-18-6-20 0m20-4c10-10 18-6 20 0`} stroke={P} strokeWidth={4} fill="none" strokeLinecap="round" />
      ))}
    </>
  ),

  // ------------------------------------------------------------------ Murer
  murer: () => (
    <>
      <Ground />
      {/* Murvegg */}
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 5 }, (_, c) => (
          <rect key={`${r}-${c}`} x={50 + c * 56 + (r % 2 ? 28 : 0)} y={90 + r * 36} width={52} height={32} rx={3} fill={(r + c) % 3 === 0 ? A : P} />
        )),
      )}
      <rect x={40} y={80} width={10} height={230} fill="transparent" />
      {/* Murskje */}
      <g transform="rotate(-30 380 180)">
        <path d="M330 170l100-40 10 60z" fill={F} />
        <rect x={420} y={176} width={16} height={50} rx={6} fill={A} />
      </g>
      {/* Fliser */}
      <g transform="translate(360 250)">
        <rect width={46} height={46} rx={4} fill={B} stroke={F} strokeWidth={3} />
        <rect x={52} width={46} height={46} rx={4} fill={A} />
        <rect y={-52} x={26} width={46} height={46} rx={4} fill={B} stroke={F} strokeWidth={3} />
      </g>
    </>
  ),

  // --------------------------------------------------------------- Regnskap
  regnskap: () => (
    <>
      <Ground />
      {/* Stolpediagram */}
      {[80, 130, 190, 150, 230].map((h, i) => (
        <rect key={i} x={60 + i * 50} y={300 - h} width={34} height={h} rx={6} fill={i === 4 ? A : P} opacity={i === 4 ? 1 : 0.55 + i * 0.1} />
      ))}
      <path d="M70 200l50-40 50 20 50-60 50 10 40-60" fill="none" stroke={F} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M300 60l16 4-8 14z" fill={F} />
      {/* Kalkulator */}
      <rect x={330} y={130} width={110} height={170} rx={14} fill={F} />
      <rect x={344} y={144} width={82} height={34} rx={6} fill={A} />
      {Array.from({ length: 3 }, (_, r) =>
        Array.from({ length: 3 }, (_, c) => (
          <rect key={`${r}-${c}`} x={344 + c * 28} y={192 + r * 34} width={22} height={24} rx={5} fill={r === 2 && c === 2 ? P : B} opacity={0.9} />
        )),
      )}
      {/* Mynter */}
      <ellipse cx={300} cy={300} rx={26} ry={9} fill={A} />
      <ellipse cx={300} cy={290} rx={26} ry={9} fill={A} stroke={F} strokeWidth={2} />
    </>
  ),

  // ---------------------------------------------------------------- Advokat
  advokat: () => (
    <>
      <Ground />
      {/* Vekt */}
      <rect x={232} y={80} width={16} height={210} fill={F} />
      <rect x={180} y={290} width={120} height={16} rx={6} fill={F} />
      <rect x={110} y={100} width={260} height={10} rx={5} fill={F} />
      <circle cx={240} cy={84} r={14} fill={A} />
      {[130, 350].map((x, i) => (
        <g key={x} className={i ? "scene-sway" : "scene-sway-rev"}>
          <path d={`M${x} 110l-36 90M${x} 110l36 90`} stroke={F} strokeWidth={3} />
          <path d={`M${x - 50} 200h100c0 30-22 44-50 44s-50-14-50-44z`} fill={P} />
        </g>
      ))}
      {/* Bok */}
      <rect x={40} y={260} width={110} height={40} rx={4} fill={A} />
      <rect x={40} y={266} width={110} height={8} fill={B} opacity={0.5} />
      {/* Klubbe */}
      <g transform="rotate(-25 400 270)">
        <rect x={370} y={250} width={70} height={30} rx={8} fill={F} />
        <rect x={400} y={276} width={12} height={50} rx={6} fill={A} />
      </g>
    </>
  ),

  // --------------------------------------------------------------- Fotograf
  fotograf: () => (
    <>
      <Ground />
      {/* Bilder */}
      <g transform="rotate(-10 110 150)">
        <rect x={50} y={90} width={120} height={100} fill={B} stroke={F} strokeWidth={4} />
        <path d="M60 180l40-40 30 30 20-20 20 30z" fill={P} />
        <circle cx={140} cy={118} r={10} fill={A} />
      </g>
      <g transform="rotate(8 380 120)">
        <rect x={330} y={60} width={110} height={90} fill={B} stroke={F} strokeWidth={4} />
        <circle cx={385} cy={100} r={24} fill={A} />
      </g>
      {/* Kamera */}
      <rect x={150} y={170} width={220} height={140} rx={20} fill={F} />
      <rect x={190} y={148} width={70} height={30} rx={8} fill={F} />
      <circle cx={260} cy={240} r={52} fill={B} />
      <circle cx={260} cy={240} r={36} fill={P} />
      <circle cx={246} cy={226} r={10} fill={O} opacity={0.6} />
      <rect x={326} y={186} width={26} height={16} rx={4} fill={A} className="scene-glow" />
    </>
  ),

  // ---------------------------------------------------------------- Renhold
  renhold: () => (
    <>
      <Ground />
      {/* Sprayflaske */}
      <path d="M150 150h80l14 150h-108z" fill={P} />
      <rect x={168} y={100} width={44} height={52} rx={6} fill={F} />
      <path d="M212 110h40v18h-40z" fill={F} />
      <rect x={160} y={200} width={60} height={50} rx={8} fill={B} opacity={0.6} />
      {/* Svamp */}
      <rect x={280} y={250} width={130} height={56} rx={14} fill={A} />
      <rect x={280} y={250} width={130} height={18} rx={9} fill={P} />
      {/* Bobler */}
      {[
        [280, 120, 22],
        [320, 80, 14],
        [350, 150, 18],
        [300, 190, 10],
        [390, 110, 12],
      ].map(([x, y, r], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={r}
          fill={B}
          stroke={A}
          strokeWidth={3}
          opacity={0.9}
          className="scene-float"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
      <path d="M90 90l6 14 14 6-14 6-6 14-6-14-14-6 14-6z" fill={A} className="scene-glow" />
    </>
  ),

  // ------------------------------------------------------------ Bilverksted
  bilverksted: () => (
    <>
      <Ground />
      {/* Bil */}
      <path d="M60 250v-40c0-14 10-24 24-26l50-8 40-50c8-10 20-16 34-16h110c14 0 26 6 34 18l34 50c24 4 44 20 44 44v28z" fill={P} />
      <path d="M190 120h74v56h-116z" fill={B} opacity={0.6} />
      <path d="M278 120h44l34 56h-78z" fill={B} opacity={0.6} />
      <circle cx={140} cy={256} r={38} fill={F} />
      <circle cx={140} cy={256} r={16} fill={M} />
      <circle cx={350} cy={256} r={38} fill={F} />
      <circle cx={350} cy={256} r={16} fill={M} />
      <rect x={410} y={200} width={20} height={12} rx={4} fill={A} className="scene-glow" />
      {/* Skiftenøkkel */}
      <g transform="rotate(20 240 300)">
        <rect x={180} y={292} width={120} height={16} rx={8} fill={A} />
        <path d="M166 280c-20 0-24 40 0 40l14-8v-24z" fill={A} />
      </g>
    </>
  ),

  // ----------------------------------------------------------- Trafikkskole
  trafikkskole: () => (
    <>
      {/* Vei */}
      <path d="M120 360L220 150h40l100 210z" fill={F} opacity={0.85} />
      {[180, 230, 290].map((y, i) => (
        <rect key={y} x={236 - i * 2} y={y} width={8 + i * 4} height={24 + i * 8} fill={A} />
      ))}
      {/* Trafikklys */}
      <rect x={60} y={60} width={70} height={180} rx={16} fill={F} />
      <rect x={88} y={240} width={14} height={80} fill={F} />
      <circle cx={95} cy={100} r={20} fill="#D9534F" opacity={0.35} />
      <circle cx={95} cy={150} r={20} fill="#F0AD4E" opacity={0.35} />
      <circle cx={95} cy={200} r={20} fill="#3FAE5A" className="scene-glow" />
      {/* Ratt */}
      <circle cx={380} cy={170} r={70} fill="none" stroke={P} strokeWidth={18} />
      <circle cx={380} cy={170} r={18} fill={P} />
      <path d="M312 170h50M398 170h50M380 188v50" stroke={P} strokeWidth={14} strokeLinecap="round" />
    </>
  ),

  // --------------------------------------------------------- Blomsterbutikk
  blomsterbutikk: () => (
    <>
      <Ground />
      {/* Stilker */}
      {[
        [240, 120],
        [190, 140],
        [290, 140],
        [215, 90],
        [265, 90],
      ].map(([x, y], i) => (
        <path key={i} d={`M240 240Q${(x + 240) / 2} ${y + 60} ${x} ${y}`} stroke={M} strokeWidth={5} fill="none" />
      ))}
      <path d="M200 200c-30-10-40-30-30-50 20 6 30 26 30 50z" fill={M} opacity={0.7} />
      {/* Blomster */}
      {[
        [240, 120, P],
        [190, 140, A],
        [290, 140, A],
        [215, 90, P],
        [265, 90, P],
      ].map(([x, y, c], i) => (
        <g key={i} className={i === 0 ? "scene-sway" : undefined}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx={x as number}
              cy={(y as number) - 16}
              rx={11}
              ry={18}
              fill={c as string}
              transform={`rotate(${a} ${x} ${y})`}
            />
          ))}
          <circle cx={x as number} cy={y as number} r={8} fill={B} />
        </g>
      ))}
      {/* Vase */}
      <path d="M190 230h100c0 40-10 60-20 80h-60c-10-20-20-40-20-80z" fill={F} />
      <rect x={196} y={222} width={88} height={14} rx={7} fill={F} />
    </>
  ),

  // ------------------------------------------------------------ Klesbutikk
  klesbutikk: () => (
    <>
      <Ground />
      {/* Stativ */}
      <rect x={60} y={60} width={360} height={10} rx={5} fill={F} />
      <rect x={70} y={60} width={10} height={250} fill={F} />
      <rect x={400} y={60} width={10} height={250} fill={F} />
      {/* Plagg på henger */}
      {[
        { x: 150, c: P },
        { x: 250, c: A },
        { x: 340, c: M },
      ].map((g, i) => (
        <g key={g.x} className={i === 1 ? "scene-sway" : undefined}>
          <path d={`M${g.x} 70v14`} stroke={F} strokeWidth={4} />
          <path d={`M${g.x - 40} 110l40-26 40 26`} fill="none" stroke={F} strokeWidth={4} />
          <path
            d={`M${g.x - 44} 110l-24 40 24 12v100h88v-100l24-12-24-40c-10 12-24 18-44 18s-34-6-44-18z`}
            fill={g.c}
          />
          <path d={`M${g.x - 44} 232h88`} stroke={B} strokeOpacity={0.35} strokeWidth={6} />
        </g>
      ))}
      {/* Prislapp */}
      <path d="M380 180l30 0 14 20-14 20h-30z" fill={B} stroke={F} strokeWidth={3} />
      <circle cx={392} cy={200} r={4} fill={F} />
    </>
  ),
};

