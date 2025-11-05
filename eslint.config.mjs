import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
// import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["jest.setup.js", "jest.config.js", "dist/**/*"],
  },
  {
    files: ["src/core/result.ts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
