import { byCode, byNumericCode, byCountry, bySymbol } from "./data";
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

/** Look up a currency by its ISO 4217 numeric code. Returns undefined for unknown codes. */
export function getCurrencyByNumeric(numericCode: number): Currency | undefined {
  return byNumericCode.get(numericCode);
}

/**
 * Look up the primary currency for an ISO 3166-1 alpha-2 country code.
 * When a country accepts multiple currencies, the first fiat record wins.
 * Returns undefined for unknown country codes.
 */
export function getCurrencyByCountry(countryCode: string): Currency | undefined {
  return byCountry.get(countryCode.toUpperCase());
}

/**
 * Return all currencies that carry the given symbol string.
 * Returns an empty array when no currency matches (symbols are not unique — "$"
 * matches USD, CAD, AUD, and others).
 */
export function getCurrenciesBySymbol(symbol: string): Currency[] {
  return bySymbol.get(symbol) ?? [];
}

/**
 * Look up the primary currency for a BCP 47 locale tag (e.g. "en-US", "de-DE").
 * Extracts the region subtag and delegates to getCurrencyByCountry.
 * Returns undefined for locales without a region or for unrecognized locale strings.
 */
export function getCurrencyByLocale(locale: string): Currency | undefined {
  try {
    const region = new Intl.Locale(locale).region;
    if (!region) return undefined;
    return byCountry.get(region);
  } catch {
    return undefined;
  }
}

/** Type-narrowing predicate — returns true and narrows to CurrencyCode when the code is known. */
export function isValidCode(code: string): code is CurrencyCode {
  return byCode.has(code.toUpperCase());
}

/** Returns true when the currency record exists and has type "crypto". */
export function isCryptocurrency(code: string): boolean {
  return byCode.get(code.toUpperCase())?.type === "crypto";
}

/** Returns true when the currency record exists and has status "historical". */
export function isHistorical(code: string): boolean {
  return byCode.get(code.toUpperCase())?.status === "historical";
}
