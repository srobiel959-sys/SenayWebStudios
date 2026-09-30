import { pageMeta } from "@/lib/meta";
import { AboutView } from "@/views/AboutView";

export const metadata = pageMeta("no", "about");

export default function Page() {
  return <AboutView lang="no" />;
}
