import type { Currency } from "../types";
import { fiat } from "./fiat";
import { crypto } from "./crypto";
import { historical } from "./historical";

/** All currency records flattened — fiat first, then crypto, then historical. */
export const currencies: readonly Currency[] = [
  ...fiat,
  ...crypto,
  ...historical,
];

/** Primary lookup index: code → Currency. Codes are uppercase. */
export const byCode: ReadonlyMap<string, Currency> = new Map(
  currencies.map((c) => [c.code, c]),
);

/** Numeric code → Currency. Crypto records without a numericCode are excluded. */
export const byNumericCode: ReadonlyMap<number, Currency> = new Map(
  currencies
    .filter((c): c is Currency & { numericCode: number } => c.numericCode !== undefined)
    .map((c) => [c.numericCode, c]),
);

/** ISO 3166-1 alpha-2 country code → primary Currency. First fiat match wins. */
const _byCountry = new Map<string, Currency>();
for (const c of currencies) {
  for (const cc of c.countries) {
    if (!_byCountry.has(cc)) _byCountry.set(cc, c);
  }
}
export const byCountry: ReadonlyMap<string, Currency> = _byCountry;

/** Symbol string → all Currency records that carry that symbol. */
const _bySymbol = new Map<string, Currency[]>();
for (const c of currencies) {
  for (const sym of c.symbols) {
    const arr = _bySymbol.get(sym);
    if (arr) arr.push(c);
    else _bySymbol.set(sym, [c]);
  }
}
export const bySymbol: ReadonlyMap<string, Currency[]> = _bySymbol;
