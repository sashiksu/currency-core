import { currencies } from "../data";
import type { CurrencyCode } from "../codes";

export const codes: readonly CurrencyCode[] = currencies.map(
  (c) => c.code as CurrencyCode,
);
