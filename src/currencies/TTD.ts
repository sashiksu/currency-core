// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const TTD: Currency = {
  "code": "TTD",
  "numericCode": 780,
  "name": "Trinidad and Tobago Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "TT$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "TT",
  ],
  "status": "active",
  "type": "fiat",
};
