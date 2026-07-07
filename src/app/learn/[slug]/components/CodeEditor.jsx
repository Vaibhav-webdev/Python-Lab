"use client";

// Install: npm i @uiw/react-codemirror @codemirror/lang-python @codemirror/view @codemirror/state @uiw/codemirror-theme-vscode

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { EditorView } from "@codemirror/view";
import { indentUnit } from "@codemirror/language";
import { vscodeDarkInit } from "@uiw/codemirror-theme-vscode";

// ══════════════════════════════════════════════════════════════════
// SYNTAX HIGHLIGHT + THEME — ready-made vscodeDark theme, recolored to
// match the old Monaco palette. No manual HighlightStyle/tags needed,
// which avoids the duplicate @lezer/highlight package crash.
// ══════════════════════════════════════════════════════════════════
const vscodeDarkTheme = vscodeDarkInit({
  settings: {
    background: "#0d0d0d",
    foreground: "#e2e8f0",
    caret: "#a78bfa",
    selection: "#7c3aed40",
    selectionMatch: "#7c3aed30",
    lineHighlight: "#1a1a1a",
    gutterBackground: "#0d0d0d",
    gutterForeground: "#334155",
    gutterActiveForeground: "#7c3aed",
    fontFamily: "'JetBrains Mono', monospace",
  },
});

// ══════════════════════════════════════════════════════════════════
// Extra tweaks that createTheme's `settings` doesn't cover
// (font size, line height, scrollbars, matching brackets)
// ══════════════════════════════════════════════════════════════════
const extraTheme = EditorView.theme(
  {
    "&": { fontSize: "16px", height: "100%" },
    ".cm-content": { lineHeight: "25px", padding: "16px 0" },
    ".cm-matchingBracket, .cm-nonmatchingBracket": {
      backgroundColor: "#7c3aed30",
      outline: "1px solid #7c3aed60",
    },
    ".cm-scroller": { overflow: "auto" },
    ".cm-scroller::-webkit-scrollbar": { width: "6px", height: "6px" },
    ".cm-scroller::-webkit-scrollbar-thumb": { backgroundColor: "#334155", borderRadius: "3px" },
    "&.cm-editor.cm-focused": { outline: "none" },
  },
  { dark: true }
);

export default function CodeEditor({ value, onChange }) {
  return (
    <CodeMirror
      value={value}
      height="100%"
      theme={vscodeDarkTheme}
      extensions={[python(), extraTheme, indentUnit.of("    "), EditorView.lineWrapping]}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: true,
        highlightActiveLineGutter: true,
        autocompletion: true,
        bracketMatching: true,
        closeBrackets: true,
        indentOnInput: true,
      }}
      onChange={(val) => onChange(val ?? "")}
      style={{ height: "100%" }}
    />
  );
}