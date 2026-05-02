// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const SKK: Currency = {
  "code": "SKK",
  "numericCode": 703,
  "name": "Slovak Koruna",
  "symbol": "Sk",
  "symbols": [
    "Sk",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "koruna",
    "minor": "halier",
  },
  "countries": [
    "SK",
  ],
  "status": "historical",
  "withdrawnDate": "2009-01-16",
  "successor": "EUR",
  "type": "fiat",
};
