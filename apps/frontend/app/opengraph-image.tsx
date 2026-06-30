import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jorge Borrego for Texas House District 118";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#0A2463",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
          <svg viewBox="0 0 60 60" width="72" height="72">
            <polygon
              points="30,4 36,22 54,22 40,34 45,52 30,40 15,52 20,34 6,22 24,22"
              fill="#CC2200"
            />
          </svg>
        </div>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: "#CC2200",
            textTransform: "uppercase",
            letterSpacing: "-2px",
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          JORGE BORREGO
        </div>
        <div
          style={{
            fontSize: 32,
            color: "white",
            marginTop: "20px",
            textTransform: "uppercase",
            letterSpacing: "4px",
            textAlign: "center",
          }}
        >
          Republican for Texas House District 118
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#CC2200",
            marginTop: "28px",
            textAlign: "center",
          }}
        >
          ★ Lower Costs · Safer Neighborhoods · Stronger Schools ★
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: 18,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "2px",
          }}
        >
          jorgefortexas.com
        </div>
      </div>
    ),
    { ...size }
  );
}
