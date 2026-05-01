import { expectType, expectAssignable } from "tsd";
import { USD } from "../currencies/USD";
import { EUR } from "../currencies/EUR";
import { JPY } from "../currencies/JPY";
import { BTC } from "../currencies/BTC";
import { HRK } from "../currencies/HRK";
import type { Currency, CurrencyType, CurrencyStatus } from "../types";

// Per-currency entries are typed as Currency
expectType<Currency>(USD);
expectType<Currency>(EUR);
expectType<Currency>(JPY);
expectType<Currency>(BTC);
expectType<Currency>(HRK);

// Field types narrow correctly
expectType<string>(USD.code);
expectType<string>(USD.name);
expectType<string>(USD.symbol);
expectType<number>(USD.decimals);
expectAssignable<CurrencyType>(USD.type);
expectAssignable<CurrencyStatus>(USD.status);
