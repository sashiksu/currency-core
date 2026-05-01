// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const XCD: Currency = {
  "code": "XCD",
  "numericCode": 951,
  "name": "East Caribbean Dollar",
  "symbol": "$",
  "symbols": [
    "$",
    "EC$",
  ],
  "decimals": 2,
  "rounding": 1,
  "units": {
    "major": "dollar",
    "minor": "cent",
  },
  "countries": [
    "AG",
    "AI",
    "DM",
    "GD",
    "KN",
    "LC",
    "MS",
    "VC",
  ],
  "status": "active",
  "type": "fiat",
};
