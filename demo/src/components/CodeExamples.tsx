import { useState } from "react";
import styles from "./CodeExamples.module.scss";

type Example = {
  id: string;
  title: string;
  badge?: string;
  blurb: string;
  code: string;
};

const EXAMPLES: Example[] = [
  {
    id: "tree-shake",
    title: "Per-currency tree-shake import",
    badge: "183 B brotlied",
    blurb:
      "Pull in just the records you need. Each per-currency entry is a literal record with no runtime imports — bundlers can drop everything else and stay under 500 B per code (NFR-4).",
    code: `// One currency, none of the rest of the dataset
import { USD } from "currency-core/currencies/USD";
import { EUR } from "currency-core/currencies/EUR";

console.log(USD.symbol);   // "$"
console.log(EUR.decimals); // 2

// Bundler output for USD alone:  183 B brotlied
// Bundler output for the full dataset:  ~7 KB brotlied`,
  },
  {
    id: "compat-symbol-map",
    title: "Drop-in symbol map",
    blurb:
      "Code → symbol map for codebases that already iterate a flat map. Built once at module load from the bundled dataset, no runtime cost beyond the lookup.",
    code: `import { symbolMap } from "currency-core/compat/symbol-map";

// Same shape as a hand-curated { USD: "$", EUR: "€", ... } object
console.log(symbolMap.USD);  // "$"
console.log(symbolMap.JPY);  // "¥"
console.log(symbolMap.CHF);  // "CHF"

// Iterate the whole thing
for (const [code, sym] of Object.entries(symbolMap)) {
  // ...
}`,
  },
  {
    id: "compat-codes",
    title: "Code-list array",
    blurb:
      "Read-only array of every shipped CurrencyCode. Useful for populating a select element or validating input against the full set.",
    code: `import { codes } from "currency-core/compat/codes";

console.log("Currencies shipped:", codes.length);
console.log("First five:", codes.slice(0, 5));

// Use as an exhaustive validator
function isKnown(input: string): boolean {
  return codes.includes(input.toUpperCase() as typeof codes[number]);
}`,
  },
  {
    id: "compat-exponent-map",
    title: "Explicit base/exponent map",
    blurb:
      "Code → { code, base: 10, exponent } records for currency-arithmetic libraries that prefer that shape. Pass straight into a money-object factory.",
    code: `import { exponentMap } from "currency-core/compat/exponent-map";

// Per-currency exponent records
console.log(exponentMap.USD);
// { code: "USD", base: 10, exponent: 2 }

console.log(exponentMap.JPY);
// { code: "JPY", base: 10, exponent: 0 }

console.log(exponentMap.BHD);
// { code: "BHD", base: 10, exponent: 3 }`,
  },
  {
    id: "type-narrowing",
    title: "Type-narrowing predicate",
    blurb:
      "isValidCode is a TypeScript user-defined type guard — narrows string to CurrencyCode at the call site so the strict overloads of getCurrency / format / toMinor accept the value without a cast.",
    code: `import { isValidCode, getCurrency, type CurrencyCode } from "currency-core";

function describe(input: string): string {
  if (!isValidCode(input)) {
    return "Unknown currency code";
  }
  // input is now narrowed to CurrencyCode here
  const record = getCurrency(input);
  return \`\${record.name} (\${record.symbol})\`;
}`,
  },
  {
    id: "react-hook",
    title: "Tiny React hook",
    blurb:
      "Twelve lines, zero dependencies beyond React. Memoize the lookup, derive everything else from the record.",
    code: `import { useMemo } from "react";
import { safeGetCurrency, format } from "currency-core";

export function useCurrency(code: string, locale?: string) {
  return useMemo(() => {
    const record = safeGetCurrency(code);
    if (!record) return null;
    return {
      ...record,
      formatAmount: (n: number) =>
        format(n, record.code as never, { locale }),
    };
  }, [code, locale]);
}`,
  },
];

export function CodeExamples() {
  const [open, setOpen] = useState<string>(EXAMPLES[0]?.id ?? "");

  return (
    <section id="examples" className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Reference snippets</span>
        <h2>Build-time imports and patterns.</h2>
        <p className={styles.lede}>
          The static-import side of the API — per-currency tree-shake entries
          and compat shims — alongside common integration patterns. These run
          at your build step, so they live here as reference rather than in the
          live playground.
        </p>
      </header>

      <div className={styles.tabs} role="tablist" aria-label="Reference snippet">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.id}
            type="button"
            role="tab"
            aria-selected={open === ex.id}
            className={`${styles.tab} ${open === ex.id ? styles.tabActive : ""}`}
            onClick={() => setOpen(ex.id)}
          >
            {ex.title}
            {ex.badge && <span className={styles.tabBadge}>{ex.badge}</span>}
          </button>
        ))}
      </div>

      {EXAMPLES.filter((ex) => ex.id === open).map((ex) => (
        <article key={ex.id} className={styles.card}>
          <div className={styles.cardHead}>
            <h3>{ex.title}</h3>
            {ex.badge && <span className={styles.badge}>{ex.badge}</span>}
          </div>
          <p className={styles.blurb}>{ex.blurb}</p>
          <pre className={styles.code}>
            <code>{ex.code}</code>
          </pre>
        </article>
      ))}
    </section>
  );
}
