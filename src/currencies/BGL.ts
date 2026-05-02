// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const BGL: Currency = {
  "code": "BGL",
  "numericCode": 100,
  "name": "Bulgarian Lev (1962)",
  "symbol": "лв",
  "symbols": [
    "лв",
    "lv",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "lev",
    "minor": "stotinka",
  },
  "countries": [
    "BG",
  ],
  "status": "historical",
  "withdrawnDate": "1999-07-05",
  "successor": "BGN",
  "type": "fiat",
};
