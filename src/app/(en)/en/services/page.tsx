import { pageMeta } from "@/lib/meta";
import { ServicesView } from "@/views/ServicesView";

export const metadata = pageMeta("en", "services");

export default function Page() {
  return <ServicesView lang="en" />;
}
