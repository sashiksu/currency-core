// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const IEP: Currency = {
  "code": "IEP",
  "numericCode": 372,
  "name": "Irish Pound",
  "symbol": "£",
  "symbols": [
    "£",
    "IR£",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "pound",
    "minor": "penny",
  },
  "countries": [
    "IE",
  ],
  "status": "historical",
  "withdrawnDate": "2002-02-09",
  "successor": "EUR",
  "type": "fiat",
};
