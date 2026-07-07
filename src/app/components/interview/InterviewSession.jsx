"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bug,
  Tag,
  Clock,
  SkipForward,
  ChevronRight,
  Flag,
  AlignLeft,
  Code,
  LayoutTemplate,
  CheckCircle2,
} from "lucide-react";
import dynamic from "next/dynamic";
import TestPanel from "./TestPanel";
import { DIFFICULTY_STYLES } from "../../../lib/interview-questions.js";

// Lazy-load heavy components
const CodeEditor = dynamic(() => import("./CodeEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#0d0d1f]">
      <div className="w-5 h-5 border-2 border-yellow-500/40 border-t-yellow-500 rounded-full animate-spin" />
    </div>
  ),
});

const PreviewPanel = dynamic(() => import("./PreviewPanel"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#0a0a1a] text-slate-600 text-xs">
      Loading preview…
    </div>
  ),
});

function formatTime(seconds) {
  const m = Math.floor(Math.abs(seconds) / 60);
  const s = Math.abs(seconds) % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ── Question Info Panel ────────────────────────────────────────────────────────
function QuestionInfo({ question }) {
  return (
    <div className="px-5 py-4 space-y-4">
      <h2 className="text-xl font-bold text-white leading-tight">
        {question.title}
      </h2>

      <div className="rounded-xl border border-red-500/25 bg-red-500/8 overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-red-500/20 bg-red-500/10">
          <Bug size={13} className="text-red-400 flex-shrink-0" />
          <span className="text-red-400 text-xs font-semibold tracking-wider uppercase">
            Bug Report
          </span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed px-3 py-2.5">
          {question.bugReport}
        </p>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <Tag size={12} className="text-slate-600 flex-shrink-0" />
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-0.5 rounded-full
              bg-white/12 text-white border border-white/25"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          <AlignLeft size={12} className="text-slate-600" />
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
            Fix the Bug: {question.title}
          </span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed pl-4">
          {question.description}
        </p>
      </div>
    </div>
  );
}

// ── Main Session Component ─────────────────────────────────────────────────────
export default function InterviewSession({
  questions,
  currentIdx,
  timeLeft,
  totalTime,
  onSkip,
  onNext,
  onComplete,
  recordResult,
}) {
  const question = questions[currentIdx];
  const isLastQuestion = currentIdx === questions.length - 1;

  const [code, setCode] = useState(question.buggyCode);
  const [previewCode, setPreviewCode] = useState(question.buggyCode);
  const [previewKey, setPreviewKey] = useState(0);

  const [testResults, setTestResults] = useState(undefined);
  const allPassed = Array.isArray(testResults) && testResults.every(Boolean);

  // ── REFS TO FIX STALE CLOSURE BUG ──
  // Ye refs hamesha latest values ko hold karenge
  const questionRef = useRef(question);
  const codeRef = useRef(code);

  // Sync refs with latest values on every render
  questionRef.current = question;
  codeRef.current = code;

  // ── CUSTOM RESIZE STATES & REF ──
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(50);
  const [leftTopHeight, setLeftTopHeight] = useState(42);
  const [rightTopHeight, setRightTopHeight] = useState(55);
  const [isDragging, setIsDragging] = useState(false);

  // ── MOBILE TAB STATE ──
  const [activeTab, setActiveTab] = useState("editor");

  useEffect(() => {
    setCode(question.buggyCode);
    setPreviewCode(question.buggyCode);
    setPreviewKey((k) => k + 1);
    setTestResults(undefined);
    setActiveTab("editor");
  }, [currentIdx, question.buggyCode]);

  // ── FIXED: Using refs to always get fresh values ──
  function handleCheck() {
    // Ye function har render pe fresh banta hai
    // Toh `question` aur `code` HAMESHA current hain
    const results = question.tests.map((t) => {
      try {
        return t.check(code);
      } catch (err) {
        console.error("Test execution error:", err);
        return false;
      }
    });

    setTestResults(results);
    setPreviewCode(code);
    setPreviewKey((k) => k + 1);
  }

  // ── FIXED: Same pattern for handleNext ──
  const handleNext = useCallback(() => {
    recordResult(questionRef.current.id, { solved: true });
    onNext();
  }, [recordResult, onNext]);

  // ── FIXED: Same pattern for handleSkip ──
  const handleSkip = useCallback(() => {
    recordResult(questionRef.current.id, { solved: false, skipped: true });
    onSkip();
  }, [recordResult, onSkip]);

  // ── UNIVERSAL DRAG HANDLER (Mouse + Touch for iPad) ──
  const createDragHandler = (type) => (e) => {
    if (e.cancelable) e.preventDefault();
    setIsDragging(true);
    const isTouch = e.type.startsWith("touch");

    const handleMove = (moveEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = isTouch ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const clientY = isTouch ? moveEvent.touches[0].clientY : moveEvent.clientY;

      if (type === "horizontal") {
        const percentage = ((clientX - rect.left) / rect.width) * 100;
        if (percentage >= 20 && percentage <= 80) setLeftWidth(percentage);
      } else if (type === "leftVertical") {
        const percentage = ((clientY - rect.top) / rect.height) * 100;
        if (percentage >= 12 && percentage <= 85) setLeftTopHeight(percentage);
      } else if (type === "rightVertical") {
        const percentage = ((clientY - rect.top) / rect.height) * 100;
        if (percentage >= 15 && percentage <= 85) setRightTopHeight(percentage);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      if (isTouch) {
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
      } else {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
      }
    };

    if (isTouch) {
      document.addEventListener("touchmove", handleMove, { passive: false });
      document.addEventListener("touchend", handleEnd);
    } else {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[#050505] overflow-hidden select-none">
      {/* ── Top Bar ── */}
      <TopBar
        questions={questions}
        currentIdx={currentIdx}
        timeLeft={timeLeft}
        totalTime={totalTime}
        onSkip={handleSkip}
        isLastQuestion={isLastQuestion}
        allPassed={allPassed}
        onNext={handleNext}
      />

      {/* ── Main Workspace Area ── */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 relative flex flex-row overflow-hidden"
      >
        {isDragging && (
          <div className="absolute inset-0 z-40 bg-transparent cursor-grabbing" />
        )}

        {/* ─────────────────── LEFT COLUMN ─────────────────── */}
        <div
          className={`flex-col h-full min-w-0 ${activeTab === 'question' || activeTab === 'editor' ? 'flex w-full' : 'hidden'
            } md:flex md:w-[var(--desktop-width)]`}
          style={{ "--desktop-width": `${leftWidth}%` }}
        >
          {/* Question Info Panel */}
          <div
            className={`border-b border-gray-800/60 overflow-hidden flex-shrink-0 ${activeTab === 'question' ? 'flex h-full' : 'hidden'
              } md:block md:h-[var(--desktop-left-top)]`}
            style={{ "--desktop-left-top": `${leftTopHeight}%` }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full overflow-y-auto"
              >
                <QuestionInfo question={question} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Vertical drag handle (Left Column) */}
          <div
            onMouseDown={createDragHandler("leftVertical")}
            onTouchStart={createDragHandler("leftVertical")}
            className="hidden md:flex h-[4px] w-full bg-slate-800/80 hover:bg-yellow-600/60 active:bg-yellow-500 transition-colors duration-150 cursor-row-resize items-center justify-center relative group z-50 flex-shrink-0"
          >
            <div className="absolute z-50 rounded-full flex flex-row gap-[4px] px-2.5 py-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#1a1a2e] border border-yellow-600/40 shadow-xl">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="block w-[3px] h-[3px] rounded-full bg-yellow-400/90" />
              ))}
            </div>
          </div>

          {/* Code Editor Panel */}
          <div className={`flex-1 min-h-0 flex-col border-r border-slate-800/60 ${activeTab === 'editor' ? 'flex' : 'hidden'
            } md:flex`}>
            <div className="flex items-center justify-between px-4 py-1.5 bg-black border-b border-slate-800/50 flex-shrink-0">
              <span className="text-slate-600 text-[10px] font-semibold tracking-widest uppercase">
                Editor
              </span>
              <span className="text-slate-700 text-[10px] font-mono">
                Python
              </span>
            </div>
            <div className="flex-1 min-h-0">
              <CodeEditor value={code} onChange={setCode} />
            </div>
          </div>
        </div>

        {/* ─────────────────── MAIN HORIZONTAL HANDLE ─────────────────── */}
        <div
          onMouseDown={createDragHandler("horizontal")}
          onTouchStart={createDragHandler("horizontal")}
          className="hidden md:flex w-[4px] h-full bg-slate-800/80 hover:bg-white/60 active:bg-white transition-colors duration-150 cursor-col-resize items-center justify-center relative group z-50 flex-shrink-0"
        >
          <div className="absolute z-50 rounded-full flex flex-col gap-[4px] py-2.5 px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#1a1a2e] border border-white/40 shadow-xl">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="block w-[3px] h-[3px] rounded-full bg-white/90" />
            ))}
          </div>
        </div>

        {/* ─────────────────── RIGHT COLUMN ─────────────────── */}
        <div
          className={`flex-col h-full min-w-0 flex-1 ${activeTab === 'preview' || activeTab === 'tests' ? 'flex w-full' : 'hidden'
            } md:flex`}
        >
          {/* Preview Panel */}
          <div
            className={`flex-col overflow-hidden flex-shrink-0 ${activeTab === 'preview' ? 'flex h-full' : 'hidden'
              } md:flex md:h-[var(--desktop-right-top)]`}
            style={{ "--desktop-right-top": `${rightTopHeight}%` }}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-slate-800/50 flex-shrink-0">
              <span className="text-[#a3a3a3] text-[10px] font-semibold tracking-widest uppercase">
                Preview
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-amber-500/80 text-[10px] font-medium">
                  Updates on Check
                </span>
              </span>
            </div>
            <div className="flex-1 min-h-0">
              <PreviewPanel code={previewCode} refreshKey={previewKey} />
            </div>
          </div>

          {/* Vertical drag handle (Right Column) */}
          <div
            onMouseDown={createDragHandler("rightVertical")}
            onTouchStart={createDragHandler("rightVertical")}
            className="hidden md:flex h-[4px] w-full bg-slate-800/80 hover:bg-white/60 active:bg-white transition-colors duration-150 cursor-row-resize items-center justify-center relative group z-50 flex-shrink-0"
          >
            <div className="absolute z-50 rounded-full flex flex-row gap-[4px] px-2.5 py-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#1a1a2e] border border-white/40 shadow-xl">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="block w-[3px] h-[3px] rounded-full bg-white/90" />
              ))}
            </div>
          </div>

          {/* Test Panel */}
          <div className={`flex-1 min-h-0 ${activeTab === 'tests' ? 'block' : 'hidden'
            } md:block`}>
            <TestPanel
              tests={question.tests}
              results={testResults}
              allPassed={allPassed}
              onCheck={handleCheck}
              onNext={handleNext}
              isLastQuestion={isLastQuestion}
            />
          </div>
        </div>
      </div>

      {/* ─────────────────── MOBILE BOTTOM TAB BAR ─────────────────── */}
      <div className="md:hidden flex items-center justify-around bg-[#080808] border-t border-slate-800/70 p-2 pb-safe z-30 flex-shrink-0">
        <button
          onClick={() => setActiveTab('question')}
          className={`flex flex-col items-center gap-1 p-2 w-16 rounded-lg transition-colors ${activeTab === 'question' ? 'text-white bg-white/35' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <AlignLeft size={20} />
          <span className="text-[10px] font-semibold">Task</span>
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex flex-col items-center gap-1 p-2 w-16 rounded-lg transition-colors ${activeTab === 'editor' ? 'text-white bg-white/15' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Code size={20} />
          <span className="text-[10px] font-semibold">Code</span>
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex flex-col items-center gap-1 p-2 w-16 rounded-lg transition-colors ${activeTab === 'preview' ? 'text-white bg-white/15' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <LayoutTemplate size={20} />
          <span className="text-[10px] font-semibold">Preview</span>
        </button>
        <button
          onClick={() => setActiveTab('tests')}
          className={`flex flex-col items-center gap-1 p-2 w-16 rounded-lg transition-colors ${activeTab === 'tests' ? 'text-white bg-white/15' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <CheckCircle2 size={20} />
          <span className="text-[10px] font-semibold">Tests</span>
        </button>
      </div>
    </div>
  );
}

function TopBar({
  questions,
  currentIdx,
  timeLeft,
  totalTime,
  onSkip,
  isLastQuestion,
  allPassed,
  onNext,
}) {
  const isWarning = timeLeft <= 120 && timeLeft > 60;
  const isDanger = timeLeft <= 60;
  const currentQ = questions[currentIdx];
  const diff = DIFFICULTY_STYLES[currentQ.difficulty] || { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20', dot: 'bg-gray-400', label: 'Unknown' };

  return (
    <div className="h-[65px] md:h-[70px] flex-shrink-0 flex items-center justify-between px-4 md:px-8 bg-[#0a0a0a] border-b border-slate-800/70 backdrop-blur-sm z-20 gap-4">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex items-center gap-1.5 md:gap-2 py-1.5">
          {questions.map((_, i) => (
            <button
              key={i}
              aria-label={`Question ${i + 1}`}
              className={`min-w-[26px] w-[26px] h-[26px] md:min-w-[30px] md:w-[30px] md:h-[30px] flex items-center justify-center rounded-full text-[11px] md:text-xs font-bold border transition-all duration-300 flex-shrink-0
                ${i === currentIdx
                  ? "bg-gray-400 border-white/30 text-white scale-110 shadow-md shadow-orange-500/20"
                  : i < currentIdx
                    ? "bg-slate-800 border-slate-700 text-slate-300"
                    : "bg-transparent border-slate-800 text-slate-600"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <span className="text-slate-500 text-xs hidden md:block whitespace-nowrap font-medium ml-1">
          Challenge {currentIdx + 1} of {questions.length}
        </span>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        <span className={`hidden lg:inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${diff.bg} ${diff.text} ${diff.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${diff.dot}`} />
          {diff.label}
        </span>

        <span className="text-slate-500 text-xs hidden sm:block font-medium">
          {Math.floor(currentQ.timeLimit / 60)} min
        </span>

        <div className={`flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg font-mono font-bold text-xs md:text-sm border transition-all duration-500 
          ${isDanger
            ? "bg-red-500/10 border-red-500/30 text-red-400 animate-pulse"
            : isWarning
              ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
              : "bg-slate-900 border-slate-800 text-slate-300"
          }`}
        >
          <Clock size={14} />
          {formatTime(timeLeft)}
        </div>

        {allPassed ? (
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 text-xs font-semibold rounded-lg bg-white text-black transition-all duration-150 active:scale-95 shadow-sm shadow-orange-600/20"
          >
            {isLastQuestion ? (
              <><Flag size={13} /> <span>Finish</span></>
            ) : (
              <><span>Next</span> <ChevronRight size={13} /></>
            )}
          </button>
        ) : (
          <button
            onClick={onSkip}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700 bg-slate-900/50 transition-all duration-150 active:scale-95"
          >
            <SkipForward size={13} /> <span className="hidden sm:inline ml-0.5">Skip</span>
          </button>
        )}
      </div>
    </div>
  );
}