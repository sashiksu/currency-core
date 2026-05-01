// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const SYP: Currency = {
  "code": "SYP",
  "numericCode": 760,
  "name": "Syrian Pound",
  "symbol": "ل.س",
  "symbols": [
    "ل.س",
    "S£",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "pound",
    "minor": "piastre",
  },
  "countries": [
    "SY",
  ],
  "status": "active",
  "type": "fiat",
};
