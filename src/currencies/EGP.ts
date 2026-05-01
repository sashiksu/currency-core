// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const EGP: Currency = {
  "code": "EGP",
  "numericCode": 818,
  "name": "Egyptian Pound",
  "symbol": "E£",
  "symbolNarrow": "£",
  "symbols": [
    "E£",
    "£",
    "ج.م",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "pound",
    "minor": "piastre",
  },
  "countries": [
    "EG",
  ],
  "status": "active",
  "type": "fiat",
};
