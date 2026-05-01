// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const FRF: Currency = {
  "code": "FRF",
  "numericCode": 250,
  "name": "French Franc",
  "symbol": "₣",
  "symbols": [
    "₣",
    "F",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "franc",
    "minor": "centime",
  },
  "countries": [
    "FR",
    "MC",
  ],
  "status": "historical",
  "withdrawnDate": "2002-02-17",
  "successor": "EUR",
  "type": "fiat",
  "htmlEntity": "&#8355;",
  "unicodeCodepoint": "U+20A3",
};
