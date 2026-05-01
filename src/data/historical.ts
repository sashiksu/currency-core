// src/data/historical.ts
//
// ISO 4217 historical (withdrawn) currencies.
// Sources:
//   - SIX Interbank Clearing list-three.xml
//     https://www.six-group.com/en/products-services/financial-information/data-standards.html
//     Fetched: 2026-05-01
// License: codes are factual public-domain data.
//   See ATTRIBUTIONS.md and LICENSE-DATA.md for full text.

import type { Currency } from "../types";

export const historical: readonly Currency[] = [
  {
    code: "HRK",
    numericCode: 191,
    name: "Croatian Kuna",
    symbol: "kn",
    symbols: ["kn"],
    decimals: 2,
    rounding: 1,
    units: { major: "kuna", minor: "lipa" },
    countries: ["HR"],
    status: "historical",
    withdrawnDate: "2023-01-01",
    successor: "EUR",
    type: "fiat",
  },
];
