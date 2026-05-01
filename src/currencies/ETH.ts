// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const ETH: Currency = {
  "code": "ETH",
  "name": "Ethereum",
  "symbol": "Ξ",
  "symbols": [
    "Ξ",
    "ETH",
  ],
  "decimals": 8,
  "rounding": 1,
  "units": {
    "major": "ether",
    "minor": "wei",
  },
  "countries": [],
  "status": "active",
  "type": "crypto",
  "chain": "ethereum",
  "htmlEntity": "&#926;",
  "unicodeCodepoint": "U+039E",
};
