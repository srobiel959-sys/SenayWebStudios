import { pageMeta } from "@/lib/meta";
import { WhyView } from "@/views/WhyView";

export const metadata = pageMeta("en", "why");

export default function Page() {
  return <WhyView lang="en" />;
}
