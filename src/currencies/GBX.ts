// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const GBX: Currency = {
  "code": "GBX",
  "name": "Penny Sterling",
  "symbol": "p",
  "symbols": [
    "p",
    "GBp",
    "GBX",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "penny",
    "minor": "centi-penny",
  },
  "countries": [
    "GB",
  ],
  "status": "active",
  "type": "fiat",
};
