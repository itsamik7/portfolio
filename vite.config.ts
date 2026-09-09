import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes every asset URL relative, so the site works on
// GitHub Pages project URLs like https://username.github.io/repo-name/
export default defineConfig({
  plugins: [react()],
  base: "./",
});
