import { pageMeta } from "@/lib/meta";
import { ProcessView } from "@/views/ProcessView";

export const metadata = pageMeta("no", "process");

export default function Page() {
  return <ProcessView lang="no" />;
}
