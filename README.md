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
- [Data scope (1.0.0-alpha.0)](#data-scope-100-alpha0)
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
type CurrencyCode = "USD" | "EUR" | "JPY" | "GBP" | "BTC" | "HRK";
type CurrencyType = "fiat" | "crypto" | "metal";
type CurrencyStatus = "active" | "historical";
```

`CurrencyCode` will expand as the dataset grows in subsequent alpha cycles. Treat it as the canonical typed surface for known codes.

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

## Data scope (1.0.0-alpha.0)

This first alpha ships a deliberately small seed dataset so the API and types can be exercised end-to-end before the full set lands. Six records are included:

| Code | Name | Type | Status |
|---|---|---|---|
| `USD` | United States Dollar | fiat | active |
| `EUR` | Euro | fiat | active |
| `JPY` | Japanese Yen | fiat | active |
| `GBP` | Pound Sterling | fiat | active |
| `BTC` | Bitcoin | crypto | active |
| `HRK` | Croatian Kuna | fiat | historical |

The shape on each record is the same one the full dataset will use — see the `Currency` table above. Field-level provenance and licensing for each piece of data is documented in [`ATTRIBUTIONS.md`](./ATTRIBUTIONS.md) and [`LICENSE-DATA.md`](./LICENSE-DATA.md).

## Roadmap

The v1.0 alpha cycle is broken into focused sub-projects. Versions advance as each lands; concrete dates are intentionally not promised here.

### Shipped ✅

- Core `Currency`, `CurrencyCode`, `CurrencyType`, `CurrencyStatus` types
- `getCurrency`, `getSymbol`, `getName`, `getDecimals` with dual overloads
- `safeGetCurrency`, `safeGetSymbol` for unsanitized input
- Six-record seed dataset (USD, EUR, JPY, GBP, BTC, HRK)
- Dual ESM/CJS bundle with size budgets, 100% test coverage, and `tsd` type tests

### In progress 🔜

- Full ~180 active fiat dataset, generated from the SIX ISO 4217 maintenance feed
- Expanded `CurrencyCode` literal union, codegen'd from the dataset
- Reverse lookups by country and by symbol

### Planned 📋

- Larger cryptocurrency set with chain metadata
- Full historical (withdrawn) currency table with successor chains
- `format()` / `parse()` helpers
- Per-currency entry points for tree-shake-only-what-you-use
- Hosted documentation site

## Contributing

Bug reports, dataset corrections, and PRs are welcome. Start with [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the local setup, the commit-style conventions, and how the release branches are organized. Issues live at <https://github.com/sashiksu/currency-core/issues>.

## License

Source code is MIT — see [`LICENSE`](./LICENSE).

The bundled data has its own per-field licensing summary in [`LICENSE-DATA.md`](./LICENSE-DATA.md), with upstream sources catalogued in [`ATTRIBUTIONS.md`](./ATTRIBUTIONS.md). In short: the package and its data are free to use, copy, modify, and redistribute under the MIT terms; preserve the data attribution files if you redistribute the package itself.
