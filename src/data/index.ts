import type { Currency } from "../types";
import { fiat } from "./fiat";
import { crypto } from "./crypto";
import { historical } from "./historical";

/** All currency records flattened — fiat first, then crypto, then historical. */
export const currencies: readonly Currency[] = [...fiat, ...crypto, ...historical];

/** Primary lookup index: code → Currency. Codes are uppercase. */
export const byCode: ReadonlyMap<string, Currency> = new Map(
  currencies.map((c) => [c.code, c]),
);
