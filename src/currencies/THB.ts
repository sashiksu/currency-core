// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const THB: Currency = {
  "code": "THB",
  "numericCode": 764,
  "name": "Thai Baht",
  "symbol": "฿",
  "symbols": [
    "฿",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "baht",
    "minor": "satang",
  },
  "countries": [
    "TH",
  ],
  "status": "active",
  "type": "fiat",
  "unicodeCodepoint": "U+0E3F",
};
