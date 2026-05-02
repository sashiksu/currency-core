# Data licensing summary

This file explains the licensing situation for the *data* shipped inside
`currency-core`. The package's source code, TypeScript types, build scripts,
and tests are governed by the MIT License (see [LICENSE](./LICENSE)).

The third-party datasets that contribute to the bundled records are catalogued
in [ATTRIBUTIONS.md](./ATTRIBUTIONS.md). The summary below is a
quick-reference; the canonical license text of each upstream source is the
authoritative version.

---

## Per-field licensing

| Field on each `Currency` record | Origin | License / status |
|---|---|---|
| `code` (ISO 4217 alpha-3 / crypto ticker) | SIX `list-one.xml` / `list-three.xml`; CoinGecko for crypto | Factual data; not copyrightable. |
| `numericCode` (ISO 4217 numeric) | SIX `list-one.xml` / `list-three.xml` | Factual data; not copyrightable. |
| `name` (English display name) | Unicode CLDR `en/currencies.json`; CoinGecko for crypto | Unicode License v3; CoinGecko Public API Terms (with attribution). |
| `symbol`, `symbolNarrow`, `symbols[]` | Unicode CLDR; Unicode Consortium symbol charts | Unicode License v3. |
| `decimals`, `rounding` | SIX `list-one.xml` | Factual data; not copyrightable. |
| `units.major` / `units.minor` | Hand-curated from official central-bank glossaries | Factual data. |
| `countries[]` (ISO 3166-1 alpha-2) | ISO 3166-1 maintenance agency | Factual data; not copyrightable. |
| `status`, `withdrawnDate`, `successor` | SIX `list-three.xml` | Factual data; not copyrightable. |
| `chain` (cryptocurrency only) | CoinGecko | CoinGecko Public API Terms (with attribution). |
| `htmlEntity`, `unicodeCodepoint` | W3C HTML / Unicode Consortium charts | Public technical standards. |

---

## What this means for downstream users

- You may use, copy, modify, and redistribute `currency-core` and its bundled
  data under the MIT License.
- The Unicode License v3 is permissive and compatible with MIT; redistribution
  with attribution is permitted. Bundling `currency-core` in your application
  (or further republishing it) does **not** create an additional Unicode
  attribution obligation on you beyond preserving this `LICENSE-DATA.md` and
  `ATTRIBUTIONS.md` if you redistribute the package itself.
- CoinGecko's public-API terms ask for attribution when you display or
  redistribute their data. The crypto-record fields shipped here carry that
  attribution via `ATTRIBUTIONS.md`. If you republish the data outside the
  context of `currency-core`, mirror the CoinGecko attribution.
- Data fields marked "factual data; not copyrightable" carry no licensing
  restriction beyond the MIT terms of the package itself.

---

## Provenance notes

- Each data file under `src/data/` carries an inline source-citation header
  showing the upstream URL and the date the snapshot was fetched.
- Upstream datasets are re-fetched on the cadence outlined in the project
  roadmap. Diffs are reviewed before merging into `release/X.Y.Z`.
- If an upstream license changes, the corresponding row above will be updated
  in the same release that revises the underlying data.

---

## Disclaimers

The bundled data is provided **as is**, on a best-effort basis, for use in
software that needs accurate currency metadata. It is not a substitute for
official central-bank or regulator publications when used for trading,
settlement, accounting, or compliance purposes — confirm against the
authoritative source for those use cases.
