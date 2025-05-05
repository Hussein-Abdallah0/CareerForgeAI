import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react()],

  // Add these critical configurations
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});
