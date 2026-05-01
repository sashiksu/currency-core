// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const LKR: Currency = {
  "code": "LKR",
  "numericCode": 144,
  "name": "Sri Lankan Rupee",
  "symbol": "Rs",
  "symbols": [
    "Rs",
    "₨",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "rupee",
    "minor": "cent",
  },
  "countries": [
    "LK",
  ],
  "status": "active",
  "type": "fiat",
};
