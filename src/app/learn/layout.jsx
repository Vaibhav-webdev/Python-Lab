import { Metadata } from "next";

export const metadata = {
  title: "Learn Python - Interactive Learning Platform",
  description:
    "Master Python through interactive lessons, debug real-world bugs, and build hands-on mini projects. Covers routing, server components, data fetching, authentication, and more.",
  keywords: [
    "Python",
    "Learn Python",
    "Python Tutorial",
    "Python Latest",
    "Full Python Cover",
  ],
  openGraph: {
    title: "Learn Python - Interactive Learning Platform",
    description:
      "Master Python through interactive lessons, debug real-world bugs, and build hands-on mini projects.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Python - Interactive Learning Platform",
    description:
      "Master Python through interactive lessons, debug real-world bugs, and build hands-on mini projects.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LearnLayout({ children }) {
  return <>{children}</>;
}