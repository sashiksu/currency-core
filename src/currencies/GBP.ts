// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const GBP: Currency = {
  "code": "GBP",
  "numericCode": 826,
  "name": "Pound Sterling",
  "symbol": "£",
  "symbolNarrow": "£",
  "symbols": [
    "£",
    "GB£",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "pound",
    "minor": "penny",
  },
  "countries": [
    "GB",
    "IM",
    "JE",
    "GG",
  ],
  "status": "active",
  "type": "fiat",
  "htmlEntity": "&#163;",
  "unicodeCodepoint": "U+00A3",
};
