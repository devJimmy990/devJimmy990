import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "950px",
      xl: "1200px",
      "2xl": "1400px",
      "3xl": "1600px",
      "4xl": "1800px",
      "5xl": "2000px",
      "6xl": "2200px",
      "7xl": "2400px",
      "8xl": "2600px",
      "9xl": "2800px",
    },
    fontFamily:{
      primary:"var(--font-jetbrainsMono)",
    },
    extend: {
      colors: {
        primary:'#1c1c22',
        accent:{
          DEFAULT: '#00ff99',
          hover:"#00e187"
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
