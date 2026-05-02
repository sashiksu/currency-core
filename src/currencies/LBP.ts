// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const LBP: Currency = {
  "code": "LBP",
  "numericCode": 422,
  "name": "Lebanese Pound",
  "symbol": "ل.ل",
  "symbols": [
    "ل.ل",
    "L£",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "pound",
    "minor": "piastre",
  },
  "countries": [
    "LB",
  ],
  "status": "active",
  "type": "fiat",
};
