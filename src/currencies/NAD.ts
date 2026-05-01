// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const NAD: Currency = {
  "code": "NAD",
  "numericCode": 516,
  "name": "Namibian Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "N$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "NA",
  ],
  "status": "active",
  "type": "fiat",
};
