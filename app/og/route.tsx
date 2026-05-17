import { ImageResponse } from "next/og";
import { metaData } from "app/config";

export const runtime = "edge";

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || metaData.title;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0c0c0b",
          padding: "80px",
          color: "#ece6da",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        {/* Top: kicker */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: "#e8512a",
            }}
          />
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#b8b3a8",
            }}
          >
            Field Dispatch · Jakarta · 2026
          </div>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 92,
              lineHeight: 1.0,
              margin: 0,
              letterSpacing: "-0.025em",
              color: "#ece6da",
              maxWidth: 1040,
            }}
          >
            {title}
            <span style={{ color: "#e8512a" }}>.</span>
          </h1>
        </div>

        {/* Bottom: signature */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(236, 230, 218, 0.18)",
            paddingTop: 26,
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 36,
              color: "#ece6da",
            }}
          >
            Yoel Andreas Manoppo
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6f6c64",
            }}
          >
            yoel.pw
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
