import { pageMeta } from "@/lib/meta";
import { PrivacyView } from "@/views/PrivacyView";

export const metadata = pageMeta("no", "privacy");

export default function Page() {
  return <PrivacyView lang="no" />;
}
