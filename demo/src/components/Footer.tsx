import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <span className={styles.brand}>currency-core</span>
          <span className={styles.muted}>MIT licensed · zero runtime dependencies</span>
        </div>
        <nav className={styles.links} aria-label="Footer links">
          <a href="https://github.com/sashiksu/currency-core" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.npmjs.com/package/currency-core" target="_blank" rel="noreferrer">
            npm
          </a>
          <a
            href="https://github.com/sashiksu/currency-core/blob/master/CHANGELOG.md"
            target="_blank"
            rel="noreferrer"
          >
            Changelog
          </a>
          <a
            href="https://github.com/sashiksu/currency-core/blob/master/ATTRIBUTIONS.md"
            target="_blank"
            rel="noreferrer"
          >
            Data sources
          </a>
        </nav>
      </div>
    </footer>
  );
}
