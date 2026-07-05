"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Circle, ChevronRight, Flag } from "lucide-react";

export default function TestPanel({
  tests,
  results,       // boolean[] | undefined
  allPassed,
  onCheck,
  onNext,
  isLastQuestion,
}) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/60 bg-slate-900/30 flex-shrink-0">
        <span className="text-slate-400 text-xs font-medium tracking-wider uppercase">
          Tests
        </span>

        {/* Check button — hidden once all pass */}
        {!allPassed && (
          <button
            onClick={onCheck}
            className="px-3 py-1 text-xs font-semibold rounded-md
              bg-yellow-600 hover:bg-yellow-500 cursor-pointer text-white
              transition-colors duration-150 active:scale-95"
          >
            Check
          </button>
        )}

        {/* Next / Finish button — appears when all tests pass */}
        {allPassed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={onNext}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md
              bg-gradient-to-r from-purple-600 to-blue-600
              hover:from-purple-500 hover:to-blue-500
              text-white transition-all duration-150 active:scale-95"
          >
            {isLastQuestion ? (
              <>
                <Flag size={12} />
                Finish
              </>
            ) : (
              <>
                Next
                <ChevronRight size={12} />
              </>
            )}
          </motion.button>
        )}
      </div>

      {/* Test list */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
        {tests.map((test, idx) => {
          const status =
            results === undefined
              ? "idle"
              : results[idx]
              ? "pass"
              : "fail";

          return (
            <motion.div
              key={idx}
              initial={false}
              animate={
                status === "pass"
                  ? { scale: [1, 1.02, 1] }
                  : {}
              }
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 p-2.5 rounded-lg border transition-all duration-300
                ${status === "pass"
                  ? "bg-green-500/8 border-green-500/25"
                  : status === "fail"
                  ? "bg-red-500/8 border-red-500/20"
                  : "bg-slate-800/30 border-slate-700/30"
                }`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                <AnimatePresence mode="wait">
                  {status === "pass" && (
                    <motion.div
                      key="pass"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                      <CheckCircle2 size={15} className="text-green-400" />
                    </motion.div>
                  )}
                  {status === "fail" && (
                    <motion.div
                      key="fail"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                      <XCircle size={15} className="text-red-400" />
                    </motion.div>
                  )}
                  {status === "idle" && (
                    <motion.div key="idle">
                      <Circle size={15} className="text-slate-600" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Label */}
              <span
                className={`text-sm leading-snug transition-colors duration-300
                  ${status === "pass"
                    ? "text-green-300"
                    : status === "fail"
                    ? "text-red-300"
                    : "text-slate-400"
                  }`}
              >
                {test.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* All-pass celebration strip */}
      <AnimatePresence>
        {allPassed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mx-4 mb-3 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/25 text-green-400 text-xs text-center font-medium"
          >
            ✓ All tests passed — click {isLastQuestion ? "Finish" : "Next"} to continue
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}