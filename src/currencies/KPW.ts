// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const KPW: Currency = {
  "code": "KPW",
  "numericCode": 408,
  "name": "North Korean Won",
  "symbol": "₩",
  "symbols": [
    "₩",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "won",
    "minor": "chon",
  },
  "countries": [
    "KP",
  ],
  "status": "active",
  "type": "fiat",
  "unicodeCodepoint": "U+20A9",
};
