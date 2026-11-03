// @ts-check
import js from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  { ignores: ["dist/", "coverage/", "node_modules/", ".astro/"] },
  {
    files: ["**/*.{js,mjs,ts}"],
    extends: [js.configs.recommended, tseslint.configs.strictTypeChecked],
    languageOptions: { parserOptions: { projectService: true } },
  },
  // Plain JS (config files included) is outside tsconfig, so type-aware rules cannot run on it.
  // Scripts inside .astro files are virtual files; `astro check` type-checks them instead.
  {
    files: ["**/*.{js,mjs}", "**/*.astro/*.ts"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  eslintPluginAstro.configs.recommended,
);
