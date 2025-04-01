import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-plugin-prettier"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
  ),
  {
    rules: {
      "no-unused-vars": "off", // Disable the "defined but never used" error
      "@typescript-eslint/no-unused-vars": "off", // Disable the "defined but never used" error
      "@next/next/no-img-element": "off", // Disable the "img" element error
      "jsx-a11y/alt-text": "off", // Disable the "img" element error
      "react-hooks/exhaustive-deps": "off", // Disable the "missing dependency" error
      "@next/next/no-page-custom-font": "off", // Disable the "custom font" error
    }
  },
];

export default eslintConfig;
