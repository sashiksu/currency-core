import { byCode, currencies } from "../data";
import type { CurrencyCode, Currency } from "../types";

describe("data integrity", () => {
  test("currencies array has exactly 6 records", () => {
    expect(currencies.length).toBe(6);
  });

  test("byCode Map size matches", () => {
    expect(byCode.size).toBe(6);
  });

  test("all codes are unique", () => {
    const codes = currencies.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  test("all numericCodes (where present) are unique within fiat", () => {
    const numericCodes = currencies
      .filter((c) => c.type === "fiat" && c.numericCode !== undefined)
      .map((c) => c.numericCode);
    expect(new Set(numericCodes).size).toBe(numericCodes.length);
  });

  test("every record has required fields", () => {
    for (const c of currencies) {
      expect(typeof c.code).toBe("string");
      expect(typeof c.name).toBe("string");
      expect(typeof c.symbol).toBe("string");
      expect(Array.isArray(c.symbols)).toBe(true);
      expect(c.symbols.length).toBeGreaterThan(0);
      expect(Number.isInteger(c.decimals)).toBe(true);
      expect(c.decimals).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(c.rounding)).toBe(true);
      expect(Array.isArray(c.countries)).toBe(true);
      expect(["active", "historical"]).toContain(c.status);
      expect(["fiat", "crypto", "metal"]).toContain(c.type);
    }
  });

  test("country codes are 2-letter uppercase ISO 3166-1 alpha-2", () => {
    for (const c of currencies) {
      for (const country of c.countries) {
        expect(country).toMatch(/^[A-Z]{2}$/);
      }
    }
  });

  test("historical records have withdrawnDate and successor", () => {
    const hist = currencies.filter((c) => c.status === "historical");
    expect(hist.length).toBeGreaterThan(0);
    for (const c of hist) {
      expect(typeof c.withdrawnDate).toBe("string");
      expect(c.withdrawnDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(typeof c.successor).toBe("string");
    }
  });

  test("crypto records have chain", () => {
    const cryptos = currencies.filter((c) => c.type === "crypto");
    expect(cryptos.length).toBeGreaterThan(0);
    for (const c of cryptos) {
      expect(typeof c.chain).toBe("string");
    }
  });

  test("CurrencyCode literal union exactly matches data file codes", () => {
    const dataCodes = new Set(currencies.map((c) => c.code));
    const expectedCodes = new Set<CurrencyCode>([
      "USD", "EUR", "JPY", "GBP", "BTC", "HRK",
    ]);
    expect(dataCodes).toEqual(expectedCodes);
  });

  test("byCode lookup returns the correct record for each code", () => {
    for (const c of currencies as Currency[]) {
      expect(byCode.get(c.code)).toBe(c);
    }
  });
});
