import { useCallback, useState } from "react";
import styles from "./InstallMatrix.module.scss";

type PackageManager = "npm" | "yarn" | "pnpm" | "bun" | "deno";

const COMMANDS: Record<PackageManager, string> = {
  npm: "npm install currency-core",
  yarn: "yarn add currency-core",
  pnpm: "pnpm add currency-core",
  bun: "bun add currency-core",
  deno: 'import { getCurrency } from "npm:currency-core";',
};

const TABS: PackageManager[] = ["npm", "yarn", "pnpm", "bun", "deno"];

export function InstallMatrix() {
  const [active, setActive] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(COMMANDS[active]).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
      },
      () => {
        // Clipboard refused (insecure context, permissions). Silent — the
        // command is right there on screen for the user to copy manually.
      },
    );
  }, [active]);

  return (
    <section id="install" className={styles.section} aria-labelledby="install-heading">
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id="install-heading">Install</h2>
          <div className={styles.tabs} role="tablist" aria-label="Package manager">
            {TABS.map((pm) => (
              <button
                key={pm}
                type="button"
                role="tab"
                aria-selected={active === pm}
                className={`${styles.tab} ${active === pm ? styles.tabActive : ""}`}
                onClick={() => setActive(pm)}
              >
                {pm}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.cmdRow}>
          <pre className={styles.cmd}>
            <code>{COMMANDS[active]}</code>
          </pre>
          <button
            type="button"
            className={styles.copy}
            onClick={onCopy}
            aria-label={`Copy ${active} install command`}
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className={styles.note}>
          Zero runtime dependencies. ESM and CommonJS bundles. Works in Node 18+,
          modern browsers, Deno, Bun, Cloudflare Workers, and React Native.
        </p>
      </div>
    </section>
  );
}
