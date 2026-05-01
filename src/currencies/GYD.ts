// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const GYD: Currency = {
  "code": "GYD",
  "numericCode": 328,
  "name": "Guyanese Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "GY$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "GY",
  ],
  "status": "active",
  "type": "fiat",
};
