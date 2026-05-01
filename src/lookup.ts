import { byCode } from "./data";
import type { CurrencyCode } from "./codes";
import type { Currency } from "./types";

/**
 * Lookup a currency by code.
 *
 * Both overloads normalize the input to upper-case at runtime to defend
 * against `as CurrencyCode` casts and JSON.parse results typed via assertion.
 */
export function getCurrency(code: CurrencyCode): Currency;
export function getCurrency(code: string): Currency | undefined;
export function getCurrency(code: string): Currency | undefined {
  return byCode.get(code.toUpperCase());
}

/**
 * Get the default symbol for a currency. Throws if the code is unknown —
 * the happy path returns the bare string, not `string | undefined`.
 * For unsanitized runtime input, use `safeGetSymbol`.
 */
export function getSymbol(code: CurrencyCode): string {
  const c = byCode.get(code.toUpperCase());
  if (!c) throw new Error(`Unknown currency code: ${code}`);
  return c.symbol;
}

/** Get the English name for a currency. Throws on unknown. */
export function getName(code: CurrencyCode): string {
  const c = byCode.get(code.toUpperCase());
  if (!c) throw new Error(`Unknown currency code: ${code}`);
  return c.name;
}

/** Get the decimal-place count for a currency. Throws on unknown. */
export function getDecimals(code: CurrencyCode): number {
  const c = byCode.get(code.toUpperCase());
  if (!c) throw new Error(`Unknown currency code: ${code}`);
  return c.decimals;
}

/** Safe variant — returns undefined for unknown codes instead of throwing. */
export function safeGetCurrency(code: string): Currency | undefined {
  return byCode.get(code.toUpperCase());
}

/** Safe variant — returns undefined for unknown codes instead of throwing. */
export function safeGetSymbol(code: string): string | undefined {
  return byCode.get(code.toUpperCase())?.symbol;
}
