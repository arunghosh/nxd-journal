import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import EnvironmentPlugin from "vite-plugin-environment";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "node:path";

const manifest = {
  theme_color: "#ffffff",
  background_color: "#ffffff",
  display: "standalone",
  scope: "/",
  start_url: "/",
  short_name: "NxD Todo",
  description: "Todo App enhanced using LLMs and Voice",
  name: "Next Dimension Todo App",
  icons: [
    {
      src: "/icon-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  },
  plugins: [
    react(),
    EnvironmentPlugin("all"),
    VitePWA({
      manifest,
      registerType: "prompt",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
