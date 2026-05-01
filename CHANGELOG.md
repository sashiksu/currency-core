# Changelog

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Pre-1.0 alphas publish under the `next` npm dist-tag.

## [Unreleased]

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

[Unreleased]: https://github.com/sashiksu/currency-core/compare/v1.0.0-alpha.4...HEAD
[1.0.0-alpha.4]: https://github.com/sashiksu/currency-core/compare/v1.0.0-alpha.3...v1.0.0-alpha.4
[1.0.0-alpha.3]: https://github.com/sashiksu/currency-core/compare/v1.0.0-alpha.2...v1.0.0-alpha.3
[1.0.0-alpha.2]: https://github.com/sashiksu/currency-core/compare/v1.0.0-alpha.1...v1.0.0-alpha.2
[1.0.0-alpha.1]: https://github.com/sashiksu/currency-core/compare/v1.0.0-alpha.0...v1.0.0-alpha.1
[1.0.0-alpha.0]: https://github.com/sashiksu/currency-core/releases/tag/v1.0.0-alpha.0
