import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwind(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "PitchCraft AI Powered Pitch Deck Generator",
        short_name: "PitchCraft",
        start_url: ".",
        display: "standalone",
        background_color: "#18181b",
        theme_color: "#2563eb",
        description:
          "Instantly generate stunning pitch decks tailored to your startup using AI-powered templates.",
        icons: [
          {
            src: "/assets/favicon_io/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/assets/favicon_io/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/favicon_io/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "/assets/favicon_io/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/assets/favicon_io/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,json,webmanifest}"],
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024, // 8MB
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "react-vendor": ["react", "react-dom"],
          "router-vendor": ["react-router-dom"],
          "ui-vendor": ["react-icons", "react-hot-toast"],
          "chart-vendor": ["chart.js", "react-chartjs-2"],
          "dnd-vendor": ["react-dnd", "react-dnd-html5-backend"],
          "utils-vendor": ["clsx", "pptxgenjs"],
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId
                .split("/")
                .pop()
                ?.replace(".tsx", "")
                .replace(".ts", "")
            : "chunk";
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") || [];
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext || "")) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext || "")) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    sourcemap: false, // Disable sourcemaps in production for smaller bundles
  },
  preview: {},
});
