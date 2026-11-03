import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nothing Advertising Agency — Coming Soon";

export default async function OGImage() {
  const logoData = await readFile(
    join(process.cwd(), "public/images/nothing-logo.png")
  );
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#2D3239",
          position: "relative",
        }}
      >
        {/* Subtle top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "3px",
            background: "linear-gradient(90deg, transparent 10%, #F0B31C 50%, transparent 90%)",
          }}
        />

        {/* Logo */}
        <img
          src={logoBase64}
          width={480}
          height={140}
          style={{ objectFit: "contain" }}
        />

        {/* Gold divider */}
        <div
          style={{
            width: "80px",
            height: "2px",
            backgroundColor: "#F0B31C",
            marginTop: "40px",
            marginBottom: "32px",
          }}
        />

        {/* Coming Soon text */}
        <div
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: "28px",
            fontWeight: 200,
            letterSpacing: "12px",
            textTransform: "uppercase",
          }}
        >
          Coming Soon
        </div>

        {/* Subtle bottom accent line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "3px",
            background: "linear-gradient(90deg, transparent 10%, #F0B31C 50%, transparent 90%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
