// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const EEK: Currency = {
  "code": "EEK",
  "numericCode": 233,
  "name": "Estonian Kroon",
  "symbol": "kr",
  "symbols": [
    "kr",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "kroon",
    "minor": "sent",
  },
  "countries": [
    "EE",
  ],
  "status": "historical",
  "withdrawnDate": "2011-01-15",
  "successor": "EUR",
  "type": "fiat",
};
