// tailwind.config.js
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
  theme: {
    extend: {
      // Custom Color Palette (Your requested colors + shades)
      colors: {
        primary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#2C3E50", // Your primary color (dark blue-grey)
          600: "#1e293b",
          700: "#0f172a",
          800: "#020617",
          900: "#000000",
        },
        secondary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#3498DB", // Your secondary color (vibrant blue)
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        accent: {
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
      },
      // Font Family
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      // Extensions
      boxShadow: {
        soft: "0 4px 14px 0 rgba(0, 0, 0, 0.05)",
        hard: "0 4px 24px 0 rgba(0, 0, 0, 0.12)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [typography, forms, animate],
};
