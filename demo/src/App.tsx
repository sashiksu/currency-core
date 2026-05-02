import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { Hero } from "./components/Hero";
import { InstallMatrix } from "./components/InstallMatrix";
import { FormatPlayground } from "./components/FormatPlayground";
import { CountryCurrencyExplorer } from "./components/CountryCurrencyExplorer";
import { UseCases } from "./components/UseCases";
import { LiveEditor } from "./components/LiveEditor";
import { CodeExamples } from "./components/CodeExamples";
import { CurrencyBrowser } from "./components/CurrencyBrowser";
import { SymbolDisambiguator } from "./components/SymbolDisambiguator";
import { Faq } from "./components/Faq";
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
          <InstallMatrix />
          <FormatPlayground />
          <CountryCurrencyExplorer />
          <UseCases />
          <LiveEditor />
          <CodeExamples />
          <CurrencyBrowser />
          <SymbolDisambiguator />
          <Faq />
        </main>
      </div>
      <Footer />
    </>
  );
}
