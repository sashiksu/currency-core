// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const RON: Currency = {
  "code": "RON",
  "numericCode": 946,
  "name": "Romanian Leu",
  "symbol": "lei",
  "symbols": [
    "lei",
    "L",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "leu",
    "minor": "ban",
  },
  "countries": [
    "RO",
  ],
  "status": "active",
  "type": "fiat",
};
