"use client";

import { motion } from "framer-motion";
import { Trophy, RotateCcw, BookOpen, CheckCircle2, SkipForward, Clock } from "lucide-react";
import { DIFFICULTY_STYLES } from "../../../lib/interview-questions.js";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function ResultsScreen({ results, onReset }) {
  const { completedData, questionsData, totalTime, timeUsed } = results;

  const solvedCount = questionsData.filter(
    (q) => completedData[q.id]?.solved
  ).length;

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden px-4 py-12">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[480px] h-[480px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(ellipse at center, #ffffff 0%, #ffffff 35%, transparent 72%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center">
        {/* Trophy icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6
            bg-gradient-to-br from-white/70 to-white/60
            border border-white/80"
        >
          <Trophy size={34} className="text-white" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-4xl font-bold text-white mb-2 tracking-tight"
        >
          Interview complete
        </motion.h1>

        {/* Summary line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-slate-400 text-base mb-8"
        >
          You solved{" "}
          <span className="text-yellow-300 font-semibold">{solvedCount}/3</span>{" "}
          challenges in{" "}
          <span className="text-green-400 font-semibold">{formatTime(timeUsed)}</span>{" "}
          of{" "}
          <span className="text-white">{formatTime(totalTime)}</span>
        </motion.p>

        {/* Question result cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3 mb-8"
        >
          {questionsData.map((q, idx) => {
            const result = completedData[q.id];
            const diff = DIFFICULTY_STYLES[q.difficulty];
            const solved = result?.solved;
            const skipped = result?.skipped || !result;

            return (
              <motion.div
                key={q.id}
                variants={cardVariants}
                className="flex items-center justify-between text-left
                  bg-white/10 border border-white/30 rounded-xl px-5 py-4"
              >
                {/* Left: index + title + meta */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-slate-500 text-sm font-medium">
                      {idx + 1}.
                    </span>
                    <h3 className="text-slate-100 font-medium text-sm truncate">
                      {q.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full
                        ${diff.bg} ${diff.text} border ${diff.border}`}
                    >
                      {diff.label}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Clock size={10} />
                      {Math.floor(q.timeLimit / 60)} min
                    </span>
                  </div>
                </div>

                {/* Right: result */}
                <div className="flex-shrink-0 ml-4">
                  {solved ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 + idx * 0.12 }}
                      className="flex items-center gap-1.5 text-green-400 font-mono font-semibold text-sm"
                    >
                      <CheckCircle2 size={14} />
                      {formatTime(result.timeSpent)}
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                      <SkipForward size={13} />
                      Skipped
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="flex items-center justify-center gap-3"
        >
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm 
              bg-white text-black transition-all duration-200 active:scale-[0.97] shadow-lg shadow-yellow-900/30 cursor-pointer"
          >
            <RotateCcw size={15} />
            Try again
          </button>

          <a
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
              text-slate-300 hover:text-white
              border border-slate-700/60 hover:border-slate-600
              transition-all duration-200 active:scale-[0.97]"
          >
            <BookOpen size={15} />
            Back to curriculum
          </a>
        </motion.div>
      </div>
    </div>
  );
}