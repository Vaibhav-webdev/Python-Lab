import Navbar from "./components/common/Navbar";
import Hero from "./components/Hero";
import FeaturesSection from "./components/FeatureSection";
import LearningPathComponent from "./components/LearningPathSection";
import LivePlayground from "./components/LivePlaygroundSection";
import CallToAction from "./components/CallToActionSection";
import Footer from "./components/common/Footer";

export const metadata = {
  title:
    "PyXode – Learn Python with Interactive Tutorials, Practice & Mock Interviews",

  description:
    "Master Python from beginner to advanced with interactive tutorials, coding practice, online code editor, debugging challenges, mini projects, and mock interviews. Learn by building on PyXode.",

  keywords: [
    "Python",
    "Learn Python",
    "Python Tutorial",
    "Python Practice",
    "Python Playground",
    "Python Interview Questions",
    "Python Challenges",
    "Python Online Compiler",
    "Python Course",
    "Python Exercises",
    "Python Projects",
    "Python Debugging",
    "Frontend Development",
    "ES6",
    "Async Await",
    "Promises",
    "Closures",
    "Event Loop",
    "PyXode"
  ],

  alternates: {
    canonical: "https://PyXode.vercel.app"
  },

  openGraph: {
    title:
      "PyXode – Master Python with Interactive Learning",

    description:
      "Learn Python by coding. Practice challenges, solve bugs, build projects, and prepare for interviews—all in one platform.",

    url: "https://PyXode.vercel.app",

    siteName: "PyXode",

    locale: "en_US",

    type: "website"
  },

  twitter: {
    card: "summary_large_image",

    title:
      "PyXode – Learn Python Smarter",

    description:
      "Interactive Python learning platform with tutorials, playground, projects and interview preparation."
  },

  robots: {
    index: true,
    follow: true
  }
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <LearningPathComponent />
      <LivePlayground />
      <CallToAction />
      <Footer />
    </main>
  );
}
