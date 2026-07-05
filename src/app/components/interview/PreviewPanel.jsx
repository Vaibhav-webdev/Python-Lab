"use client";

import { useMemo } from "react";

const IFRAME_STYLES = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #0d0d0d;
    color: #e2e8f0;
    font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
    padding: 24px;
    min-height: 100vh;
  }
  .output-container { display: flex; flex-direction: column; gap: 12px; }
  .log-line {
    font-size: 14px; line-height: 1.6; color: #e2e8f0;
    padding: 12px 16px; background: #141414;
    border: 1px solid #1e293b; border-radius: 8px;
    word-break: break-word; white-space: pre-wrap;
  }
  .log-line.error { color: #f87171; background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.3); }
  .log-line.warn { color: #fbbf24; background: rgba(251,191,36,0.08); border-color: rgba(251,191,36,0.3); }
  .log-label {
    color: #64748b; margin-right: 12px; font-size: 11px;
    font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;
  }
  .idle-msg {
    color: #334155; text-align: center; margin-top: 60px;
    font-family: monospace; font-size: 13px; line-height: 2;
  }
`;

function cleanCode(raw) {
  if (!raw || !raw.trim()) return "";
  let c = raw;
  c = c.replace(/import\s+[\s\S]*?from\s*['"`][^'"`]*['"`]\s*;?\n?/gi, "");
  c = c.replace(/import\s*['"`][^'"`]*['"`]\s*;?\n?/gi, "");
  c = c.replace(/export\s+default\s+/g, "");
  c = c.replace(/^\s*export\s+(?!default)/gm, "");
  return c.trim();
}

function buildSrcdoc(rawCode) {
  const cleaned = cleanCode(rawCode);
  const safe = cleaned.replace(/<\/script>/gi, "<\\/script>");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <style>${IFRAME_STYLES}</style>
</head>
<body>
  <div id="root">
    <p class="idle-msg">⏳ Click <b>Check</b> to run your JavaScript code securely.</p>
  </div>

  <script id="js-src" type="text/plain">${safe}</script>

  <script>
    (function() {
      var rootEl = document.getElementById('root');
      var rawCode = document.getElementById('js-src').textContent.trim();

      if (!rawCode) return;

      rootEl.innerHTML = '';
      var outputEl = document.createElement('div');
      outputEl.className = 'output-container';
      rootEl.appendChild(outputEl);

      var workerCode = [
        'self.fetch=function(){throw new Error("Blocked")};',
        'self.XMLHttpRequest=function(){throw new Error("Blocked")};',
        'self.WebSocket=function(){throw new Error("Blocked")};',
        'self.importScripts=function(){throw new Error("Blocked")};',
        'self.onmessage=function(e){',
        '  try{',
        '    function f(a){if(a===null)return"null";if(a===undefined)return"undefined";if(typeof a==="object"){try{return JSON.stringify(a,null,2)}catch(e){return String(a)}}return String(a)}',
        '    console.log=function(){self.postMessage({t:"log",a:[].slice.call(arguments).map(f)})};',
        '    console.error=function(){self.postMessage({t:"error",a:[].slice.call(arguments).map(f)})};',
        '    console.warn=function(){self.postMessage({t:"warn",a:[].slice.call(arguments).map(f)})};',
        '    new Function(e.data)();',
        '    self.postMessage({t:"done"});',
        '  }catch(err){',
        '    self.postMessage({t:"error",a:["\\ud83d\\udc1b "+(err.message||err)]});',
        '  }',
        '};'
      ].join('\\n');

      var blob = new Blob([workerCode], { type: 'application/javascript' });
      var url = URL.createObjectURL(blob);
      var w = new Worker(url);

      w.onmessage = function(e) {
        var m = e.data;
        if (m.t === 'done') {
          w.terminate();
          URL.revokeObjectURL(url);
          return;
        }
        var d = document.createElement('div');
        d.className = 'log-line' + (m.t === 'error' ? ' error' : m.t === 'warn' ? ' warn' : '');
        var lbl = m.t === 'error' ? 'Error' : m.t === 'warn' ? 'Warn' : 'Log';
        var txt = m.a.join(' ').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        d.innerHTML = '<span class="log-label">' + lbl + '</span>' + txt;
        outputEl.appendChild(d);
      };

      w.onerror = function(err) {
        var d = document.createElement('div');
        d.className = 'log-line error';
        d.innerHTML = '<span class="log-label">Error</span>' + (err.message || 'Unknown error');
        outputEl.appendChild(d);
        w.terminate();
        URL.revokeObjectURL(url);
      };

      w.postMessage(rawCode);
    })();
  </script>
</body>
</html>`;
}

export default function PreviewPanel({ code, refreshKey }) {
  const srcdoc = useMemo(() => buildSrcdoc(code ?? ""), [code, refreshKey]);

  // ✅ CRITICAL FIX: key on the OUTER div forces complete remount
  return (
    <div key={refreshKey} className="relative w-full h-full bg-black overflow-hidden">
      <iframe
        srcDoc={srcdoc}
        sandbox="allow-scripts"
        title="Secure JS Sandbox"
        className="w-full h-full border-0"
        style={{ background: "#000" }}
      />
    </div>
  );
}