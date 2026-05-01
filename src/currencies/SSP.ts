// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const SSP: Currency = {
  "code": "SSP",
  "numericCode": 728,
  "name": "South Sudanese Pound",
  "symbol": "£",
  "symbols": [
    "£",
    "SSP",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "pound",
    "minor": "piastre",
  },
  "countries": [
    "SS",
  ],
  "status": "active",
  "type": "fiat",
  "htmlEntity": "&#163;",
  "unicodeCodepoint": "U+00A3",
};
