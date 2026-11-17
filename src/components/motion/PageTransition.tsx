import { ViewTransition, type ReactNode } from "react";

// Rolig overgang mellom sider (React <ViewTransition> + nettleserens View Transitions API).
// Den gamle siden tones raskt ut, den nye tones inn og glir 12 px opp. Toppmenyen står stille.
// Brukes i app/(no)/template.tsx og app/(en)/template.tsx, som lages på nytt for hver side.
// Utseendet står i globals.css (.page-enter og .page-exit). Ved «redusert bevegelse» byttes
// siden uten animasjon, og nettlesere uten støtte bytter side som vanlig.

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
