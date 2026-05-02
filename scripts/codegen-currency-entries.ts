// scripts/codegen-currency-entries.ts
//
// Regenerates one tree-shake-friendly entry per currency under
// `src/currencies/<CODE>.ts` and the matching dts-bundle-generator config
// `dts-bundle-generator.currencies.config.json`.
//
// Each generated entry contains the literal record with only a type-only
// import for `Currency`, so the emitted .js has zero runtime imports —
// importing `currency-core/currencies/USD` pulls in ~200 bytes of inline
// data instead of the full dataset.
//
// Usage:
//   npm run codegen:currencies         # write files in place
//   npm run codegen:currencies:check   # exit 1 if any output is out of sync (CI)

import * as fs from "node:fs";
import * as path from "node:path";
import { currencies } from "../src/data";
import type { Currency } from "../src/types";

const OUT_DIR = path.resolve(__dirname, "..", "src", "currencies");
const DTS_CONFIG = path.resolve(
  __dirname,
  "..",
  "dts-bundle-generator.currencies.config.json",
);

const HEADER = `// AUTO-GENERATED — do not edit by hand. Run \`npm run codegen:currencies\` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via \`npm run codegen:currencies:check\`.
`;

function literal(value: unknown, indent: string): string {
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    const items = value
      .map((v) => `${indent}  ${literal(v, indent + "  ")}`)
      .join(",\n");
    return `[\n${items},\n${indent}]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return "{}";
    const lines = entries
      .map(([k, v]) => `${indent}  ${JSON.stringify(k)}: ${literal(v, indent + "  ")}`)
      .join(",\n");
    return `{\n${lines},\n${indent}}`;
  }
  throw new Error(`Cannot serialize ${typeof value} value`);
}

function build(c: Currency): string {
  return `${HEADER}
import type { Currency } from "../types";

export const ${c.code}: Currency = ${literal(c, "")};
`;
}

function dtsConfig(records: readonly Currency[]): string {
  const entries = records.map((c) => ({
    filePath: `./src/currencies/${c.code}.ts`,
    outFile: `./dist/currencies/${c.code}.d.ts`,
    noCheck: false,
  }));
  return `${JSON.stringify(
    {
      compilationOptions: {
        preferredConfigPath: "./tsconfig.types.json",
      },
      entries,
    },
    null,
    2,
  )}\n`;
}

function main(): void {
  const check = process.argv.includes("--check");
  const sorted = [...currencies].sort((a, b) => a.code.localeCompare(b.code));
  const expectedFiles = new Map<string, string>();

  for (const c of sorted) {
    const filePath = path.join(OUT_DIR, `${c.code}.ts`);
    expectedFiles.set(filePath, build(c));
  }

  expectedFiles.set(DTS_CONFIG, dtsConfig(sorted));

  if (check) {
    const expectedNames = new Set(
      [...expectedFiles.keys()].map((p) => path.basename(p)),
    );
    const actualNames = fs.existsSync(OUT_DIR)
      ? new Set(fs.readdirSync(OUT_DIR))
      : new Set<string>();
    const stray = [...actualNames].filter(
      (f) => f.endsWith(".ts") && !expectedNames.has(f),
    );
    if (stray.length > 0) {
      console.error(
        `codegen-currency-entries: stray files in src/currencies/: ${stray.join(", ")}`,
      );
      console.error("Run `npm run codegen:currencies` to clean up.");
      process.exit(1);
    }
    for (const [filePath, content] of expectedFiles) {
      const existing = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, "utf8")
        : "";
      if (existing !== content) {
        console.error(
          `codegen-currency-entries: ${path.relative(process.cwd(), filePath)} is out of sync.`,
        );
        console.error("Run `npm run codegen:currencies` to fix.");
        process.exit(1);
      }
    }
    console.log(
      `codegen-currency-entries: all ${sorted.length} entries (and the dts config) are up to date.`,
    );
    return;
  }

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  // Drop stray files first so deletions in the dataset propagate.
  const expectedNames = new Set(
    [...expectedFiles.keys()].map((p) => path.basename(p)),
  );
  for (const f of fs.readdirSync(OUT_DIR)) {
    if (f.endsWith(".ts") && !expectedNames.has(f)) {
      fs.unlinkSync(path.join(OUT_DIR, f));
    }
  }

  for (const [filePath, content] of expectedFiles) {
    fs.writeFileSync(filePath, content);
  }
  console.log(
    `codegen-currency-entries: wrote ${sorted.length} entries to src/currencies/ and refreshed the dts config.`,
  );
}

main();
