import { ImageResponse } from "next/og";
import { metaData } from "app/config";

export const runtime = "edge";

const INK = "#0c0c0b";
const PAPER = "#ece6da";
const BONE = "#b8b3a8";
const ASH = "#6f6c64";
const CRIMSON = "#e8512a";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Yoel Andreas Manoppo";
  const kicker = url.searchParams.get("kicker") || "FIELD DISPATCH";
  const subtitle =
    url.searchParams.get("subtitle") ||
    "AI Forward Deployed Engineer · Multi Agent AI · Jakarta";

  const photoUrl = new URL("/yoel.jpg", request.url).toString();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: INK,
          color: PAPER,
          position: "relative",
        }}
      >
        {/* ─── Left: Portrait panel ─────────────────────────── */}
        <div
          style={{
            display: "flex",
            width: 520,
            height: 630,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Photo */}
          <img
            src={photoUrl}
            width={520}
            height={630}
            style={{
              width: 520,
              height: 630,
              objectFit: "cover",
              objectPosition: "center top",
              filter: "grayscale(0.7) contrast(1.05) brightness(0.85)",
            }}
          />
          {/* Tint overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(12, 12, 11, 0.18)",
              display: "flex",
            }}
          />
          {/* Right edge inner gradient bleed into dark panel */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 80,
              height: 630,
              background:
                "linear-gradient(to right, rgba(12,12,11,0) 0%, rgba(12,12,11,0.95) 100%)",
              display: "flex",
            }}
          />
          {/* Specimen label bottom left */}
          <div
            style={{
              position: "absolute",
              left: 32,
              bottom: 28,
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: "0.22em",
              color: PAPER,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                backgroundColor: CRIMSON,
                borderRadius: 999,
                display: "flex",
              }}
            />
            SPECIMEN №017
          </div>
        </div>

        {/* ─── Right: Editorial info ────────────────────────── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "60px 64px 56px 32px",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* Top: kicker bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              borderBottom: `1px solid rgba(236, 230, 218, 0.16)`,
              paddingBottom: 22,
            }}
          >
            <div
              style={{
                width: 11,
                height: 11,
                borderRadius: 999,
                backgroundColor: CRIMSON,
                display: "flex",
              }}
            />
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 14,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: PAPER,
                fontWeight: 600,
                display: "flex",
              }}
            >
              {kicker}
            </div>
            <div
              style={{
                marginLeft: "auto",
                fontFamily: "monospace",
                fontSize: 13,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: ASH,
                display: "flex",
              }}
            >
              JAKARTA · 2026
            </div>
          </div>

          {/* Middle: title block */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 13,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: CRIMSON,
                fontWeight: 600,
                display: "flex",
              }}
            >
              FROM THE NOTEBOOK
            </div>
            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontSize: title.length > 22 ? 64 : 78,
                lineHeight: 1.02,
                margin: 0,
                letterSpacing: "-0.025em",
                color: PAPER,
                fontWeight: 400,
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {title}
              <span style={{ color: CRIMSON }}>.</span>
            </h1>
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: 26,
                lineHeight: 1.3,
                color: BONE,
                maxWidth: 600,
                display: "flex",
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Bottom: signature row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderTop: `1px solid rgba(236, 230, 218, 0.16)`,
              paddingTop: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: ASH,
                  display: "flex",
                }}
              >
                PUBLISHER
              </div>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: 28,
                  color: PAPER,
                  display: "flex",
                }}
              >
                Yoel Andreas Manoppo
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 6,
              }}
            >
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: ASH,
                  display: "flex",
                }}
              >
                WIRE
              </div>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 22,
                  letterSpacing: "0.04em",
                  color: PAPER,
                  fontWeight: 600,
                  display: "flex",
                }}
              >
                yoel.online
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
