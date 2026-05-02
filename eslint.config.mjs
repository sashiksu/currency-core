import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "coverage/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["*.config.js", "*.config.cjs", "*.config.mjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["src/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["node:*"],
              message:
                "currency-core src/ must stay runtime-agnostic (Node, Bun, Deno, browsers, Workers, RN). Build-time tooling that needs node: builtins belongs in scripts/.",
            },
          ],
          paths: [
            "fs",
            "fs/promises",
            "path",
            "os",
            "crypto",
            "child_process",
            "url",
            "stream",
            "buffer",
            "util",
            "http",
            "https",
            "net",
            "tls",
            "zlib",
            "events",
            "process",
          ].map((name) => ({
            name,
            message:
              "currency-core src/ must stay runtime-agnostic (Node, Bun, Deno, browsers, Workers, RN). Build-time tooling that needs Node builtins belongs in scripts/.",
          })),
        },
      ],
    },
  },
];
