// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const LRD: Currency = {
  "code": "LRD",
  "numericCode": 430,
  "name": "Liberian Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "L$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "LR",
  ],
  "status": "active",
  "type": "fiat",
};
