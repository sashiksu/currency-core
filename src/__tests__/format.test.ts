import { format, parse } from "../format";
import type { CurrencyCode } from "../codes";
import * as fc from "fast-check";

describe("format", () => {
  test("formats 1234.56 USD as '$1,234.56' in en-US locale", () => {
    expect(format(1234.56, "USD", { locale: "en-US" })).toBe("$1,234.56");
  });

  test("formats 0 USD as '$0.00' in en-US locale", () => {
    expect(format(0, "USD", { locale: "en-US" })).toBe("$0.00");
  });

  test("formats 1234 JPY (0 decimals) as '¥1,234' in en-US locale", () => {
    expect(format(1234, "JPY", { locale: "en-US" })).toBe("¥1,234");
  });

  test("formats 1.5 BHD (3 decimals) to 3 decimal places", () => {
    const result = format(1.5, "BHD", { locale: "en-US" });
    expect(result).toContain("1.500");
  });

  test("formats negative USD amount with leading minus", () => {
    const result = format(-42.5, "USD", { locale: "en-US" });
    expect(result).toContain("-");
    expect(result).toContain("42.50");
  });

  test("variant 'wide' produces spelled-out currency name", () => {
    const result = format(1, "USD", { locale: "en-US", variant: "wide" });
    expect(result).toContain("dollar");
  });

  test("variant 'narrow' produces narrow symbol variant", () => {
    const result = format(1, "USD", { locale: "en-US", variant: "narrow" });
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("signDisplay 'always' adds + for positive amounts", () => {
    const result = format(1, "USD", { locale: "en-US", signDisplay: "always" });
    expect(result).toContain("+");
  });

  test("returns a string when no locale is provided (uses runtime default)", () => {
    const result = format(1234.56, "USD");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("throws for unknown code (cast via 'as CurrencyCode')", () => {
    expect(() => format(1, "XXX" as CurrencyCode)).toThrow(
      "Unknown currency code: XXX",
    );
  });

  test("falls back to 'symbol + toFixed' when Intl.NumberFormat throws (crypto/no-Intl path)", () => {
    const realNumberFormat = Intl.NumberFormat;
    // Temporarily replace the constructor to simulate a rejecting environment
    (Intl as any).NumberFormat = function () {
      throw new RangeError("Invalid currency code");
    };
    try {
      expect(format(1.5, "USD")).toBe("$1.50");
      expect(format(-1.5, "USD")).toBe("-$1.50");
    } finally {
      Intl.NumberFormat = realNumberFormat;
    }
  });
});

describe("parse", () => {
  test("parses '$1,234.56' (en-US) to 1234.56", () => {
    expect(parse("$1,234.56", "USD", { locale: "en-US" })).toBeCloseTo(1234.56);
  });

  test("parses '$0.00' (en-US) to 0", () => {
    expect(parse("$0.00", "USD", { locale: "en-US" })).toBe(0);
  });

  test("parses '-$42.50' (en-US) to -42.5", () => {
    expect(parse("-$42.50", "USD", { locale: "en-US" })).toBeCloseTo(-42.5);
  });

  test("parses '¥1,234' (en-US, JPY) to 1234", () => {
    expect(parse("¥1,234", "JPY", { locale: "en-US" })).toBe(1234);
  });

  test("parses '1.500' (BHD, 3 decimals) to 1.5", () => {
    expect(parse("1.500", "BHD", { locale: "en-US" })).toBeCloseTo(1.5);
  });

  test("returns null for empty string", () => {
    expect(parse("", "USD")).toBeNull();
  });

  test("returns null for non-numeric garbage", () => {
    expect(parse("not a number", "USD")).toBeNull();
  });

  test("returns null for unknown code", () => {
    expect(parse("$1.00", "XXX" as CurrencyCode)).toBeNull();
  });

  test("returns null for multiple decimal separators (malformed)", () => {
    expect(parse("1.23.45", "USD", { locale: "en-US" })).toBeNull();
  });

  test("returns null for embedded hyphen in number (malformed)", () => {
    expect(parse("1-234.56", "USD", { locale: "en-US" })).toBeNull();
  });
});

describe("format/parse round-trip (property-based)", () => {
  test("parse(format(x, USD)) ≈ x for all 2-decimal cent amounts in [-$9999.99, $9999.99]", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -999999, max: 999999 }).map((cents) => cents / 100),
        (amount) => {
          const formatted = format(amount, "USD", { locale: "en-US" });
          const parsed = parse(formatted, "USD", { locale: "en-US" });
          return parsed !== null && Math.abs(parsed - amount) < 0.001;
        },
      ),
      { numRuns: 200 },
    );
  });

  test("parse(format(x, JPY)) equals x for all integer yen amounts", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -99999, max: 99999 }),
        (amount) => {
          const formatted = format(amount, "JPY", { locale: "en-US" });
          const parsed = parse(formatted, "JPY", { locale: "en-US" });
          return parsed !== null && parsed === amount;
        },
      ),
      { numRuns: 200 },
    );
  });
});
