// tailwind.config.js
import type { Config } from "tailwindcss";
import formsPlugin from "@tailwindcss/forms";
import typographyPlugin from "@tailwindcss/typography";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Direct color mappings
        "raisin-black": "#28262c",
        "tropical-indigo": "#998fc7",
        periwinkle: "#d4c2fc",
        magnolia: "#f9f5ff",
        "resolution-blue": "#14248a",

        // Semantic names with variants
        primary: {
          DEFAULT: "#14248a",
          light: "#1c35c9",
          dark: "#0e1a66",
        },
        secondary: {
          DEFAULT: "#998fc7",
          light: "#b2a9e0",
          dark: "#7a70b0",
        },
        accent: {
          DEFAULT: "#d4c2fc",
          light: "#e9e0ff",
          dark: "#bda5fa",
        },
        background: {
          DEFAULT: "#f9f5ff",
          dark: "#28262c",
        },
        surface: {
          DEFAULT: "#ffffff",
          dark: "#1f1d22",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
        mono: ["Fira Code", "monospace"],
      },
      boxShadow: {
        soft: "0 6px 12px rgba(20, 36, 138, 0.1)",
        dark: "0 6px 12px rgba(0, 0, 0, 0.25)",
        neumorphic: "8px 8px 16px #d1c7f9, -8px -8px 16px #ffffff",
        "neumorphic-dark": "8px 8px 16px #1f1d22, -8px -8px 16px #312f36",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, var(--tw-gradient-stops))",
        "gradient-accent": "linear-gradient(135deg, #d4c2fc 0%, #f9f5ff 100%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out forwards",
        "slide-up": "slide-up 0.4s cubic-bezier(0.22, 0.61, 0.36, 1) forwards",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};

export default config;
