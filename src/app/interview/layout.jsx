export const metadata = {
  title: "Mock Next.js Interview — Fix 3 Bugs in Real Time",
  description:
    "Practice a real-time Next.js, React, and Python mock interview with randomly generated bug-fixing challenges. Solve timed coding problems, improve debugging skills, and prepare for frontend developer interviews.",
  keywords: [
  "Python interview",
  "Python interview questions",
  "Mock interview",
  "React interview",
  "Coding interview",
  "Bug fixing challenge",
  "Python debugging",
  "Programming interview practice",
  "Coding assessment",
],
alternates: {
    canonical: "/interview",
},
robots: {
    index: true,
    follow: true,
},
  openGraph: {
    title: "Mock Next.js Interview",
    url: "/interview",
    description:
      "Can you spot and fix 3 React/Next.js bugs before the timer runs out?",
    type: "website",
    siteName: "ScriptCrush",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mock Next.js Interview",
    description: "3 random bugs. One combined timer. Fix them all.",
  },
};

export default function InterviewLayout({ children }) {
  return <>{children}</>;
}