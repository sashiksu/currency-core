// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const NLG: Currency = {
  "code": "NLG",
  "numericCode": 528,
  "name": "Netherlands Guilder",
  "symbol": "ƒ",
  "symbols": [
    "ƒ",
    "fl",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "guilder",
    "minor": "cent",
  },
  "countries": [
    "NL",
  ],
  "status": "historical",
  "withdrawnDate": "2002-01-28",
  "successor": "EUR",
  "type": "fiat",
  "htmlEntity": "&#402;",
  "unicodeCodepoint": "U+0192",
};
