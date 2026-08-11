import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ai Solutions - Enterprise AI Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A14",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Cyan accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "#00F5FF",
          }}
        />
        {/* Label */}
        <div
          style={{
            color: "#00F5FF",
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div style={{ width: "32px", height: "2px", background: "#00F5FF" }} />
          AI CONSULTING STUDIO - SINCE 2016
        </div>
        {/* Headline */}
        <div
          style={{
            color: "#F0F0FF",
            fontSize: "72px",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
          }}
        >
          ENTERPRISE AI
          <br />
          ENGINEERED TO
          <br />
          <span style={{ color: "#00F5FF" }}>PERFORM.</span>
        </div>
        {/* Sub */}
        <div
          style={{
            color: "rgba(240,240,255,0.5)",
            fontSize: "20px",
            lineHeight: 1.5,
            maxWidth: "600px",
          }}
        >
          Production-grade AI systems for organizations that demand measurable results.
        </div>
        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "rgba(240,240,255,0.25)",
            fontSize: "16px",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
          }}
        >
          aisolutions.in
        </div>
      </div>
    ),
    { ...size }
  );
}
