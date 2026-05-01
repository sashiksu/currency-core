// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const YUM: Currency = {
  "code": "YUM",
  "numericCode": 891,
  "name": "Yugoslav Dinar",
  "symbol": "дин",
  "symbols": [
    "дин",
    "din",
  ],
  "decimals": 2,
  "rounding": 1,
  "countries": [
    "YU",
  ],
  "status": "historical",
  "withdrawnDate": "2003-07-22",
  "successor": "RSD",
  "type": "fiat",
};
