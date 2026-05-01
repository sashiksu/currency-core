// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const ATS: Currency = {
  "code": "ATS",
  "numericCode": 40,
  "name": "Austrian Schilling",
  "symbol": "öS",
  "symbols": [
    "öS",
    "S",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "schilling",
    "minor": "groschen",
  },
  "countries": [
    "AT",
  ],
  "status": "historical",
  "withdrawnDate": "2002-02-28",
  "successor": "EUR",
  "type": "fiat",
};
