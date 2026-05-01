// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const PTE: Currency = {
  "code": "PTE",
  "numericCode": 620,
  "name": "Portuguese Escudo",
  "symbol": "$",
  "symbols": [
    "$",
    "Esc",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "escudo",
    "minor": "centavo",
  },
  "countries": [
    "PT",
  ],
  "status": "historical",
  "withdrawnDate": "2002-02-28",
  "successor": "EUR",
  "type": "fiat",
};
