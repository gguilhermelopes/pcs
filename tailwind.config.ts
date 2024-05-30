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
        neutral100: "var(--color-neutral-100)",
        neutral200: "var(--color-neutral-200)",
        neutral300: "var(--color-neutral-300)",
        neutral400: "var(--color-neutral-400)",
        neutral500: "var(--color-neutral-500)",
        danger: "var(--color-danger)",
        warning: "var(--color-warning)",
        success: "var(--color-success)",
        white: "var(--color-white)",
        black: "var(--color-black)",
      },
    },
  },
  plugins: [],
};
export default config;
