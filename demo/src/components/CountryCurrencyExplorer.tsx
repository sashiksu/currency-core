import { useMemo, useState } from "react";
import {
  getCurrencyByCountry,
  getCurrencyByLocale,
  type Currency,
} from "currency-core";
import styles from "./CountryCurrencyExplorer.module.scss";

const COUNTRY_PRESETS: { code: string; name: string }[] = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" },
  { code: "IN", name: "India" },
  { code: "AU", name: "Australia" },
  { code: "ZA", name: "South Africa" },
  { code: "AE", name: "United Arab Emirates" },
];

const LOCALE_PRESETS: { tag: string; label: string }[] = [
  { tag: "en-US", label: "English (US)" },
  { tag: "fr-CA", label: "French (Canada)" },
  { tag: "es-MX", label: "Spanish (Mexico)" },
  { tag: "de-CH", label: "German (Switzerland)" },
  { tag: "ar-EG", label: "Arabic (Egypt)" },
  { tag: "ja-JP", label: "Japanese (Japan)" },
  { tag: "zh-Hant-TW", label: "Chinese (Traditional, Taiwan)" },
];

type Mode = "country" | "locale";

function ResultCard({ record, source }: { record: Currency | undefined; source: string }) {
  if (!record) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon} aria-hidden="true">·</span>
        <div>
          <div className={styles.emptyLabel}>No primary currency for {source}</div>
          <div className={styles.emptySub}>
            That input may be unrecognized, region-less, or refer to a country
            without a single primary currency.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.result}>
      <div className={styles.resultHead}>
        <span className={styles.symbol}>{record.symbol}</span>
        <div>
          <div className={styles.resultName}>
            {record.name} <span className={styles.resultCode}>({record.code})</span>
          </div>
          <div className={styles.resultMeta}>
            {record.decimals} decimal{record.decimals === 1 ? "" : "s"}
            {record.numericCode !== undefined ? ` · ISO ${String(record.numericCode).padStart(3, "0")}` : ""}
          </div>
        </div>
      </div>
      {record.countries.length > 1 && (
        <div className={styles.also}>
          Also used in:{" "}
          <span className={styles.alsoCodes}>
            {record.countries.slice(0, 14).join(" · ")}
            {record.countries.length > 14 ? ` +${record.countries.length - 14} more` : ""}
          </span>
        </div>
      )}
    </div>
  );
}

export function CountryCurrencyExplorer() {
  const [mode, setMode] = useState<Mode>("country");
  const [country, setCountry] = useState<string>("US");
  const [locale, setLocale] = useState<string>("fr-CA");

  const countryRecord = useMemo(
    () => getCurrencyByCountry(country),
    [country],
  );

  const localeRecord = useMemo(
    () => getCurrencyByLocale(locale),
    [locale],
  );

  return (
    <section id="country" className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Country · Locale</span>
        <h2>Find a currency by country or locale tag.</h2>
        <p className={styles.lede}>
          Pick an ISO 3166-1 alpha-2 country code, or a BCP 47 locale tag like
          <code> fr-CA</code>. The library resolves to the country's primary
          currency.
        </p>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Lookup mode">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "country"}
          className={`${styles.tab} ${mode === "country" ? styles.tabActive : ""}`}
          onClick={() => setMode("country")}
        >
          By country
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "locale"}
          className={`${styles.tab} ${mode === "locale" ? styles.tabActive : ""}`}
          onClick={() => setMode("locale")}
        >
          By locale
        </button>
      </div>

      <div className={styles.body}>
        {mode === "country" ? (
          <div className={styles.controls}>
            <label htmlFor="cc-country">Country code</label>
            <input
              id="cc-country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value.toUpperCase())}
              maxLength={2}
              className={styles.input}
              autoComplete="off"
              spellCheck={false}
              placeholder="US"
            />
            <div className={styles.chips}>
              {COUNTRY_PRESETS.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  className={`${styles.chip} ${country === c.code ? styles.chipActive : ""}`}
                  onClick={() => setCountry(c.code)}
                  title={c.name}
                >
                  {c.code}
                </button>
              ))}
            </div>
            <pre className={styles.snippet}>{`getCurrencyByCountry("${country}")`}</pre>
          </div>
        ) : (
          <div className={styles.controls}>
            <label htmlFor="cc-locale">Locale tag</label>
            <input
              id="cc-locale"
              type="text"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className={styles.input}
              autoComplete="off"
              spellCheck={false}
              placeholder="fr-CA"
            />
            <div className={styles.chips}>
              {LOCALE_PRESETS.map((l) => (
                <button
                  key={l.tag}
                  type="button"
                  className={`${styles.chip} ${locale === l.tag ? styles.chipActive : ""}`}
                  onClick={() => setLocale(l.tag)}
                  title={l.label}
                >
                  {l.tag}
                </button>
              ))}
            </div>
            <pre className={styles.snippet}>{`getCurrencyByLocale("${locale}")`}</pre>
          </div>
        )}

        <ResultCard
          record={mode === "country" ? countryRecord : localeRecord}
          source={mode === "country" ? country : locale}
        />
      </div>
    </section>
  );
}
