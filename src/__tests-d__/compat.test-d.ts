import { expectType, expectError, expectAssignable } from "tsd";
import symbolMap from "../compat/symbol-map";
import codes from "../compat/codes";
import exponentMap, { type ExponentEntry } from "../compat/exponent-map";
import type { CurrencyCode } from "../codes";

// symbolMap is a complete Record<CurrencyCode, string>
expectType<Record<CurrencyCode, string>>(symbolMap);
expectType<string>(symbolMap.USD);
expectType<string>(symbolMap.EUR);

// Unknown literal keys are TypeScript errors on the strict map
expectError(symbolMap.XXX);

// codes is readonly CurrencyCode[]
expectType<readonly CurrencyCode[]>(codes);

// codes elements narrow to CurrencyCode
const first = codes[0];
expectAssignable<CurrencyCode>(first);

// codes is immutable at the type level
expectError(codes.push("USD"));

// exponentMap is a complete Record<CurrencyCode, ExponentEntry>
expectType<Record<CurrencyCode, ExponentEntry>>(exponentMap);
expectType<CurrencyCode>(exponentMap.USD.code);
expectType<10>(exponentMap.USD.base);
expectType<number>(exponentMap.USD.exponent);

// ExponentEntry shape
const entry: ExponentEntry = exponentMap.USD;
expectAssignable<{ code: CurrencyCode; base: 10; exponent: number }>(entry);
