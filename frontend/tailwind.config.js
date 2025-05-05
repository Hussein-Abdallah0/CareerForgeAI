// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this path matches your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
    },
  },
  plugins: [],
};
