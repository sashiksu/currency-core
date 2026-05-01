// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const AUD: Currency = {
  "code": "AUD",
  "numericCode": 36,
  "name": "Australian Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "A$",
    "AU$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "AU",
    "CC",
    "CX",
    "HM",
    "KI",
    "NF",
    "NR",
    "TV",
  ],
  "status": "active",
  "type": "fiat",
};
