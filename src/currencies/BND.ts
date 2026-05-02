// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const BND: Currency = {
  "code": "BND",
  "numericCode": 96,
  "name": "Brunei Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "B$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "sen",
  },
  "countries": [
    "BN",
  ],
  "status": "active",
  "type": "fiat",
};
