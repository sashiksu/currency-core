import { currencies } from "../data";
import type { CurrencyCode } from "../codes";

const codes: readonly CurrencyCode[] = currencies.map(
  (c) => c.code as CurrencyCode,
);

export default codes;
