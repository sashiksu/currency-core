// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const CUP: Currency = {
  "code": "CUP",
  "numericCode": 192,
  "name": "Cuban Peso",
  "symbol": "$",
  "symbols": [
    "$",
    "₱",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "peso",
    "minor": "centavo",
  },
  "countries": [
    "CU",
  ],
  "status": "active",
  "type": "fiat",
};
