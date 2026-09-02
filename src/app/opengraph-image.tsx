import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
export const alt = siteConfig.commercialName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0d12",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(255,107,44,0.35), transparent 55%)",
          color: "white",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px", fontSize: "30px", fontWeight: 700 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#ff6b2c",
              color: "#17100a",
            }}
          >
            L
          </div>
          {siteConfig.commercialName}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "72px", lineHeight: 1.05, fontWeight: 700, maxWidth: "960px", letterSpacing: "-3px" }}>
            Transformamos negocios con tecnología.
          </div>
          <div style={{ marginTop: "28px", fontSize: "28px", color: "#a1a1aa" }}>
            Desarrollo web · Automatización con IA · Ciberseguridad
          </div>
        </div>
      </div>
    ),
    size,
  );
}
