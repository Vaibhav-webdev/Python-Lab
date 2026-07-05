import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://PyXode.vercel.app"),

  title: {
    default:
      "PyXode – Learn Python with Interactive Tutorials, Practice & Projects",
    template: "%s | PyXode",
  },

  description:
    "Master Python from beginner to advanced with interactive tutorials, coding challenges, bug fixing, mini projects, online playground and mock interviews.",

  applicationName: "PyXode",

  keywords: [
    "Python",
    "Learn Python",
    "Python Tutorial",
    "Python Practice",
    "Python Playground",
    "Python Challenges",
    "Python Projects",
    "Python Interview Questions",
    "Online Python Editor",
    "Mock Interview",
    "PyXode",
  ],

  authors: [
    {
      name: "PyXode",
    },
  ],

  creator: "PyXode",

  publisher: "PyXode",

  category: "Education",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    title:
      "PyXode – Learn Python with Interactive Tutorials, Practice & Projects",

    description:
      "Learn Python through interactive tutorials, coding challenges, debugging exercises, projects and mock interviews.",

    url: "https://PyXode.vercel.app",

    siteName: "PyXode",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PyXode",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "PyXode",

    description:
      "Master Python with interactive tutorials, projects and coding challenges.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060608",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PyXode",
    url: "https://PyXode.vercel.app",
    description:
      "Interactive Python learning platform with tutorials, coding challenges, projects and mock interviews.",
    inLanguage: "en",
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-inter bg-[#060608] text-white antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        {children}
      </body>
    </html>
  );
}