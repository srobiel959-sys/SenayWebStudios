import { RootShell, rootMetadata, rootViewport } from "@/components/RootShell";

export const metadata = rootMetadata("no");
export const viewport = rootViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="no">{children}</RootShell>;
}
