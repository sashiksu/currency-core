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
} from "../index";
import type { Currency, CurrencyCode } from "../index";

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
