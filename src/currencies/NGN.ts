// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const NGN: Currency = {
  "code": "NGN",
  "numericCode": 566,
  "name": "Nigerian Naira",
  "symbol": "₦",
  "symbols": [
    "₦",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "naira",
    "minor": "kobo",
  },
  "countries": [
    "NG",
  ],
  "status": "active",
  "type": "fiat",
  "unicodeCodepoint": "U+20A6",
};
