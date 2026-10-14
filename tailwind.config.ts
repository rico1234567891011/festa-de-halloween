import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "roxo-profundo": "#3A0F5C",
        "preto-noite": "#0B0B10",
        "laranja-queimado": "#C75C1E",
        "lilas-luar": "#E6D7FF",
        "cinza-ameixa": "#2F2A3A",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "42%": { opacity: "0.9" },
          "48%": { opacity: "0.55" },
          "54%": { opacity: "0.95" },
          "78%": { opacity: "0.8" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.75" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        flicker: "flicker 3.2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
