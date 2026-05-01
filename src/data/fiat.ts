// src/data/fiat.ts
//
// ISO 4217 active fiat currencies.
// Sources:
//   - SIX Interbank Clearing list-one.xml
//     https://www.six-group.com/en/products-services/financial-information/data-standards.html
//     Fetched: 2026-05-01
//   - Unicode CLDR cldr-numbers-modern/main/en/currencies.json
//     https://github.com/unicode-org/cldr-json (version pinned in ATTRIBUTIONS.md)
//     Fetched: 2026-05-01
// License: codes are factual public-domain data; CLDR portions are © Unicode Inc.
//   See ATTRIBUTIONS.md and LICENSE-DATA.md for full text.

import type { Currency } from "../types";

export const fiat: readonly Currency[] = [
  {
    code: "USD",
    numericCode: 840,
    name: "United States Dollar",
    symbol: "$",
    symbols: ["$", "US$"],
    decimals: 2,
    rounding: 1,
    units: { major: "dollar", minor: "cent" },
    countries: ["US", "EC", "SV", "PA", "TL", "TC", "VG", "ZW"],
    status: "active",
    type: "fiat",
    htmlEntity: "&#36;",
    unicodeCodepoint: "U+0024",
  },
  {
    code: "EUR",
    numericCode: 978,
    name: "Euro",
    symbol: "€",
    symbols: ["€"],
    decimals: 2,
    rounding: 1,
    units: { major: "euro", minor: "cent" },
    countries: [
      "AD", "AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR",
      "GR", "HR", "IE", "IT", "LT", "LU", "LV", "MC", "ME",
      "MT", "NL", "PT", "SI", "SK", "SM", "VA", "XK",
    ],
    status: "active",
    type: "fiat",
    htmlEntity: "&euro;",
    unicodeCodepoint: "U+20AC",
  },
  {
    code: "JPY",
    numericCode: 392,
    name: "Japanese Yen",
    symbol: "¥",
    symbols: ["¥", "JP¥"],
    decimals: 0,
    rounding: 1,
    units: { major: "yen", minor: "sen" },
    countries: ["JP"],
    status: "active",
    type: "fiat",
    htmlEntity: "&#165;",
    unicodeCodepoint: "U+00A5",
  },
  {
    code: "GBP",
    numericCode: 826,
    name: "Pound Sterling",
    symbol: "£",
    symbolNarrow: "£",
    symbols: ["£", "GB£"],
    decimals: 2,
    rounding: 1,
    units: { major: "pound", minor: "penny" },
    countries: ["GB", "IM", "JE", "GG"],
    status: "active",
    type: "fiat",
    htmlEntity: "&#163;",
    unicodeCodepoint: "U+00A3",
  },
];
