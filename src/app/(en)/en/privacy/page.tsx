import { pageMeta } from "@/lib/meta";
import { PrivacyView } from "@/views/PrivacyView";

export const metadata = pageMeta("en", "privacy");

export default function Page() {
  return <PrivacyView lang="en" />;
}
