// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const CZK: Currency = {
  "code": "CZK",
  "numericCode": 203,
  "name": "Czech Koruna",
  "symbol": "Kč",
  "symbols": [
    "Kč",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "koruna",
    "minor": "haléř",
  },
  "countries": [
    "CZ",
  ],
  "status": "active",
  "type": "fiat",
};
