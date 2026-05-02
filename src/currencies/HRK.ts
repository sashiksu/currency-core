// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const HRK: Currency = {
  "code": "HRK",
  "numericCode": 191,
  "name": "Croatian Kuna",
  "symbol": "kn",
  "symbols": [
    "kn",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "kuna",
    "minor": "lipa",
  },
  "countries": [
    "HR",
  ],
  "status": "historical",
  "withdrawnDate": "2023-01-01",
  "successor": "EUR",
  "type": "fiat",
};
