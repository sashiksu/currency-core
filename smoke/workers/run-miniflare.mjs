// smoke/workers/run-miniflare.mjs
//
// Runs the Workers smoke (smoke/workers/worker.mjs) against the workerd
// runtime via miniflare. workerd doesn't read node_modules and won't honor
// host filesystem imports beyond what we hand it, so we pre-bundle the
// worker with esbuild into a single self-contained .mjs first.
//
// The bundling step also confirms that the package's exports map and .mjs
// outputs work in the bundler-resolution mode (the same path Wrangler /
// Vite / Rollup would use to ship a Worker).

import { build } from "esbuild";
import { Miniflare } from "miniflare";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ENTRY = join(HERE, "worker.mjs");

async function main() {
  const tmp = await mkdtemp(join(tmpdir(), "cc-workers-smoke-"));
  const outFile = join(tmp, "worker.bundled.mjs");

  await build({
    entryPoints: [ENTRY],
    bundle: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
    outfile: outFile,
    conditions: ["worker", "browser", "import"],
  });

  const script = await readFile(outFile, "utf8");
  await rm(tmp, { recursive: true, force: true });

  const mf = new Miniflare({
    modules: true,
    script,
    compatibilityDate: "2025-01-01",
  });

  try {
    const res = await mf.dispatchFetch("http://localhost/");
    const body = await res.json();
    if (!body.ok) {
      throw new Error("Workers smoke failed: " + body.failures.join(", "));
    }
    console.log("Workers (workerd via miniflare): smoke OK");
  } finally {
    await mf.dispose();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
