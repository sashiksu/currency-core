// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const MGA: Currency = {
  "code": "MGA",
  "numericCode": 969,
  "name": "Malagasy Ariary",
  "symbol": "Ar",
  "symbols": [
    "Ar",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "ariary",
    "minor": "iraimbilanja",
  },
  "countries": [
    "MG",
  ],
  "status": "active",
  "type": "fiat",
};
