import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { FormatPlayground } from "./components/FormatPlayground";
import { CountryCurrencyExplorer } from "./components/CountryCurrencyExplorer";
import { CurrencyBrowser } from "./components/CurrencyBrowser";
import { SymbolDisambiguator } from "./components/SymbolDisambiguator";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Navbar />
      <div className="shell">
        <Sidebar />
        <main id="main">
          <Hero />
          <FormatPlayground />
          <CountryCurrencyExplorer />
          <CurrencyBrowser />
          <SymbolDisambiguator />
        </main>
      </div>
      <Footer />
    </>
  );
}
