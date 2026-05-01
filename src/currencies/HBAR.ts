// AUTO-GENERATED — do not edit by hand. Run `npm run codegen:currencies` to regenerate.
// Source of truth: src/data/{fiat,crypto,historical}.ts.
// Drift is enforced in CI via `npm run codegen:currencies:check`.

import type { Currency } from "../types";

export const HBAR: Currency = {
  "code": "HBAR",
  "name": "Hedera",
  "symbol": "HBAR",
  "symbols": [
    "HBAR",
    "ℏ",
  ],
  "decimals": 8,
  "rounding": 1,
  "countries": [],
  "status": "active",
  "type": "crypto",
  "chain": "hedera",
};
