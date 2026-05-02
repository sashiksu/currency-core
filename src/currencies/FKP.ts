// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const FKP: Currency = {
  "code": "FKP",
  "numericCode": 238,
  "name": "Falkland Islands Pound",
  "symbol": "£",
  "symbols": [
    "£",
    "FK£",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "pound",
    "minor": "penny",
  },
  "countries": [
    "FK",
  ],
  "status": "active",
  "type": "fiat",
  "htmlEntity": "&#163;",
  "unicodeCodepoint": "U+00A3",
};
