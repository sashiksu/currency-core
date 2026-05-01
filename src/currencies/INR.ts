// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const INR: Currency = {
  "code": "INR",
  "numericCode": 356,
  "name": "Indian Rupee",
  "symbol": "₹",
  "symbols": [
    "₹",
    "Rs",
    "Re",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "rupee",
    "minor": "paisa",
  },
  "countries": [
    "IN",
    "BT",
  ],
  "status": "active",
  "type": "fiat",
  "htmlEntity": "&#8377;",
  "unicodeCodepoint": "U+20B9",
};
