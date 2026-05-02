// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const COP: Currency = {
  "code": "COP",
  "numericCode": 170,
  "name": "Colombian Peso",
  "symbol": "$",
  "symbols": [
    "$",
    "COL$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "peso",
    "minor": "centavo",
  },
  "countries": [
    "CO",
  ],
  "status": "active",
  "type": "fiat",
};
