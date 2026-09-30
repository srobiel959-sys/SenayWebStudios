import { pageMeta } from "@/lib/meta";
import { PricingView } from "@/views/PricingView";

export const metadata = pageMeta("en", "pricing");

export default function Page() {
  return <PricingView lang="en" />;
}
