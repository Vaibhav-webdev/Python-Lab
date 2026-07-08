'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const DEFAULT_CODE = `name = input("Enter Your Name: ")
age = input("Enter Your Age: ")
print("Welcome,", name + "!")
print("You are", age, "year old.")`;

/* ─────────────── CodeMirror Theming ─────────────── */
const monoHL = HighlightStyle.define([
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

const cmTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#000000', height: '100%', fontSize: '14px' },
    '.cm-content': {
      fontFamily: '"JetBrains Mono","Fira Code","Cascadia Code",monospace',
      caretColor: '#ffffff', padding: '16px 0', color: '#bfbfbf',
    },
    '.cm-gutters': { backgroundColor: '#000000', color: '#1e1e1e', border: 'none' },
    '.cm-activeLine': { backgroundColor: '#060606' },
    '.cm-activeLineGutter': { backgroundColor: '#060606', color: '#3a3a3a' },
    '.cm-line': { padding: '0 8px' },
    '&.cm-focused .cm-cursor': { borderLeftColor: '#ffffff', borderLeftWidth: '2px' },
    '&.cm-focused .cm-selectionBackground,.cm-selectionBackground,::selection': {
      backgroundColor: '#1a1a1a !important',
    },
    '.cm-matchingBracket': { backgroundColor: '#222222', color: '#ffffff', outline: '1px solid #3a3a3a' },
    '.cm-nonmatchingBracket': { color: '#555555' },
    '.cm-foldPlaceholder': { backgroundColor: '#0a0a0a', color: '#3a3a3a', border: '1px solid #1a1a1a' },
    '.cm-tooltip': {
      backgroundColor: '#0d0d0d', border: '1px solid #1e1e1e', color: '#bfbfbf',
      borderRadius: '8px', boxShadow: '0 12px 48px rgba(0,0,0,0.95)',
    },
    '.cm-tooltip-autocomplete > ul > li': { padding: '6px 12px' },
    '.cm-tooltip-autocomplete > ul > li[aria-selected]': { backgroundColor: '#1a1a1a', color: '#ffffff' },
    '.cm-panels': { backgroundColor: '#080808', borderColor: '#1a1a1a' },
    '.cm-panels input,.cm-panels button,.cm-panels label': {
      backgroundColor: '#0f0f0f', color: '#bfbfbf', border: '1px solid #1e1e1e', borderRadius: '4px',
    },
    '.cm-searchMatch': { backgroundColor: '#1e1e1e', outline: '1px solid #3a3a3a' },
    '.cm-searchMatch-selected': { backgroundColor: '#2a2a2a' },
  },
  { dark: true }
);

/* ─────────────── Pyodide Loader ─────────────── */
let pyodideInstance = null;
let pyodideLoadingPromise = null;
let pyodideSetupDone = false;

function loadPyodideScript() {
  if (pyodideLoadingPromise) return pyodideLoadingPromise;
  pyodideLoadingPromise = new Promise((resolve, reject) => {
    if (window.loadPyodide) { resolve(window.loadPyodide); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js';
    s.onload = () => resolve(window.loadPyodide);
    s.onerror = () => reject(new Error('Pyodide load nahi ho paya. Internet connection check karo.'));
    document.body.appendChild(s);
  });
  return pyodideLoadingPromise;
}

async function getPyodide(onProgress) {
  if (pyodideInstance) return pyodideInstance;
  onProgress?.('downloading');
  const lp = await loadPyodideScript();
  onProgress?.('initializing');
  pyodideInstance = await lp({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/' });
  onProgress?.('ready');
  return pyodideInstance;
}

/* ═══════════════════════════════════════════════
   PYTHON SETUP CODE — runs once inside Pyodide
   - Security: blocked imports, overridden input()
   - AST transformer: input() → await __async_input()
   - Auto-async: functions calling input() become async
   - Runner with timeout
   ═══════════════════════════════════════════════ */
const PYODIDE_SETUP = `
import builtins, sys, ast, asyncio

# ─── 1. SECURITY: Block dangerous modules ───
_BLOCKED = {
    'os','subprocess','socket','http','urllib','urllib3','ctypes','importlib',
    'shutil','signal','multiprocessing','threading','webbrowser','code','pdb',
    'runpy','antigravity','pty','fcntl','pipes','posix','posixpath','nt',
    'ntpath','_thread','_posixsubprocess','poplib','smtplib','telnetlib',
    'ftplib','nntplib','imaplib','ssl','xmlrpc','xml','pickle','shelve',
    'sqlite3','dbm','gzip','bz2','lzma','zipfile','tarfile','tempfile',
    'mailcap','mimetypes','netrc','getpass','platform','resource',
}

_orig_import = builtins.__import__

def _safe_import(name, gl=None, lc=None, fromlist=(), level=0):
    base = name.split('.')[0]
    if base in _BLOCKED:
        raise ImportError(f"Security: Module '{base}' is blocked. Yeh unsafe hai.")
    return _orig_import(name, gl, lc, fromlist, level)

builtins.__import__ = _safe_import

# ─── 2. Block direct input() (bypassing AST transformer) ───
def _blocked_input(*a, **kw):
    raise RuntimeError(
        "input() ka direct call yahan nahi chalega. "
        "Code mein input() normally likho — automatically handle hoga. "
        "eval/getattr se input() call mat karo."
    )
builtins.input = _blocked_input

# ─── 3. Redirect stdout / stderr ───
_out_fn = lambda s: None
_err_fn = lambda s: None

class _StdOut:
    def write(self, s):
        if s: _out_fn(s)
        return len(s) if s else 0
    def flush(self): pass
    def isatty(self): return False

class _StdErr:
    def write(self, s):
        if s: _err_fn(s)
        return len(s) if s else 0
    def flush(self): pass
    def isatty(self): return False

sys.stdout = _StdOut()
sys.stderr = _StdErr()

def __set_output_fns(ofn, efn):
    global _out_fn, _err_fn
    _out_fn = ofn
    _err_fn = efn

# ─── 4. AST: Find functions that (transitively) need async ───
class _InputFinder(ast.NodeVisitor):
    def __init__(self):
        self.needs_async = set()
        self._scope = None
        self._calls = {}

    def visit_FunctionDef(self, node):
        old = self._scope
        self._scope = node.name
        self._calls[node.name] = set()
        self.generic_visit(node)
        self._scope = old

    def visit_AsyncFunctionDef(self, node):
        old = self._scope
        self._scope = node.name
        self._calls[node.name] = set()
        self.generic_visit(node)
        self._scope = old

    def visit_Call(self, node):
        if isinstance(node.func, ast.Name):
            if node.func.id == 'input':
                if self._scope: self.needs_async.add(self._scope)
            else:
                if self._scope: self._calls[self._scope].add(node.func.id)
        self.generic_visit(node)

    def finalize(self):
        changed = True
        while changed:
            changed = False
            for scope, called in self._calls.items():
                for n in called:
                    if n in self.needs_async and scope not in self.needs_async:
                        self.needs_async.add(scope)
                        changed = True
        return self.needs_async

# ─── 5. AST: Transform input() → await __async_input() ───
class _AsyncTransformer(ast.NodeTransformer):
    def __init__(self, na):
        self.na = na

    def visit_FunctionDef(self, node):
        self.generic_visit(node)
        if node.name in self.na:
            n = ast.AsyncFunctionDef(
                name=node.name, args=node.args, body=node.body,
                decorator_list=node.decorator_list, returns=node.returns)
            ast.copy_location(n, node)
            return n
        return node

    def visit_Lambda(self, node):
        for n in ast.walk(node):
            if isinstance(n, ast.Call) and isinstance(n.func, ast.Name) and n.func.id == 'input':
                raise RuntimeError("input() lambda mein kaam nahi karta. Normal function use karo.")
        return node

    def visit_Call(self, node):
        self.generic_visit(node)
        # input(...) → await __async_input(...)
        if isinstance(node.func, ast.Name) and node.func.id == 'input':
            n = ast.Await(value=ast.Call(
                func=ast.Name(id='__async_input', ctx=ast.Load()),
                args=node.args, keywords=node.keywords))
            ast.copy_location(n, node)
            return n
        # func() → await func()  if func needs async
        if isinstance(node.func, ast.Name) and node.func.id in self.na:
            n = ast.Await(value=node)
            ast.copy_location(n, node)
            return n
        # asyncio.run(x) → await x
        if (isinstance(node.func, ast.Attribute) and
            isinstance(node.func.value, ast.Name) and
            node.func.value.id == 'asyncio' and
            node.func.attr == 'run' and node.args):
            n = ast.Await(value=node.args[0])
            ast.copy_location(n, node)
            return n
        return node

# ─── 6. Transform wrapper ───
def _transform_code(code):
    tree = ast.parse(code)
    finder = _InputFinder()
    finder.visit(tree)
    na = finder.finalize()
    transformer = _AsyncTransformer(na)
    tree = transformer.visit(tree)
    ast.fix_missing_locations(tree)
    main = ast.AsyncFunctionDef(
        name='__user_main__',
        args=ast.arguments(posonlyargs=[],args=[],vararg=None,
                           kwonlyargs=[],kw_defaults=[],kwarg=None,defaults=[]),
        body=tree.body, decorator_list=[], returns=None)
    mod = ast.Module(body=[main], type_ignores=[])
    ast.fix_missing_locations(mod)
    return ast.unparse(mod)

# ─── 7. Async input bridge ───
class _RunAborted(Exception): pass

async def __async_input(prompt=""):
    if prompt:
        sys.stdout.write(str(prompt))
    result = await __jsAwaitInput()
    if result == '__ABORTED__':
        raise _RunAborted()
    sys.stdout.write(str(result) + '\\n')
    return result

# ─── 8. Runner ───
async def __run_user_code(code):
    transformed = _transform_code(code)
    ns = {'__builtins__': __builtins__, '__async_input': __async_input, 'asyncio': asyncio}
    exec(transformed, ns)
    try:
        await asyncio.wait_for(ns['__user_main__'](), timeout=15)
    except _RunAborted:
        pass
    except asyncio.TimeoutError:
        sys.stderr.write('Error: Execution timed out (15s). Infinite loop ho sakta hai.')
    except SyntaxError as e:
        sys.stderr.write(f'SyntaxError: {e.msg} (line {e.lineno})')
    except IndentationError as e:
        sys.stderr.write(f'IndentationError: {e.msg} (line {e.lineno})')
    except Exception as e:
        sys.stderr.write(str(e))
`;

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */
export default function CompilerPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState('');
  const [activeTab, setActiveTab] = useState('code');
  const [hasRun, setHasRun] = useState(false);
  const [execTime, setExecTime] = useState(null);

  /* interactive-input state */
  const [isWaitingForInput, setIsWaitingForInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  /* refs */
  const resolveInputRef = useRef(null);
  const runIdRef = useRef(0);
  const stdoutRef = useRef('');
  const stderrRef = useRef('');
  const rafRef = useRef(null);
  const outputEndRef = useRef(null);
  const inputRef = useRef(null);
  const runCodeRef = useRef(null);
  const isRunningRef = useRef(false);

  /* ── batched output flush ── */
  const scheduleFlush = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setStdout(stdoutRef.current);
      setStderr(stderrRef.current);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  /* ── auto-scroll ── */
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [stdout, stderr, isWaitingForInput]);

  /* ── auto-focus input field ── */
  useEffect(() => {
    if (isWaitingForInput && inputRef.current) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isWaitingForInput]);

  /* ── Ctrl/Cmd + Enter ── */
  useEffect(() => {
    const h = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCodeRef.current?.();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  /* ── submit interactive input ── */
  const submitInput = useCallback(() => {
    const val = inputValue;
    if (resolveInputRef.current) {
      const resolve = resolveInputRef.current;
      resolveInputRef.current = null;
      setIsWaitingForInput(false);
      setInputValue('');
      stdoutRef.current += val + '\n';
      scheduleFlush();
      resolve(val);
    }
  }, [inputValue, scheduleFlush]);

  /* ── run code ── */
  const runCode = useCallback(async () => {
    const myRunId = ++runIdRef.current;

    /* abort previous pending input */
    if (resolveInputRef.current) {
      const old = resolveInputRef.current;
      resolveInputRef.current = null;
      old('__ABORTED__');
    }

    isRunningRef.current = true;
    setIsRunning(true);
    setHasRun(true);
    setExecTime(null);
    setLoadingPhase('');
    setIsWaitingForInput(false);
    setInputValue('');
    stdoutRef.current = '';
    stderrRef.current = '';
    setStdout('');
    setStderr('');

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setActiveTab('output');
    }

    const t0 = performance.now();

    try {
      const pyodide = await getPyodide((p) => {
        if (p === 'ready') setLoadingPhase('');
        else setLoadingPhase(p);
      });
      setLoadingPhase('');

      /* one-time Python setup */
      if (!pyodideSetupDone) {
        pyodide.globals.set('__pyx_out__', (s) => {
          stdoutRef.current += String(s);
          scheduleFlush();
        });
        pyodide.globals.set('__pyx_err__', (s) => {
          stderrRef.current += String(s);
          scheduleFlush();
        });
        pyodide.globals.set('__jsAwaitInput', () => new Promise(() => {}));
        pyodide.runPython(PYODIDE_SETUP);
        pyodideSetupDone = true;
      }

      /* wire output functions for this run */
      pyodide.runPython('__set_output_fns(__pyx_out__, __pyx_err__)');

      /* wire async input bridge for this run */
      pyodide.globals.set('__jsAwaitInput', () => {
        return new Promise((resolve) => {
          if (runIdRef.current !== myRunId) { resolve('__ABORTED__'); return; }
          resolveInputRef.current = resolve;
          setIsWaitingForInput(true);
        });
      });

      /* set user code & execute */
      pyodide.globals.set('__user_code__', code);
      await pyodide.runPythonAsync('await __run_user_code(__user_code__)');

      setExecTime(((performance.now() - t0) / 1000).toFixed(2));
    } catch (err) {
      const msg = err?.message || String(err);
      if (msg !== '__ABORTED__') {
        stderrRef.current += (stderrRef.current ? '\n' : '') + msg;
      }
      setExecTime(((performance.now() - t0) / 1000).toFixed(2));
    } finally {
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      setStdout(stdoutRef.current);
      setStderr(stderrRef.current);
      setIsWaitingForInput(false);
      setIsRunning(false);
      isRunningRef.current = false;
    }
  }, [code, scheduleFlush]);

  runCodeRef.current = runCode;

  /* ── clear / reset ── */
  const handleClear = () => {
    if (resolveInputRef.current) { resolveInputRef.current('__ABORTED__'); resolveInputRef.current = null; }
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    stdoutRef.current = ''; stderrRef.current = '';
    setStdout(''); setStderr('');
    setIsWaitingForInput(false); setInputValue('');
    setExecTime(null);
  };

  const handleReset = () => {
    handleClear();
    setCode(DEFAULT_CODE); setHasRun(false); setLoadingPhase('');
  };

  const lineCount = code.split('\n').length;

  const editorExt = useMemo(() => [python(), syntaxHighlighting(monoHL)], []);
  const editorSetup = useMemo(() => ({
    lineNumbers: true, foldGutter: true, highlightActiveLine: true,
    autocompletion: true, bracketMatching: true, closeBrackets: true, indentOnInput: true,
  }), []);

  /* ═══════════ RENDER ═══════════ */
  return (
    <div className="flex flex-col h-screen h-[100dvh] bg-black text-white overflow-hidden select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
        @keyframes pulse-dot{0%,100%{opacity:.25}50%{opacity:1}}
        @keyframes spin-slow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes fade-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
        @keyframes blink-caret{0%,100%{border-right-color:transparent}50%{border-right-color:#fff}}
      `}} />

      {/* ─── HEADER ─── */}
      <header className="flex items-center justify-between h-12 md:h-11 px-3 md:px-4 bg-[#080808] border-b border-white/[0.05] shrink-0">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="flex items-center gap-2">
            <div className="relative w-2.5 h-2.5">
              <div className="absolute inset-0 rounded-full bg-white/40 blur-[3px]" />
              <div className="relative w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <span className="text-[12px] md:text-[13px] font-bold tracking-[0.18em] uppercase text-white/90">PyXode</span>
          </div>
          <div className="hidden sm:block w-px h-3.5 bg-white/[0.07]" />
          <span className="hidden sm:block text-[11px] text-white/30 font-light tracking-wide">Python Compiler</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button onClick={handleClear}
            className="px-2 md:px-3 py-1 cursor-pointer rounded-[5px] text-[11px] font-medium border border-white/[0.05] text-white/25 hover:text-white/50 hover:border-white/[0.12] transition-all duration-200">
            Clear
          </button>
          <button onClick={handleReset}
            className="px-2 md:px-3 py-1 cursor-pointer rounded-[5px] text-[11px] font-medium border border-white/[0.05] text-white/25 hover:text-white/50 hover:border-white/[0.12] transition-all duration-200">
            Reset
          </button>
          <div className="w-px h-4 bg-white/[0.07] mx-0.5 md:mx-1" />
          <button onClick={runCode} disabled={isRunning}
            className={`relative px-4 md:px-5 py-1.5 md:py-1 rounded-[5px] text-[11px] font-bold tracking-[0.12em] uppercase transition-all duration-300 overflow-hidden ${
              isRunning
                ? 'bg-white/[0.06] text-white/25 cursor-wait'
                : 'bg-white text-black cursor-pointer hover:bg-white/90 active:scale-[0.96]'
            }`}>
            {isRunning && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                style={{ animation: 'shimmer 1.5s infinite' }} />
            )}
            <span className="relative flex items-center gap-1.5">
              {isRunning ? (
                <><svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round"/>
                  </svg>Run</>
              ) : (
                <><svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>Run</>
              )}
            </span>
          </button>
        </div>
      </header>

      {/* ─── LOADING BAR ─── */}
      {loadingPhase && (
        <div className="flex items-center gap-2.5 px-4 h-8 bg-[#040404] border-b border-white/[0.05] shrink-0"
          style={{ animation: 'fade-in 0.2s ease-out' }}>
          <div className="w-3 h-3 border-[1.5px] border-white/25 border-t-white/70 rounded-full"
            style={{ animation: 'spin-slow 0.7s linear infinite' }} />
          <span className="text-[10px] md:text-[11px] text-white/35">
            {loadingPhase === 'downloading'
              ? 'Python runtime is downloading (~10MB, sirf pehli baar)...'
              : 'Python interpreter is initializing...'}
          </span>
        </div>
      )}

      {/* ─── WORKSPACE ─── */}
      <main className="flex flex-col md:flex-row flex-1 min-h-0">

        {/* ── LEFT: EDITOR ── */}
        <section className={`${activeTab === 'code' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/2 min-h-0 md:border-r border-white/[0.05]`}>
          <div className="flex items-center h-9 bg-[#040404] border-b border-white/[0.05] shrink-0 px-2">
            <div className="flex items-center gap-1.5 px-3 h-full bg-black border border-white/[0.05] border-b-black text-[11px] text-white/45 -mb-px rounded-t-[3px]">
              <svg className="w-3 h-3 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
              main.py
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            <CodeMirror value={code} height="100%" theme={cmTheme}
              extensions={editorExt} onChange={setCode} basicSetup={editorSetup} />
          </div>
        </section>

        {/* ── RIGHT: OUTPUT ── */}
        <section className={`${activeTab === 'output' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/2 bg-[#010101]`}>
          <div className="flex items-center justify-between h-9 bg-[#040404] border-b border-white/[0.05] shrink-0 px-2">
            <div className="flex items-center gap-1.5 px-3 h-full bg-[#010101] border border-white/[0.05] border-b-[#010101] text-[11px] text-white/40 -mb-px rounded-t-[3px]">
              <svg className="w-3 h-3 text-white/35" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Output
            </div>
            <div className="flex items-center gap-3 text-[10px] mr-2">
              {isWaitingForInput && !isRunning && (
                <span className="flex items-center gap-1.5 text-emerald-400/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" style={{ animation: 'pulse-dot 1.2s ease-in-out infinite' }} />
                  waiting for input
                </span>
              )}
              {isRunning && !isWaitingForInput && (
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
            {/* empty state */}
            {!stdout && !stderr && !isRunning && !isWaitingForInput && !hasRun && (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-16 h-16 rounded-2xl border border-white/[0.2] flex items-center justify-center mb-5 bg-white/[0.01]">
                  <svg className="w-7 h-7 text-white/[0.4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <p className="text-[12px] text-white/[0.3] mb-2">Output will show here!</p>
                <div className="hidden md:flex items-center justify-center gap-1.5 text-[10px] text-white/[0.4] mt-3">
                  <kbd className="px-1.5 py-0.5 bg-white/[0.03] rounded-[3px] text-[9px] border border-white/[0.05] font-mono">Ctrl</kbd>
                  <span>+</span>
                  <kbd className="px-1.5 py-0.5 bg-white/[0.03] rounded-[3px] text-[9px] border border-white/[0.05] font-mono">Enter</kbd>
                </div>
              </div>
            )}

            {/* running spinner (not waiting for input) */}
            {isRunning && !stdout && !stderr && !isWaitingForInput && (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-5 h-5 border-[1.5px] border-white/15 border-t-white/50 rounded-full"
                    style={{ animation: 'spin-slow 0.7s linear infinite' }} />
                  <span className="text-[11px] text-white/15">Running...</span>
                </div>
              </div>
            )}

            {/* stdout */}
            {stdout && (
              <pre className="p-4 m-0 text-[13px] font-mono leading-[1.85] text-white/55 whitespace-pre-wrap break-words"
                style={{ animation: 'fade-in 0.15s ease-out' }}>
                {stdout}
              </pre>
            )}

            {/* interactive input field — inline terminal style */}
            {isWaitingForInput && (
              <div className="px-4 pb-1" style={{ animation: 'fade-in 0.1s ease-out' }}>
                <div className="flex items-center">
                  <span className="text-[13px] font-mono leading-[1.85] text-emerald-400/50 select-none mr-0.5">&#9658;</span>
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitInput(); } }}
                    placeholder="type here & press Enter"
                    className="flex-1 bg-transparent text-[13px] font-mono leading-[1.85] text-white/80 outline-none placeholder:text-white/[0.15] caret-white"
                    autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false}
                  />
                  <span className="inline-block w-[7px] h-[16px] bg-white/80 ml-px"
                    style={{ animation: 'blink-caret 1s step-end infinite' }} />
                </div>
              </div>
            )}

            {/* stderr */}
            {stderr && (
              <div className="border-t border-red-500/[0.08]" style={{ animation: 'fade-in 0.15s ease-out' }}>
                <div className="flex items-center h-7 px-4 bg-red-500/[0.03] border-b border-red-500/[0.05]">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-red-400/40 font-medium">Error</span>
                </div>
                <pre className="p-4 m-0 text-[12px] font-mono leading-[1.7] text-red-300/40 whitespace-pre-wrap break-words">
                  {stderr}
                </pre>
              </div>
            )}

            {/* program finished indicator */}
            {!isRunning && !isWaitingForInput && hasRun && (stdout || stderr) && (
              <div className="flex items-center gap-2 px-4 py-2.5 border-t border-white/[0.04]" style={{ animation: 'fade-in 0.2s ease-out' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="text-[10px] text-white/[0.18]">
                  Program finished{execTime ? ` — ${execTime}s` : ''}
                </span>
              </div>
            )}

            <div ref={outputEndRef} />
          </div>
        </section>
      </main>

      {/* ─── FOOTER (desktop only) ─── */}
      <footer className="hidden md:flex items-center justify-between h-6 px-4 bg-[#080808] border-t border-white/[0.05] shrink-0">
        <div className="flex items-center gap-3 text-[10px] text-white/[0.3]">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />Python 3.11
          </span>
          <span className="text-white/[0.05]">·</span>
          <span>{lineCount} lines</span>
          <span className="text-white/[0.05]">·</span>
          <span>{code.length} chars</span>
          {execTime && !isRunning && (
            <><span className="text-white/[0.05]">·</span><span>{execTime}s</span></>
          )}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-white/[0.3]">
          <kbd className="px-1 py-px bg-white/[0.03] rounded-[2px] text-[9px] border border-white/[0.05] font-mono">Ctrl</kbd>
          <span className="text-white/[0.4]">+</span>
          <kbd className="px-1 py-px bg-white/[0.03] rounded-[2px] text-[9px] border border-white/[0.05] font-mono">Enter</kbd>
          <span className="ml-0.5 text-white/[0.4]">run</span>
        </div>
      </footer>

      {/* ─── MOBILE TAB NAV ─── */}
      <nav className="flex md:hidden items-center justify-around h-14 bg-[#060606] border-t border-white/[0.05] shrink-0"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <button onClick={() => setActiveTab('code')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors ${activeTab === 'code' ? 'text-white bg-white/[0.04]' : 'text-white/30'}`}>
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
          </svg>
          <span className="text-[10px] font-medium">Code</span>
        </button>
        <button onClick={() => setActiveTab('output')}
          className={`flex-1 flex flex-col items-center justify-center gap-1 h-full transition-colors relative ${activeTab === 'output' ? 'text-white bg-white/[0.04]' : 'text-white/30'}`}>
          <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          </svg>
          <span className="text-[10px] font-medium">Output</span>
          {isWaitingForInput && activeTab !== 'output' && (
            <span className="absolute top-2.5 right-[28%] w-2 h-2 rounded-full bg-emerald-400/80" style={{ animation: 'pulse-dot 1.2s ease-in-out infinite' }} />
          )}
          {hasRun && !isWaitingForInput && activeTab !== 'output' && (
            <span className="absolute top-2.5 right-[28%] w-1.5 h-1.5 rounded-full bg-white/50" />
          )}
        </button>
      </nav>
    </div>
  );
}