// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const SHP: Currency = {
  "code": "SHP",
  "numericCode": 654,
  "name": "Saint Helena Pound",
  "symbol": "£",
  "symbols": [
    "£",
    "SHP",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "pound",
    "minor": "penny",
  },
  "countries": [
    "SH",
  ],
  "status": "active",
  "type": "fiat",
  "htmlEntity": "&#163;",
  "unicodeCodepoint": "U+00A3",
};
