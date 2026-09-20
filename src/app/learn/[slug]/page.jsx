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
      title: "Content Not Found | PyXode",
      description:
        "The requested Python learning resource could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageTitle = `${resource.title} | Learn Python | PyXode`;

  const description =
    resource.description ||
    `Learn ${resource.title} with detailed explanations, practical examples, coding exercises, debugging practice, interview tips, and real-world Python examples on PyXode.`;

  const keywords = [
    resource.title,
    "Learn Python",
    "Python Tutorial",
    "Python Programming",
    "Python Examples",
    "Python Practice",
    "Python Course",
    "Python Guide",
    "Python Interview Questions",
    "Python Coding",
    "Frontend Development",
    "Python Debugging",
    "Python Projects",
    "PyXode",
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

    applicationName: "PyXode",

    authors: [
      {
        name: "PyXode",
      },
    ],

    creator: "PyXode",

    publisher: "PyXode",

    category: "Education",

    classification: "Programming Education",

    referrer: "origin-when-cross-origin",

    openGraph: {
      title: pageTitle,

      description,

      url: `/learn/${resource.slug}`,

      siteName: "PyXode",

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

      creator: "@PyXode",

      images: ["/og/learn-topic.png"],
    },
  };
}

export default function LearnDetailsPage() {
  return (
    <LearnDetailPage />
  )
}
