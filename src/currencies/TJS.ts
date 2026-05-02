// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const TJS: Currency = {
  "code": "TJS",
  "numericCode": 972,
  "name": "Tajikistani Somoni",
  "symbol": "ЅМ",
  "symbols": [
    "ЅМ",
    "SM",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "somoni",
    "minor": "diram",
  },
  "countries": [
    "TJ",
  ],
  "status": "active",
  "type": "fiat",
};
