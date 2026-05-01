// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const CAD: Currency = {
  "code": "CAD",
  "numericCode": 124,
  "name": "Canadian Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "C$",
    "CA$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "CA",
  ],
  "status": "active",
  "type": "fiat",
};
