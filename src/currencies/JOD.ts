// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const JOD: Currency = {
  "code": "JOD",
  "numericCode": 400,
  "name": "Jordanian Dinar",
  "symbol": "د.أ",
  "symbols": [
    "د.أ",
    "JD",
  ],
  "decimals": 3,
  "rounding": 1,
  "countries": [
    "JO",
  ],
  "status": "active",
  "type": "fiat",
};
