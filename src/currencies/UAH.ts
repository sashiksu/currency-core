// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const UAH: Currency = {
  "code": "UAH",
  "numericCode": 980,
  "name": "Ukrainian Hryvnia",
  "symbol": "₴",
  "symbols": [
    "₴",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "hryvnia",
    "minor": "kopiyka",
  },
  "countries": [
    "UA",
  ],
  "status": "active",
  "type": "fiat",
  "unicodeCodepoint": "U+20B4",
};
