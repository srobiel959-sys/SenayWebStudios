import { pageMeta } from "@/lib/meta";
import { WhyView } from "@/views/WhyView";

export const metadata = pageMeta("no", "why");

export default function Page() {
  return <WhyView lang="no" />;
}
