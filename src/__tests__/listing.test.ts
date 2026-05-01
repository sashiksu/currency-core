import { listCrypto, listHistorical } from "../lookup";

describe("listCrypto", () => {
  test("returns at least one record", () => {
    expect(listCrypto().length).toBeGreaterThan(0);
  });

  test("every returned record has type 'crypto'", () => {
    for (const c of listCrypto()) {
      expect(c.type).toBe("crypto");
    }
  });

  test("includes BTC", () => {
    const codes = listCrypto().map((c) => c.code);
    expect(codes).toContain("BTC");
  });

  test("does not include any fiat or historical records", () => {
    for (const c of listCrypto()) {
      expect(c.type).not.toBe("fiat");
      expect(c.status).toBe("active");
    }
  });

  test("returns the same reference on repeated calls (memoized)", () => {
    expect(listCrypto()).toBe(listCrypto());
  });
});

describe("listHistorical", () => {
  test("returns at least one record", () => {
    expect(listHistorical().length).toBeGreaterThan(0);
  });

  test("every returned record has status 'historical'", () => {
    for (const c of listHistorical()) {
      expect(c.status).toBe("historical");
    }
  });

  test("includes HRK", () => {
    const codes = listHistorical().map((c) => c.code);
    expect(codes).toContain("HRK");
  });

  test("every historical record carries a withdrawnDate", () => {
    for (const c of listHistorical()) {
      expect(c.withdrawnDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test("returns the same reference on repeated calls (memoized)", () => {
    expect(listHistorical()).toBe(listHistorical());
  });
});
