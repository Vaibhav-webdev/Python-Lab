import React from 'react'
import LearnDetailPage from './components/slug';
import { learningTopics, bugChallenges, miniProjects } from "../data";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const resources = [
    ...learningTopics,
    ...bugChallenges,
    ...miniProjects,
  ];

  const resource = resources.find((item) => item.slug === slug);

  if (!resource) {
    return {
      title: "Content Not Found | ScriptCrush",
      description:
        "The requested JavaScript learning resource could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageTitle = `${resource.title} | Learn JavaScript | ScriptCrush`;

  const description =
    resource.description ||
    `Learn ${resource.title} with detailed explanations, practical examples, coding exercises, debugging practice, interview tips, and real-world JavaScript examples on ScriptCrush.`;

  const keywords = [
    resource.title,
    "Learn JavaScript",
    "JavaScript Tutorial",
    "JavaScript Programming",
    "JavaScript Examples",
    "JavaScript Practice",
    "JavaScript Course",
    "JavaScript Guide",
    "JavaScript Interview Questions",
    "JavaScript Coding",
    "Frontend Development",
    "JavaScript Debugging",
    "JavaScript Projects",
    "ScriptCrush",
  ];

  return {
    title: pageTitle,

    description,

    keywords,

    alternates: {
      canonical: `/learn/${resource.slug}`,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    applicationName: "ScriptCrush",

    authors: [
      {
        name: "ScriptCrush",
      },
    ],

    creator: "ScriptCrush",

    publisher: "ScriptCrush",

    category: "Education",

    classification: "Programming Education",

    referrer: "origin-when-cross-origin",

    openGraph: {
      title: pageTitle,

      description,

      url: `/learn/${resource.slug}`,

      siteName: "ScriptCrush",

      locale: "en_US",

      type: "article",

      images: [
        {
          url: "/og/learn-topic.png",
          width: 1200,
          height: 630,
          alt: resource.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: pageTitle,

      description,

      creator: "@scriptcrush",

      images: ["/og/learn-topic.png"],
    },
  };
}

export default function LearnDetailsPage() {
  return (
    <LearnDetailPage />
  )
}
