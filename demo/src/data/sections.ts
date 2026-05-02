export type Section = { id: string; label: string };

export const SECTIONS: readonly Section[] = [
  { id: "lookup", label: "Lookup" },
  { id: "format", label: "Format" },
  { id: "country", label: "Country" },
  { id: "browser", label: "Browser" },
  { id: "symbol", label: "Symbols" },
] as const;

export const SECTION_IDS: readonly string[] = SECTIONS.map((s) => s.id);
