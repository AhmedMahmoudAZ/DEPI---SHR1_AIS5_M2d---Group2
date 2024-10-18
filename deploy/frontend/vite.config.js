import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/predict": {
        target: "https://road-final-projectapi-production.up.railway.app",
        changeOrigin: true, // Change the origin of the host header to the target URL
        secure: false, // If you're using a self-signed certificate
      },
    },
  },
});
