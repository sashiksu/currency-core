// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const ITL: Currency = {
  "code": "ITL",
  "numericCode": 380,
  "name": "Italian Lira",
  "symbol": "₤",
  "symbols": [
    "₤",
    "L.",
  ],
  "decimals": 0,
  "rounding": 1,
  "countries": [
    "IT",
    "SM",
    "VA",
  ],
  "status": "historical",
  "withdrawnDate": "2002-02-28",
  "successor": "EUR",
  "type": "fiat",
  "htmlEntity": "&#8356;",
  "unicodeCodepoint": "U+20A4",
};
