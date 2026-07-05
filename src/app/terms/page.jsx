import Link from 'next/link';

export const metadata = {
  title: "Terms of Service",

  description:
    "Read the Terms of Service for PyXode, the interactive Python learning platform. Understand your rights, responsibilities, acceptable use, intellectual property, and platform policies.",

  keywords: [
    "PyXode Terms",
    "Terms of Service",
    "Python Learning Platform",
    "User Agreement",
    "Educational Platform",
    "Coding Platform Terms",
  ],

  alternates: {
    canonical: "/terms",
  },

  openGraph: {
    title: "Terms of Service | PyXode",

    description:
      "Official Terms of Service for PyXode.",

    url: "https://PyXode.vercel.app/terms",

    siteName: "PyXode",

    type: "article",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PyXode Terms of Service",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Terms of Service | PyXode",

    description:
      "Read the official Terms of Service for PyXode.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-black text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-gray-400 text-sm font-medium flex items-center gap-2 mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: June 2026</p>

        <div className="space-y-8 border-t border-gray-800 pt-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using <strong>PyXode</strong>, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Educational Use Only</h2>
            <p className="leading-relaxed">
              All materials, code snippets, labs, and tutorials provided on PyXode are strictly for educational and training purposes. They are designed to help you practice and learn React Native development.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Intellectual Property</h2>
            <p className="leading-relaxed">
              The layout, design, graphics, and original educational content belong to PyXode. However, any React Native code you write, experiment with, or build inside our interactive platforms belongs entirely to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Limitation of Liability</h2>
            <p className="leading-relaxed">
              PyXode is provided on an &quot;as-is&quot; basis. We make no guarantees that the tutorials or code practice sessions will always be uninterrupted or error-free. We are not liable for any issues caused in your production environments based on educational practices learned here.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Governing Law</h2>
            <p className="leading-relaxed">
              These terms are governed by and construed in accordance with the laws applicable to online platforms operating internationally, without forcing commercial constraints on free educational use.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;