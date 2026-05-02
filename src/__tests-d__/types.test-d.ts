import { expectType, expectError, expectAssignable } from "tsd";
import {
  getCurrency,
  getSymbol,
  getDecimals,
  safeGetCurrency,
  getCurrencyByNumeric,
  getCurrencyByCountry,
  getCurrenciesBySymbol,
  getCurrencyByLocale,
  isValidCode,
  isCryptocurrency,
  isHistorical,
  listCrypto,
  listHistorical,
  format,
  parse,
  toMinor,
  fromMinor,
} from "../index";
import type { Currency, CurrencyCode, FormatOptions } from "../index";

// Typed overload of getCurrency returns Currency (never undefined)
expectType<Currency>(getCurrency("USD"));

// String overload returns Currency | undefined
const arbitrary: string = "any-string";
expectType<Currency | undefined>(getCurrency(arbitrary));

// Unknown literal is a TypeScript error on the typed overload
expectError(getSymbol("XXX"));

// getDecimals returns bare number, never undefined
expectType<number>(getDecimals("JPY"));

// safeGetCurrency always returns the union
expectType<Currency | undefined>(safeGetCurrency("USD"));

// CurrencyCode shape sanity check — known literal is assignable to the union.
expectAssignable<CurrencyCode>("USD");

// Reverse lookup return types
expectType<Currency | undefined>(getCurrencyByNumeric(840));
expectType<Currency | undefined>(getCurrencyByCountry("US"));
expectType<Currency[]>(getCurrenciesBySymbol("$"));
expectType<Currency | undefined>(getCurrencyByLocale("en-US"));

// isValidCode narrows string to CurrencyCode
const raw: string = "USD";
if (isValidCode(raw)) {
  expectType<CurrencyCode>(raw);
}

// Predicates return boolean
expectType<boolean>(isCryptocurrency("BTC"));
expectType<boolean>(isHistorical("HRK"));

// isValidCode rejects non-string arguments
expectError(isValidCode(123));

// Listing helpers return readonly Currency[]
expectType<readonly Currency[]>(listCrypto());
expectType<readonly Currency[]>(listHistorical());

// Returned arrays are immutable at the type level
expectError(listCrypto().push({} as Currency));
expectError(listHistorical().push({} as Currency));

// format returns string
expectType<string>(format(1234.56, "USD"));
expectType<string>(format(1234.56, "USD", { locale: "en-US" }));
expectType<string>(format(1234.56, "USD", { locale: "en-US", variant: "narrow" }));
expectType<string>(format(1234.56, "USD", { signDisplay: "always" }));

// format rejects non-CurrencyCode literals
expectError(format(1, "XXX"));

// parse returns number | null
expectType<number | null>(parse("$1.00", "USD"));
expectType<number | null>(parse("$1.00", "USD", { locale: "en-US" }));

// parse rejects non-CurrencyCode literals
expectError(parse("$1.00", "XXX"));

// toMinor and fromMinor return number
expectType<number>(toMinor(1, "USD"));
expectType<number>(fromMinor(100, "USD"));

// FormatOptions fields are all optional
expectAssignable<FormatOptions>({});
expectAssignable<FormatOptions>({ locale: "en-US" });
expectAssignable<FormatOptions>({
  locale: "en-US",
  variant: "narrow",
  signDisplay: "always",
});
