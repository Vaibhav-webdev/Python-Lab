"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import LandingScreen from "@/app/components/interview/LandingScreen";
import InterviewSession from "../../components/interview/InterviewSession";
import ResultsScreen from "../../components/interview/ResultsScreen";
import { pickRandomQuestions } from "../../../lib/interview-questions.js.js";

// ─── Screen states ─────────────────────────────────────────────────────────────
const SCREEN = {
  LANDING: "landing",
  SESSION: "session",
  RESULTS: "results",
};

export default function InterviewPage() {
  const [screen, setScreen] = useState(SCREEN.LANDING);

  // Questions picked at start-time
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Timer (counts down from totalTime)
  const [totalTime, setTotalTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  // Per-question results: { [questionId]: { solved, skipped, timeSpent } }
  const [completedData, setCompletedData] = useState({});
  const questionStartRef = useRef(null); // epoch ms when current question started

  // ── Start interview ──────────────────────────────────────────────────────────
  const handleStart = useCallback(() => {
    const picked = pickRandomQuestions();
    const total = picked.reduce((s, q) => s + q.timeLimit, 0);

    setQuestions(picked);
    setCurrentIdx(0);
    setTotalTime(total);
    setTimeLeft(total);
    setCompletedData({});
    questionStartRef.current = Date.now();
    setScreen(SCREEN.SESSION);
  }, []);

  // ── Timer tick ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (screen !== SCREEN.SESSION) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Time's up — go to results
          setScreen(SCREEN.RESULTS);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [screen]);

  // ── Record a question result ─────────────────────────────────────────────────
  const recordResult = useCallback((questionId, data) => {
    const elapsed = Math.round((Date.now() - (questionStartRef.current ?? Date.now())) / 1000);
    setCompletedData((prev) => ({
      ...prev,
      [questionId]: { ...data, timeSpent: elapsed },
    }));
  }, []);

  // ── Next question ────────────────────────────────────────────────────────────
  const handleNext = useCallback(() => {
    questionStartRef.current = Date.now();
    setCurrentIdx((prev) => {
      const next = prev + 1;
      if (next >= questions.length) {
        clearInterval(timerRef.current);
        setScreen(SCREEN.RESULTS);
        return prev;
      }
      return next;
    });
  }, [questions.length]);

  // ── Skip question ────────────────────────────────────────────────────────────
  const handleSkip = useCallback(() => {
    questionStartRef.current = Date.now();
    setCurrentIdx((prev) => {
      const next = prev + 1;
      if (next >= questions.length) {
        clearInterval(timerRef.current);
        setScreen(SCREEN.RESULTS);
        return prev;
      }
      return next;
    });
  }, [questions.length]);

  // ── Reset (try again) ────────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    clearInterval(timerRef.current);
    setScreen(SCREEN.LANDING);
  }, []);

  // ── Derived values ───────────────────────────────────────────────────────────
  const timeUsed = totalTime - timeLeft;

  // ── Render ───────────────────────────────────────────────────────────────────
  if (screen === SCREEN.LANDING) {
    return <LandingScreen onStart={handleStart} />;
  }

  if (screen === SCREEN.SESSION && questions.length > 0) {
    return (
      <InterviewSession
        questions={questions}
        currentIdx={currentIdx}
        timeLeft={timeLeft}
        totalTime={totalTime}
        onNext={handleNext}
        onSkip={handleSkip}
        recordResult={recordResult}
      />
    );
  }

  if (screen === SCREEN.RESULTS) {
    return (
      <ResultsScreen
        results={{
          completedData,
          questionsData: questions,
          totalTime,
          timeUsed,
        }}
        onReset={handleReset}
      />
    );
  }

  return null;
}