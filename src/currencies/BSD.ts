// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const BSD: Currency = {
  "code": "BSD",
  "numericCode": 44,
  "name": "Bahamian Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "B$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "BS",
  ],
  "status": "active",
  "type": "fiat",
};
