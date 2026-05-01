// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const MXN: Currency = {
  "code": "MXN",
  "numericCode": 484,
  "name": "Mexican Peso",
  "symbol": "$",
  "symbols": [
    "$",
    "Mex$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "peso",
    "minor": "centavo",
  },
  "countries": [
    "MX",
  ],
  "status": "active",
  "type": "fiat",
};
