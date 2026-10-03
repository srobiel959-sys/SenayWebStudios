import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/shared";

export const alt = `${site.name} – Nettsider for bedrifter`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo-cream.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#071630",
        }}
      >
        {/* logo-cream.svg er 390×114 (hovedlogoen med tagline) */}
        <img src={logoSrc} alt="" width={780} height={228} />
      </div>
    ),
    size,
  );
}
