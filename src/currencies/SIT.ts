// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const SIT: Currency = {
  "code": "SIT",
  "numericCode": 705,
  "name": "Slovenian Tolar",
  "symbol": "SIT",
  "symbols": [
    "SIT",
  ],
  "decimals": 2,
  "rounding": 1,
  "countries": [
    "SI",
  ],
  "status": "historical",
  "withdrawnDate": "2007-01-15",
  "successor": "EUR",
  "type": "fiat",
};
