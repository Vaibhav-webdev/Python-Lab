import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy | PyXode",

  description:
    "Read the Privacy Policy of PyXode. Learn how we handle your information, cookies, third-party services, security, and your privacy while using our interactive Python learning platform.",

  keywords: [
    "PyXode Privacy Policy",
    "Python Learning Platform",
    "Privacy Policy",
    "Data Protection",
    "Cookies",
    "User Privacy",
    "Online Coding Platform",
    "Python Tutorials",
  ],

  alternates: {
    canonical: "/privacy-policy",
  },

  openGraph: {
    title: "Privacy Policy | PyXode",

    description:
      "Read the official Privacy Policy for PyXode, the interactive Python learning platform.",

    url: "https://PyXode.vercel.app/privacy-policy",

    siteName: "PyXode",

    type: "article",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PyXode Privacy Policy",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Privacy Policy | PyXode",

    description:
      "Learn how PyXode protects your privacy while you learn Python.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-black text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-gray-400 text-sm font-medium flex items-center gap-2 mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: June 2026</p>

        <div className="space-y-10 border-t border-gray-800 pt-8">

          <section aria-labelledby="introduction">
            <h2
              id="introduction"
              className="text-xl font-semibold text-white mb-3"
            >
              1. Introduction
            </h2>

            <p className="leading-8">
              Welcome to <strong>PyXode</strong>, an interactive Python
              learning platform designed to help developers learn by building real
              projects, solving coding challenges, fixing bugs, practicing interview
              questions, and experimenting inside an online code editor.
            </p>

            <p className="leading-8 mt-4">
              Your privacy is important to us. This Privacy Policy explains what
              information may be collected while using PyXode, how it is used,
              and the choices you have regarding your information.
            </p>
          </section>

          <section aria-labelledby="information">
            <h2
              id="information"
              className="text-xl font-semibold text-white mb-3"
            >
              2. Information We Collect
            </h2>

            <p className="leading-8">
              You can browse most parts of PyXode without creating an account.
              We do not intentionally collect personal information unless you choose
              to provide it voluntarily.
            </p>

            <p className="leading-8 mt-4">
              Depending on future features, we may collect information such as:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
              <li>Name (only if account registration is available)</li>
              <li>Email address</li>
              <li>Profile information</li>
              <li>Learning progress</li>
              <li>Challenge submissions</li>
              <li>Interview practice history</li>
            </ul>

            <p className="leading-8 mt-4">
              We only collect information necessary to improve your learning
              experience.
            </p>
          </section>

          <section aria-labelledby="usage">
            <h2
              id="usage"
              className="text-xl font-semibold text-white mb-3"
            >
              3. How We Use Information
            </h2>

            <p className="leading-8">
              Information collected may be used to:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-400">
              <li>Provide interactive Python learning experiences.</li>
              <li>Save your coding progress.</li>
              <li>Improve coding challenges and projects.</li>
              <li>Enhance platform performance and stability.</li>
              <li>Respond to support requests.</li>
              <li>Protect the platform against abuse.</li>
            </ul>
          </section>

          <section aria-labelledby="cookies">
            <h2
              id="cookies"
              className="text-xl font-semibold text-white mb-3"
            >
              4. Cookies
            </h2>

            <p className="leading-8">
              PyXode may use essential cookies or similar technologies to keep
              the platform secure, remember preferences, and improve the user
              experience.
            </p>

            <p className="leading-8 mt-4">
              We do not use cookies to sell your personal information.
            </p>
          </section>

          <section aria-labelledby="analytics">
            <h2
              id="analytics"
              className="text-xl font-semibold text-white mb-3"
            >
              5. Analytics
            </h2>

            <p className="leading-8">
              To improve PyXode, we may use privacy-friendly analytics tools to
              understand overall platform usage, identify performance issues, and make
              improvements.
            </p>

            <p className="leading-8 mt-4">
              Analytics data is used in aggregate and is not intended to personally
              identify individual users.
            </p>
          </section>

          <section aria-labelledby="third-party">
            <h2
              id="third-party"
              className="text-xl font-semibold text-white mb-3"
            >
              6. Third-Party Services
            </h2>

            <p className="leading-8">
              PyXode may link to third-party educational resources including
              official Python documentation, MDN Web Docs, GitHub repositories,
              and other trusted developer resources.
            </p>

            <p className="leading-8 mt-4">
              We are not responsible for the privacy practices of external websites.
              Please review their privacy policies before sharing any information.
            </p>
          </section>

          <section aria-labelledby="security">
            <h2
              id="security"
              className="text-xl font-semibold text-white mb-3"
            >
              7. Data Security
            </h2>

            <p className="leading-8">
              We take reasonable measures to protect information against unauthorized
              access, misuse, disclosure, or destruction. However, no internet-based
              service can guarantee absolute security.
            </p>
          </section>

          <section aria-labelledby="children">
            <h2
              id="children"
              className="text-xl font-semibold text-white mb-3"
            >
              8. Children's Privacy
            </h2>

            <p className="leading-8">
              PyXode is intended for learners and developers. If we become aware
              that personal information has been submitted in violation of applicable
              laws, we will take appropriate steps to remove that information.
            </p>
          </section>

          <section aria-labelledby="changes">
            <h2
              id="changes"
              className="text-xl font-semibold text-white mb-3"
            >
              9. Changes to This Privacy Policy
            </h2>

            <p className="leading-8">
              We may update this Privacy Policy from time to time as PyXode
              evolves. The updated version will always be published on this page with
              the latest revision date.
            </p>
          </section>

          <section aria-labelledby="contact">
            <h2
              id="contact"
              className="text-xl font-semibold text-white mb-3"
            >
              10. Contact Us
            </h2>

            <p className="leading-8">
              If you have any questions regarding this Privacy Policy or how
              PyXode handles information, please contact us through our Contact
              page once it becomes available.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;