"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, Terminal, Users, Code, CheckCircle } from "lucide-react";

// Framer Motion Variants for Staggered Fade-in
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const YELLOW = '#eab308'; // Custom Yellow (Tailwind Yellow-500)
const ORANGE = '#f97316'; // Custom Orange (Tailwind Orange-500)
const RED = '#ef4444';    // Custom Red (Tailwind Red-500)

export default function Hero() {
    const router = useRouter()

    return (
        <header id="home" className="relative w-full bg-black text-white overflow-hidden flex flex-col justify-center pt-10 lg:pt-18 pb-12 px-4 lg:px-0">
            
            {/* Minimal Ambient Glows (Subtle White/Gray instead of heavy colors) */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-neutral-800/20 rounded-full blur-[150px] pointer-events-none" />

            <div className="lg:max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* LEFT COLUMN: Content & CTA */}
                <div
                    className="lg:col-span-7 flex flex-col space-y-6 text-center lg:text-left z-10"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                >
                    {/* Pill Badge */}
                    <motion.div variants={fadeInUp} className="self-center lg:self-start">
                        <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-neutral-900/50 border border-neutral-700 text-neutral-300 backdrop-blur-sm shadow-inner">
                            <Sparkles className="w-4.5 h-4.5 text-white animate-pulse" />
                            Interactive • Hands-on • Real Python Projects
                        </span>
                    </motion.div>

                    {/* Main Heading (SEO Optimized for Python) */}
                    <motion.h1
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
                    >
                        Build <span className="text-white">Scripts.</span> <br />
                        <span className="bg-gradient-to-r from-neutral-200 to-neutral-600 bg-clip-text text-transparent">Master Python.</span>
                    </motion.h1>

                    {/* Subtitle Description */}
                    <motion.p
                        variants={fadeInUp}
                        className="text-neutral-400 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed"
                    >
                        Drop the endless tutorial hell and dive straight into production-ready Python projects. Master core concepts like OOP, Data Structures, and APIs by writing clean, real-world code. With our zero-setup, in-browser IDE, you can build, test, and run your Python scripts instantly.
                    </motion.p>

                    {/* Action Buttons with B&W Hover Effects */}
                    <motion.section
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
                    >
                        <button onClick={() => {
                            router.push("/learn")
                        }} className="group relative inline-flex cursor-pointer items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black hover:bg-neutral-200 transition-all duration-200 active:scale-[0.97] shadow-[0_0_20px_rgba(255,255,255,0.1)] font-bold overflow-hidden">
                            Start Learning Python
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/0 via-black/5 to-black/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                        </button>

                        <button onClick={() => {
                            router.push('/interview')
                        }} className="inline-flex cursor-pointer items-center justify-center px-6 py-3.5 rounded-xl bg-black border border-neutral-700 hover:border-white hover:bg-neutral-900 font-semibold text-neutral-300 hover:text-white transition-all duration-200 active:scale-[0.98]">
                            Try Mock Interview
                        </button>
                    </motion.section>
                </div>

                {/* RIGHT COLUMN: Animated Python Logo (Black & White Theme) */}
                <div
                    aria-hidden="true"
                    className="lg:col-span-5 relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center select-none pointer-events-none"
                >
                    {/* Outer Tech Ring - Slowly spinning clockwise */}
                    <svg className="absolute inset-0 w-full h-full animate-[spin_25s_linear_infinite]" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#333" strokeWidth="1" strokeDasharray="4 6" />
                    </svg>

                    {/* Inner Tech Ring - Slowly spinning counter-clockwise */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="70" fill="none" stroke="#555" strokeWidth="0.5" strokeDasharray="12 8" className="animate-[spin_15s_linear_infinite_reverse] origin-center" />
                    </svg>

                    {/* Central Floating Python Logo */}
                    {/* Uses standard Tailwind bounce for a smooth floating effect */}
                    <div className="relative w-32 h-32 sm:w-42 sm:h-42 animate-[bounce_4s_ease-in-out_infinite] z-10 flex items-center justify-center">
                        {/* Glow behind the logo */}
                        <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full"></div>
                        <Image 
                            src="/logo.png" 
                            alt="Python Logo" 
                            fill 
                            priority
                            className="object-contain grayscale brightness-[200%] contrast-150 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
                        />
                    </div>
                </div>
            </div>

            {/* STATS SECTION (Bottom Grid with Scroll-triggered Fade-in) */}
            <motion.article
                className="max-w-6xl mx-auto w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-20 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
            >
                {[
                    // Saare stats Python aur B&W theme ke hisaab se update kiye gaye hain
                    { icon: Terminal, metric: "60+", label: "PYTHON SCRIPTS", desc: "Build from scratch", color: "#e5e5e5", borderColor: "border-l-neutral-200" },
                    { icon: Code, metric: "50+", label: "PYTHON TOPICS", desc: "Master logic & DS", color: "#a3a3a3", borderColor: "border-l-neutral-400" },
                    { icon: Users, metric: "10K+", label: "HAPPY CODERS", desc: "Zero to Hero in Python", color: "#737373", borderColor: "border-l-neutral-500" },
                    { icon: CheckCircle, metric: "0", label: "SETUP REQUIRED", desc: "Code directly in browser", color: "#ffffff", borderColor: "border-l-white" }
                ].map((stat, idx) => (
                    <motion.span
                        key={idx}
                        variants={fadeInUp}
                        className={`group p-5 rounded-2xl bg-black border border-neutral-800 border-l-4 ${stat.borderColor} hover:border-neutral-600 hover:bg-neutral-900 transition-all duration-300 backdrop-blur-sm`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <stat.icon color={stat.color} className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors duration-300" />
                            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white">{stat.metric}</span>
                        </div>
                        <div className="text-[10px] font-bold tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors mb-0.5">{stat.label}</div>
                        <div className="text-xs sm:text-sm text-neutral-400">{stat.desc}</div>
                    </motion.span>
                ))}
            </motion.article>
        </header>
    );
}