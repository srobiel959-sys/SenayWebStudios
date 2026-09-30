import { pageMeta } from "@/lib/meta";
import { DemosView } from "@/views/DemosView";

export const metadata = pageMeta("no", "demos");

export default function Page() {
  return <DemosView lang="no" />;
}
