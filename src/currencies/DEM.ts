// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const DEM: Currency = {
  "code": "DEM",
  "numericCode": 276,
  "name": "Deutsche Mark",
  "symbol": "DM",
  "symbols": [
    "DM",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "mark",
    "minor": "pfennig",
  },
  "countries": [
    "DE",
  ],
  "status": "historical",
  "withdrawnDate": "2002-02-28",
  "successor": "EUR",
  "type": "fiat",
};
