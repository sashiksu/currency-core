// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const EUR: Currency = {
  "code": "EUR",
  "numericCode": 978,
  "name": "Euro",
  "symbol": "€",
  "symbols": [
    "€",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "euro",
    "minor": "cent",
  },
  "countries": [
    "AD",
    "AT",
    "BE",
    "CY",
    "DE",
    "EE",
    "ES",
    "FI",
    "FR",
    "GR",
    "HR",
    "IE",
    "IT",
    "LT",
    "LU",
    "LV",
    "MC",
    "ME",
    "MT",
    "NL",
    "PT",
    "SI",
    "SK",
    "SM",
    "VA",
    "XK",
  ],
  "status": "active",
  "type": "fiat",
  "htmlEntity": "&euro;",
  "unicodeCodepoint": "U+20AC",
};
