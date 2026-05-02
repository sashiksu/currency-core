import styles from "./UseCases.module.scss";

type UseCase = {
  title: string;
  tag: string;
  description: string;
  code: string;
};

const USE_CASES: UseCase[] = [
  {
    title: "E-commerce price display",
    tag: "checkout",
    description:
      "One call replaces the symbol map + Intl.NumberFormat plumbing. Locale comes from the user's profile or Accept-Language.",
    code: `import { format } from "currency-core";

function PriceTag({ amount, code, locale }) {
  return <span>{format(amount, code, { locale })}</span>;
}

// <PriceTag amount={1299.5} code="EUR" locale="fr-FR" />
// → "1 299,50 €"`,
  },
  {
    title: "Payment-gateway numeric code",
    tag: "fintech",
    description:
      "Many ISO 20022 messages and acquirer APIs use the three-digit numeric instead of the alpha code. Round-trip both directions in one import.",
    code: `import { getCurrency, getCurrencyByNumeric } from "currency-core";

// Outbound: alpha → numeric
const usd = getCurrency("USD");
payload.currencyCode = String(usd.numericCode); // "840"

// Inbound: numeric → alpha
const incoming = getCurrencyByNumeric(978);
console.log(incoming?.code); // "EUR"`,
  },
  {
    title: "Multi-currency cart total",
    tag: "cart",
    description:
      "Format every line item in its own currency for an international cart. No need to pre-build a per-currency formatter map.",
    code: `import { format } from "currency-core";

const lines = [
  { sku: "A", amount: 19.99, code: "USD" },
  { sku: "B", amount: 8500,   code: "JPY" },
  { sku: "C", amount: 12.50,  code: "EUR" },
];

lines.forEach(line => {
  console.log(line.sku, "→", format(line.amount, line.code, { locale: "en-US" }));
});`,
  },
  {
    title: "Crypto wallet labels",
    tag: "crypto",
    description:
      "isCryptocurrency lets you branch on type without hard-coding ticker lists. Decimals capped at 8 cover BTC / ETH / most ERC-20 tokens.",
    code: `import { isCryptocurrency, getDecimals, fromMinor } from "currency-core";

function formatHolding(amount, code) {
  if (isCryptocurrency(code)) {
    // crypto amount usually arrives in smallest unit (sat, wei, etc.)
    const major = fromMinor(amount, code);
    return \`\${major.toFixed(getDecimals(code))} \${code}\`;
  }
  return \`\${amount.toFixed(2)} \${code}\`;
}`,
  },
  {
    title: "Historical-currency tooltip",
    tag: "history",
    description:
      "Surface the successor currency and conversion date for legacy data — receipts from 2001, accounting entries from before the eurozone, etc.",
    code: `import { getCurrency, isHistorical } from "currency-core";

function legacyNote(code) {
  if (!isHistorical(code)) return null;
  const r = getCurrency(code);
  return \`\${r.name} was withdrawn on \${r.withdrawnDate} \` +
         \`and replaced by \${r.successor}.\`;
}

// legacyNote("HRK") → "Croatian Kuna was withdrawn on 2023-01-01 and replaced by EUR."`,
  },
  {
    title: "Country-aware currency picker",
    tag: "form",
    description:
      "Pre-select a sensible default in your currency dropdown based on the user's country. No external geolocation required.",
    code: `import { getCurrencyByCountry } from "currency-core";

function defaultCurrency(countryCode) {
  return getCurrencyByCountry(countryCode)?.code ?? "USD";
}

// <select defaultValue={defaultCurrency(user.country)}>
//   ...
// </select>`,
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Use cases</span>
        <h2>Where this package earns its keep.</h2>
        <p className={styles.lede}>
          Six small drop-ins for the most common currency-data needs in a real
          codebase. Pick the one closest to what you're building and adapt.
        </p>
      </header>

      <div className={styles.grid}>
        {USE_CASES.map((uc) => (
          <article key={uc.title} className={styles.card}>
            <div className={styles.cardHead}>
              <h3>{uc.title}</h3>
              <span className={styles.tag}>{uc.tag}</span>
            </div>
            <p className={styles.cardBody}>{uc.description}</p>
            <pre className={styles.code}>
              <code>{uc.code}</code>
            </pre>
          </article>
        ))}
      </div>
    </section>
  );
}
