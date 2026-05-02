// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const CLP: Currency = {
  "code": "CLP",
  "numericCode": 152,
  "name": "Chilean Peso",
  "symbol": "$",
  "symbols": [
    "$",
    "CLP$",
  ],
  "decimals": 0,
  "rounding": 1,
  "units": {
    "major": "peso",
    "minor": "centavo",
  },
  "countries": [
    "CL",
  ],
  "status": "active",
  "type": "fiat",
};
