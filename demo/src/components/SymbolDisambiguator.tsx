import { useMemo, useState } from "react";
import { getCurrenciesBySymbol } from "currency-core";
import styles from "./SymbolDisambiguator.module.scss";

const SYMBOL_PRESETS = ["$", "£", "¥", "kr", "Rs", "R$", "₣", "₿"];

export function SymbolDisambiguator() {
  const [symbol, setSymbol] = useState<string>("$");

  const matches = useMemo(() => {
    if (!symbol.trim()) return [];
    return getCurrenciesBySymbol(symbol);
  }, [symbol]);

  return (
    <section id="symbol" className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Symbol disambiguation</span>
        <h2>One symbol, many currencies.</h2>
        <p className={styles.lede}>
          A dollar sign means a different thing in São Paulo, Sydney, and Buenos
          Aires. <code>getCurrenciesBySymbol</code> returns every currency that
          shares the symbol so you can disambiguate in UI flows.
        </p>
      </header>

      <div className={styles.toolbar}>
        <label htmlFor="sym-input" className={styles.label}>
          Symbol
        </label>
        <input
          id="sym-input"
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className={styles.input}
          autoComplete="off"
          spellCheck={false}
          maxLength={6}
        />

        <div className={styles.chips}>
          {SYMBOL_PRESETS.map((s) => (
            <button
              key={s}
              type="button"
              className={`${styles.chip} ${symbol === s ? styles.chipActive : ""}`}
              onClick={() => setSymbol(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.summary}>
        <span className={styles.summaryNum}>{matches.length}</span>
        <span className={styles.summaryLabel}>
          currenc{matches.length === 1 ? "y" : "ies"} use{matches.length === 1 ? "s" : ""} <code>{symbol}</code>
        </span>
      </div>

      {matches.length === 0 ? (
        <div className={styles.empty}>
          No bundled currency carries this symbol. Try one of the chips above.
        </div>
      ) : (
        <div className={styles.grid}>
          {matches.map((m) => (
            <article key={m.code} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.cardSymbol}>{m.symbol}</span>
                <div>
                  <div className={styles.cardCode}>{m.code}</div>
                  <div className={styles.cardName}>{m.name}</div>
                </div>
              </div>
              <div className={styles.cardMeta}>
                {m.countries.length === 0
                  ? "No country mapping"
                  : m.countries.length <= 5
                  ? m.countries.join(" · ")
                  : `${m.countries.slice(0, 5).join(" · ")} +${m.countries.length - 5}`}
              </div>
              {m.symbols.length > 1 && (
                <div className={styles.cardSymbols}>
                  All forms: {m.symbols.map((s) => (
                    <code key={s}>{s}</code>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
