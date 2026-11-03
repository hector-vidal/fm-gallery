// @ts-check
import { defineConfig } from "astro/config";

// Project site on GitHub Pages: every fm-* repository is served under its own path.
export default defineConfig({
  site: "https://hector-vidal.github.io",
  base: "/fm-gallery",
});
