import { ExamplePlayground } from "./ExamplePlayground";
import styles from "./LiveEditor.module.scss";

type Example = {
  id: string;
  title: string;
  description: string;
  code: string;
};

const EXAMPLES: Example[] = [
  {
    id: "lookup",
    title: "Core lookup helpers",
    description:
      "getCurrency returns the full record. The shortcuts (getSymbol / getName / getDecimals) skip the object hop when you only need one field.",
    code: `// Full record
const usd = getCurrency("USD");
console.log("name:", usd.name);
console.log("symbol:", usd.symbol);
console.log("decimals:", usd.decimals);
console.log("countries:", usd.countries.length, "country codes");

// Field shortcuts — same result, less ceremony
console.log("");
console.log(getSymbol("EUR"), getName("EUR"));
console.log("JPY decimals:", getDecimals("JPY"));
`,
  },
  {
    id: "safe",
    title: "Safe variants for unknown input",
    description:
      "safeGetCurrency / safeGetSymbol return undefined instead of throwing. Use them when the code came from a form, query string, or external API.",
    code: `// Throws on unknown code
try {
  getCurrency("ZZZ");
} catch (err) {
  console.log("getCurrency threw:", err.message);
}

// Safe variant — no throw, just undefined
const maybe = safeGetCurrency("ZZZ");
console.log("safeGetCurrency:", maybe);

const sym = safeGetSymbol("BTC");
console.log("safeGetSymbol(BTC):", sym);
`,
  },
  {
    id: "numeric",
    title: "ISO 4217 numeric code lookup",
    description:
      "getCurrencyByNumeric resolves the three-digit ISO 4217 numeric (840 → USD, 392 → JPY) — useful when receiving payment-gateway payloads or reading bank files.",
    code: `// Common payment-gateway numeric codes
console.log("840 →", getCurrencyByNumeric(840)?.code, getCurrencyByNumeric(840)?.name);
console.log("978 →", getCurrencyByNumeric(978)?.code, getCurrencyByNumeric(978)?.name);
console.log("392 →", getCurrencyByNumeric(392)?.code);
console.log("826 →", getCurrencyByNumeric(826)?.code);

// Unrecognized → undefined
console.log("0   →", getCurrencyByNumeric(0));
`,
  },
  {
    id: "country-locale",
    title: "Country and locale resolution",
    description:
      "getCurrencyByCountry takes ISO 3166-1 alpha-2. getCurrencyByLocale takes a BCP 47 locale tag and reads the region subtag.",
    code: `// Country → primary currency
console.log("US →", getCurrencyByCountry("US")?.code);
console.log("GB →", getCurrencyByCountry("GB")?.code);
console.log("CH →", getCurrencyByCountry("CH")?.code);

// Locale tag → primary currency for the region
console.log("");
console.log("fr-CA →", getCurrencyByLocale("fr-CA")?.code);
console.log("en-AU →", getCurrencyByLocale("en-AU")?.code);
console.log("zh-Hant-TW →", getCurrencyByLocale("zh-Hant-TW")?.code);
`,
  },
  {
    id: "symbols",
    title: "Symbol disambiguation",
    description:
      "$ belongs to USD, CAD, AUD, MXN, ARS, NZD, and more. getCurrenciesBySymbol returns every currency that ships with a given symbol.",
    code: `const dollars = getCurrenciesBySymbol("$");
console.log("Currencies that use $:", dollars.length);
dollars.slice(0, 8).forEach(c => {
  console.log(" ", c.code, "—", c.name);
});

// Less ambiguous symbols
console.log("");
console.log("¥ →", getCurrenciesBySymbol("¥").map(c => c.code));
console.log("£ →", getCurrenciesBySymbol("£").map(c => c.code));
`,
  },
  {
    id: "predicates",
    title: "Type predicates",
    description:
      "isValidCode is a TypeScript type-narrowing predicate. isCryptocurrency and isHistorical are runtime checks for branching logic.",
    code: `console.log("isValidCode(USD)  →", isValidCode("USD"));
console.log("isValidCode(usd)  →", isValidCode("usd")); // normalized
console.log("isValidCode(ZZZ)  →", isValidCode("ZZZ"));

console.log("");
console.log("isCryptocurrency(BTC)  →", isCryptocurrency("BTC"));
console.log("isCryptocurrency(USD)  →", isCryptocurrency("USD"));

console.log("");
console.log("isHistorical(HRK)  →", isHistorical("HRK"));
console.log("isHistorical(EUR)  →", isHistorical("EUR"));
`,
  },
  {
    id: "listings",
    title: "Curated listings",
    description:
      "listCrypto and listHistorical return stable readonly arrays built once at module load. Use them to populate dropdowns or surface withdrawn-currency notices.",
    code: `const crypto = listCrypto();
console.log("Cryptocurrencies bundled:", crypto.length);
console.log("First five:", crypto.slice(0, 5).map(c => c.code).join(", "));

const historical = listHistorical();
console.log("");
console.log("Historical currencies:", historical.length);

// Eurozone predecessors
const eurozone = historical.filter(c => c.successor === "EUR");
console.log("Replaced by EUR:", eurozone.map(c => c.code).join(", "));
`,
  },
  {
    id: "format",
    title: "Locale-aware formatting",
    description:
      "format wraps Intl.NumberFormat. variant flips between symbol / narrowSymbol / name. signDisplay controls when the sign appears.",
    code: `const amount = 1234567.89;

console.log("en-US default:", format(amount, "USD", { locale: "en-US" }));
console.log("fr-FR default:", format(amount, "EUR", { locale: "fr-FR" }));
console.log("ja-JP default:", format(amount, "JPY", { locale: "ja-JP" }));

console.log("");
console.log("narrow:", format(amount, "EUR", { locale: "en-US", variant: "narrow" }));
console.log("wide:  ", format(amount, "EUR", { locale: "en-US", variant: "wide" }));

console.log("");
console.log("signDisplay always:", format(42, "USD", { locale: "en-US", signDisplay: "always" }));
console.log("signDisplay never: ", format(-42, "USD", { locale: "en-US", signDisplay: "never" }));
`,
  },
  {
    id: "parse",
    title: "Round-trip with parse",
    description:
      "parse inverts format. Locale-aware decimal separator detection means '1.234,56 €' parses correctly under fr-FR and de-DE.",
    code: `const formatted = format(1234.56, "EUR", { locale: "de-DE" });
console.log("formatted:", formatted);

const back = parse(formatted, "EUR", { locale: "de-DE" });
console.log("parsed:   ", back);

// Locale matters — wrong locale = null
const wrong = parse("1.234,56 €", "EUR", { locale: "en-US" });
console.log("wrong locale:", wrong);

// Malformed input
console.log("garbage in:", parse("not a number", "USD"));
`,
  },
  {
    id: "minor",
    title: "Major / minor unit conversion",
    description:
      "toMinor and fromMinor convert between major (dollars) and minor (cents). Decimal count is per-currency — JPY has 0, BHD has 3, BTC has 8.",
    code: `// USD: 2 decimals
console.log("$1.00 in cents  :", toMinor(1, "USD"));
console.log("$12.34 in cents :", toMinor(12.34, "USD"));

// JPY: 0 decimals — major and minor are the same
console.log("¥100 minor      :", toMinor(100, "JPY"));

// BHD: 3 decimals (fils)
console.log("1 BHD in fils   :", toMinor(1, "BHD"));

// BTC: 8 decimals (satoshi)
console.log("1 BTC in sat    :", toMinor(1, "BTC"));

// Reverse trip
console.log("");
console.log("100000000 sat in BTC:", fromMinor(100000000, "BTC"));
console.log("250 cents in USD    :", fromMinor(250, "USD"));
`,
  },
];

export function LiveEditor() {
  return (
    <section id="playground" className={styles.section}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Live playground</span>
        <h2>Run the API. Edit the snippets.</h2>
        <p className={styles.lede}>
          Every snippet below executes against the live library. Edit the code
          on the left, see the output update on the right. Hit Reset to undo.
        </p>
      </header>
      <div className={styles.stack}>
        {EXAMPLES.map((ex) => (
          <ExamplePlayground
            key={ex.id}
            title={ex.title}
            description={ex.description}
            initialCode={ex.code}
          />
        ))}
      </div>
    </section>
  );
}
