import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: "#f9ecec",
          100: "#f1d4d4",
          200: "#e3abab",
          300: "#d17c7c",
          400: "#c04f4f",
          500: "#a12626",
          600: "#8a1f1f",
          700: "#6f1818",
          800: "#551212",
          900: "#390c0c",
        },
        cream: "#f5efe4",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(193, 79, 79, 0.35), 0 24px 50px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
