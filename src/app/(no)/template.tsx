import { PageTransition } from "@/components/motion/PageTransition";

// Lages på nytt ved hver navigasjon, så sideovergangen kan spilles av (se PageTransition).
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
