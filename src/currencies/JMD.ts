// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const JMD: Currency = {
  "code": "JMD",
  "numericCode": 388,
  "name": "Jamaican Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "J$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "JM",
  ],
  "status": "active",
  "type": "fiat",
};
