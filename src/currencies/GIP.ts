// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const GIP: Currency = {
  "code": "GIP",
  "numericCode": 292,
  "name": "Gibraltar Pound",
  "symbol": "£",
  "symbols": [
    "£",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "pound",
    "minor": "penny",
  },
  "countries": [
    "GI",
  ],
  "status": "active",
  "type": "fiat",
  "htmlEntity": "&#163;",
  "unicodeCodepoint": "U+00A3",
};
