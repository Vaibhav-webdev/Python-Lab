"use client";

import { useRef, useEffect, useState, useCallback } from "react";

// ══════════════════════════════════════════════════════════════════
// USER CODE SANITIZER (Python) — Layer 1: static text blocklist
// This catches naive/obvious attempts. It is NOT the only defense —
// see the Python-side lockdown inside SANDBOX_HTML for Layer 2, which
// covers dynamic/obfuscated attempts (e.g. __class__.__mro__ tricks)
// that a text regex alone cannot catch.
// ══════════════════════════════════════════════════════════════════

function sanitizeUserCode(code) {
  if (typeof code !== "string" || code.trim().length === 0) return "";

  const dangerousPatterns = [
    // ── Dynamic execution ──
    { re: /\b__import__\s*\(/, msg: "__import__() is not allowed in preview" },
    { re: /\bexec\s*\(/, msg: "exec() is not allowed in preview" },
    { re: /\beval\s*\(/, msg: "eval() is not allowed in preview" },
    { re: /\bcompile\s*\(/, msg: "compile() is not allowed in preview" },

    // ── Sandbox-escape via the object model (classic Python jailbreak) ──
    { re: /__class__|__bases__|__subclasses__|__mro__|__globals__|__builtins__|__loader__|__spec__|__reduce__|__getattribute__/, msg: "Reflection on internal object attributes is not allowed in preview" },
    { re: /\bvars\s*\(\s*\)/, msg: "vars() is not allowed in preview" },
    { re: /\bglobals\s*\(\s*\)/, msg: "globals() is not allowed in preview" },
    { re: /\blocals\s*\(\s*\)\s*\[/, msg: "locals() indexing is not allowed in preview" },

    // ── Process / OS control ──
    { re: /\bos\s*\.\s*(system|popen|exec[lv]p?e?|fork|kill|remove|unlink|rmdir|rename|chmod|chown|setuid|setgid)\s*\(/, msg: "This os function is not allowed in preview" },
    { re: /\bsubprocess\b/, msg: "subprocess module is not allowed in preview" },
    { re: /\bmultiprocessing\b/, msg: "multiprocessing is not allowed in preview" },
    { re: /\bctypes\b/, msg: "ctypes module is not allowed in preview" },
    { re: /\bsignal\b/, msg: "signal module is not allowed in preview" },
    { re: /\bresource\b/, msg: "resource module is not allowed in preview" },
    { re: /\bmmap\b/, msg: "mmap module is not allowed in preview" },

    // ── Networking (defense-in-depth; also blocked at JS level after load) ──
    { re: /\bsocket\b/, msg: "socket module is not allowed in preview" },
    { re: /\bssl\b/, msg: "ssl module is not allowed in preview" },
    { re: /\burllib\b/, msg: "urllib module is not allowed in preview" },
    { re: /\brequests\b/, msg: "requests module is not allowed in preview" },
    { re: /\b(ftplib|telnetlib|smtplib|http\.client)\b/, msg: "Network modules are not allowed in preview" },

    // ── Serialization that can smuggle code ──
    { re: /\bpickle\b/, msg: "pickle module is not allowed in preview" },
    { re: /\bmarshal\b/, msg: "marshal module is not allowed in preview" },
    { re: /\bshelve\b/, msg: "shelve module is not allowed in preview" },

    // ── Package installs / import machinery tampering ──
    { re: /\bmicropip\b/, msg: "micropip is not allowed in preview" },
    { re: /\bimportlib\b/, msg: "importlib is not allowed in preview" },
    { re: /\bsys\s*\.\s*modules\b/, msg: "sys.modules access is not allowed in preview" },
    { re: /\bsys\s*\.\s*meta_path\b/, msg: "sys.meta_path access is not allowed in preview" },
    { re: /\bsys\s*\.\s*_getframe\b/, msg: "sys._getframe is not allowed in preview" },

    // ── Infinite loop guards are handled at runtime; block obvious fork bombs ──
    { re: /\bwhile\s+True\s*:\s*pass\b/, msg: "This pattern is not allowed in preview" },
  ];

  for (const { re, msg } of dangerousPatterns) {
    if (re.test(code)) {
      return `raise Exception(${JSON.stringify(msg)})`;
    }
  }

  return code;
}

// ══════════════════════════════════════════════════════════════════
// SANDBOX HTML TEMPLATE
// ══════════════════════════════════════════════════════════════════

const SANDBOX_HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src https://cdn.jsdelivr.net; style-src 'unsafe-inline'; img-src data: blob:; font-src data:;">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0d0d0d;color:#e2e8f0;padding:0;overflow:hidden;height:100vh}

  #__console{
    position:fixed;inset:0;overflow-y:auto;
    background:#0d0d0d;
    font-family:'SF Mono',Monaco,'Cascadia Code','Fira Code',monospace;
    font-size:13px;line-height:1.65;z-index:10;
  }

  .__ch{
    position:sticky;top:0;z-index:2;
    padding:8px 16px;
    background:#1c1c1f;
    backdrop-filter:blur(8px);
    border-bottom:1px solid rgba(148,163,184,.08);
    font-size:10px;text-transform:uppercase;letter-spacing:.8px;
    color:#475569;font-weight:600;
    display:flex;justify-content:space-between;align-items:center;
  }
  .__badge{background:rgba(250,204,21,.1);color:#eab308;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700}

  .__cl{padding:5px 16px;border-bottom:1px solid rgba(148,163,184,.03);word-break:break-word;white-space:pre-wrap}
  .__cl-log{color:#cbd5e1}
  .__cl-error{color:#f87171;background:rgba(248,113,113,.03)}

  .__empty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#334155;font-size:12px;pointer-events:none;flex-direction:column;gap:10px}
  .__empty.gone{display:none}

  .__spin{width:20px;height:20px;border:2px solid rgba(167,139,250,.25);border-top-color:#a78bfa;border-radius:50%;animation:__spin 0.8s linear infinite}
  @keyframes __spin{to{transform:rotate(360deg)}}

  .__err{padding:16px;margin:16px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:8px;color:#fca5a5;font-family:'SF Mono',Monaco,'Cascadia Code',monospace;font-size:13px;white-space:pre-wrap;word-break:break-word;line-height:1.6}
</style>
</head>
<body>

<div id="__console">
  <div class="__ch">
    <span>Console Output</span>
    <span class="__badge" id="__cc">0</span>
  </div>
  <div class="__empty" id="__empty"><div class="__spin"></div><span>Loading Python environment…</span></div>
</div>

<!-- ═════════════ CONSOLE HELPERS ═════════════ -->
<script>
  var __console = document.getElementById('__console');
  var __badge = document.getElementById('__cc');
  var __emptyEl = document.getElementById('__empty');
  var __n = 0;

  function __setEmpty(html) {
    __emptyEl.innerHTML = html;
    __emptyEl.classList.remove('gone');
  }

  function __addLine(text, type) {
    __n++; __badge.textContent = __n;
    __emptyEl.classList.add('gone');
    var d = document.createElement('div');
    d.className = '__cl __cl-' + type;
    d.textContent = text;
    __console.appendChild(d);
    __console.scrollTop = __console.scrollHeight;
  }

  function __showError(message) {
    __emptyEl.classList.add('gone');
    var d = document.createElement('div');
    d.className = '__err';
    d.textContent = message;
    __console.appendChild(d);
  }
<\/script>

<!-- ═════════════ TIMEOUT PROTECTION (starts after code begins running) ═════════════ -->
<script>
  window.__done = false;
  function __armTimeout() {
    window.__tmo = setTimeout(function () {
      if (window.__done) return;
      var ov = document.createElement('div');
      ov.style.cssText = 'position:fixed;inset:0;background:rgba(8,8,15,.96);display:flex;align-items:center;justify-content:center;z-index:99999;flex-direction:column;gap:10px';
      ov.innerHTML = '<div style="color:#f87171;font-size:15px;font-family:monospace;font-weight:600">\\u23F1 Execution Timeout</div><div style="color:#475569;font-size:12px;font-family:monospace">Possible infinite loop detected</div>';
      document.body.appendChild(ov);
    }, 10000);
  }
<\/script>

<!-- ═════════════ LOAD PYODIDE (network access needed here, before lockdown) ═════════════ -->
<script src="https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js"><\/script>
<script>
(async function () {
  var USER_CODE = __USER_CODE_JSON__;

  // ── Layer 2: Python-side lockdown, applied AFTER Pyodide loads and
  // BEFORE user code runs. This is defense-in-depth against tricks that
  // bypass the JS text-regex blocklist (e.g. reaching os/subprocess via
  // ().__class__.__base__.__subclasses__(), or dynamic string imports). ──
  var LOCKDOWN_PY = [
    "import sys, builtins",
    "",
    "_BLOCKED_MODULES = {",
    "    'subprocess','multiprocessing','ctypes','signal','resource','mmap',",
    "    'socket','ssl','urllib','urllib.request','urllib.error','requests',",
    "    'ftplib','telnetlib','smtplib','http','http.client','pickle',",
    "    'marshal','shelve','micropip','importlib','ensurepip','pip',",
    "    'code','codeop','pty','fcntl','pdb','tracemalloc','gc',",
    "}",
    "",
    "class _BlockImports:",
    "    def find_module(self, name, path=None):",
    "        root = name.split('.')[0]",
    "        if root in _BLOCKED_MODULES or name in _BLOCKED_MODULES:",
    "            return self",
    "        return None",
    "    def load_module(self, name):",
    "        raise ImportError('Module \\'' + name + '\\' is not allowed in preview')",
    "",
    "sys.meta_path.insert(0, _BlockImports())",
    "",
    "_orig_import = builtins.__import__",
    "def _guarded_import(name, *args, **kwargs):",
    "    root = name.split('.')[0]",
    "    if root in _BLOCKED_MODULES or name in _BLOCKED_MODULES:",
    "        raise ImportError('Module \\'' + name + '\\' is not allowed in preview')",
    "    return _orig_import(name, *args, **kwargs)",
    "builtins.__import__ = _guarded_import",
    "",
    "for _name in ('input', 'breakpoint', 'help'):",
    "    if hasattr(builtins, _name):",
    "        try:",
    "            delattr(builtins, _name)",
    "        except Exception:",
    "            setattr(builtins, _name, None)",
    "",
    "_orig_open = builtins.open",
    "def _guarded_open(*args, **kwargs):",
    "    raise PermissionError('File access is not allowed in preview')",
    "builtins.open = _guarded_open",
  ].join('\\n');

  try {
    var pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/"
    });

    // Route Python stdout/stderr into the console UI
    pyodide.setStdout({ batched: (s) => { if (s.length) __addLine(s, 'log'); } });
    pyodide.setStderr({ batched: (s) => { if (s.length) __addLine(s, 'error'); } });

    // Apply Python-level lockdown before any user code runs
    await pyodide.runPythonAsync(LOCKDOWN_PY);

    __setEmpty('Run tests to see output here');

    // ═════════════ JS-SIDE RUNTIME LOCKDOWN (after Pyodide finished loading) ═════════════
    window.fetch = undefined;
    window.XMLHttpRequest = undefined;
    window.WebSocket = undefined;
    window.EventSource = undefined;
    if (window.navigator) window.navigator.sendBeacon = undefined;
    try { Object.defineProperty(window, 'parent', { get: function () { return null; } }); } catch (e) {}
    try { Object.defineProperty(window, 'top', { get: function () { return null; } }); } catch (e) {}
    try { Object.defineProperty(window, 'opener', { get: function () { return null; } }); } catch (e) {}
    try { Object.defineProperty(window, 'localStorage', { get: function () { throw new Error('Blocked'); } }); } catch (e) {}
    try { Object.defineProperty(window, 'sessionStorage', { get: function () { throw new Error('Blocked'); } }); } catch (e) {}
    try { Object.defineProperty(window, 'indexedDB', { get: function () { throw new Error('Blocked'); } }); } catch (e) {}
    window.alert = undefined;
    window.confirm = undefined;
    window.prompt = undefined;
    document.write = undefined;
    document.writeln = undefined;

    if (!USER_CODE || !USER_CODE.trim()) {
      window.__done = true;
      return;
    }

    __armTimeout();

    try {
      await pyodide.runPythonAsync(USER_CODE);
    } catch (err) {
      __showError('Error: ' + (err && err.message ? err.message : String(err)));
    }

    clearTimeout(window.__tmo);
    window.__done = true;
  } catch (loadErr) {
    window.__done = true;
    __showError('Failed to load Python runtime: ' + (loadErr && loadErr.message ? loadErr.message : String(loadErr)));
  }
})();
<\/script>

</body>
</html>`;

// ══════════════════════════════════════════════════════════════════
// PREVIEW PANEL COMPONENT
// ══════════════════════════════════════════════════════════════════

export default function PreviewPanel({ code, refreshKey }) {
  const [htmlUrl, setHtmlUrl] = useState(null);
  const [error, setError] = useState(null);
  const blobUrlRef = useRef(null);
  const [iframeMountKey, setIframeMountKey] = useState(0);

  const updatePreview = useCallback(() => {
    try {
      if (typeof code !== "string" || code.trim().length === 0) {
        setError(null);
        setHtmlUrl(null);
        return;
      }

      const sanitizedCode = sanitizeUserCode(code);
      // Embed the Python source safely as a JSON string literal (avoids quote/escaping bugs)
      const htmlContent = SANDBOX_HTML.replace(
        "__USER_CODE_JSON__",
        JSON.stringify(sanitizedCode)
      );
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = url;

      setHtmlUrl(url);
      // Force a full iframe remount (not just src swap) so every Run gets
      // a completely fresh document/Pyodide instance — no state can leak
      // between runs, even if a previous run left timers/handles behind.
      setIframeMountKey((k) => k + 1);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, [code]);

  useEffect(() => {
    const timer = setTimeout(() => {
      updatePreview();
    }, 50);

    return () => {
      clearTimeout(timer);
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [updatePreview, refreshKey]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-[#0d0d0d] p-4">
        <div className="max-w-md text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-3">
            <span className="text-red-400 text-xl">✕</span>
          </div>
          <p className="text-red-400 text-sm font-medium mb-1">Preview Error</p>
          <p className="text-slate-500 text-xs">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-[#0d0d0d] relative">
      {!code && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-xs z-10">
          Write code and run tests to see preview
        </div>
      )}
      {htmlUrl && (
        <iframe
          key={iframeMountKey}
          src={htmlUrl}
          title="Code Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      )}
    </div>
  );
}