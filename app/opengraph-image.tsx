import { ImageResponse } from "next/og";
import { site } from "@/lib/config";

export const alt = site.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ee4e2e",
          color: "white",
          padding: "40px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: 900,
              letterSpacing: "-2px",
            }}
          >
            SHOPEE
          </span>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 400,
              color: "#ffedd5",
              marginLeft: "16px",
            }}
          >
            HARIAN
          </span>
        </div>
        <div
          style={{
            fontSize: "36px",
            fontWeight: 700,
            textAlign: "center",
            maxWidth: "900px",
            marginBottom: "20px",
            lineHeight: 1.3,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#ffedd5",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            padding: "10px 24px",
            borderRadius: "9999px",
            marginTop: "10px",
          }}
        >
          🍳 Dapur • 🗄️ Organizer • 🧹 Kebersihan
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
