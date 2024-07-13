import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { UserConfig as VitestUserConfigInterface } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
} as UserConfig & VitestUserConfigInterface);
