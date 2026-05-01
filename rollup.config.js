import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
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
      file: `dist/compat/${name}.cjs.js`,
      format: "cjs",
      exports: "default",
    },
    {
      file: `dist/compat/${name}.esm.js`,
      format: "es",
    },
  ],
  plugins: [tsPlugin(), resolve(), commonjs()],
});

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        exports: "named",
      },
      {
        file: "dist/index.esm.js",
        format: "es",
      },
    ],
    plugins: [tsPlugin(), resolve(), commonjs()],
  },
  compatEntry("symbol-map"),
  compatEntry("codes"),
  compatEntry("exponent-map"),
];
