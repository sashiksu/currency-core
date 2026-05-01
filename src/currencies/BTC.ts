// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const BTC: Currency = {
  "code": "BTC",
  "name": "Bitcoin",
  "symbol": "₿",
  "symbols": [
    "₿",
    "BTC",
  ],
  "decimals": 8,
  "rounding": 1,
  "units": {
    "major": "bitcoin",
    "minor": "satoshi",
  },
  "countries": [
    "SV",
  ],
  "status": "active",
  "type": "crypto",
  "chain": "bitcoin",
  "htmlEntity": "&#8383;",
  "unicodeCodepoint": "U+20BF",
};
