// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const FJD: Currency = {
  "code": "FJD",
  "numericCode": 242,
  "name": "Fijian Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "FJ$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "FJ",
  ],
  "status": "active",
  "type": "fiat",
};
