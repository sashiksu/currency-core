// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const LUF: Currency = {
  "code": "LUF",
  "numericCode": 442,
  "name": "Luxembourg Franc",
  "symbol": "LF",
  "symbols": [
    "LF",
    "F",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "franc",
    "minor": "centime",
  },
  "countries": [
    "LU",
  ],
  "status": "historical",
  "withdrawnDate": "2002-02-28",
  "successor": "EUR",
  "type": "fiat",
};
