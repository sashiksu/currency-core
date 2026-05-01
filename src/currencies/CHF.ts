// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const CHF: Currency = {
  "code": "CHF",
  "numericCode": 756,
  "name": "Swiss Franc",
  "symbol": "CHF",
  "symbols": [
    "CHF",
    "Fr.",
    "SFr",
  ],
  "decimals": 2,
  "rounding": 5,
  "units": {
    "major": "franc",
    "minor": "centime",
  },
  "countries": [
    "CH",
    "LI",
  ],
  "status": "active",
  "type": "fiat",
};
