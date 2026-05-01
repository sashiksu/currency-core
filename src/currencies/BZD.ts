// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const BZD: Currency = {
  "code": "BZD",
  "numericCode": 84,
  "name": "Belize Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "BZ$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "BZ",
  ],
  "status": "active",
  "type": "fiat",
};
