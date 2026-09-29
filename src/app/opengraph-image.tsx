import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} – Moderne nettsider for små bedrifter`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#071630",
          color: "#FAF8F5",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              display: "flex",
              width: 88,
              height: 88,
              border: "2px solid #FAF8F5",
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            S/W
          </div>
          <div style={{ fontSize: 40 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, lineHeight: 1.1, maxWidth: 960 }}>
            Moderne nettsider for små bedrifter.
          </div>
          <div style={{ fontSize: 30, color: "#C3C9D4" }}>
            senaywebstudio.no
          </div>
        </div>
      </div>
    ),
    size,
  );
}
