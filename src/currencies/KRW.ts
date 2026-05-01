// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const KRW: Currency = {
  "code": "KRW",
  "numericCode": 410,
  "name": "South Korean Won",
  "symbol": "₩",
  "symbols": [
    "₩",
    "KRW",
  ],
  "decimals": 0,
  "rounding": 1,
  "units": {
    "major": "won",
    "minor": "jeon",
  },
  "countries": [
    "KR",
  ],
  "status": "active",
  "type": "fiat",
  "unicodeCodepoint": "U+20A9",
};
