// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const SDG: Currency = {
  "code": "SDG",
  "numericCode": 938,
  "name": "Sudanese Pound",
  "symbol": "ج.س.",
  "symbols": [
    "ج.س.",
    "SDG",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "pound",
    "minor": "piastre",
  },
  "countries": [
    "SD",
  ],
  "status": "active",
  "type": "fiat",
};
