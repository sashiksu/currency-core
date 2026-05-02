// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const PLN: Currency = {
  "code": "PLN",
  "numericCode": 985,
  "name": "Polish Złoty",
  "symbol": "zł",
  "symbols": [
    "zł",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "złoty",
    "minor": "grosz",
  },
  "countries": [
    "PL",
  ],
  "status": "active",
  "type": "fiat",
};
