import React from 'react'
import LearnPage from './components/learn'

export const metadata = {
  title: "Learn Python | Complete Python Tutorial, Practice & Projects",

  description:
    "Learn Python from beginner to advanced with PyXode. Explore 40+ Python topics, hands-on coding exercises, debugging challenges, mini projects, and an interactive learning path to master modern Python.",

  keywords: [
    "Learn Python",
    "Python Tutorial",
    "Python Course",
    "Python Guide",
    "Python Basics",
    "Advanced Python",
    "Modern Python",
    "Python Programming",
    "Python Concepts",
    "Python Practice",
    "Python Exercises",
    "Python Challenges",
    "Python Debugging",
    "Python Bug Fixing",
    "Python Projects",
    "Mini Python Projects",
    "Python Examples",
    "Python Coding",
    "Python Learning Path",
    "Python Roadmap",
    "Python Interview Preparation",
    "Frontend Python",
    "ES6 Tutorial",
    "Python Online",
    "Master Python",
    "Python for Beginners",
    "Python Notes",
    "Python Study Material",
    "PyXode"
  ],

  alternates: {
    canonical: "/learn",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  applicationName: "PyXode",

  category: "Education",

  classification: "Programming Education",

  authors: [
    {
      name: "PyXode",
    },
  ],

  creator: "PyXode",

  publisher: "PyXode",

  referrer: "origin-when-cross-origin",

  openGraph: {
    title:
      "Learn Python | Complete Python Tutorial & Practice | PyXode",

    description:
      "Master Python with structured lessons, coding challenges, debugging exercises, and real-world mini projects. Learn Python step by step with PyXode.",

    url: "/learn",

    siteName: "PyXode",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og/learn.png",
        width: 1200,
        height: 630,
        alt: "Learn Python on PyXode",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Learn Python | PyXode",

    description:
      "40+ Python lessons, coding exercises, debugging challenges, and mini projects to help you master Python.",

    creator: "@PyXode",

    images: ["/og/learn.png"],
  },
};

export default function LearningPage() {
  return (
    <LearnPage />
  )
}
