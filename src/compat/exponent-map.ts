import { currencies } from "../data";
import type { CurrencyCode } from "../codes";

export interface ExponentEntry {
  readonly code: CurrencyCode;
  readonly base: 10;
  readonly exponent: number;
}

const map = {} as Record<CurrencyCode, ExponentEntry>;
for (const c of currencies) {
  map[c.code as CurrencyCode] = {
    code: c.code as CurrencyCode,
    base: 10,
    exponent: c.decimals,
  };
}

export const exponentMap: Record<CurrencyCode, ExponentEntry> = map;
