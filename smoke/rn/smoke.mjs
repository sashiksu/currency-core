// React Native bundler-resolution smoke entry. Bundled by run-rn.mjs with
// the same exports-condition order metro uses, then executed to confirm that
// the resolved code lacks any forbidden Node primitives (process, Buffer,
// node:* imports). Combined with the Workers smoke (V8/workerd runtime) and
// the browser smoke (Chromium/Firefox/WebKit), this fills the
// bundler-resolution piece without forcing react-native + metro into devDeps.

import {
  getCurrency,
  getSymbol,
  getDecimals,
  isValidCode,
  isCryptocurrency,
  isHistorical,
  listCrypto,
  format,
  toMinor,
} from "../../dist/index.mjs";
import { symbolMap } from "../../dist/compat/symbol-map.mjs";
import { codes } from "../../dist/compat/codes.mjs";
import { exponentMap } from "../../dist/compat/exponent-map.mjs";
import { USD } from "../../dist/currencies/USD.mjs";

const failures = [];
const assert = (label, cond) => {
  if (!cond) failures.push(label);
};

assert("getCurrency('USD')", getCurrency("USD").code === "USD");
assert("getSymbol('USD')", getSymbol("USD") === "$");
assert("getDecimals('JPY')", getDecimals("JPY") === 0);
assert("isValidCode", isValidCode("USD") === true && isValidCode("XYZ") === false);
assert("isCryptocurrency", isCryptocurrency("BTC"));
assert("isHistorical", isHistorical("HRK"));
assert("listCrypto", listCrypto().length > 0);
assert("format", format(1234.56, "USD", { locale: "en-US" }).indexOf("1,234.56") !== -1);
assert("toMinor", toMinor(1.5, "USD") === 150);
assert("symbolMap", symbolMap.USD === "$");
assert("codes", Array.isArray(codes) && codes.length > 0);
assert("exponentMap", exponentMap.USD?.exponent === 2);
assert("currencies/USD literal", USD.code === "USD");

// The bundler driver reads __smoke_result via stdout.
console.log(JSON.stringify({ ok: failures.length === 0, failures }));
