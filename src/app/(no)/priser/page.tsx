import { pageMeta } from "@/lib/meta";
import { PricingView } from "@/views/PricingView";

export const metadata = pageMeta("no", "pricing");

export default function Page() {
  return <PricingView lang="no" />;
}
