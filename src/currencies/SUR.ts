// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const SUR: Currency = {
  "code": "SUR",
  "numericCode": 810,
  "name": "Soviet Rouble",
  "symbol": "руб",
  "symbols": [
    "руб",
    "Rbl",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "rouble",
    "minor": "kopeck",
  },
  "countries": [
    "SU",
  ],
  "status": "historical",
  "withdrawnDate": "1992-12-26",
  "successor": "RUB",
  "type": "fiat",
};
