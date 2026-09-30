import { pageMeta } from "@/lib/meta";
import { AboutView } from "@/views/AboutView";

export const metadata = pageMeta("en", "about");

export default function Page() {
  return <AboutView lang="en" />;
}
