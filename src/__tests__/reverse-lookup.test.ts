import {
  getCurrency,
  getCurrencyByNumeric,
  getCurrencyByCountry,
  getCurrenciesBySymbol,
  getCurrencyByLocale,
  isValidCode,
  isCryptocurrency,
  isHistorical,
} from "../lookup";

describe("getCurrencyByNumeric", () => {
  test("returns USD for numeric code 840", () => {
    expect(getCurrencyByNumeric(840)?.code).toBe("USD");
  });

  test("returns JPY for numeric code 392", () => {
    expect(getCurrencyByNumeric(392)?.code).toBe("JPY");
  });

  test("returns EUR for numeric code 978", () => {
    expect(getCurrencyByNumeric(978)?.code).toBe("EUR");
  });

  test("returns undefined for unknown numeric code", () => {
    expect(getCurrencyByNumeric(0)).toBeUndefined();
  });
});

describe("getCurrencyByCountry", () => {
  test("returns USD for country code 'US'", () => {
    expect(getCurrencyByCountry("US")?.code).toBe("USD");
  });

  test("returns JPY for country code 'JP'", () => {
    expect(getCurrencyByCountry("JP")?.code).toBe("JPY");
  });

  test("returns EUR for country code 'DE'", () => {
    expect(getCurrencyByCountry("DE")?.code).toBe("EUR");
  });

  test("normalizes lowercase input", () => {
    expect(getCurrencyByCountry("us")?.code).toBe("USD");
  });

  test("returns undefined for unknown country code", () => {
    expect(getCurrencyByCountry("ZZ")).toBeUndefined();
  });
});

describe("getCurrenciesBySymbol", () => {
  test("returns multiple currencies for '$'", () => {
    const results = getCurrenciesBySymbol("$");
    expect(results.length).toBeGreaterThan(1);
    const codes = results.map((c) => c.code);
    expect(codes).toContain("USD");
    expect(codes).toContain("CAD");
  });

  test("returns [EUR] for '€'", () => {
    const results = getCurrenciesBySymbol("€");
    expect(results).toHaveLength(1);
    expect(results[0].code).toBe("EUR");
  });

  test("returns empty array for unrecognized symbol", () => {
    expect(getCurrenciesBySymbol("NOTASYMBOL")).toEqual([]);
  });
});

describe("getCurrencyByLocale", () => {
  test("returns USD for locale 'en-US'", () => {
    expect(getCurrencyByLocale("en-US")?.code).toBe("USD");
  });

  test("returns JPY for locale 'ja-JP'", () => {
    expect(getCurrencyByLocale("ja-JP")?.code).toBe("JPY");
  });

  test("returns EUR for locale 'de-DE'", () => {
    expect(getCurrencyByLocale("de-DE")?.code).toBe("EUR");
  });

  test("returns undefined for locale without region subtag", () => {
    expect(getCurrencyByLocale("en")).toBeUndefined();
  });

  test("returns undefined for an invalid locale string", () => {
    expect(getCurrencyByLocale("not-a-locale!!!")).toBeUndefined();
  });
});

describe("isValidCode", () => {
  test("returns true for known code 'USD'", () => {
    expect(isValidCode("USD")).toBe(true);
  });

  test("returns true for known crypto code 'BTC'", () => {
    expect(isValidCode("BTC")).toBe(true);
  });

  test("normalizes lowercase — 'usd' is treated as valid", () => {
    expect(isValidCode("usd")).toBe(true);
  });

  test("returns false for unknown code", () => {
    expect(isValidCode("NOPE")).toBe(false);
  });

  test("narrows type — getCurrency inside guard returns Currency", () => {
    const code: string = "USD";
    if (isValidCode(code)) {
      // TypeScript should allow this without error after narrowing
      const c = getCurrency(code);
      expect(c.code).toBe("USD");
    }
  });
});

describe("isCryptocurrency", () => {
  test("returns true for BTC", () => {
    expect(isCryptocurrency("BTC")).toBe(true);
  });

  test("returns false for fiat USD", () => {
    expect(isCryptocurrency("USD")).toBe(false);
  });

  test("normalizes lowercase", () => {
    expect(isCryptocurrency("btc")).toBe(true);
  });

  test("returns false for unknown code", () => {
    expect(isCryptocurrency("NOPE")).toBe(false);
  });
});

describe("isHistorical", () => {
  test("returns true for historical HRK", () => {
    expect(isHistorical("HRK")).toBe(true);
  });

  test("returns false for active USD", () => {
    expect(isHistorical("USD")).toBe(false);
  });

  test("normalizes lowercase", () => {
    expect(isHistorical("hrk")).toBe(true);
  });

  test("returns false for unknown code", () => {
    expect(isHistorical("NOPE")).toBe(false);
  });
});
