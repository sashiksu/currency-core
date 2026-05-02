// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const PEN: Currency = {
  "code": "PEN",
  "numericCode": 604,
  "name": "Peruvian Sol",
  "symbol": "S/",
  "symbols": [
    "S/",
    "S/.",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "sol",
    "minor": "céntimo",
  },
  "countries": [
    "PE",
  ],
  "status": "active",
  "type": "fiat",
};
