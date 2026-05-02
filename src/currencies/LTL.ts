// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const LTL: Currency = {
  "code": "LTL",
  "numericCode": 440,
  "name": "Lithuanian Litas",
  "symbol": "Lt",
  "symbols": [
    "Lt",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "litas",
    "minor": "centas",
  },
  "countries": [
    "LT",
  ],
  "status": "historical",
  "withdrawnDate": "2015-01-15",
  "successor": "EUR",
  "type": "fiat",
};
