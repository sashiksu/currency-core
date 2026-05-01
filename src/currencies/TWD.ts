// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const TWD: Currency = {
  "code": "TWD",
  "numericCode": 901,
  "name": "New Taiwan Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "NT$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "TW",
  ],
  "status": "active",
  "type": "fiat",
};
