import { useEffect, useMemo, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { githubLight } from "@uiw/codemirror-theme-github";
import {
  format,
  fromMinor,
  getCurrenciesBySymbol,
  getCurrency,
  getCurrencyByCountry,
  getCurrencyByLocale,
  getCurrencyByNumeric,
  getDecimals,
  getName,
  getSymbol,
  isCryptocurrency,
  isHistorical,
  isValidCode,
  listCrypto,
  listHistorical,
  parse,
  safeGetCurrency,
  safeGetSymbol,
  toMinor,
} from "currency-core";
import { useTheme } from "../hooks/useTheme";
import styles from "./ExamplePlayground.module.scss";

type RunResult = { output: string; isError: boolean };

function formatArg(arg: unknown): string {
  if (typeof arg === "string") return arg;
  if (arg === undefined) return "undefined";
  if (typeof arg === "function") return `[function ${arg.name || "anonymous"}]`;
  try {
    return JSON.stringify(arg, null, 2);
  } catch {
    return String(arg);
  }
}

function runSnippet(code: string): RunResult {
  const logs: string[] = [];
  const fakeConsole = {
    log: (...args: unknown[]) => logs.push(args.map(formatArg).join(" ")),
    error: (...args: unknown[]) => logs.push(args.map(formatArg).join(" ")),
    warn: (...args: unknown[]) => logs.push(args.map(formatArg).join(" ")),
  };

  try {
    const fn = new Function(
      "getCurrency",
      "safeGetCurrency",
      "getSymbol",
      "safeGetSymbol",
      "getName",
      "getDecimals",
      "getCurrencyByNumeric",
      "getCurrencyByCountry",
      "getCurrencyByLocale",
      "getCurrenciesBySymbol",
      "isValidCode",
      "isCryptocurrency",
      "isHistorical",
      "listCrypto",
      "listHistorical",
      "format",
      "parse",
      "toMinor",
      "fromMinor",
      "console",
      `"use strict";\n${code}`,
    );
    fn(
      getCurrency,
      safeGetCurrency,
      getSymbol,
      safeGetSymbol,
      getName,
      getDecimals,
      getCurrencyByNumeric,
      getCurrencyByCountry,
      getCurrencyByLocale,
      getCurrenciesBySymbol,
      isValidCode,
      isCryptocurrency,
      isHistorical,
      listCrypto,
      listHistorical,
      format,
      parse,
      toMinor,
      fromMinor,
      fakeConsole,
    );
    return {
      output: logs.join("\n") || "// no output — use console.log(...) to print",
      isError: false,
    };
  } catch (err) {
    const message = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    return {
      output: [...logs, "", message].join("\n").trim(),
      isError: true,
    };
  }
}

type Props = {
  title: string;
  description?: string;
  initialCode: string;
};

export function ExamplePlayground({ title, description, initialCode }: Props) {
  const { resolved } = useTheme();
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<RunResult>(() => runSnippet(initialCode));
  const [pending, setPending] = useState(false);
  const firstRun = useRef(true);

  const extensions = useMemo(() => [javascript({ typescript: false })], []);
  const editorTheme = resolved === "dark" ? darcula : githubLight;

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setPending(true);
    const handle = window.setTimeout(() => {
      setResult(runSnippet(code));
      setPending(false);
    }, 250);
    return () => window.clearTimeout(handle);
  }, [code]);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div>
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.editorWrap}>
          <div className={styles.paneLabel}>index.js</div>
          <CodeMirror
            value={code}
            onChange={setCode}
            extensions={extensions}
            theme={editorTheme}
            height="220px"
            basicSetup={{
              lineNumbers: true,
              foldGutter: false,
              highlightActiveLine: true,
              highlightActiveLineGutter: true,
            }}
          />
        </div>

        <div className={styles.outputWrap}>
          <div className={styles.paneLabel}>
            <span>
              output
              {pending && (
                <span
                  className={styles.spinner}
                  role="status"
                  aria-label="Running"
                />
              )}
            </span>
            <div className={styles.outputActions}>
              {result.isError && !pending && (
                <span className={styles.errorBadge}>error</span>
              )}
              <button
                type="button"
                className={styles.reset}
                onClick={() => setCode(initialCode)}
                aria-label={`Reset ${title} snippet`}
              >
                Reset
              </button>
            </div>
          </div>
          <pre
            className={`${styles.output} ${result.isError ? styles.outputError : ""}`}
            aria-live="polite"
          >
            {result.output}
          </pre>
        </div>
      </div>
    </div>
  );
}
