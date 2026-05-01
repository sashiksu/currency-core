// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const KYD: Currency = {
  "code": "KYD",
  "numericCode": 136,
  "name": "Cayman Islands Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "CI$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "KY",
  ],
  "status": "active",
  "type": "fiat",
};
