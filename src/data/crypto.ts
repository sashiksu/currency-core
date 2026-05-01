// src/data/crypto.ts
//
// Top cryptocurrencies (kickoff seed: 1 record).
// Sources:
//   - CoinGecko Public API (https://api.coingecko.com/api/v3/coins/markets)
//     Fetched: 2026-05-01
//   - Unicode Consortium charts for currency-symbol codepoints
//     https://www.unicode.org/charts/
// License: cryptocurrency data used under CoinGecko Terms of Use with attribution.
//   See ATTRIBUTIONS.md.

import type { Currency } from "../types";

export const crypto: readonly Currency[] = [
  {
    code: "BTC",
    name: "Bitcoin",
    symbol: "₿",
    symbols: ["₿", "BTC"],
    decimals: 8,
    rounding: 1,
    units: { major: "bitcoin", minor: "satoshi" },
    countries: ["SV"],
    status: "active",
    type: "crypto",
    chain: "bitcoin",
    htmlEntity: "&#8383;",
    unicodeCodepoint: "U+20BF",
  },
];
