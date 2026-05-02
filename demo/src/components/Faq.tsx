import { useState, type ReactNode } from "react";
import styles from "./Faq.module.scss";

type FaqItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

const FAQS: FaqItem[] = [
  {
    id: "scope",
    question: "Which currencies are included?",
    answer:
      "Every active ISO 4217 fiat currency (~155 records), the top cryptocurrencies by market cap, and a curated list of historical/withdrawn currencies (eurozone predecessors, ex-Yugoslav, post-Soviet redenominations). Total currently 236 records — see the browser table above for the full set.",
  },
  {
    id: "decimals-cap",
    question: "Why are crypto decimals capped at 8?",
    answer:
      "format() and parse() are JavaScript-Number based. Past ~8 decimals you start losing precision in arithmetic. BTC, ETH, and most major tokens stay safe at 8. If you need wei-level precision, do the math in BigInt and call format() with the major-unit value.",
  },
  {
    id: "framework",
    question: "Does it work with my framework?",
    answer:
      "Yes. The package ships dual ESM/CJS bundles, no framework coupling, and zero runtime dependencies. Tested on Node 18/20/22, Bun, Deno, Cloudflare Workers (workerd), React Native (esbuild bundler resolution), and Chromium/Firefox/WebKit via Playwright. A React companion package is on the roadmap as a separate publish.",
  },
  {
    id: "tree-shake",
    question: "How small can the bundle get?",
    answer:
      "The full dataset is 7 KB brotlied (NFR-3 caps it at 30 KB). A single per-currency import (currency-core/currencies/USD) is 183 B brotlied — capped at 500 B by NFR-4. The package sets sideEffects: false so unused exports drop cleanly under any modern bundler.",
  },
  {
    id: "data-source",
    question: "Where does the data come from?",
    answer:
      "ISO 4217 fiat records cite SIX Interbank Clearing's list-one.xml; historical records cite list-three.xml; cryptocurrency entries cite CoinGecko's top-200 markets endpoint. Every src/data/*.ts file carries a citation header that CI verifies with verify:headers. Full per-source attribution lives in ATTRIBUTIONS.md.",
  },
  {
    id: "regen",
    question: "How often does the dataset get refreshed?",
    answer:
      "A weekly cron (Monday 06:00 UTC) runs scripts/regen.ts against the SIX and CoinGecko sources, diffs against the bundled data, auto-applies safe field updates (decimals, numericCode), and opens or updates a stable data-regen/weekly PR. Membership changes and name diffs need manual review — they show up in regen-report.md.",
  },
  {
    id: "custom",
    question: "Can I add a custom or fictional currency?",
    answer:
      "Not in v1.0 — the public dataset is the public surface. A registerCurrency(record) API is planned for v1.2 (see roadmap), backed by an opt-in /registry subpath so custom records don't leak into other consumers' bundles.",
  },
  {
    id: "rates",
    question: "Does it ship exchange rates?",
    answer:
      "No, by design. Live rates are dynamic and often licensed — outside the scope of a static data package. v1.4 ships a pluggable RateProvider interface plus reference adapters for ECB, Frankfurter, and CoinGecko rate endpoints, so currency-core stays the abstraction without becoming the rate source.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<string | null>(FAQS[0]?.id ?? null);

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-heading">
      <header className={styles.header}>
        <span className={styles.eyebrow}>FAQ</span>
        <h2 id="faq-heading">The questions that come up most.</h2>
        <p className={styles.lede}>
          Trade-offs, scope decisions, and the answers to the things visitors
          tend to ask in issues and on npm.
        </p>
      </header>

      <div className={styles.list}>
        {FAQS.map((item) => {
          const isOpen = open === item.id;
          const panelId = `faq-panel-${item.id}`;
          const triggerId = `faq-trigger-${item.id}`;
          return (
            <div
              key={item.id}
              className={`${styles.item} ${isOpen ? styles.open : ""}`}
            >
              <button
                type="button"
                id={triggerId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                <svg
                  className={styles.chevron}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isOpen}
                className={styles.panel}
              >
                <div className={styles.panelInner}>
                  <p className={styles.answer}>{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
