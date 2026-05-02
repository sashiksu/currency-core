// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const CNY: Currency = {
  "code": "CNY",
  "numericCode": 156,
  "name": "Chinese Yuan Renminbi",
  "symbol": "¥",
  "symbols": [
    "¥",
    "元",
    "CN¥",
    "RMB",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "yuan",
    "minor": "fen",
  },
  "countries": [
    "CN",
  ],
  "status": "active",
  "type": "fiat",
  "htmlEntity": "&#165;",
  "unicodeCodepoint": "U+00A5",
};
