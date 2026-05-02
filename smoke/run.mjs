// Cross-runtime smoke for currency-core.
//
// Exercises every public subpath against the built dist/ bundle so that we
// catch packaging-only regressions (a working src/ that ships broken). One
// source file, run by Node / Bun / Deno / Workers / RN / browsers via
// runtime-specific wrappers under smoke/.
//
// Discipline: no node: builtins, no Node globals beyond `console`, no
// dynamic import, no `process` reads. If you need to add one of those,
// the smoke is testing the wrong thing.

import {
  getCurrency,
  getSymbol,
  getName,
  getDecimals,
  getCurrencyByNumeric,
  getCurrencyByCountry,
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
} from "../dist/index.mjs";

import { symbolMap } from "../dist/compat/symbol-map.mjs";
import { codes } from "../dist/compat/codes.mjs";
import { exponentMap } from "../dist/compat/exponent-map.mjs";

import { USD } from "../dist/currencies/USD.mjs";
import { JPY } from "../dist/currencies/JPY.mjs";
import { BTC } from "../dist/currencies/BTC.mjs";

const failures = [];
const assert = (label, condition, detail) => {
  if (!condition) failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
};

// --- core lookup ---
assert("getCurrency('USD').code === 'USD'", getCurrency("USD").code === "USD");
assert("getCurrency('usd') normalizes case", getCurrency("usd").code === "USD");
assert("getSymbol('USD') === '$'", getSymbol("USD") === "$");
assert("getName('USD') is non-empty", typeof getName("USD") === "string" && getName("USD").length > 0);
assert("getDecimals('USD') === 2", getDecimals("USD") === 2);
assert("getDecimals('JPY') === 0", getDecimals("JPY") === 0);

// --- reverse lookup ---
assert("getCurrencyByNumeric(840) === USD", getCurrencyByNumeric(840)?.code === "USD");
assert("getCurrencyByCountry('US') === USD", getCurrencyByCountry("US")?.code === "USD");
assert("getCurrencyByLocale('en-GB') === GBP", getCurrencyByLocale("en-GB")?.code === "GBP");

// --- predicates ---
assert("isValidCode('USD')", isValidCode("USD") === true);
assert("isValidCode('XYZ') === false", isValidCode("XYZ") === false);
assert("isCryptocurrency('BTC')", isCryptocurrency("BTC") === true);
assert("isHistorical('HRK')", isHistorical("HRK") === true);

// --- listing helpers ---
assert("listCrypto() non-empty", listCrypto().length > 0);
assert("listHistorical() non-empty", listHistorical().length > 0);

// --- format / parse ---
const formatted = format(1234.56, "USD", { locale: "en-US" });
assert("format(1234.56, USD, en-US) contains '1,234.56'", formatted.includes("1,234.56"), `got: ${formatted}`);
const parsed = parse(formatted, "USD", { locale: "en-US" });
assert("parse(format(1234.56)) round-trips", parsed === 1234.56, `got: ${parsed}`);

// --- minor units ---
assert("toMinor(1.5, USD) === 150", toMinor(1.5, "USD") === 150);
assert("fromMinor(150, USD) === 1.5", fromMinor(150, "USD") === 1.5);
assert("toMinor(100, JPY) === 100", toMinor(100, "JPY") === 100);

// --- compat shims ---
assert("symbolMap.USD === '$'", symbolMap.USD === "$");
assert("codes is non-empty array", Array.isArray(codes) && codes.length > 0);
assert("codes includes 'USD'", codes.includes("USD"));
assert("exponentMap.USD.exponent === 2", exponentMap.USD?.exponent === 2);
assert("exponentMap.JPY.exponent === 0", exponentMap.JPY?.exponent === 0);

// --- per-currency tree-shake entries ---
assert("currencies/USD literal carries code USD", USD.code === "USD");
assert("currencies/JPY literal carries code JPY", JPY.code === "JPY");
assert("currencies/BTC literal carries code BTC", BTC.code === "BTC");

// --- result ---
if (failures.length > 0) {
  console.error(`smoke FAILED (${failures.length}):`);
  for (const f of failures) console.error("  - " + f);
  throw new Error(`smoke failed with ${failures.length} assertion(s)`);
}
console.log(`smoke OK — ${[
  "core lookup",
  "reverse lookup",
  "predicates",
  "listing",
  "format/parse",
  "minor units",
  "3 compat shims",
  "3 per-currency entries",
].join(", ")}`);
