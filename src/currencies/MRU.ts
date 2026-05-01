// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const MRU: Currency = {
  "code": "MRU",
  "numericCode": 929,
  "name": "Mauritanian Ouguiya",
  "symbol": "UM",
  "symbols": [
    "UM",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "ouguiya",
    "minor": "khoums",
  },
  "countries": [
    "MR",
  ],
  "status": "active",
  "type": "fiat",
};
