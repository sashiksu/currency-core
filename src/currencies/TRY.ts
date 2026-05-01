// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const TRY: Currency = {
  "code": "TRY",
  "numericCode": 949,
  "name": "Turkish Lira",
  "symbol": "₺",
  "symbols": [
    "₺",
    "TL",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "lira",
    "minor": "kuruş",
  },
  "countries": [
    "TR",
  ],
  "status": "active",
  "type": "fiat",
  "unicodeCodepoint": "U+20BA",
};
