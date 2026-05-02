// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const SBD: Currency = {
  "code": "SBD",
  "numericCode": 90,
  "name": "Solomon Islands Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "SI$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "SB",
  ],
  "status": "active",
  "type": "fiat",
};
