// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const FIM: Currency = {
  "code": "FIM",
  "numericCode": 246,
  "name": "Finnish Markka",
  "symbol": "mk",
  "symbols": [
    "mk",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "markka",
    "minor": "penni",
  },
  "countries": [
    "FI",
  ],
  "status": "historical",
  "withdrawnDate": "2002-02-28",
  "successor": "EUR",
  "type": "fiat",
};
