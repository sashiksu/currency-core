// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const MTL: Currency = {
  "code": "MTL",
  "numericCode": 470,
  "name": "Maltese Lira",
  "symbol": "Lm",
  "symbols": [
    "Lm",
  ],
  "decimals": 2,
  "rounding": 1,
  "countries": [
    "MT",
  ],
  "status": "historical",
  "withdrawnDate": "2008-01-31",
  "successor": "EUR",
  "type": "fiat",
};
