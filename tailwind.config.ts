import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        primary100: "var(--color-primary-100)",
        primary200: "var(--color-primary-200)",
        secondary100: "var(--color-secondary-100)",
        secondary200: "var(--color-secondary-200)",
        secondary300: "var(--color-secondary-300)",
        secondary400: "var(--color-secondary-400)",
        secondary500: "var(--color-secondary-500)",
        danger: "var(--color-danger)",
        warning: "var(--color-warning)",
        success: "var(--color-success)",
        white: "var(--color-white)",
        black: "var(--color-black)",
      },
      backgroundImage: {
        "options-bg-gradient":
          "linear-gradient(90deg, rgba(129,89,219,1) 0%, rgba(163,139,217,1) 100%)",
      },
      keyframes: {
        spin: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        scaleIn: {
          from: {
            transform: "scale(0.75)",
          },
          to: {
            transform: "scale(1)",
          },
        },
        scaleOut: {
          from: {
            transform: "scale(1)",
          },
          to: {
            transform: "scale(0)",
          },
        },
        fadeIn: {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        fadeOut: {
          from: {
            opacity: "1",
          },
          to: {
            opacity: "0",
          },
        },
      },
      animation: {
        "spin-loader": "spin 1s infinite",
        "fade-in": "fadeIn .3s forwards",
        "fade-out": "fadeOut .3s forwards",
        "scale-in": "scaleIn .3s forwards",
        "scale-out": "scaleOut .3s forwards",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
export default config;
