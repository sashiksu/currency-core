// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const UYU: Currency = {
  "code": "UYU",
  "numericCode": 858,
  "name": "Uruguayan Peso",
  "symbol": "$",
  "symbols": [
    "$",
    "$U",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "peso",
    "minor": "centésimo",
  },
  "countries": [
    "UY",
  ],
  "status": "active",
  "type": "fiat",
};
