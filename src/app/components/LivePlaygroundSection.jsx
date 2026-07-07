"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, RefreshCw } from "lucide-react";
import { Check, ExternalLink, Eye, Settings, Play, Terminal } from "lucide-react";

export default function LivePlayground() {
    const [activeTab, setActiveTab] = useState("main.py");
    const [copied, setCopied] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState([]);

    const handleRun = () => {
        if (isRunning) return;
        
        setIsRunning(true);
        setOutput([]); // clear previous output
        
        // Mock output lines to simulate CLI execution
        const scriptOutput = [
            { text: "$ node main.py", delay: 100, type: "cmd" },
            { text: "Starting data analysis...", delay: 600, type: "log" },
            { text: "Result: [ 'Alice', 'Charlie' ]", delay: 1200, type: "success" },
            { text: "Process exited with code 0", delay: 1800, type: "system" }
        ];

        scriptOutput.forEach((line, index) => {
            setTimeout(() => {
                setOutput((prev) => [...prev, line]);
                if (index === scriptOutput.length - 1) {
                    setIsRunning(false);
                }
            }, line.delay);
        });
    };

    useEffect(() => {
        handleRun();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCopy = () => {
        let textToCopy = `def process_users(users):
  print("Starting data analysis...")
  return [u["name"] for u in users if u["isActive"]]

data = [
  { "id": 1, "name": "Alice", "isActive": True }, 
  { "id": 2, "name": "Bob", "isActive": False }, 
  { "id": 3, "name": "Charlie", "isActive": True } 
]

active_users = process_users(data)
print(f"Result: {active_users}")`;

        // 2. Copy karne ka logic sirf EK baar (No code repetition)
        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                })
                .catch((err) => {
                    console.error("Copy karne me error aayi: ", err);
                });
        }
    };

    const handleRefresh = () => {
        setCount(0)
    }

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 },
        },
    };

    return (
        <section id="how-it-works" className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

        {/* Left Content Column */}
        <motion.div
            className="lg:col-span-5 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
        >
            <motion.span
                variants={fadeInUp}
                className="text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-neutral-200 to-neutral-600 bg-clip-text text-transparent mb-3 block"
            >
                LIVE PLAYGROUND
            </motion.span>

            <motion.h2
                variants={fadeInUp}
                className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6"
            >
                Code. Preview.<br />Ship.
            </motion.h2>

            <motion.p
                variants={fadeInUp}
                className="text-zinc-400 text-base sm:text-lg mb-8 max-w-md leading-relaxed"
            >
                {/* Updated description to Python */}
                Our in-browser IDE lets you write Python code and see results instantly.
            </motion.p>

            {/* Features List */}
            <motion.div variants={fadeInUp} className="space-y-4 mb-10">
                {[
                    "Real-time code preview",
                    "Error highlighting",
                    "Auto-complete",
                    "Export & share your work"
                ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full border border-white/30 bg-white/10 flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-zinc-300 font-medium text-sm sm:text-base">{feature}</span>
                    </div>
                ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeInUp}>
                <a
                    href="/compailer"
                    className="inline-flex items-center space-x-2 bg-transparent border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200 text-sm group"
                >
                    <span>Let's Code Your Thoughts!</span>
                    <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                </a>
            </motion.div>
        </motion.div>

        {/* Right IDE Mockup Column */}
        <motion.div
            className="lg:col-span-7 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            {/* Mock IDE Window */}
            <div className="w-full rounded-xl border border-zinc-800/80 bg-[#0B0C10] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">

                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/60 bg-[#090A0D]">
                    {/* Window Controls */}
                    <div className="flex items-center space-x-2 w-20">
                        <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
                        <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
                        <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center space-x-1 bg-zinc-950/40 p-0.5 rounded-md border border-zinc-900">
                        <button
                            onClick={() => setActiveTab("main.py")}
                            className={`px-3 py-1 rounded font-medium text-[11px] sm:text-xs transition-colors ${activeTab === "main.py"
                                ? "bg-[#13151C] text-zinc-200 border border-zinc-800/50"
                                : "text-zinc-500 hover:text-zinc-400 border border-transparent"
                                }`}
                        >
                            main.py
                        </button>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-4 text-zinc-500 w-20 justify-end">
                        <button onClick={handleRun} disabled={isRunning} className={`hover:text-green-400 transition-colors ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`} title="Run Script">
                            <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button onClick={handleCopy} className="hover:text-zinc-300 transition-colors" title="Copy Code">
                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Window Grid Body */}
                <div className="grid grid-cols-1 md:grid-cols-12 min-h-[320px] sm:min-h-[380px]">

                    {/* Code Editor Panel (Left) - UPDATED TO PYTHON */}
                    <div className="md:col-span-7 p-4 sm:p-5 bg-black/40 border-b md:border-b-0 md:border-r border-zinc-800/60 overflow-x-auto overflow-y-auto max-w-full max-h-[500px] selection:bg-purple-500/20 relative">
                        <pre className="text-zinc-400 leading-relaxed font-normal whitespace-pre">
                            <code className="block animate-in fade-in duration-300 whitespace-pre text-left">
                                <span className="text-purple-400">def</span> <span className="text-blue-400">process_users</span>(users):{'\n'}
                                {"  "}<span className="text-orange-300">print</span>(<span className="text-green-400">"Starting data analysis..."</span>){'\n'}
                                {"  "}<span className="text-purple-400">return</span> [u[<span className="text-green-400">"name"</span>] <span className="text-purple-400">for</span> u <span className="text-purple-400">in</span> users <span className="text-purple-400">if</span> u[<span className="text-green-400">"isActive"</span>]]{'\n\n'}

                                data = [{"\n"}
                                {"  { "}<span className="text-green-400">"id"</span>: <span className="text-orange-400">1</span>, <span className="text-green-400">"name"</span>: <span className="text-green-400">"Alice"</span>, <span className="text-green-400">"isActive"</span>: <span className="text-orange-400">True</span> {"}, \n"}
                                {"  { "}<span className="text-green-400">"id"</span>: <span className="text-orange-400">2</span>, <span className="text-green-400">"name"</span>: <span className="text-green-400">"Bob"</span>, <span className="text-green-400">"isActive"</span>: <span className="text-orange-400">False</span> {"}, \n"}
                                {"  { "}<span className="text-green-400">"id"</span>: <span className="text-orange-400">3</span>, <span className="text-green-400">"name"</span>: <span className="text-green-400">"Charlie"</span>, <span className="text-green-400">"isActive"</span>: <span className="text-orange-400">True</span> {"} \n"}
                                ]{'\n\n'}

                                active_users = <span className="text-blue-400">process_users</span>(data){'\n'}
                                <span className="text-orange-300">print</span>(<span className="text-green-400">f"Result: </span>{"{active_users}"}<span className="text-green-400">"</span>)
                            </code>
                        </pre>
                    </div>

                    {/* CLI/Terminal Preview Panel (Right) */}
                    <div className="md:col-span-5 bg-[#050505] flex flex-col relative group/preview">

                        {/* Terminal Header */}
                        <div className="h-8 bg-[#111111] border-b border-zinc-800/80 flex items-center justify-between px-3 w-full">
                            <div className="flex items-center space-x-2 text-zinc-500">
                                <Terminal className="w-3.5 h-3.5" />
                                <span className="text-[10px] uppercase tracking-wider font-semibold">Bash</span>
                            </div>
                            <button
                                onClick={handleRun}
                                disabled={isRunning}
                                className={`text-[10px] px-2 py-0.5 rounded border ${isRunning ? 'border-zinc-800 text-zinc-600' : 'border-zinc-700 hover:border-zinc-500 hover:text-white text-zinc-400'} transition-all`}
                            >
                                {isRunning ? 'Running...' : 'Run'}
                            </button>
                        </div>

                        {/* Terminal Output */}
                        <div className="flex-1 p-4 font-mono text-xs sm:text-[13px] leading-relaxed overflow-y-auto">
                            {output.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`mb-1.5 ${line.type === 'cmd' ? 'text-zinc-500' :
                                        line.type === 'success' ? 'text-green-400 font-semibold' :
                                            line.type === 'system' ? 'text-zinc-600 mt-4' :
                                                'text-zinc-300'
                                        }`}
                                >
                                    {line.text}
                                </motion.div>
                            ))}

                            {/* Blinking Cursor */}
                            {isRunning && (
                                <motion.div
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="w-2 h-3.5 bg-zinc-400 mt-1 inline-block align-middle"
                                />
                            )}

                            {!isRunning && output.length > 0 && (
                                <div className="mt-2 text-zinc-500 flex items-center">
                                    <span className="text-green-500 mr-2">➜</span> ~
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    </div>
</section>
    );
}