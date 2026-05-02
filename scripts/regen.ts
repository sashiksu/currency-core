// scripts/regen.ts
//
// Compares the bundled dataset against authoritative upstream sources and
// either reports drift or — with `--apply` — writes safe field-level updates
// directly to src/data/{fiat,historical}.ts.
//
// Sources:
//   - SIX Interbank Clearing list-one.xml (active ISO 4217)
//   - SIX Interbank Clearing list-three.xml (historical / withdrawn ISO 4217)
//   - CoinGecko /coins/markets (top-200 by market cap; relevance check only)
//
// Crypto regen scope is intentionally narrow: we ask "are our 50 tickers still
// in the top-200 by market cap?" and surface fall-outs for human review. We
// never auto-add new tickers (avoids weekly snapshot churn) and don't auto-
// update decimals/chain (the cheap /coins/markets endpoint doesn't expose
// them, and per-coin /coins/{id} calls run into rate limits and noise).
//
// What's auto-applied (the safe set):
//   - decimals      (integer; rare correction at the ISO level)
//   - numericCode   (integer; ISO sometimes re-codes mergers)
//
// What's reported but never auto-written (needs manual curation):
//   - New active currencies (require symbol, country alpha-2, units, etc.)
//   - Currencies in our dataset that disappeared from list-one
//     (they're typically transitioning to historical — needs successor)
//   - withdrawnDate (SIX format is YYYY-MM; we use ISO YYYY-MM-DD)
//
// What's intentionally NOT reported:
//   - Name spelling drift. SIX uses terse country-noun forms ("Schilling",
//     "Old Leu", "Pakistan Rupee") while we curate to clearer English-Wikipedia
//     forms. Treat names as a hand-curation axis, not regen drift.
//   - "New historical" entries. SIX list-three is exhaustive (100+ entries
//     across decades); we curate the 30 most-relevant. The roster is a
//     manual decision — only field-level changes on our existing 30 are surfaced.
//   - Special-purpose accounting / indexation units intentionally excluded
//     (see KNOWN_EXCLUDED below).
//
// Usage:
//   npm run regen           # report drift to stdout and to regen-report.md
//   npm run regen -- --apply  # additionally write safe field updates to src/data/

import * as fs from "node:fs";
import * as path from "node:path";
import { currencies as currentDataset } from "../src/data";
import type { Currency } from "../src/types";

const SIX_LIST_ONE =
  "https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml";
const SIX_LIST_THREE =
  "https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-three.xml";
const COINGECKO_MARKETS =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1";

const REPO_ROOT = path.resolve(__dirname, "..");
const FIAT_PATH = path.join(REPO_ROOT, "src", "data", "fiat.ts");
const HIST_PATH = path.join(REPO_ROOT, "src", "data", "historical.ts");
const REPORT_PATH = path.join(REPO_ROOT, "regen-report.md");

// ISO 4217 entries SIX publishes that we intentionally do not ship as
// regular currencies. Adding a code here suppresses it from "new upstream"
// drift reporting. Source-of-truth for the rationale lives in fiat.ts'
// "out of scope" header note.
const KNOWN_EXCLUDED = new Set<string>([
  // Precious metals (carry CcyMnrUnts="N.A." so already filtered, listed for clarity).
  "XAU",
  "XAG",
  "XPT",
  "XPD",
  // Bond / settlement / test / no-currency codes (also "N.A.", listed for clarity).
  "XBA",
  "XBB",
  "XBC",
  "XBD",
  "XDR",
  "XSU",
  "XTS",
  "XUA",
  "XXX",
  // Fund / indexation units carrying real CcyMnrUnts but not "currency for paying things".
  "XAD", // Arab Accounting Dinar (Arab Monetary Fund accounting unit)
  "UYW", // Uruguay Unidad Previsional (pension indexation)
  // IsFund="true" entries (already filtered upstream but listed for clarity).
  "BOV",
  "CHE",
  "CHW",
  "CLF",
  "COU",
  "MXV",
  "USN",
  "UYI",
]);

interface UpstreamFiat {
  code: string;
  name: string;
  numericCode: number;
  decimals: number;
}

interface UpstreamHistorical {
  code: string;
  name: string;
  numericCode: number;
  withdrawnDate: string;
}

interface FieldChange {
  code: string;
  field: "decimals" | "numericCode";
  ours: string | number;
  theirs: string | number;
}

interface DiffReport {
  fieldChanges: FieldChange[];
  upstreamMissing: Currency[]; // we have it, upstream doesn't
  newUpstream: Array<UpstreamFiat | UpstreamHistorical>; // upstream has it, we don't
}

async function fetchText(url: string, label: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${label} fetch failed: HTTP ${res.status}`);
  }
  return res.text();
}

async function fetchJson<T>(url: string, label: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${label} fetch failed: HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}

interface CoinGeckoMarket {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number | null;
}

interface CryptoRelevanceReport {
  /** Tickers present in our roster but absent from CoinGecko top-200. */
  fallOuts: Currency[];
  /** Top-50 cap matched (top 50 by rank that we ALSO carry). */
  matched: Array<{ code: string; rank: number }>;
}

function diffCryptoRelevance(
  ours: readonly Currency[],
  markets: CoinGeckoMarket[],
): CryptoRelevanceReport {
  const upstreamBySymbol = new Map<string, CoinGeckoMarket>();
  for (const m of markets) {
    const sym = m.symbol.toUpperCase();
    const existing = upstreamBySymbol.get(sym);
    if (!existing || (m.market_cap_rank ?? Infinity) < (existing.market_cap_rank ?? Infinity)) {
      upstreamBySymbol.set(sym, m);
    }
  }

  const fallOuts: Currency[] = [];
  const matched: Array<{ code: string; rank: number }> = [];
  for (const c of ours) {
    if (c.type !== "crypto") continue;
    const m = upstreamBySymbol.get(c.code);
    if (!m) {
      fallOuts.push(c);
    } else if (m.market_cap_rank !== null) {
      matched.push({ code: c.code, rank: m.market_cap_rank });
    }
  }
  matched.sort((a, b) => a.rank - b.rank);
  return { fallOuts, matched };
}

function parseListOne(xml: string): UpstreamFiat[] {
  const out: UpstreamFiat[] = [];
  const seen = new Set<string>();
  const re = /<CcyNtry>([\s\S]*?)<\/CcyNtry>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const inner = m[1];
    if (/<CcyNm[^>]*\bIsFund\s*=\s*"true"/i.test(inner)) continue;
    const ccyM = /<Ccy>([^<]*)<\/Ccy>/.exec(inner);
    const mnrM = /<CcyMnrUnts>([^<]*)<\/CcyMnrUnts>/.exec(inner);
    if (!ccyM || !mnrM) continue;
    const code = ccyM[1].trim();
    const minorRaw = mnrM[1].trim();
    if (!code || minorRaw === "N.A.") continue;
    if (seen.has(code)) continue;
    seen.add(code);
    const ccyNmM = /<CcyNm[^>]*>([^<]*)<\/CcyNm>/.exec(inner);
    const ccyNbrM = /<CcyNbr>([^<]*)<\/CcyNbr>/.exec(inner);
    out.push({
      code,
      name: ccyNmM?.[1]?.trim() ?? "",
      numericCode: parseInt(ccyNbrM?.[1]?.trim() ?? "0", 10),
      decimals: parseInt(minorRaw, 10),
    });
  }
  return out;
}

function parseListThree(xml: string): UpstreamHistorical[] {
  const out: UpstreamHistorical[] = [];
  const seen = new Set<string>();
  const re = /<HstrcCcyNtry>([\s\S]*?)<\/HstrcCcyNtry>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const inner = m[1];
    const ccyM = /<Ccy>([^<]*)<\/Ccy>/.exec(inner);
    if (!ccyM) continue;
    const code = ccyM[1].trim();
    if (!code || seen.has(code)) continue;
    seen.add(code);
    const ccyNmM = /<CcyNm[^>]*>([^<]*)<\/CcyNm>/.exec(inner);
    const ccyNbrM = /<CcyNbr>([^<]*)<\/CcyNbr>/.exec(inner);
    const wdrM = /<WthdrwlDt>([^<]*)<\/WthdrwlDt>/.exec(inner);
    out.push({
      code,
      name: ccyNmM?.[1]?.trim() ?? "",
      numericCode: parseInt(ccyNbrM?.[1]?.trim() ?? "0", 10),
      withdrawnDate: wdrM?.[1]?.trim() ?? "",
    });
  }
  return out;
}

function diffActiveFiat(
  ours: readonly Currency[],
  theirs: UpstreamFiat[],
): DiffReport {
  const oursByCode = new Map(
    ours.filter((c) => c.type === "fiat" && c.status === "active").map((c) => [c.code, c]),
  );
  const theirsByCode = new Map(theirs.map((t) => [t.code, t]));

  const fieldChanges: FieldChange[] = [];
  const upstreamMissing: Currency[] = [];
  const newUpstream: UpstreamFiat[] = [];

  for (const [code, our] of oursByCode) {
    const their = theirsByCode.get(code);
    if (!their) {
      upstreamMissing.push(our);
      continue;
    }
    if (our.numericCode !== their.numericCode) {
      fieldChanges.push({
        code,
        field: "numericCode",
        ours: our.numericCode ?? "(none)",
        theirs: their.numericCode,
      });
    }
    if (our.decimals !== their.decimals) {
      fieldChanges.push({ code, field: "decimals", ours: our.decimals, theirs: their.decimals });
    }
  }
  for (const [code, their] of theirsByCode) {
    if (oursByCode.has(code)) continue;
    if (KNOWN_EXCLUDED.has(code)) continue;
    newUpstream.push(their);
  }
  return { fieldChanges, upstreamMissing, newUpstream };
}

// Historical curation is intentional, not exhaustive: only field-level drift
// on entries we already track is surfaced. New SIX list-three entries that we
// don't ship are intentional omissions, not regen drift.
function diffHistorical(
  ours: readonly Currency[],
  theirs: UpstreamHistorical[],
): DiffReport {
  const oursByCode = new Map(
    ours.filter((c) => c.status === "historical").map((c) => [c.code, c]),
  );
  const theirsByCode = new Map(theirs.map((t) => [t.code, t]));

  const fieldChanges: FieldChange[] = [];

  for (const [code, our] of oursByCode) {
    const their = theirsByCode.get(code);
    if (!their) continue; // upstream missing for historical — extremely unlikely; skip silently
    if (our.numericCode !== their.numericCode) {
      fieldChanges.push({
        code,
        field: "numericCode",
        ours: our.numericCode ?? "(none)",
        theirs: their.numericCode,
      });
    }
  }
  return { fieldChanges, upstreamMissing: [], newUpstream: [] };
}

interface UpdateMap {
  decimals?: number;
  numericCode?: number;
}

function applyFieldUpdates(filePath: string, updates: Map<string, UpdateMap>): number {
  if (updates.size === 0) return 0;
  const lines = fs.readFileSync(filePath, "utf8").split("\n");
  let currentCode: string | null = null;
  let writes = 0;
  const codeStartRe = /^(\s*)code:\s*"([^"]+)",\s*$/;
  const decimalsRe = /^(\s*)decimals:\s*\d+,(\s*\/\/.*)?$/;
  const numericRe = /^(\s*)numericCode:\s*\d+,(\s*\/\/.*)?$/;

  for (let i = 0; i < lines.length; i++) {
    const codeM = codeStartRe.exec(lines[i]);
    if (codeM) {
      currentCode = codeM[2];
      continue;
    }
    if (!currentCode) continue;
    const u = updates.get(currentCode);
    if (!u) continue;
    if (u.decimals !== undefined) {
      const m = decimalsRe.exec(lines[i]);
      if (m) {
        lines[i] = `${m[1]}decimals: ${u.decimals},${m[2] ?? ""}`;
        writes++;
      }
    }
    if (u.numericCode !== undefined) {
      const m = numericRe.exec(lines[i]);
      if (m) {
        lines[i] = `${m[1]}numericCode: ${u.numericCode},${m[2] ?? ""}`;
        writes++;
      }
    }
  }
  fs.writeFileSync(filePath, lines.join("\n"));
  return writes;
}

function buildUpdates(changes: FieldChange[]): Map<string, UpdateMap> {
  const out = new Map<string, UpdateMap>();
  for (const c of changes) {
    const u = out.get(c.code) ?? {};
    if (c.field === "decimals") u.decimals = c.theirs as number;
    else if (c.field === "numericCode") u.numericCode = c.theirs as number;
    out.set(c.code, u);
  }
  return out;
}

function formatList(items: string[]): string {
  return items.length === 0 ? "_none_" : items.map((s) => `- ${s}`).join("\n");
}

function buildReport(
  fiatDiff: DiffReport,
  histDiff: DiffReport,
  cryptoRelevance: CryptoRelevanceReport,
  applied: boolean,
): string {
  const lines: string[] = [];
  lines.push("# Data regen report");
  lines.push("");
  lines.push(
    "_Generated by `npm run regen`. Auto-applicable field updates (decimals, numericCode) " +
      (applied ? "have been written" : "are eligible to be written with `--apply`") +
      " directly to `src/data/{fiat,historical}.ts`. Name diffs are intentionally not surfaced — SIX uses terse country-noun forms (\"Pakistan Rupee\", \"Schilling\") while our hand-curation prefers clearer English. Items below describe upstream drift that requires manual curation._",
  );
  lines.push("");

  lines.push("## Active fiat (SIX list-one.xml)");
  lines.push("");
  lines.push("### New upstream currencies (need symbol, country alpha-2, units, etc. before adding)");
  lines.push("");
  lines.push(
    formatList(
      fiatDiff.newUpstream.map((u) => {
        const c = u as UpstreamFiat;
        return `\`${c.code}\` — ${c.name} (numericCode ${c.numericCode}, decimals ${c.decimals})`;
      }),
    ),
  );
  lines.push("");
  lines.push("### Currencies in our dataset but missing from upstream (likely transitioning to historical)");
  lines.push("");
  lines.push(
    formatList(
      fiatDiff.upstreamMissing.map((c) => `\`${c.code}\` — ${c.name}`),
    ),
  );
  lines.push("");

  lines.push("## Historical (SIX list-three.xml)");
  lines.push("");
  lines.push(
    "_Only field-level drift on entries we already track is surfaced here. " +
      "SIX list-three is exhaustive across decades; the 30-record curation in " +
      "`historical.ts` is intentional, not derived from upstream membership._",
  );
  lines.push("");
  if (histDiff.fieldChanges.length === 0) {
    lines.push("_No field-level drift on tracked historical entries._");
  } else {
    lines.push(
      formatList(
        histDiff.fieldChanges.map(
          (c) => `\`${c.code}.${c.field}\`: ${JSON.stringify(c.ours)} → ${JSON.stringify(c.theirs)}`,
        ),
      ),
    );
  }
  lines.push("");

  lines.push("## Cryptocurrency (CoinGecko top-200 by market cap)");
  lines.push("");
  if (cryptoRelevance.fallOuts.length === 0) {
    lines.push("_All shipped crypto tickers are still inside the CoinGecko top-200._");
  } else {
    lines.push("### Tickers no longer in CoinGecko top-200 — review whether to keep");
    lines.push("");
    lines.push(
      formatList(
        cryptoRelevance.fallOuts.map(
          (c) => `\`${c.code}\` — ${c.name} (chain: ${c.chain ?? "n/a"})`,
        ),
      ),
    );
  }
  lines.push("");

  return lines.join("\n");
}

function logFieldChanges(label: string, changes: FieldChange[]): void {
  if (changes.length === 0) {
    console.log(`  ${label}: no field-level drift`);
    return;
  }
  console.log(`  ${label}: ${changes.length} field-level change(s)`);
  for (const c of changes) {
    console.log(`    ${c.code}.${c.field}: ${JSON.stringify(c.ours)} → ${JSON.stringify(c.theirs)}`);
  }
}

async function main(): Promise<void> {
  const apply = process.argv.includes("--apply");

  console.log("regen: fetching SIX list-one.xml + list-three.xml + CoinGecko top-200...");
  const [listOneXml, listThreeXml, markets] = await Promise.all([
    fetchText(SIX_LIST_ONE, "list-one.xml"),
    fetchText(SIX_LIST_THREE, "list-three.xml"),
    fetchJson<CoinGeckoMarket[]>(COINGECKO_MARKETS, "CoinGecko markets"),
  ]);

  const upstreamFiat = parseListOne(listOneXml);
  const upstreamHist = parseListThree(listThreeXml);

  console.log(
    `regen: parsed ${upstreamFiat.length} active fiat, ${upstreamHist.length} historical, and ${markets.length} crypto market rows.`,
  );

  const fiatDiff = diffActiveFiat(currentDataset, upstreamFiat);
  const histDiff = diffHistorical(currentDataset, upstreamHist);
  const cryptoRelevance = diffCryptoRelevance(currentDataset, markets);

  console.log("");
  console.log("Active fiat diff:");
  logFieldChanges("fiat", fiatDiff.fieldChanges);
  console.log(`  fiat: ${fiatDiff.newUpstream.length} new upstream record(s)`);
  console.log(`  fiat: ${fiatDiff.upstreamMissing.length} of our records absent from upstream`);
  console.log("");
  console.log("Historical diff:");
  logFieldChanges("historical", histDiff.fieldChanges);
  console.log("");
  console.log("Crypto relevance (CoinGecko top-200):");
  console.log(`  crypto: ${cryptoRelevance.matched.length} ticker(s) inside top-200`);
  console.log(`  crypto: ${cryptoRelevance.fallOuts.length} ticker(s) absent from top-200`);
  for (const c of cryptoRelevance.fallOuts) {
    console.log(`    ${c.code} — ${c.name}`);
  }

  if (apply) {
    const fiatWrites = applyFieldUpdates(FIAT_PATH, buildUpdates(fiatDiff.fieldChanges));
    const histWrites = applyFieldUpdates(HIST_PATH, buildUpdates(histDiff.fieldChanges));
    console.log("");
    console.log(`regen: wrote ${fiatWrites} field update(s) to fiat.ts and ${histWrites} to historical.ts.`);
  }

  fs.writeFileSync(REPORT_PATH, buildReport(fiatDiff, histDiff, cryptoRelevance, apply));
  console.log(`regen: refreshed ${path.relative(REPO_ROOT, REPORT_PATH)}.`);
}

main().catch((err) => {
  console.error("regen failed:", err);
  process.exit(1);
});
