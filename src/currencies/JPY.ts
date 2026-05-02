// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const JPY: Currency = {
  "code": "JPY",
  "numericCode": 392,
  "name": "Japanese Yen",
  "symbol": "¥",
  "symbols": [
    "¥",
    "JP¥",
  ],
  "decimals": 0,
  "rounding": 1,
  "units": {
    "major": "yen",
    "minor": "sen",
  },
  "countries": [
    "JP",
  ],
  "status": "active",
  "type": "fiat",
  "htmlEntity": "&#165;",
  "unicodeCodepoint": "U+00A5",
};
