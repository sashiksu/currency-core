import { currencies } from "../data";
import type { CurrencyCode } from "../codes";

const map = {} as Record<CurrencyCode, string>;
for (const c of currencies) {
  map[c.code as CurrencyCode] = c.symbol;
}

export default map;
