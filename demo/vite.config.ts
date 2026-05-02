import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Deployed at https://sashiksu.github.io/currency-core/ — the GitHub Pages
  // workflow sets VITE_BASE=/currency-core/ at build time. Dev server falls
  // through to "/".
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
  resolve: {
    alias: [
      // The compat-subpath aliases must come BEFORE the bare-name alias —
      // Vite tests aliases in order and would otherwise rewrite "currency-core"
      // and never see the "/compat/codes" suffix.
      {
        find: "currency-core/compat/codes",
        replacement: path.resolve(root, "../src/compat/codes.ts"),
      },
      {
        find: "currency-core/compat/symbol-map",
        replacement: path.resolve(root, "../src/compat/symbol-map.ts"),
      },
      {
        find: "currency-core/compat/exponent-map",
        replacement: path.resolve(root, "../src/compat/exponent-map.ts"),
      },
      // Import the library source directly so HMR fires on lib edits with
      // no rebuild. The path alias replaces an `npm install currency-core`
      // step that would otherwise need a publish + bump per change.
      {
        find: "currency-core",
        replacement: path.resolve(root, "../src/index.ts"),
      },
    ],
  },
  server: {
    port: 5173,
    open: true,
  },
});
