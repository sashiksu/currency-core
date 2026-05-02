export type Section = { id: string; label: string };

export const SECTIONS: readonly Section[] = [
  { id: "lookup", label: "Lookup" },
  { id: "install", label: "Install" },
  { id: "format", label: "Format" },
  { id: "country", label: "Country" },
  { id: "use-cases", label: "Use cases" },
  { id: "playground", label: "Playground" },
  { id: "examples", label: "Snippets" },
  { id: "browser", label: "Browser" },
  { id: "symbol", label: "Symbols" },
  { id: "faq", label: "FAQ" },
] as const;

export const SECTION_IDS: readonly string[] = SECTIONS.map((s) => s.id);
