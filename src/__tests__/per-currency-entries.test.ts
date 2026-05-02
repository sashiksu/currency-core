import { USD } from "../currencies/USD";
import { EUR } from "../currencies/EUR";
import { JPY } from "../currencies/JPY";
import { BTC } from "../currencies/BTC";
import { HRK } from "../currencies/HRK";
import { ETH } from "../currencies/ETH";
import { DEM } from "../currencies/DEM";
import { byCode } from "../data";

describe("per-currency entries", () => {
  test("USD entry matches the dataset record", () => {
    expect(USD).toEqual(byCode.get("USD"));
  });

  test("EUR entry matches the dataset record", () => {
    expect(EUR).toEqual(byCode.get("EUR"));
  });

  test("JPY entry has 0 decimals", () => {
    expect(JPY.code).toBe("JPY");
    expect(JPY.decimals).toBe(0);
  });

  test("BTC entry carries the chain field", () => {
    expect(BTC.code).toBe("BTC");
    expect(BTC.type).toBe("crypto");
    expect(BTC.chain).toBe("bitcoin");
  });

  test("ETH entry carries the chain field", () => {
    expect(ETH.code).toBe("ETH");
    expect(ETH.type).toBe("crypto");
    expect(ETH.chain).toBe("ethereum");
  });

  test("HRK entry carries withdrawnDate and successor", () => {
    expect(HRK.status).toBe("historical");
    expect(HRK.withdrawnDate).toBe("2023-01-01");
    expect(HRK.successor).toBe("EUR");
  });

  test("DEM entry carries the historical metadata", () => {
    expect(DEM.status).toBe("historical");
    expect(DEM.successor).toBe("EUR");
    expect(DEM.numericCode).toBe(276);
  });
});
