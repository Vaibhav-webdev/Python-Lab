'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const DEFAULT_CODE = `def hello(name="Admin"):
  print("Hello", name)

hello()`;

const DEFAULT_STDIN = ``;

const monochromeHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#ffffff', fontWeight: 'bold' },
  { tag: tags.controlKeyword, color: '#ffffff', fontWeight: 'bold' },
  { tag: tags.string, color: '#8a8a8a' },
  { tag: tags.special(tags.string), color: '#707070' },
  { tag: tags.number, color: '#b0b0b0' },
  { tag: tags.comment, color: '#333333', fontStyle: 'italic' },
  { tag: tags.variableName, color: '#bfbfbf' },
  { tag: tags.function(tags.variableName), color: '#e0e0e0' },
  { tag: tags.definition(tags.variableName), color: '#e0e0e0' },
  { tag: tags.typeName, color: '#999999' },
  { tag: tags.operator, color: '#777777' },
  { tag: tags.punctuation, color: '#505050' },
  { tag: tags.bool, color: '#ffffff' },
  { tag: tags.null, color: '#666666' },
  { tag: tags.propertyName, color: '#aaaaaa' },
  { tag: tags.className, color: '#aaaaaa' },
  { tag: tags.labelName, color: '#cccccc' },
]);

const editorTheme = EditorView.theme(
  {
    '&': {
      backgroundColor: '#000000',
      height: '100%',
      fontSize: '14px',
    },
    '.cm-content': {
      fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
      caretColor: '#ffffff',
      padding: '16px 0',
      color: '#bfbfbf',
    },
    '.cm-gutters': {
      backgroundColor: '#000000',
      color: '#1e1e1e',
      border: 'none',
    },
    '.cm-activeLine': { backgroundColor: '#060606' },
    '.cm-activeLineGutter': { backgroundColor: '#060606', color: '#3a3a3a' },
    '.cm-line': { padding: '0 8px' },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#ffffff',
      borderLeftWidth: '2px',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': {
      backgroundColor: '#1a1a1a !important',
    },
    '.cm-matchingBracket': {
      backgroundColor: '#222222',
      color: '#ffffff',
      outline: '1px solid #3a3a3a',
    },
    '.cm-nonmatchingBracket': { color: '#555555' },
    '.cm-foldPlaceholder': {
      backgroundColor: '#0a0a0a',
      color: '#3a3a3a',
      border: '1px solid #1a1a1a',
    },
    '.cm-tooltip': {
      backgroundColor: '#0d0d0d',
      border: '1px solid #1e1e1e',
      color: '#bfbfbf',
      borderRadius: '8px',
      boxShadow: '0 12px 48px rgba(0,0,0,0.95)',
    },
    '.cm-tooltip-autocomplete > ul > li': { padding: '6px 12px' },
    '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
      backgroundColor: '#1a1a1a',
      color: '#ffffff',
    },
    '.cm-panels': {
      backgroundColor: '#080808',
      borderColor: '#1a1a1a',
    },
    '.cm-panels input, .cm-panels button, .cm-panels label': {
      backgroundColor: '#0f0f0f',
      color: '#bfbfbf',
      border: '1px solid #1e1e1e',
      borderRadius: '4px',
    },
    '.cm-searchMatch': {
      backgroundColor: '#1e1e1e',
      outline: '1px solid #3a3a3a',
    },
    '.cm-searchMatch-selected': { backgroundColor: '#2a2a2a' },
  },
  { dark: true }
);

let pyodideInstance = null;
let pyodideLoadingPromise = null;

function loadPyodideScript() {
  if (pyodideLoadingPromise) return pyodideLoadingPromise;
  pyodideLoadingPromise = new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      resolve(window.loadPyodide);
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js';
    s.onload = () => resolve(window.loadPyodide);
    s.onerror = () => reject(new Error('Pyodide load nahi hua'));
    document.body.appendChild(s);
  });
  return pyodideLoadingPromise;
}

async function getPyodide(onProgress) {
  if (pyodideInstance) return pyodideInstance;
  onProgress?.('downloading');
  const loadPyodide = await loadPyodideScript();
  onProgress?.('initializing');
  pyodideInstance = await loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/',
  });
  onProgress?.('ready');
  return pyodideInstance;
}

export default function CompilerPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [stdin, setStdin] = useState(DEFAULT_STDIN);
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('');
  
  // Desktop layout toggle
  const [showStdin, setShowStdin] = useState(true);
  
  // Mobile Tab Navigation State ('code', 'input', 'output')
  const [activeTab, setActiveTab] = useState('code');
  
  const [hasRun, setHasRun] = useState(false);
  const [execTime, setExecTime] = useState(null);

  const outputEndRef = useRef(null);
  const runCodeRef = useRef(null);

  const stdoutRef = useRef('');
  const stderrRef = useRef('');

  const rafRef = useRef(null);
  const scheduleFlush = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setStdout(stdoutRef.current);
      setStderr(stderrRef.current);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [stdout, stderr]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!isRunning && runCodeRef.current) runCodeRef.current();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isRunning]);

  const runCode = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setHasRun(true);
    setExecTime(null);
    setLoadingPhase('');

    // Mobile me run dabate hi output tab pe bhej do
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setActiveTab('output');
    }

    stdoutRef.current = '';
    stderrRef.current = '';
    setStdout('');
    setStderr('');

    const t0 = performance.now();

    try {
      const pyodide = await getPyodide((phase) => {
        if (phase === 'ready') setLoadingPhase('');
        else setLoadingPhase(phase);
      });
      setLoadingPhase('');

      const lines = stdin.trim() === '' ? [] : stdin.split('\n');
      let idx = 0;

      pyodide.globals.set('__pyx_out__', (t) => {
        stdoutRef.current += String(t);
        scheduleFlush();
      });
      pyodide.globals.set('__pyx_err__', (t) => {
        stderrRef.current += String(t);
        scheduleFlush();
      });
      pyodide.globals.set('__pyx_in__', () => {
        if (idx < lines.length) return lines[idx++];
        throw new Error(
          'EOFError: input() ko value nahi mili.\nStdin panel mein ek line per value daalo.'
        );
      });

      await pyodide.runPythonAsync(`
import builtins, sys

class _Out:
    def __init__(self, fn):
        self._fn = fn
    def write(self, s):
        if s:
            self._fn(s)
        return len(s) if s else 0
    def flush(self):
        pass
    def isatty(self):
        return False

class _In:
    def readline(self, size=-1):
        return __pyx_in__() + '\\n'
    def read(self, size=-1):
        return __pyx_in__() + '\\n'
    def readlines(self):
        r = []
        try:
            while True:
                r.append(__pyx_in__() + '\\n')
        except:
            pass
        return r
    def __iter__(self):
        return self
    def __next__(self):
        try:
            return __pyx_in__() + '\\n'
        except:
            raise StopIteration
    def isatty(self):
        return False

sys.stdout = _Out(__pyx_out__)
sys.stderr = _Out(__pyx_err__)
sys.stdin  = _In()

def _input(prompt=""):
    if prompt:
        sys.stdout.write(str(prompt))
    return __pyx_in__()

builtins.input = _input
`);

      await pyodide.runPythonAsync(code);
      setExecTime(((performance.now() - t0) / 1000).toFixed(2));
    } catch (err) {
      const msg = err?.message || String(err);
      stderrRef.current += (stderrRef.current ? '\n' : '') + msg;
      setExecTime(((performance.now() - t0) / 1000).toFixed(2));
    } finally {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      setStdout(stdoutRef.current);
      setStderr(stderrRef.current);
      setIsRunning(false);
    }
  }, [isRunning, stdin, scheduleFlush, code]);

  runCodeRef.current = runCode;

  const handleClear = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    stdoutRef.current = '';
    stderrRef.current = '';
    setStdout('');
    setStderr('');
    setExecTime(null);
  };

  const handleReset = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    stdoutRef.current = '';
    stderrRef.current = '';
    setCode(DEFAULT_CODE);
    setStdout('');
    setStderr('');
    setStdin(DEFAULT_STDIN);
    setHasRun(false);
    setExecTime(null);
    setLoadingPhase('');
  };

  const lineCount = code.split('\n').length;

  const editorExtensions = useMemo(
    () => [python(), syntaxHighlighting(monochromeHighlight)],
    []
  );
  const editorBasicSetup = useMemo(
    () => ({
      lineNumbers: true,
      foldGutter: true,
      highlightActiveLine: true,
      autocompletion: true,
      bracketMatching: true,
      closeBrackets: true,
      indentOnInput: true,
    }),
    []
  );

  // Common Stdin Component taaki logic repeat na ho
  const renderStdinContent = (isMobile = false) => (
    <div className={`flex flex-col ${isMobile ? 'h-full' : ''} border-t border-white/[0.05]`}>
      <div className="flex items-center h-7 px-3 bg-[#040404] border-b border-white/[0.03] shrink-0">
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/45 font-medium">
          Standard Input
        </span>
        <span className="ml-2 text-[9px] text-white/[0.3]">
          — For input(), One value per line
        </span>
      </div>
      <textarea
        value={stdin}
        onChange={(e) => setStdin(e.target.value)}
        placeholder={`Put the value of input()\nOne value for one line`}
        rows={isMobile ? undefined : 6}
        className={`w-full bg-[#020202] text-white/45 px-4 py-2.5 text-[12px] font-mono resize-none outline-none placeholder:text-white/[0.2] leading-[1.8] ${isMobile ? 'flex-1' : ''}`}
      />
    </div>
  );

  return (
    <div className="flex flex-col h-screen h-[100dvh] bg-black text-white overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes shimmer {
              0%   { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
            @keyframes pulse-dot {
              0%, 100% { opacity: 0.25; }
              50%      { opacity: 1; }
            }
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(4px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `,
        }}
      />

      {/* HEADER */}
      <header className="flex items-center justify-between h-12 md:h-11 px-3 md:px-4 bg-[#080808] border-b border-white/[0.05] shrink-0 select-none">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-2">
            <div className="relative w-2.5 h-2.5">
              <div className="absolute inset-0 rounded-full bg-white/40 blur-[3px]" />
              <div className="relative w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <span className="text-[12px] md:text-[13px] font-bold tracking-[0.18em] uppercase text-white/90">
              PyXode
            </span>
          </div>
          <div className="hidden sm:block w-px h-3.5 bg-white/[0.07]" />
          <span className="hidden sm:block text-[11px] text-white/30 font-light tracking-wide">
            Python Compiler
          </span>
        </div>

        <div className="flex items-center gap-1.5 md:gap-1.5">
          <button
            onClick={() => setShowStdin((v) => !v)}
            className={`hidden md:block px-3 py-1 rounded-[5px] cursor-pointer text-[11px] font-medium tracking-wide transition-all duration-200 border ${
              showStdin
                ? 'border-white/20 text-white bg-white/[0.07]'
                : 'border-white/[0.05] text-white/25 hover:text-white/50 hover:border-white/[0.12]'
            }`}
          >
            stdin
          </button>

          <button
            onClick={handleClear}
            className="px-2 md:px-3 py-1 cursor-pointer rounded-[5px] text-[11px] font-medium border border-white/[0.05] text-white/25 hover:text-white/50 hover:border-white/[0.12] transition-all duration-200"
          >
            Clear
          </button>

          <button
            onClick={handleReset}
            className="px-2 md:px-3 py-1 cursor-pointer rounded-[5px] text-[11px] font-medium border border-white/[0.05] text-white/25 hover:text-white/50 hover:border-white/[0.12] transition-all duration-200"
          >
            Reset
          </button>

          <div className="w-px h-4 bg-white/[0.07] mx-0.5 md:mx-1" />

          <button
            onClick={runCode}
            disabled={isRunning}
            className={`relative px-4 md:px-5 py-1.5 md:py-1 rounded-[5px] text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-300 overflow-hidden ${
              isRunning
                ? 'bg-white/[0.06] text-white/25 cursor-wait'
                : 'bg-white text-black cursor-pointer hover:bg-white/90 active:scale-[0.96]'
            }`}
          >
            {isRunning && (
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ animation: 'shimmer 1.5s infinite' }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {isRunning ? (
                <>
                  <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
                  </svg>
                  Run
                </>
              ) : (
                <>
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Run
                </>
              )}
            </span>
          </button>
        </div>
      </header>

      {/* LOADING BAR */}
      {loadingPhase && (
        <div
          className="flex items-center gap-2.5 px-4 h-8 bg-[#040404] border-b border-white/[0.05] shrink-0"
          style={{ animation: 'fade-in 0.2s ease-out' }}
        >
          <div
            className="w-3 h-3 border-[1.5px] border-white/25 border-t-white/70 rounded-full"
            style={{ animation: 'spin-slow 0.7s linear infinite' }}
          />
          <span className="text-[10px] md:text-[11px] text-white/35">
            {loadingPhase === 'downloading'
              ? 'Python runtime download ho raha hai (~10MB, sirf pehli baar)...'
              : 'Python interpreter initialize ho raha hai...'}
          </span>
        </div>
      )}

      {/* WORKSPACE - MD:FLEX-ROW (Desktop), FLEX-COL (Mobile Tab Control) */}
      <main className="flex flex-col md:flex-row flex-1 min-h-0">
        
        {/* LEFT PANEL (Editor & Stdin) */}
        <section className={`${(activeTab === 'code' || activeTab === 'input') ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/2 min-h-0 md:border-r border-white/[0.05]`}>
          
          {/* EDITOR (Desktop pe hamesha, Mobile pe jab tab 'code' ho) */}
          <div className={`${activeTab === 'code' ? 'flex' : 'hidden'} md:flex flex-col flex-1 min-h-0`}>
            <div className="flex items-center h-9 bg-[#040404] border-b border-white/[0.05] shrink-0 px-2">
              <div className="flex items-center gap-1.5 px-3 h-full bg-black border border-white/[0.05] border-b-black text-[11px] text-white/45 -mb-px rounded-t-[3px]">
                <svg className="w-3 h-3 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                main.py
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
              <CodeMirror
                value={code}
                height="100%"
                theme={editorTheme}
                extensions={editorExtensions}
                onChange={(v) => setCode(v)}
                basicSetup={editorBasicSetup}
              />
            </div>
          </div>

          {/* STDIN (Desktop Toggle) */}
          <div
            className="hidden md:block shrink-0 overflow-hidden transition-[max-height] duration-300 ease-in-out"
            style={{ maxHeight: showStdin ? '220px' : '0px' }}
          >
            {renderStdinContent(false)}
          </div>

          {/* STDIN (Mobile Dedicated Tab) */}
          <div className={`${activeTab === 'input' ? 'flex flex-col flex-1' : 'hidden'} md:hidden`}>
            {renderStdinContent(true)}
          </div>
        </section>

        {/* RIGHT PANEL (Output) */}
        <section className={`${activeTab === 'output' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/2 bg-[#010101]`}>
          <div className="flex items-center justify-between h-9 bg-[#040404] border-b border-white/[0.05] shrink-0 px-2">
            <div className="flex items-center gap-1.5 px-3 h-full bg-[#010101] border border-white/[0.05] border-b-[#010101] text-[11px] text-white/40 -mb-px rounded-t-[3px]">
              <svg className="w-3 h-3 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Output
            </div>
            <div className="flex items-center gap-3 text-[10px] mr-2">
              {isRunning && (
                <span className="flex items-center gap-1.5 text-white/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" style={{ animation: 'pulse-dot 1s ease-in-out infinite' }} />
                  executing
                </span>
              )}
              {!isRunning && hasRun && execTime && (
                <span className="text-white/[0.12]">{execTime}s</span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {!stdout && !stderr && !isRunning && !hasRun && (
              <div className="flex flex-col items-center justify-center h-full select-none p-4 text-center">
                <div className="w-16 h-16 rounded-2xl border border-white/[0.2] flex items-center justify-center mb-5 bg-white/[0.01]">
                  <svg className="w-7 h-7 text-white/[0.4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-[12px] text-white/[0.3] mb-2">Output will show here!</p>
                <div className="hidden md:flex items-center justify-center gap-1.5 text-[10px] text-white/[0.4]">
                  <kbd className="px-1.5 py-0.5 bg-white/[0.03] rounded-[3px] text-[9px] border border-white/[0.05] font-mono">Ctrl</kbd>
                  <span>+</span>
                  <kbd className="px-1.5 py-0.5 bg-white/[0.03] rounded-[3px] text-[9px] border border-white/[0.05] font-mono">Enter</kbd>
                  <span className="ml-1">or Press Run Button</span>
                </div>
              </div>
            )}

            {isRunning && !stdout && !stderr && (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-5 h-5 border-[1.5px] border-white/15 border-t-white/50 rounded-full" style={{ animation: 'spin-slow 0.7s linear infinite' }} />
                  <span className="text-[11px] text-white/15">Code chal raha hai...</span>
                </div>
              </div>
            )}

            {stdout && (
              <pre className="p-4 m-0 text-[13px] font-mono leading-[1.85] text-white/55 whitespace-pre-wrap break-words" style={{ animation: 'fade-in 0.15s ease-out' }}>
                {stdout}
              </pre>
            )}

            {stderr && (
              <div className="border-t border-white/[0.04]" style={{ animation: 'fade-in 0.15s ease-out' }}>
                <div className="flex items-center h-7 px-4 bg-white/[0.015] border-b border-white/[0.03]">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/[0.12] font-medium">Error</span>
                </div>
                <pre className="p-4 m-0 text-[12px] font-mono leading-[1.7] text-white/25 whitespace-pre-wrap break-words">
                  {stderr}
                </pre>
              </div>
            )}

            <div ref={outputEndRef} />
          </div>
        </section>
      </main>

      {/* FOOTER - ONLY DESKTOP (Taaki Mobile pe space bache) */}
      <footer className="hidden md:flex items-center justify-between h-6 px-4 bg-[#080808] border-t border-white/[0.05] shrink-0 select-none">
        <div className="flex items-center gap-3 text-[10px] text-white/[0.3]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            Python 3.11
          </span>
          <span className="text-white/[0.05]">·</span>
          <span>{lineCount} lines</span>
          <span className="text-white/[0.05]">·</span>
          <span>{code.length} chars</span>
          {execTime && !isRunning && (
            <>
              <span className="text-white/[0.05]">·</span>
              <span>{execTime}s</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-white/[0.3]">
          <kbd className="px-1 py-px bg-white/[0.03] rounded-[2px] text-[9px] border border-white/[0.05] font-mono">Ctrl</kbd>
          <span className="text-white/[0.4]">+</span>
          <kbd className="px-1 py-px bg-white/[0.03] rounded-[2px] text-[9px] border border-white/[0.05] font-mono">Enter</kbd>
          <span className="ml-0.5 text-white/[0.4]">run</span>
        </div>
      </footer>

      {/* BOTTOM TAB NAVIGATION - ONLY MOBILE */}
      <nav 
        className="flex md:hidden items-center justify-around h-14 bg-[#060606] border-t border-white/[0.05] shrink-0" 
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <button 
          onClick={() => setActiveTab('code')} 
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors ${activeTab === 'code' ? 'text-white bg-white/[0.04]' : 'text-white/30 hover:text-white/50'}`}
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span className="text-[10px] font-medium">Code</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('input')} 
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors ${activeTab === 'input' ? 'text-white bg-white/[0.04]' : 'text-white/30 hover:text-white/50'}`}
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span className="text-[10px] font-medium">Input</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('output')} 
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors relative ${activeTab === 'output' ? 'text-white bg-white/[0.04]' : 'text-white/30 hover:text-white/50'}`}
        >
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] font-medium">Output</span>
          
          {/* Notification dot - agar program run hua hai par user code me hai */}
          {hasRun && activeTab !== 'output' && !isRunning && (
            <span className="absolute top-2.5 right-[30%] w-1.5 h-1.5 rounded-full bg-white/70" />
          )}
        </button>
      </nav>

    </div>
  );
}