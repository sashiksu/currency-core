import { useDeferredValue, useMemo, useState } from "react";
import { getCurrency, type Currency } from "currency-core";
import { codes } from "currency-core/compat/codes";
import styles from "./CurrencyBrowser.module.scss";

type TypeFilter = "all" | "fiat" | "crypto" | "metal";
type StatusFilter = "all" | "active" | "historical";

const TYPE_FILTERS: { id: TypeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fiat", label: "Fiat" },
  { id: "crypto", label: "Crypto" },
  { id: "metal", label: "Metal" },
];

const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "historical", label: "Historical" },
];

const ALL_RECORDS: readonly Currency[] = codes.map((c) => getCurrency(c));

function matchesQuery(record: Currency, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  if (record.code.toLowerCase().includes(needle)) return true;
  if (record.name.toLowerCase().includes(needle)) return true;
  if (record.symbols.some((s) => s.toLowerCase().includes(needle))) return true;
  if (record.countries.some((c) => c.toLowerCase().includes(needle))) return true;
  return false;
}

export function CurrencyBrowser() {
  const [type, setType] = useState<TypeFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [query, setQuery] = useState<string>("");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    return ALL_RECORDS.filter((r) => {
      if (type !== "all" && r.type !== type) return false;
      if (status !== "all" && r.status !== status) return false;
      return matchesQuery(r, deferredQuery.trim());
    });
  }, [type, status, deferredQuery]);

  const counts = useMemo(() => {
    const fiat = ALL_RECORDS.filter((r) => r.type === "fiat").length;
    const crypto = ALL_RECORDS.filter((r) => r.type === "crypto").length;
    const historical = ALL_RECORDS.filter((r) => r.status === "historical").length;
    return { fiat, crypto, historical, total: ALL_RECORDS.length };
  }, []);

  return (
    <section id="browser" className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Browse the dataset</span>
        <h2>{counts.total} records · one source of truth.</h2>
        <p className={styles.lede}>
          {counts.fiat} active fiat currencies, {counts.crypto} cryptocurrencies,
          and {counts.historical} historical records — searchable across code,
          name, symbol, and country.
        </p>
      </header>

      <div className={styles.toolbar}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code, name, symbol, or country (e.g. JPY, yen, ¥, JP)"
          className={styles.search}
          autoComplete="off"
          spellCheck={false}
        />

        <div className={styles.filterRow}>
          <div className={styles.segment} role="radiogroup" aria-label="Type filter">
            {TYPE_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={type === f.id}
                className={`${styles.segmentBtn} ${type === f.id ? styles.segmentActive : ""}`}
                onClick={() => setType(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className={styles.segment} role="radiogroup" aria-label="Status filter">
            {STATUS_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="radio"
                aria-checked={status === f.id}
                className={`${styles.segmentBtn} ${status === f.id ? styles.segmentActive : ""}`}
                onClick={() => setStatus(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.count} aria-live="polite">
          {filtered.length} match{filtered.length === 1 ? "" : "es"}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.colCode}>Code</th>
              <th scope="col" className={styles.colSym}>Symbol</th>
              <th scope="col">Name</th>
              <th scope="col" className={styles.colType}>Type</th>
              <th scope="col" className={styles.colDec}>Decimals</th>
              <th scope="col">Countries</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.emptyCell}>
                  No records match these filters.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.code}>
                  <td className={styles.codeCell}>
                    <code>{r.code}</code>
                  </td>
                  <td className={styles.symbolCell}>{r.symbol}</td>
                  <td className={styles.nameCell}>
                    {r.name}
                    {r.status === "historical" && (
                      <span className={styles.histChip} title="Withdrawn from circulation">
                        historical
                      </span>
                    )}
                  </td>
                  <td>
                    <span
                      className={`${styles.typeChip} ${
                        r.type === "crypto"
                          ? styles.typeCrypto
                          : r.type === "metal"
                          ? styles.typeMetal
                          : styles.typeFiat
                      }`}
                    >
                      {r.type}
                    </span>
                  </td>
                  <td className={styles.decCell}>{r.decimals}</td>
                  <td className={styles.countriesCell}>
                    {r.countries.length === 0
                      ? "—"
                      : r.countries.length <= 6
                      ? r.countries.join(", ")
                      : `${r.countries.slice(0, 6).join(", ")} +${r.countries.length - 6}`}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
