import type { Config } from "tailwindcss";

/**
 * Terra & Vine design tokens.
 * Source: README.md → Design Tokens. Use these names in components — never raw hex.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      md: "760px",
      lg: "1100px",
      xl: "1440px",
    },
    extend: {
      colors: {
        olive: {
          DEFAULT: "#3D4A31",
          hover: "#33402A",
          pressed: "#2B3623",
          muted: "rgba(61,74,49,0.10)",
          ring: "rgba(61,74,49,0.14)",
          outline: "rgba(61,74,49,0.35)",
        },
        primary: {
          DEFAULT: "#3D4A31",
          hover: "#33402A",
          pressed: "#2B3623",
        },
        terracotta: {
          DEFAULT: "#B65A34",
          dark: "#8E4426",
          muted: "rgba(182,90,52,0.10)",
          fill: "rgba(182,90,52,0.06)",
          outline: "rgba(182,90,52,0.40)",
        },
        secondary: {
          DEFAULT: "#B65A34",
          dark: "#8E4426",
        },
        background: "#FBF7F0",
        cream: {
          DEFAULT: "#FBF7F0",
          86: "rgba(251,247,240,0.86)",
          82: "rgba(251,247,240,0.82)",
          72: "rgba(251,247,240,0.72)",
          70: "rgba(251,247,240,0.70)",
          55: "rgba(251,247,240,0.55)",
          35: "rgba(251,247,240,0.35)",
          30: "rgba(251,247,240,0.30)",
          "07": "rgba(251,247,240,0.07)",
        },
        surface: {
          DEFAULT: "#F2EADD",
          alt: "#F4F1EA",
        },
        ink: {
          DEFAULT: "#23201C",
          alt: "#3A352E",
        },
        muted: {
          DEFAULT: "#6E675D",
          subtle: "#9A9287",
          disabled: "#C9C2B5",
          unavailable: "#BEB6A9",
        },
        hairline: {
          6: "rgba(35,32,28,0.06)",
          8: "rgba(35,32,28,0.08)",
          10: "rgba(35,32,28,0.10)",
          12: "rgba(35,32,28,0.12)",
          14: "rgba(35,32,28,0.14)",
          16: "rgba(35,32,28,0.16)",
          18: "rgba(35,32,28,0.18)",
          20: "rgba(35,32,28,0.20)",
          25: "rgba(35,32,28,0.25)",
          30: "rgba(35,32,28,0.30)",
        },
        success: {
          DEFAULT: "#4E7A52",
          accent: "#8FAE72",
          halo: "rgba(143,174,114,0.25)",
        },
        warning: "#C08A2E",
        error: {
          DEFAULT: "#A33A2B",
          fill: "rgba(163,58,43,0.04)",
          muted: "rgba(163,58,43,0.10)",
        },
        hero: "#E3C9A8",
        track: "#E6E1D6",
        shimmer: {
          from: "#EFE9DE",
          to: "#F7F3EB",
        },
        scrim: {
          DEFAULT: "rgba(24,21,18,0.34)",
          sheet: "rgba(24,21,18,0.38)",
        },
        overlay: {
          78: "rgba(24,21,18,0.78)",
          65: "rgba(24,21,18,0.65)",
          50: "rgba(24,21,18,0.50)",
          15: "rgba(24,21,18,0.15)",
          12: "rgba(24,21,18,0.12)",
          10: "rgba(24,21,18,0.10)",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        ui: ["var(--font-jost)", "sans-serif"],
      },
      fontSize: {
        display: ["5.5rem", { lineHeight: "1.02", fontWeight: "300" }],
        "display-m": ["2.375rem", { lineHeight: "1.08", fontWeight: "300" }],
        h1: ["3.375rem", { lineHeight: "1.12", fontWeight: "300" }],
        h2: ["2.5rem", { lineHeight: "1.14", fontWeight: "300" }],
        h3: ["1.5rem", { lineHeight: "1.2", fontWeight: "400" }],
        price: ["1.25rem", { lineHeight: "1.2", fontWeight: "400" }],
        body: ["1.0625rem", { lineHeight: "1.7", fontWeight: "300" }],
        small: ["0.875rem", { lineHeight: "1.5", fontWeight: "300" }],
        label: [
          "0.6875rem",
          { lineHeight: "1.2", fontWeight: "400", letterSpacing: "0.2em" },
        ],
        button: [
          "0.9375rem",
          { lineHeight: "1.2", fontWeight: "400", letterSpacing: "0.05em" },
        ],
        wordmark: [
          "1.5rem",
          { lineHeight: "1.1", fontWeight: "400", letterSpacing: "0.14em" },
        ],
      },
      letterSpacing: {
        button: "0.05em",
        label: "0.2em",
        wordmark: "0.14em",
        eyebrow: "0.34em",
        kicker: "0.18em",
        locale: "0.3em",
      },
      spacing: {
        4.5: "1.125rem",
        13: "3.25rem",
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        gutter: "3.5rem",
        "gutter-m": "1.25rem",
      },
      borderRadius: {
        input: "12px",
        slot: "12px",
        card: "14px",
        "card-lg": "16px",
        "card-xl": "18px",
        modal: "20px",
        sheet: "28px",
        pill: "999px",
        check: "6px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(35,32,28,0.07)",
        raised: "0 16px 32px rgba(35,32,28,0.12)",
        float: "0 20px 50px rgba(35,32,28,0.16)",
        modal: "0 30px 70px rgba(35,32,28,0.30)",
        primary: "0 10px 24px rgba(61,74,49,0.26)",
        "primary-hover": "0 14px 26px rgba(61,74,49,0.30)",
        "primary-soft": "0 8px 20px rgba(61,74,49,0.22)",
        selected: "0 12px 28px rgba(61,74,49,0.12)",
        "stepper-hover": "0 8px 18px rgba(61,74,49,0.30)",
        "focus-input": "0 0 0 3px rgba(61,74,49,0.14)",
        "focus-button": "0 0 0 3px #FBF7F0, 0 0 0 5px #3D4A31",
        open: "0 0 0 4px rgba(143,174,114,0.25)",
        halo: "0 0 0 12px rgba(251,247,240,0.07)",
        dropdown: "0 14px 30px rgba(35,32,28,0.14)",
      },
      transitionDuration: {
        hover: "180ms",
        sheet: "260ms",
      },
      transitionTimingFunction: {
        out: "ease-out",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "sheet-in": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "sheet-out": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(100%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "modal-in": {
          from: { opacity: "0", transform: "scale(0.98) translateY(8px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "tick-in": {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        spin: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s linear infinite",
        "sheet-in": "sheet-in 260ms ease-out both",
        "sheet-out": "sheet-out 260ms ease-out both",
        "fade-in": "fade-in 260ms ease-out both",
        "fade-out": "fade-out 260ms ease-out both",
        "modal-in": "modal-in 260ms ease-out both",
        "tick-in": "tick-in 260ms ease-out both",
        spin: "spin 0.8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
