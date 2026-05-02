// Cloudflare Workers smoke worker. Bundled by smoke/workers/run-miniflare.mjs
// before being handed to the workerd runtime — workerd doesn't reach into
// node_modules or the host filesystem, so all imports must be pre-resolved.
//
// The fetch handler runs the same kind of assertions as smoke/run.mjs and
// returns the result as JSON. The driver script asserts on the response.

import {
  getCurrency,
  getSymbol,
  getDecimals,
  isValidCode,
  isCryptocurrency,
  isHistorical,
  listCrypto,
  format,
  parse,
  toMinor,
} from "../../dist/index.mjs";
import { symbolMap } from "../../dist/compat/symbol-map.mjs";
import { codes } from "../../dist/compat/codes.mjs";
import { exponentMap } from "../../dist/compat/exponent-map.mjs";
import { USD } from "../../dist/currencies/USD.mjs";

export default {
  async fetch() {
    const failures = [];
    const assert = (label, cond, detail) => {
      if (!cond) failures.push(label + (detail ? " — " + detail : ""));
    };

    assert("getCurrency('USD').code", getCurrency("USD").code === "USD");
    assert("getSymbol('USD')", getSymbol("USD") === "$");
    assert("getDecimals('JPY')", getDecimals("JPY") === 0);
    assert("isValidCode('USD')", isValidCode("USD") === true);
    assert("isValidCode('XYZ')", isValidCode("XYZ") === false);
    assert("isCryptocurrency('BTC')", isCryptocurrency("BTC") === true);
    assert("isHistorical('HRK')", isHistorical("HRK") === true);
    assert("listCrypto non-empty", listCrypto().length > 0);

    const formatted = format(1234.56, "USD", { locale: "en-US" });
    assert("format includes 1,234.56", formatted.indexOf("1,234.56") !== -1, formatted);
    assert("parse round-trips", parse(formatted, "USD", { locale: "en-US" }) === 1234.56);

    assert("toMinor", toMinor(1.5, "USD") === 150);
    assert("symbolMap.USD", symbolMap.USD === "$");
    assert("codes is array", Array.isArray(codes) && codes.length > 0);
    assert("exponentMap.USD", exponentMap.USD?.exponent === 2);
    assert("currencies/USD literal", USD.code === "USD");

    return new Response(JSON.stringify({ ok: failures.length === 0, failures }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
