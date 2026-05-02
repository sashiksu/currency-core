// smoke/browser/run-playwright.mjs
//
// Drives the in-browser smoke (smoke/browser/index.html) across Chromium,
// Firefox, and WebKit via Playwright. Spins a tiny static HTTP server rooted
// at the package directory so the page can import dist/*.mjs by absolute URL,
// since file:// loads are CORS-restricted for ES modules.

import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium, firefox, webkit } from "playwright";

const ROOT = fileURLToPath(new URL("../../", import.meta.url));
const PORT = Number(process.env.SMOKE_PORT) || 4178;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".cjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

function serve() {
  const server = http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
      const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
      const filePath = join(
        ROOT,
        safe === "/" ? "smoke/browser/index.html" : safe.replace(/^\//, ""),
      );
      const body = await readFile(filePath);
      res.writeHead(200, {
        "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function runOne(launcher, label) {
  const browser = await launcher.launch();
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push("console.error: " + msg.text());
    });
    await page.goto(`http://127.0.0.1:${PORT}/smoke/browser/index.html`, {
      waitUntil: "networkidle",
    });
    const result = await page.evaluate(() => window.__smokeResult);
    if (!result || !result.ok) {
      throw new Error(
        `${label} smoke failed: ${
          result ? result.failures.join(", ") : "no result captured"
        } | runtime errors: ${errors.join(" | ")}`,
      );
    }
    console.log(`${label}: smoke OK`);
  } finally {
    await browser.close();
  }
}

async function main() {
  const server = await serve();
  try {
    await runOne(chromium, "Chromium");
    await runOne(firefox, "Firefox");
    await runOne(webkit, "WebKit");
  } finally {
    server.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
