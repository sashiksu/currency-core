// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const TRL: Currency = {
  "code": "TRL",
  "numericCode": 792,
  "name": "Turkish Lira (pre-2005)",
  "symbol": "TL",
  "symbols": [
    "TL",
  ],
  "decimals": 0,
  "rounding": 1,
  "countries": [
    "TR",
  ],
  "status": "historical",
  "withdrawnDate": "2005-12-31",
  "successor": "TRY",
  "type": "fiat",
};
