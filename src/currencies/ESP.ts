// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const ESP: Currency = {
  "code": "ESP",
  "numericCode": 724,
  "name": "Spanish Peseta",
  "symbol": "₧",
  "symbols": [
    "₧",
    "Pts",
  ],
  "decimals": 0,
  "rounding": 1,
  "countries": [
    "ES",
    "AD",
  ],
  "status": "historical",
  "withdrawnDate": "2002-02-28",
  "successor": "EUR",
  "type": "fiat",
  "htmlEntity": "&#8359;",
  "unicodeCodepoint": "U+20A7",
};
