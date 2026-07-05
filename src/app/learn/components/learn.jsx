"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Bug,
  FolderOpen,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Layout,
  Compass,
  Cpu,
  RefreshCw,
  Zap,
  Network,
  Database,
  Shield,
  Code,
  Gauge,
  Globe,
  Rocket,
  GraduationCapIcon,
} from "lucide-react";
import {
  learningTopics,
  bugChallenges,
  miniProjects,
  DIFFICULTY_MAP,
} from "../data";

// Icon mapping - data has string names, we need actual components
const ICON_MAP = {
  Layout,
  Compass,
  Cpu,
  RefreshCw,
  Zap,
  Network,
  Database,
  Shield,
  Code,
  Gauge,
  Globe,
  Rocket,
  BookOpen,
  Bug,
  FolderOpen,
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function LearnPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-800/40">
        <div className="absolute inset-0 bg-gradient-to-br from-white-/10 via-transparent to-gray-500/10" />

        {/* Top Center Glowing Orb: Orange/Amber blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[120px]" />

        <div className="relative max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">

          {/* Go Back Button */}
          <div className="flex justify-start mb-8">
            <button
              onClick={() => router.push("/")}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/40 bg-gradient-to-r from-white/10 to-gray-500/10 px-4 py-2 text-sm font-medium text-zinc-400 transition-all duration-200 hover:border-white/50 hover:from-gray-500/10 hover:to-white/10 hover:text-white active:scale-95"
            >
              <ArrowLeft size={18} className="text-white transition-colors" />
              <span className="text-gray-300">Go Back</span>
            </button>
          </div>

          {/* Hero Content */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800/50 border border-white/20 mb-5">
              <GraduationCapIcon size={14} className="text-white" />
              <span className="text-white/70 text-xs font-semibold">
                Interactive Learning Platform
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
              Learn{" "}
              <span className="bg-gradient-to-r from-neutral-200 to-neutral-600 bg-clip-text text-transparent">
                Next.js
              </span>
            </h1>

            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Master Next.js through interactive lessons, debug real-world bugs,
              and build hands-on mini projects — all in your browser.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14 space-y-14 md:space-y-20">
        {/* LEARNING PHASE */}
        <section aria-labelledby="learning-heading">
          <SectionHeader
            icon={BookOpen}
            title="Learning Phase"
            subtitle="39 comprehensive topics covering every aspect of Next.js"
            headingId="learning-heading"
          />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            {learningTopics.map((topic) => {
              const Icon = ICON_MAP[topic.icon] || BookOpen;
              return (
                <motion.div key={topic.id} variants={item}>
                  <Link
                    href={`/learn/${topic.slug}`}
                    className="group block rounded-xl border border-white/10 bg-white/2 hover:bg-white/4 hover:border-white/20 transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        {/* Fixed: Changed purple border to orange/20 and purple icon to yellow-400 */}
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-white/15 to-gray/15 border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon size={17} className="text-white" />
                        </div>

                        {/* Muted counter text that fits perfectly in a dark theme */}
                        <span className="text-zinc-500 text-[10px] font-bold tracking-wider">
                          {topic.id.replace(/^\D+/g, "") || "1"}/39
                        </span>
                      </div>
                      <h3 className="text-[13px] font-semibold text-white group-hover:text-white transition-colors leading-snug mb-1.5">
                        {topic.title}
                      </h3>
                      <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                        {topic.overview}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 px-4 py-2 border-t border-slate-800/30 text-slate-600 group-hover:text-white transition-colors">
                      <span className="text-[10px] font-semibold">
                        {topic.learnings?.length || 0} concepts
                      </span>
                      <ChevronRight
                        size={11}
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* FIX THE BUG */}
        <section aria-labelledby="bug-heading">
          <SectionHeader
            icon={Bug}
            title="Fix the Bug"
            subtitle="Debug real-world Next.js issues — from missing directives to hydration errors"
            headingId="bug-heading"
          />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {bugChallenges.map((bug) => {
              const diff = DIFFICULTY_MAP[bug.difficulty];
              return (
                <motion.div key={bug.id} variants={item}>
                  <Link
                    href={`/learn/${bug.slug}`}
                    className="group block rounded-xl border border-red-800/10 bg-orange-300/2 hover:bg-red-300/4 hover:border-red-500/30 transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Bug size={17} className="text-red-400" />
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${diff.bg} ${diff.text} ${diff.border}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${diff.dot}`}
                          />
                          {diff.label}
                        </span>
                      </div>
                      <h3 className="text-[13px] font-semibold text-white group-hover:text-red-300 transition-colors leading-snug mb-1.5">
                        {bug.title}
                      </h3>
                      <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                        {bug.bugReport}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {bug.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-500 border border-slate-800/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-4 py-2 border-t border-slate-800/30 text-slate-600 group-hover:text-red-400 transition-colors">
                      <span className="text-[10px] font-semibold">
                        {bug.tests?.length || 0} tests
                      </span>
                      <ChevronRight
                        size={11}
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* MINI PROJECTS */}
        <section aria-labelledby="projects-heading">
          <SectionHeader
            icon={FolderOpen}
            title="Mini Projects"
            subtitle="Build real applications step-by-step to solidify your Next.js skills"
            headingId="projects-heading"
          />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {miniProjects.map((proj) => {
              const diff = DIFFICULTY_MAP[proj.difficulty];
              return (
                <motion.div key={proj.id} variants={item}>
                  <Link
                    href={`/learn/${proj.slug}`}
                    className="group block rounded-xl border border-slate-800/50 bg-white/[0.02] hover:bg-emerald-300/4 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600/15 to-blue-600/15 border border-emerald-500/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <FolderOpen size={19} className="text-emerald-400" />
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${diff.bg} ${diff.text} ${diff.border}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${diff.dot}`}
                          />
                          {diff.label}
                        </span>
                      </div>
                      <h3 className="text-[15px] font-semibold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-2">
                        {proj.title}
                      </h3>
                      <p className="text-slate-500 text-[11px] leading-relaxed mb-4">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {proj.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-500 border border-slate-800/40"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {/* Step progress bar */}
                      <div className="flex items-center gap-1.5">
                        {proj.steps?.map((s, idx) => (
                          <div
                            key={s.step || idx}
                            className="flex-1 h-1 rounded-full bg-slate-800 overflow-hidden"
                          >
                            <div className="h-full w-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full opacity-30" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 px-5 py-2.5 border-t border-slate-800/30 text-slate-600 group-hover:text-emerald-400 transition-colors">
                      <span className="text-[10px] font-semibold">
                        {proj.steps?.length || 0} steps
                      </span>
                      <ArrowRight
                        size={11}
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/30 py-8 text-center">
        <p className="text-slate-700 text-xs">
          Built with Next.js — Learn, Debug, Build
        </p>
      </footer>
    </div>
  );
}

function SectionHeader({ icon: Icon, title, subtitle, headingId }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20 bg-gradient-to-br from-white/15 to-gray-500/15 shadow-[0_0_15px_rgba(249,115,22,0.05)]">
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h2 id={headingId} className="text-lg md:text-xl font-bold text-white">
          {title}
        </h2>
        <p className="text-slate-500 text-xs mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}