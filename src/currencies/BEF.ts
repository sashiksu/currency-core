// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const BEF: Currency = {
  "code": "BEF",
  "numericCode": 56,
  "name": "Belgian Franc",
  "symbol": "BF",
  "symbols": [
    "BF",
    "F",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "franc",
    "minor": "centime",
  },
  "countries": [
    "BE",
  ],
  "status": "historical",
  "withdrawnDate": "2002-02-28",
  "successor": "EUR",
  "type": "fiat",
};
