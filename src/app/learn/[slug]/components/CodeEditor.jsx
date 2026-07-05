"use client"; //[cite: 1]

import dynamic from "next/dynamic"; //[cite: 1]

// Monaco must never run on the server[cite: 1]
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false, //[cite: 1]
  loading: () => (
    // bg-[#0d0d1f] ko change karke bg-black kiya hai
    <div className="flex items-center justify-center h-full bg-black">
      <div className="flex flex-col items-center gap-3">
        <div className="w-5 h-5 border-2 border-yellow-500/40 border-t-yellow-500 rounded-full animate-spin" />
        <span className="text-slate-500 text-xs">Loading editor…</span>
      </div>
    </div>
  ),
});

const MONACO_THEME = {
  base: "vs-dark", //[cite: 1]
  inherit: true, //[cite: 1]
  rules: [
    { token: "keyword", foreground: "a78bfa", fontStyle: "bold" }, //[cite: 1]
    { token: "string", foreground: "86efac" }, //[cite: 1]
    { token: "string.js", foreground: "86efac" }, //[cite: 1]
    { token: "number", foreground: "fbbf24" }, //[cite: 1]
    { token: "comment", foreground: "475569", fontStyle: "italic" }, //[cite: 1]
    { token: "type", foreground: "93c5fd" }, //[cite: 1]
    { token: "identifier", foreground: "e2e8f0" }, //[cite: 1]
    { token: "delimiter", foreground: "64748b" }, //[cite: 1]
    { token: "tag", foreground: "f472b6" }, //[cite: 1]
    { token: "attribute.name", foreground: "93c5fd" }, //[cite: 1]
    { token: "attribute.value", foreground: "86efac" }, //[cite: 1]
  ],
  colors: {
    "editor.background": "#0d0d0d",
    "editor.foreground": "#e2e8f0", //[cite: 1]
    "editor.lineHighlightBackground": "#1a1a1a", // Very subtle off-black highlight
    "editor.selectionBackground": "#7c3aed40", //[cite: 1]
    "editor.inactiveSelectionBackground": "#7c3aed20", //[cite: 1]
    "editorCursor.foreground": "#a78bfa", //[cite: 1]
    "editorLineNumber.foreground": "#334155", //[cite: 1]
    "editorLineNumber.activeForeground": "#7c3aed", //[cite: 1]
    "editorIndentGuide.background": "#121212",
    "editorIndentGuide.activeBackground": "#7c3aed40", //[cite: 1]
    "editorWidget.background": "#0a0a0a",
    "editorSuggestWidget.background": "#0a0a0a",
    "editorSuggestWidget.border": "#2d2d6a", //[cite: 1]
    "editorSuggestWidget.selectedBackground": "#7c3aed30", //[cite: 1]
    "scrollbarSlider.background": "#334155", //[cite: 1]
    "scrollbarSlider.hoverBackground": "#475569", //[cite: 1]
    "minimap.background": "#000000", // Pure black minimap
  },
};

const EDITOR_OPTIONS = {
  fontSize: 16, // 13 se badha kar 16 kar diya
  fontFamily: "'JetBrains Mono'", //[cite: 1]
  fontLigatures: true, //[cite: 1]
  lineHeight: 25, // 16px font ke mutabiq perfect gap
  minimap: { enabled: false }, //[cite: 1]
  scrollBeyondLastLine: false, //[cite: 1]
  wordWrap: "on", //[cite: 1]
  lineNumbers: "on", //[cite: 1]
  folding: false, //[cite: 1]
  renderLineHighlight: "line", //[cite: 1]
  matchBrackets: "always", //[cite: 1]
  autoClosingBrackets: "always", //[cite: 1]
  autoClosingQuotes: "always", //[cite: 1]
  tabSize: 2, //[cite: 1]
  insertSpaces: true, //[cite: 1]
  padding: { top: 16, bottom: 16 }, //[cite: 1]
  scrollbar: {
    verticalScrollbarSize: 6, //[cite: 1]
    horizontalScrollbarSize: 6, //[cite: 1]
  },
  overviewRulerLanes: 0, //[cite: 1]
  hideCursorInOverviewRuler: true, //[cite: 1]
  overviewRulerBorder: false, //[cite: 1]
  contextmenu: false, //[cite: 1]
};

export default function CodeEditor({ value, onChange }) { //[cite: 1]
  const handleMount = (_editor, monaco) => { //[cite: 1]
    monaco.editor.defineTheme("interview-dark", MONACO_THEME); //[cite: 1]
    monaco.editor.setTheme("interview-dark"); //[cite: 1]
  };

  return (
    <MonacoEditor
      height="100%" //[cite: 1]
      language="javascript" //[cite: 1]
      theme="interview-dark" //[cite: 1]
      value={value} //[cite: 1]
      onChange={(val) => onChange(val ?? "")} //[cite: 1]
      onMount={handleMount} //[cite: 1]
      options={EDITOR_OPTIONS} //[cite: 1]
    />
  );
}