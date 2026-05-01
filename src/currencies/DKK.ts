// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const DKK: Currency = {
  "code": "DKK",
  "numericCode": 208,
  "name": "Danish Krone",
  "symbol": "kr",
  "symbols": [
    "kr",
    "DKK",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "krone",
    "minor": "øre",
  },
  "countries": [
    "DK",
    "FO",
    "GL",
  ],
  "status": "active",
  "type": "fiat",
};
