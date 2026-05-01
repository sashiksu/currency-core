// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const MYR: Currency = {
  "code": "MYR",
  "numericCode": 458,
  "name": "Malaysian Ringgit",
  "symbol": "RM",
  "symbols": [
    "RM",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "ringgit",
    "minor": "sen",
  },
  "countries": [
    "MY",
  ],
  "status": "active",
  "type": "fiat",
};
