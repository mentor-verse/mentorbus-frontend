import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/mentorbus-frontend/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Ensure react libraries are split into their own chunk
          react: ["react", "react-dom"],
        },
      },
    },
  },
  server: {
    historyApiFallback: true, // This helps with the fallback to index.html for dev server
  },
});
