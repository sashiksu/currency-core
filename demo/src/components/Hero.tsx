import { useMemo, useState } from "react";
import { safeGetCurrency, type Currency } from "currency-core";
import styles from "./Hero.module.scss";

const QUICK_PICKS = ["USD", "EUR", "JPY", "GBP", "BTC", "ETH", "HRK"];

type Verdict =
  | { state: "idle" }
  | { state: "found"; record: Currency }
  | { state: "missing"; query: string };

function classifyType(c: Currency): string {
  if (c.type === "crypto") return "Cryptocurrency";
  if (c.type === "metal") return "Metal";
  return c.status === "historical" ? "Historical fiat" : "Fiat";
}

export function Hero() {
  const [code, setCode] = useState<string>("USD");

  const verdict: Verdict = useMemo(() => {
    const trimmed = code.trim();
    if (!trimmed) return { state: "idle" };
    const record = safeGetCurrency(trimmed);
    return record
      ? { state: "found", record }
      : { state: "missing", query: trimmed.toUpperCase() };
  }, [code]);

  const fieldState =
    verdict.state === "found"
      ? "valid"
      : verdict.state === "missing"
      ? "invalid"
      : "";

  return (
    <header id="lookup" className={styles.hero}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>Try it live</span>
        <h1>
          Look up <em>236 currencies</em> in one drop-in package.
        </h1>
        <p className={styles.lede}>
          Symbols, ISO codes, decimals, and country mappings for every active
          fiat currency, the top cryptocurrencies, and the historical records
          you actually need. TypeScript-first. Zero runtime dependencies.
        </p>
        <div className={styles.meta}>
          <span><span className={styles.ok}>✓</span> MIT licensed</span>
          <span><span className={styles.ok}>✓</span> Zero dependencies</span>
          <span><span className={styles.ok}>✓</span> ESM + CommonJS</span>
          <span><span className={styles.ok}>✓</span> Tree-shakeable</span>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardEyebrow}>Live lookup</div>
        <label htmlFor="hero-code" className={styles.label}>
          Currency code
        </label>
        <input
          id="hero-code"
          type="text"
          className={styles.field}
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          autoComplete="off"
          spellCheck={false}
          maxLength={10}
          placeholder="e.g. USD"
          data-state={fieldState}
        />

        <div className={styles.chips}>
          {QUICK_PICKS.map((c) => (
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

        {verdict.state === "found" && (
          <div className={styles.result}>
            <div className={styles.resultHead}>
              <span className={styles.symbol}>
                {verdict.record.symbol}
              </span>
              <div>
                <div className={styles.resultName}>{verdict.record.name}</div>
                <div className={styles.resultMeta}>
                  {classifyType(verdict.record)} · {verdict.record.decimals} decimal{verdict.record.decimals === 1 ? "" : "s"}
                </div>
              </div>
            </div>
            <dl className={styles.fields}>
              <div>
                <dt>Code</dt>
                <dd><code>{verdict.record.code}</code></dd>
              </div>
              {verdict.record.numericCode !== undefined && (
                <div>
                  <dt>ISO numeric</dt>
                  <dd><code>{String(verdict.record.numericCode).padStart(3, "0")}</code></dd>
                </div>
              )}
              {verdict.record.countries.length > 0 && (
                <div>
                  <dt>Countries</dt>
                  <dd>{verdict.record.countries.slice(0, 12).join(", ")}{verdict.record.countries.length > 12 ? ` +${verdict.record.countries.length - 12} more` : ""}</dd>
                </div>
              )}
              {verdict.record.chain && (
                <div>
                  <dt>Chain</dt>
                  <dd>{verdict.record.chain}</dd>
                </div>
              )}
              {verdict.record.successor && (
                <div>
                  <dt>Replaced by</dt>
                  <dd><code>{verdict.record.successor}</code>{verdict.record.withdrawnDate ? ` on ${verdict.record.withdrawnDate}` : ""}</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        {verdict.state === "missing" && (
          <div className={styles.empty}>
            <span className={styles.emptyIcon} aria-hidden="true">·</span>
            <div>
              <div className={styles.emptyLabel}>No record for <code>{verdict.query}</code></div>
              <div className={styles.emptySub}>Try one of the chips above, or browse the full table below.</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
