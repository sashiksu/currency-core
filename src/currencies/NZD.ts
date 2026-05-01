// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const NZD: Currency = {
  "code": "NZD",
  "numericCode": 554,
  "name": "New Zealand Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "NZ$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "NZ",
    "CK",
    "NU",
    "PN",
    "TK",
  ],
  "status": "active",
  "type": "fiat",
};
