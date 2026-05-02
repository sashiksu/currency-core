// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const USD: Currency = {
  "code": "USD",
  "numericCode": 840,
  "name": "United States Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "US$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "US",
    "EC",
    "SV",
    "PA",
    "TL",
    "TC",
    "VG",
    "ZW",
  ],
  "status": "active",
  "type": "fiat",
  "htmlEntity": "&#36;",
  "unicodeCodepoint": "U+0024",
};
