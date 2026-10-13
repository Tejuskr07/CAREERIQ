import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0B1020",
          700: "#1B2440",
          500: "#5B6585",
        },
        paper: "#F7F8FC",
        surface: "#FFFFFF",
        border: "#E3E6F0",
        primary: {
          DEFAULT: "#4F46E5",
          soft: "#EEF0FF",
          dark: "#4338CA",
        },
        teal: {
          DEFAULT: "#14B8A6",
          soft: "#CCFBF1",
        },
        amber: {
          DEFAULT: "#F59E0B",
          soft: "#FEF3C7",
        },
        coral: {
          DEFAULT: "#EF4444",
          soft: "#FEE2E2",
        },
        sky: {
          DEFAULT: "#38BDF8",
          soft: "#E0F2FE",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-sora)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(11, 16, 32, 0.05), 0 1px 2px rgba(11, 16, 32, 0.03)",
        cardHover: "0 10px 25px -5px rgba(11, 16, 32, 0.08), 0 8px 10px -6px rgba(11, 16, 32, 0.04)",
      },
      borderRadius: {
        card: "1rem",
      },
    },
  },
  plugins: [],
};
export default config;
