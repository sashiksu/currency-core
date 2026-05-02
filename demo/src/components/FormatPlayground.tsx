import { useMemo, useState } from "react";
import {
  format,
  parse,
  toMinor,
  fromMinor,
  isValidCode,
  type CurrencyCode,
  type FormatOptions,
} from "currency-core";
import styles from "./FormatPlayground.module.scss";

const CODE_PRESETS = ["USD", "EUR", "GBP", "JPY", "INR", "CHF", "BTC", "BHD"];
const LOCALE_PRESETS = [
  "en-US",
  "en-GB",
  "fr-FR",
  "de-DE",
  "ja-JP",
  "hi-IN",
  "ar-SA",
  "pt-BR",
];

type Variant = NonNullable<FormatOptions["variant"]>;
type SignDisplay = NonNullable<FormatOptions["signDisplay"]>;

const VARIANTS: Variant[] = ["default", "narrow", "wide"];
const SIGN_DISPLAYS: SignDisplay[] = ["auto", "always", "exceptZero", "never"];

export function FormatPlayground() {
  const [amount, setAmount] = useState<string>("1234567.89");
  const [code, setCode] = useState<string>("EUR");
  const [locale, setLocale] = useState<string>("fr-FR");
  const [variant, setVariant] = useState<Variant>("default");
  const [signDisplay, setSignDisplay] = useState<SignDisplay>("auto");

  const numericAmount = useMemo(() => Number(amount), [amount]);
  const upperCode = code.toUpperCase();
  const codeValid = isValidCode(upperCode);
  const valid =
    codeValid && !Number.isNaN(numericAmount) && Number.isFinite(numericAmount);
  // isValidCode is a type-narrowing predicate, but the narrowing doesn't
  // survive being stored in a `valid` flag. Cast once at the call site so
  // the strict CurrencyCode signature on format/parse/toMinor/fromMinor is
  // satisfied without sprinkling `as` everywhere.
  const ccCode = upperCode as CurrencyCode;

  const result = useMemo(() => {
    if (!valid) return null;
    try {
      return format(numericAmount, ccCode, { locale, variant, signDisplay });
    } catch (err) {
      return err instanceof Error ? `Error: ${err.message}` : String(err);
    }
  }, [valid, numericAmount, ccCode, locale, variant, signDisplay]);

  const roundTrip = useMemo(() => {
    if (!valid || !result || result.startsWith("Error:")) return null;
    return parse(result, ccCode, { locale });
  }, [valid, result, ccCode, locale]);

  const minorUnits = useMemo(() => {
    if (!valid) return null;
    return toMinor(numericAmount, ccCode);
  }, [valid, numericAmount, ccCode]);

  const fromMinorRoundTrip = useMemo(() => {
    if (minorUnits === null) return null;
    return fromMinor(minorUnits, ccCode);
  }, [minorUnits, ccCode]);

  return (
    <section id="format" className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Format · Parse · Minor units</span>
        <h2>Locale-aware formatting in three lines.</h2>
        <p className={styles.lede}>
          Backed by <code>Intl.NumberFormat</code> with a graceful symbol +{" "}
          <code>toFixed</code> fallback for crypto tickers and runtimes without
          full ICU. Round-trips with <code>parse()</code>.
        </p>
      </header>

      <div className={styles.grid}>
        <div className={styles.controls}>
          <div className={styles.field}>
            <label htmlFor="fmt-amount">Amount</label>
            <input
              id="fmt-amount"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.input}
              data-state={Number.isFinite(numericAmount) ? "" : "invalid"}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="fmt-code">Currency</label>
            <input
              id="fmt-code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={10}
              className={styles.input}
              autoComplete="off"
              spellCheck={false}
              data-state={codeValid ? "" : "invalid"}
            />
            <div className={styles.chips}>
              {CODE_PRESETS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`${styles.chip} ${code === c ? styles.chipActive : ""}`}
                  onClick={() => setCode(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="fmt-locale">Locale</label>
            <input
              id="fmt-locale"
              type="text"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className={styles.input}
              autoComplete="off"
              spellCheck={false}
            />
            <div className={styles.chips}>
              {LOCALE_PRESETS.map((l) => (
                <button
                  key={l}
                  type="button"
                  className={`${styles.chip} ${locale === l ? styles.chipActive : ""}`}
                  onClick={() => setLocale(l)}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Variant</label>
              <div className={styles.segment}>
                {VARIANTS.map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={`${styles.segmentBtn} ${variant === v ? styles.segmentActive : ""}`}
                    onClick={() => setVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label>Sign display</label>
              <div className={styles.segment}>
                {SIGN_DISPLAYS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`${styles.segmentBtn} ${signDisplay === s ? styles.segmentActive : ""}`}
                    onClick={() => setSignDisplay(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.output}>
          <div className={styles.cardEyebrow}>Result</div>
          <div className={styles.formatted}>{result ?? "—"}</div>

          <pre className={styles.snippet}>
{`format(${numericAmount}, "${upperCode}", {
  locale: "${locale}",
  variant: "${variant}",
  signDisplay: "${signDisplay}"
})`}
          </pre>

          <dl className={styles.fields}>
            <div>
              <dt>parse() round-trip</dt>
              <dd>
                {roundTrip === null ? (
                  <span className={styles.muted}>parse failed</span>
                ) : (
                  <code>{roundTrip}</code>
                )}
              </dd>
            </div>
            <div>
              <dt>toMinor()</dt>
              <dd>{minorUnits === null ? "—" : <code>{minorUnits}</code>}</dd>
            </div>
            <div>
              <dt>fromMinor()</dt>
              <dd>
                {fromMinorRoundTrip === null ? "—" : (
                  <code>{fromMinorRoundTrip}</code>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
