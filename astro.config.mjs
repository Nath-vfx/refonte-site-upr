// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  output: "static",
  vite: {
    resolve: {
      alias: {
        "@/": `${path.resolve(__dirname, "src")}/`,
      },
    },
    css: {
      transformer: "postcss",
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or 'modern',
          additionalData: `@use "@/styles/_main.scss" as *;`,
        },
      },
    },
  },
});
