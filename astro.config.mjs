// @ts-check
import { defineConfig, envField } from "astro/config";

// Project site on GitHub Pages: every fm-* repository is served under its own path.
export default defineConfig({
  site: "https://hector-vidal.github.io",
  base: "/fm-gallery",
  env: {
    schema: {
      // Optional. Without it the GitHub API allows 60 requests an hour, one per challenge
      // and build; the workflows pass the workflow token.
      GITHUB_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
  // Screenshots live in each challenge repository; the build downloads and optimises them.
  image: {
    domains: ["raw.githubusercontent.com"],
  },
});
