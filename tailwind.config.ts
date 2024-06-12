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
        leftToFull: {
          to: { width: "100%" },
        },
        opacityToFull: {
          to: { opacity: "1" },
        },
        opacityIn: {
          to: { opacity: "initial", transform: "initial" },
        },
        spin: {
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        "left-to-full": "leftToFull .3s forwards",
        "opacity-to-full": "opacityToFull .3s forwards",
        "opacity-in": "opacityIn .75s forwards",
        "spin-loader": "spin 1s infinite",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
export default config;
