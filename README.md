# currency-core

A TypeScript-first ISO 4217 + cryptocurrency dataset and lookup library — symbols, names, decimals, and country mappings in a single, strongly-typed shape.

[![TypeScript](https://img.shields.io/badge/TypeScript-first--class-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Zero dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen)](./package.json)
[![ESM + CJS](https://img.shields.io/badge/bundle-ESM%20%2B%20CJS-blueviolet)](./package.json)

> Status: 1.0.0-alpha cycle. APIs may evolve until the GA cut. The package is not yet published to npm — install via the `@next` tag once the first alpha is live.

<details>
<summary><strong>Table of contents</strong></summary>

- [What it is](#what-it-is)
- [Quick start](#quick-start)
- [Why currency-core](#why-currency-core)
- [Use cases](#use-cases)
- [API reference](#api-reference)
  - [`getCurrency`](#getcurrency)
  - [`getSymbol`](#getsymbol)
  - [`getName`](#getname)
  - [`getDecimals`](#getdecimals)
  - [`safeGetCurrency`](#safegetcurrency)
  - [`safeGetSymbol`](#safegetsymbol)
  - [The `Currency` shape](#the-currency-shape)
  - [`CurrencyCode`, `CurrencyType`, `CurrencyStatus`](#currencycode-currencytype-currencystatus)
- [Types: dual overloads explained](#types-dual-overloads-explained)
- [Data scope](#data-scope)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

</details>

## What it is

`currency-core` is a small, dependency-free dataset and lookup layer for currency metadata. It bundles ISO 4217 fiat codes, selected cryptocurrencies, and historical (withdrawn) currencies in one consistent record shape, with the typed surface area you'd expect from a modern TypeScript library: a strict `CurrencyCode` literal union, dual-overload lookups that return `Currency` directly on the happy path, and `safeGet*` variants for unsanitized runtime input. It's built for app authors who want correct symbols, decimals, and country mappings without pulling in a large i18n stack.

## Quick start

After the first alpha publish:

```bash
npm install currency-core@next
```

```ts
import { getCurrency, getSymbol } from "currency-core";

console.log(getSymbol("USD"));            // "$"
console.log(getCurrency("BTC")?.chain);   // "bitcoin"
console.log(getCurrency("HRK")?.successor); // "EUR"
```

## Why currency-core

- **TypeScript-first.** A strict `CurrencyCode` literal union, narrow return types on every export, and `.d.ts` shipped in the bundle.
- **Zero runtime dependencies.** Nothing pulled in transitively; nothing to audit beyond this package.
- **Tiny bundle.** ~680 B ESM gzipped, ~762 B CJS gzipped, with size budgets enforced in CI.
- **Dual ESM + CJS.** Modern `exports` map with both `import` and `require` entry points; `sideEffects: false` for clean tree-shaking.
- **Dual overloads for type safety.** Pass a typed `CurrencyCode` and get a non-nullable `Currency` back; pass an arbitrary `string` and get `Currency | undefined`. Pick the ergonomics you want at the call site.
- **One shape across fiat, crypto, and historical records.** A single `Currency` interface covers active ISO 4217 codes, selected cryptocurrencies (with `chain`), and withdrawn currencies (with `withdrawnDate` and `successor`).
- **Source-cited data with provenance.** Every data field is traceable to a published dataset; see [`ATTRIBUTIONS.md`](./ATTRIBUTIONS.md) and [`LICENSE-DATA.md`](./LICENSE-DATA.md).

## Use cases

### Display a price with the right symbol

```ts
import { getSymbol, getDecimals } from "currency-core";

function formatPrice(amount: number, code: "USD" | "EUR" | "JPY") {
  const symbol = getSymbol(code);
  const decimals = getDecimals(code);
  return `${symbol}${amount.toFixed(decimals)}`;
}

formatPrice(1234.5, "USD"); // "$1234.50"
formatPrice(1234.5, "JPY"); // "¥1235"  (JPY has 0 decimals)
```

### Validate a user-provided currency code

```ts
import { safeGetCurrency } from "currency-core";

function pickCurrency(input: string) {
  const currency = safeGetCurrency(input);
  if (!currency) {
    throw new Error(`Unsupported currency: ${input}`);
  }
  return currency;
}
```

### Detect a withdrawn currency and route to its successor

```ts
import { getCurrency } from "currency-core";

const record = getCurrency("HRK"); // Croatian Kuna, withdrawn 2023
if (record.status === "historical" && record.successor) {
  console.warn(`${record.code} is withdrawn — using ${record.successor} instead`);
  // → handle migration to EUR
}
```

### Tree-shake to a single currency

If you only need one or two records, import them directly. The bundler ships only what you import — roughly the literal record, no dataset, no lookup logic.

```ts
import { USD } from "currency-core/currencies/USD";
import { JPY } from "currency-core/currencies/JPY";

console.log(USD.symbol);   // "$"
console.log(JPY.decimals); // 0
```

Every shipped code has its own subpath at `currency-core/currencies/<CODE>` (USD, EUR, JPY, BTC, ETH, …, HRK, DEM).

### Migrate from an existing currency package

Three subpaths under `currency-core/compat/` mirror the most common shapes:

```ts
import { symbolMap } from "currency-core/compat/symbol-map";
// { USD: "$", EUR: "€", JPY: "¥", … }

import { codes } from "currency-core/compat/codes";
// ["AAVE", "ADA", "AED", …]

import { exponentMap } from "currency-core/compat/exponent-map";
// { USD: { code: "USD", base: 10, exponent: 2 }, JPY: { …, exponent: 0 }, … }
```

Each shim is a self-contained ESM/CJS bundle (~6.6 KB brotli) that you can drop in wherever your previous library exposed the same shape.

## API reference

All lookups normalize the input to upper-case at runtime, so `getSymbol("usd")` and `getSymbol("USD")` behave identically.

### `getCurrency`

```ts
function getCurrency(code: CurrencyCode): Currency;
function getCurrency(code: string): Currency | undefined;
```

Returns the full `Currency` record. With the typed overload, throws on unknown codes; with the string overload, returns `undefined`.

```ts
getCurrency("EUR").name; // "Euro"
```

### `getSymbol`

```ts
function getSymbol(code: CurrencyCode): string;
```

Returns the default display symbol. Throws on unknown codes — use `safeGetSymbol` for unsanitized input.

```ts
getSymbol("GBP"); // "£"
```

### `getName`

```ts
function getName(code: CurrencyCode): string;
```

Returns the English display name. Throws on unknown codes.

```ts
getName("JPY"); // "Japanese Yen"
```

### `getDecimals`

```ts
function getDecimals(code: CurrencyCode): number;
```

Returns the minor-unit count (0 for JPY, 2 for USD, 8 for BTC). Throws on unknown codes.

```ts
getDecimals("BTC"); // 8
```

### `safeGetCurrency`

```ts
function safeGetCurrency(code: string): Currency | undefined;
```

Always returns `undefined` for unknown codes — no throws. Use this for any input that didn't come through the type system.

```ts
safeGetCurrency("XYZ"); // undefined
```

### `safeGetSymbol`

```ts
function safeGetSymbol(code: string): string | undefined;
```

Always returns `undefined` for unknown codes — no throws.

```ts
safeGetSymbol("XYZ"); // undefined
```

### The `Currency` shape

| Field | Type | Notes |
|---|---|---|
| `code` | `string` | ISO 4217 alpha-3 or crypto ticker. e.g. `"USD"`, `"BTC"`, `"HRK"` |
| `numericCode` | `number?` | ISO 4217 numeric code. Undefined for crypto. |
| `name` | `string` | English display name. |
| `symbol` | `string` | Default display symbol. |
| `symbolNarrow` | `string?` | Narrow variant when it differs (rare). |
| `symbols` | `string[]` | All known symbol forms; useful for parsing. |
| `decimals` | `number` | Minor-unit count. |
| `rounding` | `number` | Rounding increment (usually `1`). |
| `units` | `{ major: string; minor: string }?` | Spelled-out unit names. |
| `countries` | `string[]` | ISO 3166-1 alpha-2 codes where the currency is used. |
| `status` | `"active" \| "historical"` | Whether the currency is in circulation. |
| `withdrawnDate` | `string?` | ISO 8601 date of withdrawal (historical only). |
| `successor` | `string?` | Code that replaced this currency, if any. |
| `type` | `"fiat" \| "crypto" \| "metal"` | Currency category. |
| `chain` | `string?` | Blockchain identifier (crypto only). |
| `htmlEntity` | `string?` | HTML decimal entity for the symbol. |
| `unicodeCodepoint` | `string?` | Unicode codepoint string. |

### `CurrencyCode`, `CurrencyType`, `CurrencyStatus`

```ts
type CurrencyCode = "USD" | "EUR" | "JPY" | "GBP" | /* ...all active ISO 4217... */ | "BTC" | "ETH" | /* ...top-50 crypto... */ | "DEM" | "HRK" | /* ...30 historical... */;
type CurrencyType = "fiat" | "crypto" | "metal";
type CurrencyStatus = "active" | "historical";
```

`CurrencyCode` is the literal union of every code in the bundled dataset. Treat it as the canonical typed surface for known codes; the source of truth lives in [`src/codes.ts`](./src/codes.ts) (codegen'd, never hand-edited).

## Types: dual overloads explained

The lookup functions are designed so the happy path stays sharp:

```ts
import { getCurrency, type CurrencyCode } from "currency-core";

const code: CurrencyCode = "USD";
const c = getCurrency(code); //  Currency  (non-nullable)

const raw: string = readFromQueryString();
const r = getCurrency(raw);  //  Currency | undefined
```

This is two real overloads — the typed signature returns `Currency` (and throws on the rare miss), the string signature returns `Currency | undefined`. You don't need to widen-then-narrow at every call site.

### The `as CurrencyCode` cast pitfall

Because TypeScript trusts type assertions, this compiles but can blow up at runtime:

```ts
const userInput: string = "ZZZ";
getSymbol(userInput as CurrencyCode); //  throws: Unknown currency code: ZZZ
```

Two defenses:

1. **Don't lie to the type system.** Keep `string` typed as `string` and let the string-overload of `getCurrency` return `undefined`.
2. **Use the safe variants for runtime input.** `safeGetCurrency` and `safeGetSymbol` never throw — they return `undefined` for anything not in the dataset.

```ts
const userInput: string = "ZZZ";
const currency = safeGetCurrency(userInput); // undefined, no throw
```

Both lookups also normalize to upper-case internally, so a stray `"usd"` from `JSON.parse` won't silently miss.

## Data scope

The dataset covers the full set of active ISO 4217 fiat currencies plus the top cryptocurrencies by market capitalization and the most-asked-about historical (withdrawn) ISO entries. The current shipping totals:

- **~155 active fiat** currencies across every ISO 4217 maintenance-agency-recognized region, including the supranational currencies (`EUR`, `XOF`, `XAF`, `XCD`, `XPF`, `XCG`).
- **50 cryptocurrencies** by market capitalization (`BTC`, `ETH`, stablecoins, major layer-1s and DeFi tokens) with `chain` identifiers. Display decimals are capped at 8 because the format / parse path is JS-Number based; on-chain integer arithmetic should use a BigInt library.
- **30 historical (withdrawn)** ISO 4217 currencies covering the twelve original Eurozone predecessors, the seven later Eurozone joiners, and notable redenominations across the post-Soviet, ex-Yugoslav, and emerging-market transitions (old Turkish lira, Romanian leu, Mozambican metical, Zimbabwe dollar, Belarusian ruble, Bulgarian lev, Afghan afghani, Angolan kwanza reajustado, plus the European Currency Unit basket that became `EUR`).

`CurrencyCode` is a literal union of every shipped code, regenerated from the dataset by `scripts/codegen-codes.ts` (see `src/codes.ts`). When records are added or removed, CI's `npm run codegen:check` keeps the union in sync.

Every record's shape conforms to the `Currency` interface shown above. Field-level provenance and licensing is documented in [`ATTRIBUTIONS.md`](./ATTRIBUTIONS.md) and [`LICENSE-DATA.md`](./LICENSE-DATA.md). Out of scope for the current alphas (planned for later releases): precious metals (`XAU`, `XAG`, `XPT`, `XPD`), fund codes (`BOV`, `CHE`, `CHW`, `CLF`, `COU`, `MXV`, `USN`, `UYI`, `UYW`), and bond / transaction codes (`XBA`–`XBD`, `XDR`, `XSU`, `XTS`, `XUA`, `XXX`).

## Roadmap

The v1.0 alpha cycle is broken into focused sub-projects. Versions advance as each lands; concrete dates are intentionally not promised here.

### Shipped ✅

- Core `Currency`, `FormatOptions`, `CurrencyCode`, `CurrencyType`, `CurrencyStatus` types
- `getCurrency`, `getSymbol`, `getName`, `getDecimals` with dual overloads
- `safeGetCurrency`, `safeGetSymbol` for unsanitized input
- Reverse lookups: `getCurrencyByNumeric`, `getCurrencyByCountry`, `getCurrenciesBySymbol`, `getCurrencyByLocale`
- Validation predicates: `isValidCode` (type-narrowing), `isCryptocurrency`, `isHistorical`
- Listing helpers: `listCrypto`, `listHistorical`
- `format`, `parse`, `toMinor`, `fromMinor` backed by `Intl.NumberFormat` with graceful fallback and property-based round-trip tests
- Full active ISO 4217 fiat dataset (~155 records), top-50 cryptocurrencies, and 30 historical (withdrawn) currencies
- `CurrencyCode` literal union codegen'd from the dataset, with CI drift check
- Per-currency tree-shake entries: `import { USD } from "currency-core/currencies/USD"` pulls in only USD's record, codegen'd from the dataset for all 236 codes
- Compatibility subpaths so migrations stay one-line: `currency-core/compat/symbol-map`, `currency-core/compat/codes`, `currency-core/compat/exponent-map`
- Dual ESM/CJS bundle with size budgets, 100% test coverage, snapshot-locked dataset, and `tsd` type tests

### In progress 🔜

- Weekly automated data-regen pipeline pulling from SIX, CLDR, and CoinGecko

### Planned 📋

- Cross-runtime hardening (Bun, Deno, Workers, React Native smoke tests)
- Hosted documentation site
- Standalone playground demo (locale-aware formatting, country↔currency explorer)

## Contributing

Bug reports, dataset corrections, and PRs are welcome. Start with [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the local setup, the commit-style conventions, and how the release branches are organized. Issues live at <https://github.com/sashiksu/currency-core/issues>.

## License

Source code is MIT — see [`LICENSE`](./LICENSE).

The bundled data has its own per-field licensing summary in [`LICENSE-DATA.md`](./LICENSE-DATA.md), with upstream sources catalogued in [`ATTRIBUTIONS.md`](./ATTRIBUTIONS.md). In short: the package and its data are free to use, copy, modify, and redistribute under the MIT terms; preserve the data attribution files if you redistribute the package itself.
