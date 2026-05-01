// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const BBD: Currency = {
  "code": "BBD",
  "numericCode": 52,
  "name": "Barbadian Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "Bds$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "BB",
  ],
  "status": "active",
  "type": "fiat",
};
