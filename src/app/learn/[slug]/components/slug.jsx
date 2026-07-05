"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Lightbulb,
  Eye,
  ChevronRight,
  ChevronLeft,
  Bug,
  BookOpen,
  FolderGit2,
  AlignLeft,
  Code,
  LayoutTemplate,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import dynamic from "next/dynamic";

import { learningTopics, bugChallenges, miniProjects } from "../../data";

// Lazy-load heavy browser-only components
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

// ══════════════════════════════════════════════════════════════════
// DATA HELPERS
// ══════════════════════════════════════════════════════════════════

function findItemBySlug(slug) {
  const li = learningTopics.findIndex((t) => t.slug === slug);
  if (li !== -1)
    return { item: learningTopics[li], type: "learning", index: li, items: learningTopics };

  const bi = bugChallenges.findIndex((b) => b.slug === slug);
  if (bi !== -1)
    return { item: bugChallenges[bi], type: "bug", index: bi, items: bugChallenges };

  const pi = miniProjects.findIndex((p) => p.slug === slug);
  if (pi !== -1)
    return { item: miniProjects[pi], type: "mini-project", index: pi, items: miniProjects };

  return null;
}

function normalizeToQuestions(found) {
  const { item, type } = found;

  if (type === "learning") {
    return [
      {
        id: item.id,
        title: item.title,
        explanation: item.explanation || "",
        keyRules: item.keyRules || [],
        task: item.task || "",
        hint: item.hint || "",
        starterCode: item.starterCode || "",
        solutionCode: item.solutionCode || "",
        tests: item.tests || [],
      },
    ];
  }

  if (type === "bug") {
    return [
      {
        id: item.id,
        title: item.title,
        bugReport: item.bugReport || "",
        description: item.description || "",
        tags: item.tags || [],
        starterCode: item.buggyCode || "",
        solutionCode: item.solutionCode || "",
        tests: item.tests || [],
      },
    ];
  }

  if (type === "mini-project") {
    return [{
      id: item.id,
      title: item.title,
      projectTitle: item.title,
      description: item.description || "",
      requirements: item.steps || [],
      hint: item.hint || "",
      starterCode: item.starterCode || "",
      solutionCode: item.solutionCode || "",
      tests: item.tests || [],
    }];
  }
  return [];
}

function renderInline(text) {
  const boldParts = text.split(/(\*\*[^*]+\*\*)/g);
  return boldParts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const codeParts = part.split(/(`[^`]+`)/g);
    return codeParts.map((cp, j) => {
      if (cp.startsWith("`") && cp.endsWith("`")) {
        return (
          <code key={`${i}-${j}`} className="text-yellow-300 bg-yellow-500/15 px-1 rounded text-xs font-mono">
            {cp.slice(1, -1)}
          </code>
        );
      }
      return cp;
    });
  });
}

function renderMarkdown(text) {
  if (!text) return null;
  return text.split("\n").map((line, i) => {
    if (line.startsWith("## ")) {
      return (
        <h3 key={i} className="text-white font-bold text-sm mt-3 mb-1">
          {line.slice(3)}
        </h3>
      );
    }
    if (line.startsWith("# ")) {
      return (
        <h2 key={i} className="text-white font-bold text-base mt-4 mb-1.5">
          {line.slice(2)}
        </h2>
      );
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      return (
        <div key={i} className="flex gap-2 text-slate-300 text-sm leading-relaxed">
          <span className="text-yellow-400 flex-shrink-0 mt-0.5">•</span>
          <span>{renderInline(line.slice(2))}</span>
        </div>
      );
    }
    if (line.trim() === "") {
      return <div key={i} className="h-1.5" />;
    }
    return (
      <p key={i} className="text-slate-300 text-sm leading-relaxed">
        {renderInline(line)}
      </p>
    );
  });
}

// ══════════════════════════════════════════════════════════════════
// INFO PANELS
// ══════════════════════════════════════════════════════════════════

function LearningInfoPanel({ question, showHint }) {
  return (
    <div className="px-5 py-4 space-y-4">
      <h2 className="text-xl font-bold text-white leading-tight">
        {question.title}
      </h2>

      {question.explanation && (
        <div className="space-y-1">
          {renderMarkdown(question.explanation)}
        </div>
      )}

      {question.keyRules?.length > 0 && (
        <div className="rounded-xl border border-orange-500/25 bg-orange-500/5 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-orange-500/20 bg-orange-500/10">
            <BookOpen size={13} className="text-orange-400" />
            <span className="text-orange-400 text-xs font-semibold tracking-wider uppercase">
              Key Rules
            </span>
          </div>
          <ul className="px-3 py-2.5 space-y-1.5">
            {question.keyRules.map((rule, i) => (
              <li
                key={i}
                className="text-slate-300 text-sm leading-relaxed flex gap-2"
              >
                <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {question.task && (
        <div className="rounded-xl border border-yellow-500/25 bg-yellow-500/5 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-yellow-500/20 bg-yellow-500/10">
            <AlignLeft size={13} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold tracking-wider uppercase">
              Your Task
            </span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed px-3 py-2.5 whitespace-pre-line">
            {question.task}
          </p>
        </div>
      )}

      <AnimatePresence>
        {showHint && question.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-amber-500/20 bg-amber-500/10">
                <Lightbulb size={13} className="text-amber-400" />
                <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">
                  Hint
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed px-3 py-2.5">
                {question.hint}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BugInfoPanel({ question }) {
  return (
    <div className="px-5 py-4 space-y-4">
      <h2 className="text-xl font-bold text-white leading-tight">
        {question.title}
      </h2>

      <div className="rounded-xl border border-red-500/25 bg-red-500/5 overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-red-500/20 bg-red-500/10">
          <Bug size={13} className="text-red-400" />
          <span className="text-red-400 text-xs font-semibold tracking-wider uppercase">
            Bug Report
          </span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed px-3 py-2.5">
          {question.bugReport}
        </p>
      </div>

      {question.tags?.length > 0 && (
        <div className="flex items-center flex-wrap gap-2">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-0.5 rounded-full bg-yellow-500/12 text-yellow-300 border border-yellow-500/25"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

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

function MiniProjectInfoPanel({ question, showHint }) {
  return (
    <div className="px-5 py-4 space-y-4">
      <div className="flex items-center gap-2.5">
        <FolderGit2 size={18} className="text-yellow-400 flex-shrink-0" />
        <h2 className="text-xl font-bold text-white leading-tight">
          {question.title}
        </h2>
      </div>

      {question.description && (
        <p className="text-slate-400 text-sm leading-relaxed">
          {question.description}
        </p>
      )}

      {question.requirements?.length > 0 && (
        <div className="space-y-3">
          {question.requirements.map((step, i) => (
            <div
              key={i}
              className="rounded-xl border border-orange-500/25 bg-orange-500/5 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-3 py-2 border-b border-orange-500/20 bg-orange-500/10">
                <span className="text-orange-600 text-[10px] font-bold bg-orange-500/20 px-1.5 py-0.5 rounded">
                  {i + 1}
                </span>
                <span className="text-orange-300 text-xs font-semibold">
                  {step.title}
                </span>
              </div>
              <ul className="px-3 py-2.5 space-y-1.5">
                {(step.instructions || []).map((instr, j) => (
                  <li
                    key={j}
                    className="text-slate-300 text-sm leading-relaxed flex gap-2"
                  >
                    <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                    <span>{instr}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showHint && question.hint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-amber-500/20 bg-amber-500/10">
                <Lightbulb size={13} className="text-amber-400" />
                <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">
                  Hint
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed px-3 py-2.5">
                {question.hint}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// TEST PANEL
// ══════════════════════════════════════════════════════════════════

function TestPanel({ tests, results, allPassed, onCheck }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a0a] border-b border-slate-800/50 flex-shrink-0">
        <span className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase">
          Tests
        </span>
        {results && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${allPassed
              ? "bg-green-500/15 text-green-400 border border-green-500/25"
              : "bg-red-500/15 text-red-400 border border-red-500/25"
              }`}
          >
            {results.filter(Boolean).length}/{results.length} Passed
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {tests.map((test, i) => {
          const passed = results?.[i];
          return (
            <div
              key={test.id || i}
              className={`flex items-start gap-2.5 px-3 py-2 rounded-lg border transition-colors ${passed === true
                ? "bg-green-500/5 border-green-500/20"
                : passed === false
                  ? "bg-red-500/5 border-red-500/20"
                  : "bg-slate-800/20 border-slate-800/30"
                }`}
            >
              {passed === true ? (
                <CheckCircle2
                  size={15}
                  className="text-green-400 mt-0.5 flex-shrink-0"
                />
              ) : passed === false ? (
                <XCircle
                  size={15}
                  className="text-red-400 mt-0.5 flex-shrink-0"
                />
              ) : (
                <AlertCircle
                  size={15}
                  className="text-slate-600 mt-0.5 flex-shrink-0"
                />
              )}
              <span
                className={`text-sm leading-snug ${passed === true
                  ? "text-green-300"
                  : passed === false
                    ? "text-red-300"
                    : "text-slate-400"
                  }`}
              >
                {test.description}
              </span>
            </div>
          );
        })}
      </div>

      <div className="px-4 py-3 border-t border-slate-800/50 flex-shrink-0">
        <button
          onClick={onCheck}
          className="w-full py-2.5 cursor-pointer rounded-lg font-semibold text-sm transition-all duration-150 active:scale-[0.98] bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white shadow-lg shadow-yellow-900/30"
        >
          Run Tests
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// TOP BAR
// ══════════════════════════════════════════════════════════════════

function TopBar({
  type,
  questions,
  currentIdx,
  allPassed,
  showHint,
  onToggleHint,
  onReset,
  onShowSolution,
  onNext,
  onPrev,
  onBack,
  onGoToStep,
  isExplanationOnly,
}) {
  const isLast = currentIdx === questions.length - 1;
  const isFirst = currentIdx === 0;
  const currentQ = questions[currentIdx];

  const sectionIcon =
    type === "learning" ? (
      <BookOpen size={16} className="text-orange-400" />
    ) : type === "bug" ? (
      <Bug size={16} className="text-red-400" />
    ) : (
      <FolderGit2 size={16} className="text-yellow-400" />
    );

  const sectionLabel =
    type === "learning" ? "Learning" : type === "bug" ? "Bug Fix" : "Mini Project";

  const hasHint =
    (type === "learning" || type === "mini-project") && currentQ?.hint;

  return (
    <header className="h-[60px] md:h-[65px] flex-shrink-0 flex items-center justify-between px-4 md:px-6 bg-[#0a0a0a] border-b border-slate-800/70 z-20">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onBack}
          className="flex cursor-pointer items-center gap-1.5 text-slate-400 hover:text-white transition-colors flex-shrink-0"
          aria-label="Go back to learning page"
        >
          <ChevronLeft size={18} />
          <span className="text-xs font-medium hidden sm:inline">Back</span>
        </button>

        <div className="h-5 w-px bg-slate-800 flex-shrink-0" />

        <div className="flex items-center gap-2 min-w-0">
          {sectionIcon}
          <span className="text-slate-500 text-[10px] font-semibold tracking-wider uppercase hidden sm:inline">
            {sectionLabel}
          </span>
        </div>

        {!isExplanationOnly && questions.length > 1 && (
          <div className="flex items-center gap-1.5 ml-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => onGoToStep(i)}
                className={`min-w-[22px] h-[22px] flex items-center justify-center rounded-full text-[10px] font-bold border transition-all duration-300 ${i === currentIdx
                  ? "bg-yellow-600 border-yellow-500 text-white scale-110 shadow-lg shadow-yellow-900/50"
                  : i < currentIdx
                    ? "bg-slate-700 border-slate-600 text-slate-300"
                    : "bg-transparent border-slate-700 text-slate-500"
                  }`}
                aria-label={`Go to step ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <h1 className="text-white text-sm font-semibold truncate hidden md:block max-w-[200px] lg:max-w-[300px]">
          {currentQ.title}
        </h1>
      </div>

      {/* Right */}
      {!isExplanationOnly ? (
        <nav className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
          <button
            onClick={onReset}
            title="Reset Code"
            className="flex cursor-pointer items-center gap-1 px-2 md:px-2.5 py-1.5 text-[10px] md:text-xs font-medium rounded-lg text-slate-400 hover:text-white border border-slate-700/50 hover:border-slate-600 transition-all active:scale-95"
          >
            <RotateCcw size={13} />
            <span className="hidden lg:inline">Reset</span>
          </button>

          {hasHint && (
            <button
              onClick={onToggleHint}
              title="Show Hint"
              className={`flex items-center cursor-pointer gap-1 px-2 md:px-2.5 py-1.5 text-[10px] md:text-xs font-medium rounded-lg border transition-all active:scale-95 ${showHint
                ? "text-amber-400 border-amber-500/40 bg-amber-500/10"
                : "text-slate-400 hover:text-white border-slate-700/50 hover:border-slate-600"
                }`}
            >
              <Lightbulb size={13} />
              <span className="hidden lg:inline">Hint</span>
            </button>
          )}

          <button
            onClick={onShowSolution}
            title="Show Solution"
            className="flex items-center cursor-pointer gap-1 px-2 md:px-2.5 py-1.5 text-[10px] md:text-xs font-medium rounded-lg text-slate-400 hover:text-white border border-slate-700/50 hover:border-slate-600 transition-all active:scale-95"
          >
            <Eye size={13} />
            <span className="hidden lg:inline">Solution</span>
          </button>

          {questions.length > 1 && !isFirst && (
            <button
              onClick={onPrev}
              className="flex items-center gap-1 px-2 py-1.5 text-[10px] md:text-xs font-medium rounded-lg text-slate-400 hover:text-white border border-slate-700/50 hover:border-slate-600 transition-all active:scale-95"
              aria-label="Previous step"
            >
              <ChevronLeft size={13} />
            </button>
          )}

          {allPassed && (
            <button
              onClick={onNext}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white transition-all active:scale-95 shadow-lg shadow-yellow-900/30"
            >
              {isLast ? "Finish" : (
                <>
                  Next <ChevronRight size={13} />
                </>
              )}
            </button>
          )}
        </nav>
      ) : (
        <nav className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
          <span className="text-slate-600 text-[10px] font-semibold tracking-wider uppercase hidden sm:inline">
            Read Only
          </span>
        </nav>
      )}
    </header>
  );
}

// ══════════════════════════════════════════════════════════════════
// NOT FOUND
// ══════════════════════════════════════════════════════════════════

function NotFound({ onBack }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#050505] text-center gap-4 px-4">
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <XCircle size={28} className="text-red-400" />
      </div>
      <h1 className="text-2xl font-bold text-white">Topic Not Found</h1>
      <p className="text-slate-400 text-sm max-w-md">
        The topic you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <button
        onClick={onBack}
        className="mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-500 hover:to-orange-500 transition-all"
      >
        Back to Learning
      </button>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════

export default function LearnDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;

  const found = useMemo(() => findItemBySlug(slug), [slug]);
  const questions = useMemo(
    () => (found ? normalizeToQuestions(found) : []),
    [found]
  );

  // Check if this is explanation-only (showInApp: false in learningTopics)
  const isExplanationOnly = useMemo(() => {
    return found?.type === "learning" && found.item.showInApp === false;
  }, [found]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [code, setCode] = useState("");
  const [previewCode, setPreviewCode] = useState("");
  const [previewKey, setPreviewKey] = useState(0);
  const [testResults, setTestResults] = useState(undefined);
  const [showHint, setShowHint] = useState(false);
  const allPassed =
    Array.isArray(testResults) && testResults.length > 0 && testResults.every(Boolean);
  const currentQuestion = questions[currentIdx];

  // Desktop detection
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Initialize code when question changes
  useEffect(() => {
    if (!currentQuestion) return;
    setCode(currentQuestion.starterCode);
    setPreviewCode(currentQuestion.starterCode);
    setPreviewKey((k) => k + 1);
    setTestResults(undefined);
    setShowHint(false);
  }, [currentQuestion?.id]);

  // Resize states
  const containerRef = useRef(null);
  const [leftWidth, setLeftWidth] = useState(50);
  const [leftTopHeight, setLeftTopHeight] = useState(45);
  const [rightTopHeight, setRightTopHeight] = useState(55);
  const [isDragging, setIsDragging] = useState(false);

  // Mobile tab
  const [activeTab, setActiveTab] = useState("info");

  // Handlers
  const handleCheck = useCallback(() => {
    if (!currentQuestion) return;
    const results = currentQuestion.tests.map((t) => {
      try {
        const checkFn =
          typeof t.check === "function"
            ? t.check
            : new Function("code", `return (${t.check})(code)`);
        return Boolean(checkFn(code));
      } catch {
        return false;
      }
    });
    setTestResults(results);
    setPreviewCode(code);
    setPreviewKey((k) => k + 1);
  }, [code, currentQuestion]);

  const handleReset = useCallback(() => {
    if (!currentQuestion) return;
    setCode(currentQuestion.starterCode);
    setTestResults(undefined);
  }, [currentQuestion]);

  const handleShowSolution = useCallback(() => {
    if (!currentQuestion?.solutionCode) return;
    setCode(currentQuestion.solutionCode);
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      router.push("/learn");
    }
  }, [currentIdx, questions.length, router]);

  const handlePrev = useCallback(() => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  }, [currentIdx]);

  const handleBack = useCallback(() => {
    router.push("/learn");
  }, [router]);

  // Universal drag handler
  const createDragHandler = useCallback((type) => (e) => {
    if (e.cancelable) e.preventDefault();
    setIsDragging(true);
    const isTouch = e.type.startsWith("touch");

    const handleMove = (moveEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = isTouch
        ? moveEvent.touches[0].clientX
        : moveEvent.clientX;
      const cy = isTouch
        ? moveEvent.touches[0].clientY
        : moveEvent.clientY;

      if (type === "horizontal") {
        const pct = ((cx - rect.left) / rect.width) * 100;
        if (pct >= 20 && pct <= 80) setLeftWidth(pct);
      } else if (type === "leftVertical") {
        const pct = ((cy - rect.top) / rect.height) * 100;
        if (pct >= 12 && pct <= 85) setLeftTopHeight(pct);
      } else if (type === "rightVertical") {
        const pct = ((cy - rect.top) / rect.height) * 100;
        if (pct >= 15 && pct <= 85) setRightTopHeight(pct);
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
  }, []);

  // Not found
  if (!found || questions.length === 0) {
    return <NotFound onBack={handleBack} />;
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#050505] overflow-hidden select-none">
      {/* Top Bar */}
      <TopBar
        type={found.type}
        questions={questions}
        currentIdx={currentIdx}
        onGoToStep={setCurrentIdx}
        allPassed={allPassed}
        showHint={showHint}
        onToggleHint={() => setShowHint((h) => !h)}
        onReset={handleReset}
        onShowSolution={handleShowSolution}
        onNext={handleNext}
        onPrev={handlePrev}
        onBack={handleBack}
        isExplanationOnly={isExplanationOnly}
      />

      {/* Main Workspace */}
      {isExplanationOnly ? (
        /* ─── EXPLANATION ONLY VIEW ─── */
        <div className="flex-1 min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="h-full overflow-y-auto px-6 py-4 md:px-10 md:py-8"
            >
              {found.type === "learning" && (
                <LearningInfoPanel
                  question={currentQuestion}
                  showHint={showHint}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* ─── NORMAL 4-PANEL VIEW ─── */
        <div
          ref={containerRef}
          className="flex-1 min-h-0 relative flex flex-row overflow-hidden"
        >
          {isDragging && (
            <div className="absolute inset-0 z-40 bg-transparent cursor-grabbing" />
          )}

          {/* LEFT COLUMN */}
          <div
            className={
              isDesktop
                ? "flex flex-col h-full min-w-0"
                : activeTab === "info" || activeTab === "editor"
                  ? "flex flex-col h-full min-w-0 w-full"
                  : "hidden"
            }
            style={
              isDesktop
                ? { flex: `0 0 ${leftWidth}%`, maxWidth: `${leftWidth}%` }
                : undefined
            }
          >
            {/* Info Panel */}
            <div
              className={
                isDesktop
                  ? "flex flex-col overflow-hidden flex-shrink-0 border-b border-gray-800/60"
                  : activeTab === "info"
                    ? "flex flex-col h-full overflow-hidden border-b border-gray-800/60"
                    : "hidden"
              }
              style={
                isDesktop
                  ? {
                    flex: `0 0 ${leftTopHeight}%`,
                    maxHeight: `${leftTopHeight}%`,
                  }
                  : undefined
              }
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="h-full overflow-y-auto"
                >
                  {found.type === "learning" && (
                    <LearningInfoPanel
                      question={currentQuestion}
                      showHint={showHint}
                    />
                  )}
                  {found.type === "bug" && (
                    <BugInfoPanel question={currentQuestion} />
                  )}
                  {found.type === "mini-project" && (
                    <MiniProjectInfoPanel
                      question={currentQuestion}
                      showHint={showHint}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Left Vertical Drag Handle (desktop only) */}
            {isDesktop && (
              <div
                onMouseDown={createDragHandler("leftVertical")}
                onTouchStart={createDragHandler("leftVertical")}
                className="h-[4px] w-full bg-slate-800/80 hover:bg-yellow-600/60 active:bg-yellow-500 transition-colors duration-150 cursor-row-resize items-center justify-center relative group z-50 flex-shrink-0 flex"
              >
                <div className="absolute z-50 rounded-full flex flex-row gap-[4px] px-2.5 py-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#1a1a2e] border border-yellow-600/40 shadow-xl pointer-events-none">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="block w-[3px] h-[3px] rounded-full bg-yellow-400/90"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Code Editor */}
            <div
              className={
                isDesktop
                  ? "flex flex-col flex-1 min-h-0 border-r border-slate-800/60"
                  : activeTab === "editor"
                    ? "flex flex-col flex-1 min-h-0 border-r border-slate-800/60"
                    : "hidden"
              }
            >
              <div className="flex items-center justify-between px-4 py-1.5 bg-black border-b border-slate-800/50 flex-shrink-0">
                <span className="text-slate-600 text-[10px] font-semibold tracking-widest uppercase">
                  Editor
                </span>
                <span className="text-slate-700 text-[10px] font-mono">
                  JavaScript · JSX
                </span>
              </div>
              <div className="flex-1 min-h-0">
                <CodeEditor value={code} onChange={setCode} />
              </div>
            </div>
          </div>

          {/* HORIZONTAL DRAG HANDLE (desktop only) */}
          {isDesktop && (
            <div
              onMouseDown={createDragHandler("horizontal")}
              onTouchStart={createDragHandler("horizontal")}
              className="w-[4px] h-full bg-slate-800/80 hover:bg-yellow-600/60 active:bg-yellow-500 transition-colors duration-150 cursor-col-resize items-center justify-center relative group z-50 flex-shrink-0 flex"
            >
              <div className="absolute z-50 rounded-full flex flex-col gap-[4px] py-2.5 px-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#1a1a2e] border border-yellow-600/40 shadow-xl pointer-events-none">
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="block w-[3px] h-[3px] rounded-full bg-yellow-400/90"
                  />
                ))}
              </div>
            </div>
          )}

          {/* RIGHT COLUMN */}
          <div
            className={
              isDesktop
                ? "flex flex-col h-full min-w-0"
                : activeTab === "preview" || activeTab === "tests"
                  ? "flex flex-col h-full min-w-0 w-full"
                  : "hidden"
            }
            style={isDesktop ? { flex: "1 1 0%" } : undefined}
          >
            {/* Preview Panel */}
            <div
              className={
                isDesktop
                  ? "flex flex-col overflow-hidden flex-shrink-0"
                  : activeTab === "preview"
                    ? "flex flex-col h-full overflow-hidden"
                    : "hidden"
              }
              style={
                isDesktop
                  ? {
                    flex: `0 0 ${rightTopHeight}%`,
                    maxHeight: `${rightTopHeight}%`,
                  }
                  : undefined
              }
            >
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a0a0a] border-b border-slate-800/50 flex-shrink-0">
                <span className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase">
                  Preview
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-amber-500/80 text-[10px] font-medium">
                    Updates on Run Tests
                  </span>
                </span>
              </div>
              <div className="flex-1 min-h-0">
                <PreviewPanel code={previewCode} refreshKey={previewKey} />
              </div>
            </div>

            {/* Right Vertical Drag Handle (desktop only) */}
            {isDesktop && (
              <div
                onMouseDown={createDragHandler("rightVertical")}
                onTouchStart={createDragHandler("rightVertical")}
                className="h-[4px] w-full bg-slate-800/80 hover:bg-yellow-600/60 active:bg-yellow-500 transition-colors duration-150 cursor-row-resize items-center justify-center relative group z-50 flex-shrink-0 flex"
              >
                <div className="absolute z-50 rounded-full flex flex-row gap-[4px] px-2.5 py-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#1a1a2e] border border-yellow-600/40 shadow-xl pointer-events-none">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="block w-[3px] h-[3px] rounded-full bg-yellow-400/90"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Test Panel */}
            <div
              className={
                isDesktop
                  ? "flex-1 min-h-0"
                  : activeTab === "tests"
                    ? "flex-1 min-h-0"
                    : "hidden"
              }
            >
              <TestPanel
                tests={currentQuestion.tests}
                results={testResults}
                allPassed={allPassed}
                onCheck={handleCheck}
              />
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM TAB BAR — hidden when explanation-only */}
      {!isDesktop && !isExplanationOnly && (
        <nav className="flex items-center justify-around bg-[#080808] border-t border-slate-800/70 p-2 z-30 flex-shrink-0">
          {[
            { key: "info", icon: AlignLeft, label: "Task" },
            { key: "editor", icon: Code, label: "Code" },
            { key: "preview", icon: LayoutTemplate, label: "Preview" },
            { key: "tests", icon: CheckCircle2, label: "Tests" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex flex-col items-center gap-1 p-2 w-16 rounded-lg transition-colors ${activeTab === key
                ? "text-yellow-400 bg-yellow-500/15"
                : "text-slate-500 hover:text-slate-300"
                }`}
              aria-label={`Show ${label} panel`}
              aria-current={activeTab === key ? "true" : undefined}
            >
              <Icon size={20} />
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}