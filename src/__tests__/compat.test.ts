import symbolMap from "../compat/symbol-map";
import codes from "../compat/codes";
import exponentMap from "../compat/exponent-map";
import { currencies } from "../data";

describe("compat/symbol-map", () => {
  test("contains an entry for every shipped code", () => {
    for (const c of currencies) {
      expect(symbolMap[c.code as keyof typeof symbolMap]).toBe(c.symbol);
    }
  });

  test("has the same key count as the dataset", () => {
    expect(Object.keys(symbolMap).length).toBe(currencies.length);
  });

  test("returns the canonical USD/EUR/JPY/BTC symbols", () => {
    expect(symbolMap.USD).toBe("$");
    expect(symbolMap.EUR).toBe("€");
    expect(symbolMap.JPY).toBe("¥");
    expect(symbolMap.BTC).toBe("₿");
  });
});

describe("compat/codes", () => {
  test("contains every shipped code", () => {
    expect(codes.length).toBe(currencies.length);
    const datasetCodes = new Set(currencies.map((c) => c.code));
    for (const code of codes) {
      expect(datasetCodes.has(code)).toBe(true);
    }
  });

  test("returns the same reference on repeated imports (built once)", () => {
    expect(codes).toBe(codes);
  });
});

describe("compat/exponent-map", () => {
  test("contains an entry for every shipped code with base 10 and matching exponent", () => {
    for (const c of currencies) {
      const entry = exponentMap[c.code as keyof typeof exponentMap];
      expect(entry.code).toBe(c.code);
      expect(entry.base).toBe(10);
      expect(entry.exponent).toBe(c.decimals);
    }
  });

  test("has the same key count as the dataset", () => {
    expect(Object.keys(exponentMap).length).toBe(currencies.length);
  });

  test("USD has exponent 2, JPY has exponent 0, BHD has exponent 3", () => {
    expect(exponentMap.USD.exponent).toBe(2);
    expect(exponentMap.JPY.exponent).toBe(0);
    expect(exponentMap.BHD.exponent).toBe(3);
  });
});
