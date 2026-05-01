// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const SEK: Currency = {
  "code": "SEK",
  "numericCode": 752,
  "name": "Swedish Krona",
  "symbol": "kr",
  "symbols": [
    "kr",
    "SEK",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "krona",
    "minor": "öre",
  },
  "countries": [
    "SE",
  ],
  "status": "active",
  "type": "fiat",
};
