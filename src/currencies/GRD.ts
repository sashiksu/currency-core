// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const GRD: Currency = {
  "code": "GRD",
  "numericCode": 300,
  "name": "Greek Drachma",
  "symbol": "₯",
  "symbols": [
    "₯",
    "Δρχ",
  ],
  "decimals": 0,
  "rounding": 1,
  "countries": [
    "GR",
  ],
  "status": "historical",
  "withdrawnDate": "2002-02-28",
  "successor": "EUR",
  "type": "fiat",
  "htmlEntity": "&#8367;",
  "unicodeCodepoint": "U+20AF",
};
