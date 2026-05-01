// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const NOK: Currency = {
  "code": "NOK",
  "numericCode": 578,
  "name": "Norwegian Krone",
  "symbol": "kr",
  "symbols": [
    "kr",
    "NOK",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "krone",
    "minor": "øre",
  },
  "countries": [
    "NO",
    "SJ",
    "BV",
  ],
  "status": "active",
  "type": "fiat",
};
