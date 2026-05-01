// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const BMD: Currency = {
  "code": "BMD",
  "numericCode": 60,
  "name": "Bermudian Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "BD$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "BM",
  ],
  "status": "active",
  "type": "fiat",
};
