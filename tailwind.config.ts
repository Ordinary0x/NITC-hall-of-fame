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
          50: "#fce8e8",
          100: "#f5c6c6",
          200: "#eb9494",
          300: "#de5c5c",
          400: "#c94040",
          500: "#b83030",
          600: "#9a2424",
          700: "#7a1c1c",
          800: "#5a1414",
          900: "#3a0c0c",
        },
        surface: "#1a1a1a",
        "surface-strong": "#222222",
      },
    },
  },
  plugins: [],
};

export default config;
