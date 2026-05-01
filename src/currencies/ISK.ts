// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const ISK: Currency = {
  "code": "ISK",
  "numericCode": 352,
  "name": "Icelandic Króna",
  "symbol": "kr",
  "symbols": [
    "kr",
    "ISK",
  ],
  "decimals": 0,
  "rounding": 1,
  "units": {
    "major": "króna",
    "minor": "eyrir",
  },
  "countries": [
    "IS",
  ],
  "status": "active",
  "type": "fiat",
};
