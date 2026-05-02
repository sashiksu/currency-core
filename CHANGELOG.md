# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Pre-1.0 alphas publish under the `next` npm dist-tag.

## [Unreleased]

## [1.0.0-rc.0] - unreleased

### Added

- Cross-runtime CI smokes against the **built** `dist/` bundle so packaging-only regressions surface before publish:
  - Node 18, 20, and 22 (matrix; smoke runs at the end of the existing `verify` job).
  - Bun (`oven-sh/setup-bun@v2`, latest).
  - Deno v2.x (`denoland/setup-deno@v2`, `--allow-read` only).
  - Cloudflare Workers via `miniflare` against the workerd runtime — the worker is pre-bundled with `esbuild` (`conditions: ["worker", "browser", "import"]`), the same resolution chain Wrangler / Vite use to ship a Worker.
  - React Native bundler-resolution check via `esbuild` with `conditions: ["react-native", "browser", "import"]`, plus a structural scan of the bundled output that fails on any `node:*` import or any reference to `process.` (other than `process.env`), `Buffer`, `__dirname`, `__filename`, `global.`, or bare `require(`. Catches RN-incompatible code at the bundle level without dragging `react-native` + `metro` into devDeps.
  - Browser engines via Playwright — Chromium, Firefox, and WebKit each load `smoke/browser/index.html` over a tiny static HTTP server and execute the same assertion module.
- `arethetypeswrong` (attw) gate via `npm run attw` (`@arethetypeswrong/cli@^0.18`). Wired into the `verify` matrix so every Node version checks the dual ESM/CJS resolution. The only suppression is `--ignore-rules no-resolution`, which covers the unfixable case of compat subpaths under Node 10's pre-`exports`-map resolver (this package is Node 18+ baseline per `engines.node`).
- ESLint `no-restricted-imports` rule scoped to `src/**/*.ts` that bans `node:*` imports plus the bare-name builtins (`fs`, `path`, `crypto`, `child_process`, `http`, `process`, `stream`, `buffer`, `url`, `util`, `tls`, `net`, `https`, `events`, `os`, `zlib`, `fs/promises`). `scripts/` is exempt and continues to use `node:fs` / `node:path` for the codegen and regen tooling.
- `smoke/run.mjs` — runtime-agnostic Node/Bun/Deno smoke that imports the built ESM bundle and exercises every public subpath (core lookup, reverse lookup, predicates, listing helpers, format/parse round-trip, minor units, all three compat shims, three per-currency entries).

### Changed

- **Renamed dist outputs from `.esm.js` / `.cjs.js` → `.mjs` / `.cjs`.** The previous `.esm.js` extension defaulted to CJS in Node without `"type": "module"`, which surfaced as `arethetypeswrong`'s "UnexpectedModuleSyntax" warning and a noisy `MODULE_TYPELESS_PACKAGE_JSON` log line for direct-path consumers. Explicit `.mjs` / `.cjs` extensions remove the ambiguity per file. `package.json#main`, `#module`, `#exports`, `#files`, the size-limit paths, and the README quick-start now reference the new names. Consumers using the package via the `exports` map (`import 'currency-core'`) see no change.
- **Compat shims now ship as named exports**: `import { symbolMap } from 'currency-core/compat/symbol-map'`, `import { codes } from 'currency-core/compat/codes'`, `import { exponentMap, type ExponentEntry } from 'currency-core/compat/exponent-map'`. Previous `export default` shape would have shipped a CJS↔.d.ts mismatch (`module.exports = X` paired with `export default X` trips TS-under-`node16` for CJS importers — attw's "FalseExportDefault"). Named exports are syntactically valid in both ESM and CJS contexts, so a single bundled `.d.ts` works.
- New `scripts/dual-dts.ts` post-build step duplicates each `.d.ts` to `.d.mts` and `.d.cts` siblings, with `package.json#exports` routing `import.types` → `.d.mts` and `require.types` → `.d.cts`. Resolves attw's "Masquerading as CJS" flag on the import-side without forcing `"type": "module"` (which would have rippled through `jest.config.js` and the rollup config).
- `package.json#exports` restructured so each subpath has separate `import` / `require` blocks, each with its own `types` and `default` — the modern dual-publish layout that attw expects.
- **Hard `size-limit` caps**, no longer bumped per cycle: 10 KB main ESM/CJS (NFR-3 ceiling is 30 KB; current measured 7.16 KB / 7.33 KB brotlied), 8 KB per compat shim, **500 B per per-currency entry** (NFR-4; USD measured 183 B brotlied — 63% headroom). The per-currency cap is now enforced on every PR, not just informally tracked.
- `README.md` compat examples and `CLAUDE.md` §3 API table updated to reflect the named-export shape.

### Migration notes

This is the first release that drops the `.esm.js` / `.cjs.js` filenames in `dist/`. Consumers who imported via the package name (`import 'currency-core'`, `import 'currency-core/compat/symbol-map'`) are unaffected — the `exports` map handles the rename transparently. Consumers importing dist files by relative path (rare) need to update the extension.

The compat shims now require named imports:

```diff
- import symbolMap from "currency-core/compat/symbol-map";
+ import { symbolMap } from "currency-core/compat/symbol-map";

- import codes from "currency-core/compat/codes";
+ import { codes } from "currency-core/compat/codes";

- import exponentMap from "currency-core/compat/exponent-map";
+ import { exponentMap } from "currency-core/compat/exponent-map";
```

Both changes were possible without a deprecation cycle because no version has been published to npm yet (the first publish happens at v1.0.0 GA per `docs/roadmap.md` sub-project #10).

## [1.0.0-beta.1] - unreleased

### Added

- `scripts/regen.ts` — fetches SIX `list-one.xml` (active ISO 4217), `list-three.xml` (historical), and CoinGecko `/coins/markets` (top-200 by market cap), diffs each against the bundled dataset, and writes drift requiring manual curation to `regen-report.md`.
  - Auto-applies safe field updates (`decimals`, `numericCode`) to `src/data/{fiat,historical}.ts` when run with `--apply`.
  - Skips name-spelling diffs (SIX uses terse country-noun forms like "Schilling" / "Pakistan Rupee" while the bundled data prefers clearer English-Wikipedia forms).
  - Skips "new historical" entries (the 30-record curation in `historical.ts` is intentional, not exhaustive).
  - Crypto regen surfaces tickers absent from the CoinGecko top-200 for human review; never auto-adds new tickers (avoids weekly snapshot churn).
- `npm run regen` (dry-run) and `npm run regen:apply` (auto-apply safe updates).
- `.github/workflows/data-regen.yml` — weekly Monday 06:00 UTC cron that runs the regen, refreshes derived files, updates the snapshot, and opens a stable `data-regen/weekly` PR via `peter-evans/create-pull-request@v6`.
- Initial `regen-report.md` flags two real drift items already: `VED` (new ISO code distinct from the existing `VES`) and `BGN` (Bulgaria moving to historical with the 2026 Eurozone accession), plus five crypto tickers that have fallen out of the CoinGecko top-200 since the dataset was curated.

## [1.0.0-beta.0] - unreleased

### Added

- Per-currency entry exports — every record in the bundled dataset now ships as its own subpath under `currency-core/currencies/<CODE>` (236 entries: USD, EUR, JPY, BTC, ETH, …, ECU, BYR). Each entry contains only the literal `Currency` record with a type-only import, so a tree-shaking bundler that pulls `currency-core/currencies/USD` gets ~200 bytes of inline data instead of the full dataset. Generated by `scripts/codegen-currency-entries.ts`; CI enforces drift via `npm run codegen:currencies:check`.
- `currency-core/compat/symbol-map` — flat `Record<CurrencyCode, string>` of code → display symbol, default-exported. Built once at module load from the bundled dataset.
- `currency-core/compat/codes` — `readonly CurrencyCode[]` of every shipped code, default-exported.
- `currency-core/compat/exponent-map` — `Record<CurrencyCode, { code, base: 10, exponent }>` for libraries that prefer explicit base/exponent over the `Currency` record. The `ExponentEntry` interface is also exported as a named export.

### Changed

- `package.json#exports` now declares all subpaths (compat shims and per-currency entries via wildcard); `package.json#files` ships `dist/compat/` and `dist/currencies/`.
- Build pipeline: Rollup runs one config per entry (main + 3 compat + 236 per-currency), and `dts-bundle-generator` consumes two config files (`dts-bundle-generator.config.json` for main + compat, the codegen'd `dts-bundle-generator.currencies.config.json` for per-currency).
- `size-limit` gate now covers the three compat shims (7 KB ESM each) in addition to the main bundle. CI enforces it on every push.
- Per-currency entry tree is excluded from coverage measurement (auto-generated literal data files; covered structurally by the codegen drift check).

## [1.0.0-alpha.4] - unreleased

### Added

- `listCrypto()` — returns all records with `type === "crypto"` as a stable `readonly Currency[]` built once at module load.
- `listHistorical()` — returns all records with `status === "historical"` as a stable `readonly Currency[]` built once at module load.
- 49 new cryptocurrency records bringing `crypto.ts` to the top-50 by market capitalization (covering `ETH`, `USDT`, `BNB`, `SOL`, `USDC`, `XRP`, `DOGE`, `ADA`, `TRX`, `AVAX`, `SHIB`, `WBTC`, `LINK`, `DOT`, `MATIC`, `BCH`, `LTC`, `NEAR`, `UNI`, `ICP`, `APT`, `DAI`, `ETC`, `XMR`, `STX`, `ATOM`, `XLM`, `TON`, `CRO`, `OKB`, `FIL`, `TUSD`, `HBAR`, `INJ`, `ARB`, `VET`, `MKR`, `KAS`, `THETA`, `RUNE`, `GRT`, `AAVE`, `ALGO`, `FLOW`, `QNT`, `SAND`, `AXS`, `EGLD`, `XTZ` alongside the existing `BTC`). Each record carries a `chain` identifier; display `decimals` are capped at 8.
- 29 new historical (withdrawn) ISO 4217 records bringing `historical.ts` to 30: the twelve original Eurozone predecessors (`DEM`, `FRF`, `ITL`, `ESP`, `PTE`, `ATS`, `NLG`, `BEF`, `LUF`, `FIM`, `IEP`, `GRD`); the seven later Eurozone joiners (`SIT`, `CYP`, `MTL`, `SKK`, `EEK`, `LVL`, `LTL`); the post-Soviet / ex-Yugoslav transitions (`SUR`, `YUM`); the redenominations (`ROL`, `TRL`, `MZM`, `ZWD`, `AFA`, `AOR`, `BYR`, `BGL`); and the `ECU` basket that became `EUR`. Each record carries `withdrawnDate` and `successor`.

### Changed

- `data-integrity.test.ts` code-shape rule split per type — fiat (active and historical) stays strict ISO 4217 alpha-3 (`/^[A-Z]{3}$/`); crypto tickers may be 2–10 letters (`/^[A-Z]{2,10}$/`) so 4-5-letter market-cap leaders (`USDT`, `USDC`, `MATIC`, `THETA`, …) can ship.
- Size-limit caps raised to 8 KB ESM / 9 KB CJS to fit the larger dataset; current bundle measures 7.16 KB ESM / 7.33 KB CJS minified+brotlied. Hard caps come at sub-project #8.
- `data/index.ts` exposes two new derived collections built once at module load: `cryptos` and `historicals`. They back the public `listCrypto` / `listHistorical` helpers.

## [1.0.0-alpha.3] - unreleased

### Added

- `format(amount, code, opts?)` — locale-aware currency formatting via `Intl.NumberFormat`. Supports `locale`, `variant` (`'default'` | `'narrow'` | `'wide'`), and `signDisplay` options. Degrades gracefully in environments without `Intl.NumberFormat` and for non-ISO-4217 codes (crypto tickers) using a symbol+`toFixed` fallback.
- `parse(input, code, opts?)` — parses a formatted currency string back to `number | null`. Locale-aware decimal separator detection via `Intl.NumberFormat.formatToParts`. Returns `null` for malformed input, empty strings, unknown codes, or multiple decimal separators.
- `toMinor(amount, code)` — converts a major-unit amount to minor units (e.g., `1` USD → `100` cents, `1` BHD → `1000` fils, `1` JPY → `1`). Respects each currency's `decimals` field.
- `fromMinor(amount, code)` — inverse of `toMinor` (e.g., `100` cents → `1` USD).
- `FormatOptions` interface exported from the package root.
- Property-based round-trip tests via `fast-check`: `parse(format(x, c), c) ≈ x` for USD (2 decimals) and JPY (0 decimals) across 200 random inputs each.

## [1.0.0-alpha.2] - unreleased

### Added

- Reverse lookup functions: `getCurrencyByNumeric` (ISO 4217 numeric code → record), `getCurrencyByCountry` (ISO 3166-1 alpha-2 → primary currency), `getCurrenciesBySymbol` (symbol string → all matching records), `getCurrencyByLocale` (BCP 47 locale tag → primary currency via region subtag).
- Validation predicates: `isValidCode` (type-narrowing guard — narrows `string` to `CurrencyCode`), `isCryptocurrency`, `isHistorical`.
- Three derived index Maps built at module load in `src/data/index.ts`: `byNumericCode`, `byCountry`, `bySymbol`.
- 30 new runtime tests in `src/__tests__/reverse-lookup.test.ts`; 10 new type-level assertions in `src/__tests-d__/types.test-d.ts`. Coverage remains at 100%.

## [1.0.0-alpha.1] - 2026-05-01

### Added

- Full active ISO 4217 fiat dataset in `src/data/fiat.ts` — ~155 records covering every maintenance-agency-recognized active currency, including the supranational codes (EUR, XOF, XAF, XCD, XPF, XCG). Out-of-scope categories (precious metals, fund codes, bond / transaction codes) intentionally deferred to later milestones.
- `scripts/codegen-codes.ts` — derives the `CurrencyCode` literal union from the bundled dataset and writes it to `src/codes.ts`. Exposed via `npm run codegen`; CI uses `npm run codegen:check` to fail builds when the file is out of sync.
- Snapshot-locked code-list test in `src/__tests__/data-integrity.test.ts` — every dataset change produces a reviewable snapshot diff. Refresh with `npm test -- -u` after intentional additions or removals.
- Per-record shape assertions for the larger dataset: ISO 4217 alpha-3 code shape, ISO 3166-1 alpha-2 country code shape, numeric-code uniqueness across fiat, decimals/rounding bounds.

### Changed

- Moved `CurrencyCode` from `src/types.ts` to `src/codes.ts`. `src/index.ts` continues to re-export it from the package root, so consumer imports do not change.

## [1.0.0-alpha.0] - 2026-05-01

### Added

- Repo scaffold: TypeScript source layout, Rollup-based dual ESM/CJS bundle, declaration bundling via `dts-bundle-generator`, tooling configs (ESLint flat config, Prettier, Jest, tsd, size-limit).
- `Currency` interface plus the `CurrencyCode`, `CurrencyType`, `CurrencyStatus` literal-union types. Strict 6-record union: `"USD" | "EUR" | "JPY" | "GBP" | "BTC" | "HRK"`.
- Six seed records covering active fiat (USD, EUR, JPY, GBP), one cryptocurrency (BTC), and one historical/withdrawn currency (HRK, successor EUR, withdrawn 2023-01-01).
- Lookup API: `getCurrency`, `getSymbol`, `getName`, `getDecimals` — dual-overload signatures so a typed `CurrencyCode` returns the bare value (throws on unknown), and an arbitrary `string` returns `T | undefined`.
- Safe variants: `safeGetCurrency`, `safeGetSymbol` — always return `undefined` for unknown codes; never throw.
- Runtime input normalization: every lookup `.toUpperCase()`s its argument to defend against `as CurrencyCode` casts and `JSON.parse` results.
- Test suite: 34 tests across `src/__tests__/lookup.test.ts` and `src/__tests__/data-integrity.test.ts`; 100% coverage on `src/`.
- Type tests via `tsd` in `src/__tests-d__/types.test-d.ts` covering the overload contract.
- Day-one documentation: README, this CHANGELOG, CONTRIBUTING, SECURITY, ATTRIBUTIONS, LICENSE-DATA, NOTICE, LICENSE.
- Source-citation header check via `npm run verify:headers`.

[Unreleased]: https://github.com/sashiksu/currency-core/compare/v1.0.0-beta.1...HEAD
[1.0.0-beta.1]: https://github.com/sashiksu/currency-core/compare/v1.0.0-beta.0...v1.0.0-beta.1
[1.0.0-beta.0]: https://github.com/sashiksu/currency-core/compare/v1.0.0-alpha.4...v1.0.0-beta.0
[1.0.0-alpha.4]: https://github.com/sashiksu/currency-core/compare/v1.0.0-alpha.3...v1.0.0-alpha.4
[1.0.0-alpha.3]: https://github.com/sashiksu/currency-core/compare/v1.0.0-alpha.2...v1.0.0-alpha.3
[1.0.0-alpha.2]: https://github.com/sashiksu/currency-core/compare/v1.0.0-alpha.1...v1.0.0-alpha.2
[1.0.0-alpha.1]: https://github.com/sashiksu/currency-core/compare/v1.0.0-alpha.0...v1.0.0-alpha.1
[1.0.0-alpha.0]: https://github.com/sashiksu/currency-core/releases/tag/v1.0.0-alpha.0
