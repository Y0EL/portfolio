/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./public/**/*.svg"],
  theme: {
    extend: {
      colors: {
        ink: "#0c0c0b",
        "ink-2": "#141311",
        "ink-3": "#1c1b18",
        paper: "#ece6da",
        bone: "#b8b3a8",
        ash: "#6f6c64",
        char: "#28201b",
        ember: "#e8512a",
        "ember-soft": "#f08056",
      },
      fontFamily: {
        display: ["var(--font-newsreader)", "Newsreader", "Georgia", "serif"],
        sans: ["var(--font-onest)", "Onest", "system-ui", "sans-serif"],
        mono: ["var(--font-jbm)", "JetBrains Mono", "ui-monospace", "monospace"],
        // legacy
        geist: ["var(--font-geist-sans)"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        kicker: "0.08em",
      },
      borderRadius: {
        "card": "16px",
        "portrait": "22px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 900ms ease-out both",
        "pulse-ring": "pulse-ring 1.6s cubic-bezier(0.22, 1, 0.36, 1) infinite",
        "ticker": "ticker 38s linear infinite",
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
