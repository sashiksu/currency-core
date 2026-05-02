import { readdirSync } from "node:fs";
import { resolve, basename } from "node:path";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const tsPlugin = () =>
  typescript({
    tsconfig: "./tsconfig.json",
    declaration: false,
    declarationDir: undefined,
    exclude: [
      "**/__tests__/**",
      "**/__tests-d__/**",
      "**/*.test.ts",
      "**/*.test-d.ts",
    ],
  });

const compatEntry = (name) => ({
  input: `src/compat/${name}.ts`,
  output: [
    {
      file: `dist/compat/${name}.cjs`,
      format: "cjs",
      exports: "named",
    },
    {
      file: `dist/compat/${name}.mjs`,
      format: "es",
    },
  ],
  plugins: [tsPlugin(), nodeResolve(), commonjs()],
});

const currencyEntry = (file) => {
  const code = basename(file, ".ts");
  return {
    input: `src/currencies/${file}`,
    output: [
      {
        file: `dist/currencies/${code}.cjs`,
        format: "cjs",
        exports: "named",
      },
      {
        file: `dist/currencies/${code}.mjs`,
        format: "es",
      },
    ],
    plugins: [tsPlugin(), nodeResolve(), commonjs()],
  };
};

const currencyFiles = readdirSync(resolve("src/currencies")).filter((f) =>
  f.endsWith(".ts"),
);

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs",
        format: "cjs",
        exports: "named",
      },
      {
        file: "dist/index.mjs",
        format: "es",
      },
    ],
    plugins: [tsPlugin(), nodeResolve(), commonjs()],
  },
  compatEntry("symbol-map"),
  compatEntry("codes"),
  compatEntry("exponent-map"),
  ...currencyFiles.map(currencyEntry),
];
