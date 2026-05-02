import { ThemeToggle } from "./ThemeToggle";
import styles from "./Navbar.module.scss";

const VERSION = "1.0.0-rc.0";

export function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Primary">
      <div className={`container ${styles.inner}`}>
        <a
          href="#top"
          className={styles.brand}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            history.replaceState(null, "", " ");
          }}
        >
          <span className={styles.dot} aria-hidden="true" />
          currency-core
          <span className={styles.version}>v{VERSION}</span>
        </a>

        <div className={styles.actions}>
          <a
            href="https://github.com/sashiksu/currency-core"
            target="_blank"
            rel="noreferrer"
            className={styles.iconLink}
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/currency-core"
            target="_blank"
            rel="noreferrer"
            className={styles.iconLink}
          >
            npm
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
