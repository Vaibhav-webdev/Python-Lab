"use client";

import { motion } from "framer-motion";
import { Terminal, ChevronRight, Clock, SkipForward, EyeOff, Layers, MoveLeft, AlignLeft } from "lucide-react";

const RULES = [
  {
    icon: Layers,
    text: "3 random Fix-the-Bug challenges in a row",
  },
  {
    icon: Clock,
    text: "One combined timer — sum of each challenge's individual time budget",
  },
  {
    icon: ChevronRight,
    text: '"Next" appears as soon as all tests pass — or you can skip',
  },
  {
    icon: SkipForward,
    text: "Time runs out → you go to the results screen immediately",
  },
  {
    icon: EyeOff,
    text: "Hints and solutions are hidden during the interview — you're on your own",
  },
];

export default function LandingScreen({ onStart }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#060608] overflow-hidden px-4 py-12">
      {/* ── Ambient glow (signature design element) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[520px] h-[520px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at center, #f59e0b 0%, #f97316 45%, transparent 72%)",
            filter: "blur(90px)",
          }}
        />
      </div>

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl text-center"
      >
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 bg-gradient-to-br from-yellow-600/30 to-orange-600/40 border border-yellow-500/30 backdrop-blur-sm"
        >
          <Terminal size={36} className="text-purple-300" />
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight"
        >
          Mock Next.js Interview
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed"
        >
          Three random bugs.&nbsp; One combined timer.&nbsp;
          Spot them, fix them, ship them — the way an interviewer would ask you to.
        </p>

        {/* Rules card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-left bg-zinc-900/40 border border-slate-800/70 rounded-2xl p-6 mb-8"
        >
          <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
            Rules
          </p>
          <ul className="space-y-3">
            {RULES.map(({ icon: Icon, text }, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-md flex items-center justify-center bg-orange-500/15 border border-yellow-500/25">
                  <Icon size={11} className="text-yellow-400" />
                </span>
                <span className="text-slate-300 text-sm leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          // Badlaav: sm:max-w-xl jisse badi screen par dono buttons ko khuli jagah mile
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md sm:max-w-xl mx-auto px-4 sm:px-0"
        >
          <button
            onClick={onStart}
            // sm:w-48 ya sm:w-auto use kar sakte hain flex-1 ke sath consistent width ke liye
            className="group relative inline-flex items-center justify-center gap-1 w-full sm:w-52 px-6 lg:px-8 py-3.5 rounded-xl font-semibold text-white text-sm lg:text-base overflow-hidden bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 cursor-pointer transition-all duration-200 active:scale-[0.97] shadow-lg shadow-yellow-900/40 white-space-nowrap"
          >
            <span className="truncate">Start the interview</span>
            <ChevronRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-0.5 shrink-0"
            />
          </button>

          <a
            href="/"
            className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-52 px-6 lg:px-8 py-3.5 rounded-xl font-semibold text-gray-400 text-sm lg:text-base overflow-hidden bg-zinc-900 transition-all duration-200 active:scale-[0.97] shadow-lg shadow-gray-900/40 white-space-nowrap"
          >
            <MoveLeft size={18} className="text-gray-400 shrink-0" />
            <span className="truncate">Back to curriculum</span>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}