// smoke/rn/run-rn.mjs
//
// Bundles smoke/rn/smoke.mjs using esbuild with the resolution conditions
// metro applies for React Native consumers (`react-native` first, then
// `browser`, then `import`). Then asserts on the bundled output:
//   1. The package's exports map resolves under the RN condition chain.
//   2. The bundle contains zero references to Node-only primitives (node:*
//      imports, `process`, `Buffer`, `__dirname`, `require(`, `global.`).
//      Any such reference would crash inside Hermes/JSC at runtime.
//   3. The bundled code executes successfully under Node and surfaces an
//      `ok: true` smoke result. (Node is used as a JS host — this is a
//      structural check, not a JSC runtime check; the V8/workerd path is
//      covered by smoke/workers and the browser engines by smoke/browser.)

import { build } from "esbuild";
import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ENTRY = join(HERE, "smoke.mjs");

const FORBIDDEN = [
  /(?:^|[^a-zA-Z_$])require\s*\(/,
  /(?:^|[^a-zA-Z_$])process\.(?!env\b)/,
  /(?:^|[^a-zA-Z_$])Buffer\b/,
  /(?:^|[^a-zA-Z_$])__dirname\b/,
  /(?:^|[^a-zA-Z_$])__filename\b/,
  /(?:^|[^a-zA-Z_$])global\./,
  /from\s+['"]node:/,
  /import\s*\(\s*['"]node:/,
];

async function main() {
  const tmp = await mkdtemp(join(tmpdir(), "cc-rn-smoke-"));
  const outFile = join(tmp, "smoke.bundled.mjs");

  await build({
    entryPoints: [ENTRY],
    bundle: true,
    format: "esm",
    platform: "neutral",
    target: "es2022",
    outfile: outFile,
    conditions: ["react-native", "browser", "import"],
  });

  const bundled = await readFile(outFile, "utf8");
  const offenders = FORBIDDEN.filter((re) => re.test(bundled));
  if (offenders.length > 0) {
    await rm(tmp, { recursive: true, force: true });
    throw new Error(
      "RN bundle contains Node-only primitives the metro/Hermes runtime can't satisfy: " +
        offenders.map((re) => re.toString()).join(", "),
    );
  }

  const result = await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [outFile], {
      stdio: ["ignore", "pipe", "inherit"],
    });
    let out = "";
    child.stdout.on("data", (chunk) => (out += chunk));
    child.on("error", reject);
    child.on("close", (code) => {
      if (code !== 0) reject(new Error(`bundled smoke exited with code ${code}`));
      else resolve(out);
    });
  });

  await rm(tmp, { recursive: true, force: true });

  const lastLine = result.trim().split("\n").pop() ?? "";
  let parsed;
  try {
    parsed = JSON.parse(lastLine);
  } catch {
    throw new Error("could not parse smoke result line: " + lastLine);
  }
  if (!parsed.ok) {
    throw new Error("RN smoke failed: " + parsed.failures.join(", "));
  }
  console.log("React Native (metro-style resolution + structural check): smoke OK");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
