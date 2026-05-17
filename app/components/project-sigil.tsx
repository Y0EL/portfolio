import React from "react";

type SigilName =
  | "autocrawl"
  | "atlas"
  | "geocek"
  | "sentinel"
  | "juscat"
  | "yota"
  | "reuse"
  | "soapy"
  | "deskriptor"
  | "sekriptor"
  | "scope"
  | "portfolio";

export function ProjectSigil({
  name,
  className = "",
  size = 80,
}: {
  name: SigilName;
  className?: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 80 80",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    /* AUTOCRAWL · network graph fanning out */
    case "autocrawl":
      return (
        <svg {...common}>
          <circle cx="40" cy="40" r="3.5" fill="currentColor" />
          <circle cx="14" cy="20" r="2.2" />
          <circle cx="66" cy="18" r="2.2" />
          <circle cx="14" cy="60" r="2.2" />
          <circle cx="68" cy="58" r="2.2" />
          <circle cx="40" cy="12" r="2.2" />
          <circle cx="40" cy="70" r="2.2" />
          <circle cx="22" cy="40" r="2.2" />
          <circle cx="58" cy="40" r="2.2" />
          <line x1="40" y1="40" x2="14" y2="20" />
          <line x1="40" y1="40" x2="66" y2="18" />
          <line x1="40" y1="40" x2="14" y2="60" />
          <line x1="40" y1="40" x2="68" y2="58" />
          <line x1="40" y1="40" x2="40" y2="12" />
          <line x1="40" y1="40" x2="40" y2="70" />
          <line x1="40" y1="40" x2="22" y2="40" />
          <line x1="40" y1="40" x2="58" y2="40" />
        </svg>
      );

    /* ATLAS · waveform + sphere */
    case "atlas":
      return (
        <svg {...common}>
          <circle cx="40" cy="40" r="26" />
          <path d="M14 40 Q22 28 28 40 T42 40 T56 40 T66 40" />
          <path d="M14 50 Q22 38 28 50 T42 50 T56 50 T66 50" opacity="0.5" />
          <line x1="14" y1="40" x2="66" y2="40" opacity="0.25" />
        </svg>
      );

    /* GEOCEK · crosshair + pin */
    case "geocek":
      return (
        <svg {...common}>
          <circle cx="40" cy="40" r="24" />
          <circle cx="40" cy="40" r="14" />
          <line x1="40" y1="6" x2="40" y2="20" />
          <line x1="40" y1="60" x2="40" y2="74" />
          <line x1="6" y1="40" x2="20" y2="40" />
          <line x1="60" y1="40" x2="74" y2="40" />
          <circle cx="40" cy="40" r="2.5" fill="currentColor" />
        </svg>
      );

    /* SENTINEL · shield with eye */
    case "sentinel":
      return (
        <svg {...common}>
          <path d="M40 10 L62 18 V40 Q62 56 40 70 Q18 56 18 40 V18 Z" />
          <ellipse cx="40" cy="40" rx="12" ry="7" />
          <circle cx="40" cy="40" r="2.5" fill="currentColor" />
        </svg>
      );

    /* JUSCAT · token with check */
    case "juscat":
      return (
        <svg {...common}>
          <circle cx="40" cy="40" r="26" />
          <circle cx="40" cy="40" r="19" opacity="0.45" />
          <path d="M30 40 L37 47 L52 32" />
        </svg>
      );

    /* YOTA · document with waveform */
    case "yota":
      return (
        <svg {...common}>
          <path d="M22 12 H50 L60 22 V68 H22 Z" />
          <line x1="50" y1="12" x2="50" y2="22" />
          <line x1="50" y1="22" x2="60" y2="22" />
          <line x1="28" y1="34" x2="32" y2="34" />
          <line x1="34" y1="30" x2="34" y2="38" />
          <line x1="38" y1="26" x2="38" y2="42" />
          <line x1="42" y1="32" x2="42" y2="36" />
          <line x1="44" y1="34" x2="48" y2="34" />
          <line x1="28" y1="50" x2="54" y2="50" opacity="0.6" />
          <line x1="28" y1="56" x2="48" y2="56" opacity="0.4" />
        </svg>
      );

    /* REUSE · circular arrows */
    case "reuse":
      return (
        <svg {...common}>
          <path d="M22 30 A22 22 0 0 1 56 22" />
          <path d="M60 22 L56 22 L56 18" />
          <path d="M58 50 A22 22 0 0 1 24 58" />
          <path d="M20 58 L24 58 L24 62" />
          <circle cx="40" cy="40" r="6" />
        </svg>
      );

    /* SOAPY · bubble cluster */
    case "soapy":
      return (
        <svg {...common}>
          <circle cx="32" cy="34" r="16" />
          <circle cx="52" cy="46" r="11" />
          <circle cx="44" cy="58" r="6" />
          <circle cx="26" cy="58" r="4" opacity="0.6" />
          <circle cx="36" cy="28" r="3" fill="currentColor" opacity="0.5" />
        </svg>
      );

    /* AI DESKRIPTOR · stacked lines representing text generation */
    case "deskriptor":
      return (
        <svg {...common}>
          <rect x="14" y="18" width="44" height="44" rx="2" />
          <line x1="20" y1="28" x2="44" y2="28" />
          <line x1="20" y1="36" x2="52" y2="36" />
          <line x1="20" y1="44" x2="40" y2="44" />
          <line x1="20" y1="52" x2="48" y2="52" />
          <circle cx="62" cy="22" r="6" />
          <path d="M59 22 L61 24 L65 20" />
        </svg>
      );

    /* SEKRIPTOR · scroll / page with curl */
    case "sekriptor":
      return (
        <svg {...common}>
          <path d="M20 14 H50 Q56 14 56 20 V60 Q56 66 50 66 H20 Z" />
          <path d="M26 26 H46 M26 34 H46 M26 42 H40 M26 50 H44" opacity="0.7" />
          <path d="M56 60 Q62 60 62 54 V18" opacity="0.6" />
        </svg>
      );

    /* SCOPE OF WORK · clipboard with checks */
    case "scope":
      return (
        <svg {...common}>
          <rect x="20" y="16" width="40" height="50" rx="3" />
          <rect x="30" y="12" width="20" height="8" rx="2" />
          <path d="M28 30 L31 33 L36 28" />
          <line x1="40" y1="31" x2="54" y2="31" />
          <path d="M28 42 L31 45 L36 40" />
          <line x1="40" y1="43" x2="52" y2="43" />
          <path d="M28 54 L31 57 L36 52" />
          <line x1="40" y1="55" x2="50" y2="55" />
        </svg>
      );

    /* PORTFOLIO · type specimen */
    case "portfolio":
      return (
        <svg {...common}>
          <rect x="14" y="18" width="52" height="44" rx="3" />
          <line x1="22" y1="26" x2="40" y2="26" />
          <text
            x="40"
            y="50"
            textAnchor="middle"
            fontFamily="serif"
            fontStyle="italic"
            fontSize="20"
            stroke="none"
            fill="currentColor"
          >
            Yy
          </text>
          <line x1="22" y1="56" x2="58" y2="56" opacity="0.4" />
        </svg>
      );
  }
}
