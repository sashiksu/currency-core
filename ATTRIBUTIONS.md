# Attributions

`currency-core` bundles factual currency data drawn from the public sources
listed below. We thank the maintainers of every dataset for keeping these
references open, accurate, and machine-consumable.

The licensing summary that governs how the bundled data may be used is in
[LICENSE-DATA.md](./LICENSE-DATA.md). The source code itself is under MIT
(see [LICENSE](./LICENSE)).

---

## Source datasets

### SIX Interbank Clearing — ISO 4217 maintenance agency

- **What we use:** ISO 4217 alpha-3 codes, numeric codes, minor-unit counts,
  and the historical (withdrawn) currency table.
- **Source:** `list-one.xml` (active) and `list-three.xml` (historical),
  published by SIX as the official ISO 4217 maintenance agency.
- **URL:** <https://www.six-group.com/en/products-services/financial-information/data-standards.html>
- **Status:** Standards data — facts published as part of an open standard.
  Codes themselves are not copyrightable (they are factual, public-domain
  data); the XML serialization is republished here in derived (object-literal)
  form, not byte-for-byte.
- **Files:** `src/data/fiat.ts`, `src/data/historical.ts`.

### Unicode CLDR — Common Locale Data Repository

- **What we use:** Currency display data — default symbols, narrow symbol
  variants, English currency names — drawn from
  `cldr-numbers-modern/main/en/currencies.json`.
- **URL:** <https://github.com/unicode-org/cldr-json>
- **License:** Unicode License v3 (also known as the Unicode-DFS-2016 license
  family). Permissive; permits redistribution in derived form with attribution.
  Full text: <https://www.unicode.org/license.txt>
- **Copyright:** © 1991-Present Unicode, Inc. All rights reserved.
- **Files:** `src/data/fiat.ts` (currency name + default symbol fields).

### CoinGecko — cryptocurrency listings

- **What we use:** Cryptocurrency canonical IDs, English names, and ticker
  symbols.
- **URL:** <https://www.coingecko.com/> (data fetched via the public API at
  `https://api.coingecko.com/api/v3/coins/markets`).
- **Terms:** Used under the CoinGecko Public API Terms with attribution. See
  <https://www.coingecko.com/en/api/terms>.
- **Files:** `src/data/crypto.ts`.

### Unicode Consortium charts — currency-symbol codepoints

- **What we use:** Codepoint values (`unicodeCodepoint` field) and HTML
  entity references for currency symbols.
- **URL:** <https://www.unicode.org/charts/>
- **License:** Unicode License (see Unicode CLDR entry above).
- **Files:** `src/data/fiat.ts`, `src/data/crypto.ts`.

### ISO 3166-1 alpha-2 — country codes

- **What we use:** Two-letter country codes in the `countries` field of each
  currency record (e.g. `"US"`, `"DE"`, `"JP"`).
- **Source:** ISO 3166-1 alpha-2, maintained by the ISO 3166 Maintenance
  Agency.
- **URL:** <https://www.iso.org/iso-3166-country-codes.html>
- **Status:** Two-letter country identifiers are factual data and not
  copyrightable. The mapping of currencies to countries reflects publicly
  documented usage.

---

## How to report an attribution issue

If a citation here is incorrect, missing, or out of date — including license
changes from any upstream source — please open a GitHub issue tagged
`attribution` at <https://github.com/sashiksu/currency-core/issues>.
