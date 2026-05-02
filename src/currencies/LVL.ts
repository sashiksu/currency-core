// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const LVL: Currency = {
  "code": "LVL",
  "numericCode": 428,
  "name": "Latvian Lats",
  "symbol": "Ls",
  "symbols": [
    "Ls",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "lats",
    "minor": "santīms",
  },
  "countries": [
    "LV",
  ],
  "status": "historical",
  "withdrawnDate": "2014-01-14",
  "successor": "EUR",
  "type": "fiat",
};
