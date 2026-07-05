"use client";

import { useRef, useEffect, useState, useCallback } from "react";

// ══════════════════════════════════════════════════════════════════
// USER CODE SANITIZER
// ══════════════════════════════════════════════════════════════════

function sanitizeUserCode(code) {
  if (/\bprocess\s*\.\s*(argv|env|exit|stdout|stderr|cwd|chdir|pid|versions|nextTick)\b/.test(code)) {
    return `throw new Error('This code uses Node.js APIs (process.argv, process.exit, etc.) which are not available in the browser preview. Please run this code in your local terminal to see the output.');`;
  }
  if (typeof code !== "string" || code.trim().length === 0) return "";

  if (/\bimport\s+(\{[^}]*\}|[\w*]+)\s+from\s+['"][^'"]+['"]/.test(code)) {
    return `throw new Error('Import statements are not allowed in preview');`;
  }
  if (/\bimport\s*\(\s*['"][^'"]+['"]\s*\)/.test(code)) {
    return `throw new Error('Dynamic imports are not allowed in preview');`;
  }
  if (/\brequire\s*\(\s*['"][^'"]+['"]\s*\)/.test(code)) {
    return `throw new Error('require() is not allowed in preview');`;
  }
  if (/\beval\s*\(/.test(code)) {
    return `throw new Error('eval() is not allowed in preview');`;
  }
  if (/\bnew\s+Function\s*\(/.test(code)) {
    return `throw new Error('Function constructor is not allowed in preview');`;
  }
  if (/\bObject\.(assign|defineProperty)\s*\(\s*\[\s*['"]__proto__['"]\s*\]/.test(code)) {
    return `throw new Error('Prototype pollution is not allowed');`;
  }

  return code.replace(/<\/script>/gi, "<\\/script>");
}

// ══════════════════════════════════════════════════════════════════
// SANDBOX HTML TEMPLATE
// ══════════════════════════════════════════════════════════════════

const SANDBOX_HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script src="https://cdn.tailwindcss.com"><\/script>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0d0d0d;color:#e2e8f0;padding:0;overflow:hidden;height:100vh}

  /* ── Console: full screen by default ── */
  #__console{
    position:fixed;inset:0;overflow-y:auto;
    background:#0d0d0d;
    font-family:'SF Mono',Monaco,'Cascadia Code','Fira Code',monospace;
    font-size:13px;line-height:1.65;z-index:10;
  }
  #__console.hidden{display:none}

  /* Console header */
  .__ch{
    position:sticky;top:0;z-index:2;
    padding:8px 16px;
    background:rgba(10,10,26,.92);
    backdrop-filter:blur(8px);
    border-bottom:1px solid rgba(148,163,184,.08);
    font-size:10px;text-transform:uppercase;letter-spacing:.8px;
    color:#475569;font-weight:600;
    display:flex;justify-content:space-between;align-items:center;
  }
  .__badge{background:rgba(250,204,21,.1);color:#eab308;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:700}

  /* Console log lines */
  .__cl{padding:5px 16px;border-bottom:1px solid rgba(148,163,184,.03);word-break:break-word;white-space:pre-wrap}
  .__cl-log{color:#cbd5e1}
  .__cl-warn{color:#fbbf24;background:rgba(251,191,36,.03)}
  .__cl-error{color:#f87171;background:rgba(248,113,113,.03)}
  .__cl-info{color:#60a5fa}

  /* Empty state */
  .__empty{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#334155;font-size:12px;pointer-events:none}
  .__empty.gone{display:none}

  /* ── React root: hidden by default ── */
  #root{display:none;min-height:100vh;overflow:auto;background:#0f0f1a}
  #root.active{display:block}

  /* ── Error ── */
  .__err{padding:16px;margin:16px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:8px;color:#fca5a5;font-family:'SF Mono',Monaco,'Cascadia Code',monospace;font-size:13px;white-space:pre-wrap;word-break:break-word;line-height:1.6}

  /* ── Skeleton helpers ── */
  .__skel{display:none!important}
</style>
<script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin><\/script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin><\/script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
</head>
<body>

<!-- React root (hidden until App is found) -->
<div id="root">
  <ul id="list" class="__skel"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>
  <div id="app" class="__skel"></div>
  <div id="container" class="__skel"></div>
  <p id="output" class="__skel"></p>
  <div id="result" class="__skel"></div>
</div>

<!-- Console (full screen, visible by default) -->
<div id="__console">
  <div class="__ch">
    <span>Console Output</span>
    <span class="__badge" id="__cc">0</span>
  </div>
  <div class="__empty" id="__empty">Run tests to see output here</div>
</div>

<!-- ═════════════ RUNTIME SECURITY ═════════════ -->
<script>
(function(){
  window.fetch=undefined;
  window.XMLHttpRequest=undefined;
  window.WebSocket=undefined;
  window.EventSource=undefined;
  if(window.navigator)window.navigator.sendBeacon=undefined;
  try{Object.defineProperty(window,'parent',{get:function(){return null}})}catch(e){}
  try{Object.defineProperty(window,'top',{get:function(){return null}})}catch(e){}
  try{Object.defineProperty(window,'opener',{get:function(){return null}})}catch(e){}
  try{Object.defineProperty(window,'frames',{get:function(){return[]}})}catch(e){}
  try{Object.defineProperty(window,'localStorage',{get:function(){throw new Error('Blocked')}})}catch(e){}
  try{Object.defineProperty(window,'sessionStorage',{get:function(){throw new Error('Blocked')}})}catch(e){}
  try{Object.defineProperty(window,'indexedDB',{get:function(){throw new Error('Blocked')}})}catch(e){}
    /* Node.js process polyfill — prevents "process is not defined" crash */
  if(typeof process==='undefined'){
    window.process={
      argv:['preview','--length','16'],
      env:{NODE_ENV:'production'},
      exit:function(code){
        throw new Error('process.exit('+(code||0)+') — Node.js APIs are not available in browser preview');
      },
      stdout:{write:function(){}},
      stderr:{write:function(){}},
      version:'v20.0.0',
      versions:{}
    };
  }else{
    if(!process.argv)process.argv=['preview'];
    if(!process.exit)process.exit=function(code){
      throw new Error('process.exit('+(code||0)+') — Node.js APIs are not available in browser preview');
    };
    if(!process.env)process.env={};
    if(!process.stdout)process.stdout={write:function(){}};
    if(!process.stderr)process.stderr={write:function(){}};
  }
  window.Worker=undefined;
  window.SharedWorker=undefined;
  window.ServiceWorker=undefined;
  window.importScripts=undefined;
  window.postMessage=undefined;
  window.alert=undefined;
  window.confirm=undefined;
  window.prompt=undefined;
  document.write=undefined;
  document.writeln=undefined;
  try{Object.defineProperty(document,'cookie',{get:function(){return''},set:function(){}})}catch(e){}
})();
<\/script>

<!-- ═════════════ CONSOLE INTERCEPTION ═════════════ -->
<script>
(function(){
  var el=document.getElementById('__console');
  var badge=document.getElementById('__cc');
  var emptyEl=document.getElementById('__empty');
  var n=0;

  function add(args,type){
    n++;badge.textContent=n;
    if(emptyEl)emptyEl.classList.add('gone');
    var d=document.createElement('div');
    d.className='__cl __cl-'+type;
    d.textContent=Array.prototype.slice.call(args).map(function(a){
      if(a===null)return'null';
      if(a===undefined)return'undefined';
      if(typeof a==='object'){try{return JSON.stringify(a,null,2)}catch(e){return String(a)}}
      return String(a);
    }).join(' ');
    el.appendChild(d);
    el.scrollTop=el.scrollHeight;
  }

  var oL=console.log,oW=console.warn,oE=console.error,oI=console.info;
  console.log=function(){oL.apply(console,arguments);add(arguments,'log')};
  console.warn=function(){oW.apply(console,arguments);add(arguments,'warn')};
  console.error=function(){oE.apply(console,arguments);add(arguments,'error')};
  console.info=function(){oI.apply(console,arguments);add(arguments,'info')};
})();
<\/script>

<!-- ═════════════ TIMEOUT PROTECTION ═════════════ -->
<script>
window.__done=false;
window.__tmo=setTimeout(function(){
  if(window.__done)return;
  var ov=document.createElement('div');
  ov.style.cssText='position:fixed;inset:0;background:rgba(8,8,15,.96);display:flex;align-items:center;justify-content:center;z-index:99999;flex-direction:column;gap:10px';
  ov.innerHTML='<div style="color:#f87171;font-size:15px;font-family:monospace;font-weight:600">\\u23F1 Execution Timeout</div><div style="color:#475569;font-size:12px;font-family:monospace">Possible infinite loop detected</div>';
  document.body.appendChild(ov);
},10000);
<\/script>

<!-- ═════════════ USER CODE ═════════════ -->
<script type="text/babel">
const { useState, useEffect, useRef, useCallback, useMemo } = React;

if (typeof Image === "undefined") {
  var Image = function Image(props) {
    const { src, alt, width, height, ...rest } = props;
    return React.createElement("img", { src, alt, width, height, style: { maxWidth: "100%", height: "auto" }, ...rest });
  };
}

try {
  __USER_CODE__

  if (typeof App !== "undefined") {
    /* React mode: hide console, show root */
    document.getElementById('__console').classList.add('hidden');
    var rootEl = document.getElementById("root");
    rootEl.innerHTML = "";
    rootEl.classList.add('active');
    ReactDOM.createRoot(rootEl).render(React.createElement(App));
  }
  /* else: plain JS mode — console stays visible with all log output */

  clearTimeout(window.__tmo);
  window.__done = true;

} catch (error) {
  clearTimeout(window.__tmo);
  window.__done = true;

  var errDiv = document.createElement("div");
  errDiv.className = "__err";
  errDiv.textContent = "Error: " + error.message + "\\n\\n" + (error.stack || "");
  document.getElementById('__console').appendChild(errDiv);
}
<\/script>

<!-- ═════════════ SYNTAX ERROR FALLBACK ═════════════ -->
<script>
setTimeout(function(){
  if(window.__done)return;
  clearTimeout(window.__tmo);
  window.__done=true;
  var con=document.getElementById('__console');
  var emptyEl=document.getElementById('__empty');
  if(emptyEl)emptyEl.classList.add('gone');
  var d=document.createElement('div');
  d.className='__err';
  d.textContent='Syntax Error: Your code could not be parsed.\\nPlease check for missing brackets, parentheses, or typos.';
  con.appendChild(d);
},3000);
<\/script>

</body>
</html>`;

// ══════════════════════════════════════════════════════════════════
// PREVIEW PANEL COMPONENT
// ══════════════════════════════════════════════════════════════════

export default function PreviewPanel({ code, refreshKey }) {
  const iframeRef = useRef(null);
  const [error, setError] = useState(null);
  const blobUrlRef = useRef(null);

  const updatePreview = useCallback(() => {
    if (!iframeRef.current) return;

    try {
      if (typeof code !== "string" || code.trim().length === 0) {
        setError(null);
        return;
      }

      const sanitizedCode = sanitizeUserCode(code);
      const htmlContent = SANDBOX_HTML.replace("__USER_CODE__", sanitizedCode);
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);

      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = url;

      iframeRef.current.src = url;
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
      <iframe
        ref={iframeRef}
        title="Code Preview"
        className="w-full h-full border-0"
        sandbox="allow-scripts"
        loading="lazy"
      />
    </div>
  );
}