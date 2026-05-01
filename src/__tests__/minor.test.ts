import { toMinor, fromMinor } from "../minor";
import type { CurrencyCode } from "../codes";

describe("toMinor", () => {
  test("converts 1 USD to 100 cents", () => {
    expect(toMinor(1, "USD")).toBe(100);
  });

  test("converts 0 USD to 0 cents", () => {
    expect(toMinor(0, "USD")).toBe(0);
  });

  test("converts 1.99 USD to 199 cents", () => {
    expect(toMinor(1.99, "USD")).toBe(199);
  });

  test("rounds to nearest minor unit (1.04 USD → 104 cents)", () => {
    expect(toMinor(1.04, "USD")).toBe(104);
  });

  test("handles negative amounts (-1 USD → -100 cents)", () => {
    expect(toMinor(-1, "USD")).toBe(-100);
  });

  test("1 JPY (0 decimals) stays 1 — no minor subdivision", () => {
    expect(toMinor(1, "JPY")).toBe(1);
  });

  test("1000 yen stays 1000", () => {
    expect(toMinor(1000, "JPY")).toBe(1000);
  });

  test("1 BHD (3 decimals) → 1000 fils", () => {
    expect(toMinor(1, "BHD")).toBe(1000);
  });

  test("0.001 BTC (8 decimals) → 100000 satoshis", () => {
    expect(toMinor(0.001, "BTC")).toBe(100000);
  });

  test("throws for unknown code", () => {
    expect(() => toMinor(1, "XXX" as CurrencyCode)).toThrow(
      "Unknown currency code: XXX",
    );
  });
});

describe("fromMinor", () => {
  test("converts 100 cents to 1 USD", () => {
    expect(fromMinor(100, "USD")).toBe(1);
  });

  test("converts 0 cents to 0 USD", () => {
    expect(fromMinor(0, "USD")).toBe(0);
  });

  test("converts 199 cents to 1.99 USD", () => {
    expect(fromMinor(199, "USD")).toBeCloseTo(1.99);
  });

  test("converts -100 cents to -1 USD", () => {
    expect(fromMinor(-100, "USD")).toBe(-1);
  });

  test("1 JPY minor unit stays 1 — no subdivision", () => {
    expect(fromMinor(1, "JPY")).toBe(1);
  });

  test("1000 fils to 1 BHD", () => {
    expect(fromMinor(1000, "BHD")).toBe(1);
  });

  test("100000 satoshis to 0.001 BTC", () => {
    expect(fromMinor(100000, "BTC")).toBeCloseTo(0.001);
  });

  test("throws for unknown code", () => {
    expect(() => fromMinor(100, "XXX" as CurrencyCode)).toThrow(
      "Unknown currency code: XXX",
    );
  });
});
