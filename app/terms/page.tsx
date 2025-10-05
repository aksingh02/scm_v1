import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"
import { PageSkeleton } from "@/components/loading/page-skeleton"

async function TermsPageContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Last updated: January 10, 2024</p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              These Terms of Service govern your use of SylphCorps Media's digital platform, services, and content.
            </p>
          </header>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By accessing SylphCorps Media's website, mobile applications, or services, you agree to be bound by
                these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our
                services.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Important:</strong> These terms may be updated periodically. Continued use of our services
                  after changes constitutes acceptance of the new terms.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">2. Service Description</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                SylphCorps Media provides digital journalism services including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>News articles, analysis, and multimedia content</li>
                <li>AI-powered personalized news recommendations</li>
                <li>Breaking news alerts and newsletters</li>
                <li>Interactive features and community engagement tools</li>
                <li>Premium subscription content and services</li>
                <li>Mobile applications and digital platforms</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                3. Account Registration and Security
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-black dark:text-white">Account Requirements</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                    <li>You must be at least 13 years old to create an account</li>
                    <li>Provide accurate and complete registration information</li>
                    <li>Maintain the security of your account credentials</li>
                    <li>Notify us immediately of any unauthorized access</li>
                  </ul>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-black dark:text-white">Account Responsibilities</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You are responsible for all activities that occur under your account and for maintaining the
                    confidentiality of your login credentials.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                4. Subscription Terms and Billing
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Subscription Plans</h3>
                <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Digital:</strong> Full access to digital content, mobile apps, and newsletters
                  </li>
                  <li>
                    <strong>Premium:</strong> Ad-free experience, exclusive content, and advanced features
                  </li>
                  <li>
                    <strong>Enterprise:</strong> Custom solutions for businesses and organizations
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Billing and Payments</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Subscriptions are billed in advance (monthly or annually)</li>
                    <li>Automatic renewal unless cancelled before the next billing cycle</li>
                    <li>Price changes will be communicated 30 days in advance</li>
                    <li>Refunds available within 30 days of initial subscription</li>
                  </ul>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Cancellation</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    You may cancel your subscription at any time through your account settings. Cancellation takes
                    effect at the end of the current billing period.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                5. Content Usage and Intellectual Property
              </h2>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Our Content Rights</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    All content on SylphCorps Media is protected by copyright and other intellectual property laws. You
                    may not reproduce, distribute, or create derivative works without explicit permission.
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Permitted Uses</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Personal, non-commercial reading and sharing</li>
                    <li>Brief excerpts for commentary or criticism (fair use)</li>
                    <li>Educational use with proper attribution</li>
                    <li>Social media sharing using our provided tools</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                6. User-Generated Content
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When you submit comments, feedback, or other content to our platform:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>You retain ownership of your content</li>
                <li>You grant us a license to use, modify, and display your content</li>
                <li>You represent that your content is original and non-infringing</li>
                <li>We reserve the right to moderate and remove inappropriate content</li>
              </ul>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-black dark:text-white mb-2">Prohibited Content</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Content that is illegal, harmful, offensive, discriminatory, or violates others' rights is strictly
                  prohibited and will be removed.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                7. AI and Automated Systems
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                SylphCorps Media uses artificial intelligence and automated systems to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Personalize content recommendations</li>
                <li>Detect and prevent spam or abuse</li>
                <li>Analyze content performance and user engagement</li>
                <li>Assist in content creation and fact-checking</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                By using our services, you consent to the processing of your data by these automated systems as
                described in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                8. Disclaimers and Limitations
              </h2>
              <div className="space-y-4">
                <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Service Availability</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    We strive for 99.9% uptime but cannot guarantee uninterrupted service. Maintenance and updates may
                    cause temporary disruptions.
                  </p>
                </div>
                <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Content Accuracy</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    While we strive for accuracy, we cannot guarantee that all information is error-free. Users should
                    verify important information from multiple sources.
                  </p>
                </div>
                <div className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Third-Party Links</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    We are not responsible for the content or practices of third-party websites linked from our
                    platform.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">9. Termination</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We reserve the right to suspend or terminate your account for violations of these terms, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
                <li>Violation of our community guidelines</li>
                <li>Fraudulent or illegal activity</li>
                <li>Abuse of our systems or other users</li>
                <li>Non-payment of subscription fees</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">10. Contact Information</h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Email:</strong> admin@sylphcorpsmedia.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 7042954064
                  </p>
                  <p>
                    <strong>Address:</strong> SylphCorps Media, Block A, Krishna Nagar, New Delhi, Delhi 110051, India
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

export default function TermsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <TermsPageContent />
    </Suspense>
  )
}
