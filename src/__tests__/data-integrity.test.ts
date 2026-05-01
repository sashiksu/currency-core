import { byCode, currencies } from "../data";

describe("data integrity", () => {
  test("dataset is non-trivial in size", () => {
    // Lower bound for sub-project #2; the actual count can grow without
    // editing this assertion. The exact list is locked by the snapshot below.
    expect(currencies.length).toBeGreaterThanOrEqual(100);
  });

  test("byCode Map size equals currencies length (no duplicate codes)", () => {
    expect(byCode.size).toBe(currencies.length);
  });

  test("type breakdown — at least one of each shipped type", () => {
    const fiat = currencies.filter((c) => c.type === "fiat");
    const crypto = currencies.filter((c) => c.type === "crypto");
    const historical = currencies.filter((c) => c.status === "historical");
    expect(fiat.length).toBeGreaterThanOrEqual(100);
    expect(crypto.length).toBeGreaterThanOrEqual(1);
    expect(historical.length).toBeGreaterThanOrEqual(1);
  });

  test("all codes are unique", () => {
    const codes = currencies.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
  });

  test("fiat codes are uppercase 3-letter alpha (ISO 4217 alpha-3 shape)", () => {
    for (const c of currencies) {
      if (c.type === "fiat") {
        expect(c.code).toMatch(/^[A-Z]{3}$/);
      }
    }
  });

  test("crypto tickers are uppercase 2-10 letter alpha", () => {
    for (const c of currencies) {
      if (c.type === "crypto") {
        expect(c.code).toMatch(/^[A-Z]{2,10}$/);
      }
    }
  });

  test("all numericCodes (where present) are unique within fiat and in range 1-999", () => {
    const numericCodes = currencies
      .filter((c) => c.type === "fiat" && c.numericCode !== undefined)
      .map((c) => c.numericCode as number);
    expect(new Set(numericCodes).size).toBe(numericCodes.length);
    for (const n of numericCodes) {
      expect(Number.isInteger(n)).toBe(true);
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(999);
    }
  });

  test("every record has required fields with valid shapes", () => {
    for (const c of currencies) {
      expect(typeof c.code).toBe("string");
      expect(typeof c.name).toBe("string");
      expect(typeof c.symbol).toBe("string");
      expect(Array.isArray(c.symbols)).toBe(true);
      expect(c.symbols.length).toBeGreaterThan(0);
      expect(Number.isInteger(c.decimals)).toBe(true);
      expect(c.decimals).toBeGreaterThanOrEqual(0);
      expect(c.decimals).toBeLessThanOrEqual(8);
      expect(Number.isInteger(c.rounding)).toBe(true);
      expect(c.rounding).toBeGreaterThanOrEqual(1);
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

  test("byCode lookup returns the correct record for each code", () => {
    for (const c of currencies) {
      expect(byCode.get(c.code)).toBe(c);
    }
  });

  // Snapshot test — the canonical "what's in the dataset right now" lock.
  // When you intentionally add or remove a record, run:
  //   npm test -- -u
  // to refresh the snapshot. The diff in the snapshot file becomes a
  // reviewable artifact alongside the data change itself.
  test("sorted code list matches the dataset snapshot", () => {
    const codes = [...currencies.map((c) => c.code)].sort();
    expect(codes).toMatchSnapshot();
  });
});
