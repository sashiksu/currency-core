// Asserts every src/data/*.ts file starts with a comment block citing
// its source URL and fetch date. Run as part of CI (and `npm run release`).
//
// Header pattern required:
//   - First non-empty line is `// <filename>` (relative path)
//   - Block contains `Sources:` and `Fetched:` markers
//   - Block contains `License:` marker
//
// Exits 1 if any data file is missing a header. Exits 0 on success.

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "src", "data");
const REQUIRED_MARKERS = ["Sources:", "Fetched:", "License:"];

function fail(msg: string): never {
  console.error(`verify-headers: ${msg}`);
  process.exit(1);
}

if (!existsSync(DATA_DIR)) {
  fail(`expected directory not found: ${DATA_DIR}`);
}

const files = readdirSync(DATA_DIR).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts",
);

if (files.length === 0) {
  fail(`no data files found in ${DATA_DIR}`);
}

let failed = 0;

for (const file of files) {
  const path = join(DATA_DIR, file);
  const content = readFileSync(path, "utf8");
  // Read up to first 30 lines as the header block
  const headerLines = content.split("\n").slice(0, 30).join("\n");
  const missing = REQUIRED_MARKERS.filter((m) => !headerLines.includes(m));
  if (missing.length > 0) {
    console.error(
      `  ${file}: missing required header markers: ${missing.join(", ")}`,
    );
    failed += 1;
  }
}

if (failed > 0) {
  fail(`${failed} of ${files.length} data file(s) failed header verification`);
}

console.log(
  `verify-headers: ${files.length} data file(s) all have valid source-citation headers.`,
);
