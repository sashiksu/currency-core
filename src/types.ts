export type CurrencyType = "fiat" | "crypto" | "metal";
export type CurrencyStatus = "active" | "historical";

export interface Currency {
  /** ISO 4217 alpha-3 code or crypto ticker. e.g. "USD", "BTC", "ITL" */
  code: string;

  /** ISO 4217 numeric code (840 for USD). Undefined for crypto. */
  numericCode?: number;

  /** English name. e.g. "United States Dollar" */
  name: string;

  /** Default/most-common symbol. e.g. "$" */
  symbol: string;

  /** Narrow form when different (rare; e.g. EGP narrow="£" wide="E£") */
  symbolNarrow?: string;

  /** All known symbol forms — for parse() and disambiguation */
  symbols: string[];

  /** Minor unit count. 0=JPY, 2=USD, 3=BHD, 4=CLF, 8=BTC */
  decimals: number;

  /** Rounding increment. Usually 1; CHF=5 (Swiss 5-cent), SEK historical öre */
  rounding: number;

  /** Major/minor unit names for spelled-out display */
  units?: { major: string; minor: string };

  /** ISO 3166-1 alpha-2 country codes where currency is used */
  countries: string[];

  /** active = current; historical = withdrawn from circulation */
  status: CurrencyStatus;

  /** ISO 8601 date when currency was withdrawn (historical only) */
  withdrawnDate?: string;

  /** Code that replaced this currency. e.g. HRK→EUR, ITL→EUR */
  successor?: string;

  type: CurrencyType;

  /** Blockchain identifier (crypto only). e.g. "bitcoin", "ethereum" */
  chain?: string;

  /** HTML decimal entity. e.g. "&#36;" for $ */
  htmlEntity?: string;

  /** Unicode codepoint string. e.g. "U+0024" for $ */
  unicodeCodepoint?: string;
}

/** Strict literal union of all known codes; codegen'd in sub-project #2 from full dataset. */
export type CurrencyCode = "USD" | "EUR" | "JPY" | "GBP" | "BTC" | "HRK";
