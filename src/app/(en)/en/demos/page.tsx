import { pageMeta } from "@/lib/meta";
import { DemosView } from "@/views/DemosView";

export const metadata = pageMeta("en", "demos");

export default function Page() {
  return <DemosView lang="en" />;
}
