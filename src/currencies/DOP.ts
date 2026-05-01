// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const DOP: Currency = {
  "code": "DOP",
  "numericCode": 214,
  "name": "Dominican Peso",
  "symbol": "$",
  "symbols": [
    "$",
    "RD$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "peso",
    "minor": "centavo",
  },
  "countries": [
    "DO",
  ],
  "status": "active",
  "type": "fiat",
};
