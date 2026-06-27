import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";

// Served from https://ekallevik.github.io/klatrepasset/ on GitHub Pages,
// so production assets need the repo-name base path. Dev stays at root.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/klatrepasset/" : "/",
  plugins: [solid(), tailwindcss()],
}));
