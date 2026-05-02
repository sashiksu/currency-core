// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const ZAR: Currency = {
  "code": "ZAR",
  "numericCode": 710,
  "name": "South African Rand",
  "symbol": "R",
  "symbols": [
    "R",
    "ZAR",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "rand",
    "minor": "cent",
  },
  "countries": [
    "ZA",
    "LS",
    "NA",
    "SZ",
  ],
  "status": "active",
  "type": "fiat",
};
