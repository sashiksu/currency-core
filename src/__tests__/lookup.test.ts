import {
  getCurrency,
  getSymbol,
  getName,
  getDecimals,
  safeGetCurrency,
  safeGetSymbol,
} from "../lookup";
import type { CurrencyCode } from "../codes";

describe("getCurrency", () => {
  test("returns USD record for 'USD'", () => {
    const c = getCurrency("USD");
    expect(c?.code).toBe("USD");
    expect(c?.numericCode).toBe(840);
  });

  test("returns USD record for lowercase 'usd' via normalization", () => {
    const c = getCurrency("usd");
    expect(c?.code).toBe("USD");
  });

  test("returns undefined for unknown string code", () => {
    expect(getCurrency("XXX")).toBeUndefined();
  });

  test("returns BTC record with chain field", () => {
    const c = getCurrency("BTC");
    expect(c?.chain).toBe("bitcoin");
    expect(c?.decimals).toBe(8);
  });

  test("returns HRK with successor metadata", () => {
    const c = getCurrency("HRK");
    expect(c?.status).toBe("historical");
    expect(c?.successor).toBe("EUR");
    expect(c?.withdrawnDate).toBe("2023-01-01");
  });
});

describe("getSymbol", () => {
  test("returns '$' for USD", () => {
    expect(getSymbol("USD")).toBe("$");
  });

  test("returns '¥' for JPY", () => {
    expect(getSymbol("JPY")).toBe("¥");
  });

  test("returns '€' for EUR", () => {
    expect(getSymbol("EUR")).toBe("€");
  });

  test("returns '₿' for BTC", () => {
    expect(getSymbol("BTC")).toBe("₿");
  });

  test("normalizes lowercase typed via cast", () => {
    expect(getSymbol("usd" as CurrencyCode)).toBe("$");
  });

  test("throws for unknown code", () => {
    expect(() => getSymbol("XXX" as CurrencyCode)).toThrow(
      "Unknown currency code: XXX",
    );
  });
});

describe("getName", () => {
  test("returns 'United States Dollar' for USD", () => {
    expect(getName("USD")).toBe("United States Dollar");
  });

  test("returns 'Japanese Yen' for JPY", () => {
    expect(getName("JPY")).toBe("Japanese Yen");
  });

  test("returns 'Bitcoin' for BTC", () => {
    expect(getName("BTC")).toBe("Bitcoin");
  });

  test("throws for unknown code", () => {
    expect(() => getName("XXX" as CurrencyCode)).toThrow();
  });
});

describe("getDecimals", () => {
  test("returns 0 for JPY (zero-decimal edge case)", () => {
    expect(getDecimals("JPY")).toBe(0);
  });

  test("returns 2 for USD", () => {
    expect(getDecimals("USD")).toBe(2);
  });

  test("returns 8 for BTC", () => {
    expect(getDecimals("BTC")).toBe(8);
  });

  test("throws for unknown code", () => {
    expect(() => getDecimals("XXX" as CurrencyCode)).toThrow();
  });
});

describe("safeGetCurrency", () => {
  test("returns the record for 'USD'", () => {
    expect(safeGetCurrency("USD")?.code).toBe("USD");
  });

  test("normalizes lowercase input", () => {
    expect(safeGetCurrency("usd")?.code).toBe("USD");
  });

  test("returns undefined for unknown code (does not throw)", () => {
    expect(safeGetCurrency("XXX")).toBeUndefined();
  });
});

describe("safeGetSymbol", () => {
  test("returns '$' for USD", () => {
    expect(safeGetSymbol("USD")).toBe("$");
  });

  test("returns undefined for unknown code (does not throw)", () => {
    expect(safeGetSymbol("XXX")).toBeUndefined();
  });
});
