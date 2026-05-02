// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const NPR: Currency = {
  "code": "NPR",
  "numericCode": 524,
  "name": "Nepalese Rupee",
  "symbol": "Rs",
  "symbols": [
    "Rs",
    "₨",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "rupee",
    "minor": "paisa",
  },
  "countries": [
    "NP",
  ],
  "status": "active",
  "type": "fiat",
};
