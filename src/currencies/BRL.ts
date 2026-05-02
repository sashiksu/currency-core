// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const BRL: Currency = {
  "code": "BRL",
  "numericCode": 986,
  "name": "Brazilian Real",
  "symbol": "R$",
  "symbols": [
    "R$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "real",
    "minor": "centavo",
  },
  "countries": [
    "BR",
  ],
  "status": "active",
  "type": "fiat",
};
