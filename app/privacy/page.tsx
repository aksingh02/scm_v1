import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"
import { PageSkeleton } from "@/components/loading/page-skeleton"

async function PrivacyPageContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Last updated: January 10, 2024</p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              At SylphCorps Media, we are committed to protecting your privacy and ensuring transparency in how we
              collect, use, and protect your personal information.
            </p>
          </header>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                1. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>
                  <strong>Account Information:</strong> Name, email address, username, password, and profile preferences
                </li>
                <li>
                  <strong>Contact Information:</strong> Phone number, mailing address (for print subscriptions)
                </li>
                <li>
                  <strong>Payment Information:</strong> Credit card details, billing address, subscription history
                </li>
                <li>
                  <strong>Communication Data:</strong> Messages sent through our contact forms, customer support
                  interactions
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Usage and Technical Information</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>
                  <strong>Reading Behavior:</strong> Articles viewed, time spent reading, sharing activity, search
                  queries
                </li>
                <li>
                  <strong>Device Information:</strong> IP address, browser type, operating system, device identifiers
                </li>
                <li>
                  <strong>Location Data:</strong> General location based on IP address (with your consent for precise
                  location)
                </li>
                <li>
                  <strong>Cookies and Tracking:</strong> Website usage patterns, preferences, authentication tokens
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">AI and Analytics Data</h3>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Content preferences and reading patterns for personalized recommendations</li>
                <li>Aggregated and anonymized data for improving our AI-powered features</li>
                <li>Interaction data with our chatbots and automated systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                2. How We Use Your Information
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Core Services</h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>Provide access to articles, newsletters, and premium content</li>
                  <li>Process subscriptions and manage your account</li>
                  <li>Deliver personalized news recommendations using AI algorithms</li>
                  <li>Send breaking news alerts and newsletters</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Innovation and Improvement</h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>Develop and improve our AI-powered journalism tools</li>
                  <li>Analyze reading patterns to enhance content quality</li>
                  <li>Test new features and user experience improvements</li>
                  <li>Conduct research for editorial and product development</li>
                </ul>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Legal and Security</h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>Comply with legal obligations and regulatory requirements</li>
                  <li>Protect against fraud, abuse, and security threats</li>
                  <li>Enforce our Terms of Service and community guidelines</li>
                  <li>Respond to legal requests and court orders</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                3. Information Sharing and Disclosure
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We do not sell your personal information to third parties. We may share your information in the
                following limited circumstances:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-black dark:text-white">Service Providers</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Trusted third-party vendors who help us operate our platform (payment processors, cloud hosting,
                    email services, analytics providers)
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-black dark:text-white">Legal Requirements</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    When required by law, court order, or to protect our rights and the safety of our users
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-black dark:text-white">Business Transfers</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    In connection with mergers, acquisitions, or sale of assets (with user notification)
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-black dark:text-white">Aggregated Data</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Anonymized, aggregated statistics for research, industry reports, and platform improvement
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">4. Your Privacy Rights</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Access & Portability</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Request a copy of your personal data and download your information in a portable format
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Correction & Updates</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Update or correct inaccurate personal information in your account settings
                  </p>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Deletion</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Request deletion of your personal data (subject to legal retention requirements)
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Opt-Out</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Unsubscribe from marketing communications and adjust notification preferences
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">5. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>End-to-end encryption for sensitive data transmission</li>
                <li>Secure cloud infrastructure with regular security audits</li>
                <li>Multi-factor authentication for account access</li>
                <li>Regular security training for all employees</li>
                <li>Incident response procedures for potential data breaches</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">6. International Users</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                SylphCorps Media operates globally and complies with international privacy regulations including GDPR,
                CCPA, and other applicable laws. Your data may be processed in countries where we operate, always with
                appropriate safeguards in place.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">7. Contact Us</h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  For privacy-related questions, requests, or concerns, contact our Data Protection Officer:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Email:</strong> admin@sylphcorpsmedia.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 7042954064
                  </p>
                  <p>
                    <strong>Mail:</strong> SylphCorps Media, Block A, Krishna Nagar, New Delhi, Delhi 110051, India
                  </p>
                  <p>
                    <strong>Response Time:</strong> We respond to privacy requests within 30 days
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function PrivacyPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PrivacyPageContent />
    </Suspense>
  )
}
