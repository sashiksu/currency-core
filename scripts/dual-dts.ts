// scripts/dual-dts.ts
//
// Post-build step that duplicates each .d.ts in dist/ to a .d.mts and .d.cts
// sibling. Required so that arethetypeswrong is happy with the dual ESM/CJS
// resolution: a .d.ts paired with a .mjs is read as CJS by TS-under-node16
// (because the package has no "type": "module"), which trips a "Masquerading
// as CJS" flag. Explicit .d.mts / .d.cts extensions disambiguate per-side.
//
// The named-export shape we ship is syntactically valid in both contexts, so
// the three files are byte-identical — we just need the right names on disk
// so package.json#exports can route import.types vs require.types correctly.

import * as fs from "node:fs";
import * as path from "node:path";

const DIST_DIR = path.resolve(__dirname, "..", "dist");

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith(".d.ts")) {
      out.push(full);
    }
  }
  return out;
}

function main(): void {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`dual-dts: ${DIST_DIR} does not exist — run \`npm run build\` first.`);
    process.exit(1);
  }
  const files = walk(DIST_DIR);
  for (const file of files) {
    const stem = file.slice(0, -".d.ts".length);
    fs.copyFileSync(file, `${stem}.d.mts`);
    fs.copyFileSync(file, `${stem}.d.cts`);
  }
  console.log(`dual-dts: duplicated ${files.length} .d.ts → .d.mts / .d.cts.`);
}

main();
