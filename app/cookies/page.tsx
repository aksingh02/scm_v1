import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"

export default function CookiesPage() {
  const categories = getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-6">Cookie Policy</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Last updated: January 10, 2024</p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              This Cookie Policy explains how SylphCorps Media uses cookies and similar technologies to enhance your
              browsing experience and improve our services.
            </p>
          </header>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cookies are small text files stored on your device when you visit our website. They help us remember
                your preferences, analyze site usage, and provide personalized content and advertising.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Note:</strong> Cookies do not contain personal information that can identify you directly, but
                  they may be linked to your account information when you're logged in.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                2. Types of Cookies We Use
              </h2>

              <div className="space-y-6">
                <div className="border border-green-500 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-3 flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                    Essential Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Required for basic website functionality and cannot be disabled.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Authentication and login status</li>
                    <li>Shopping cart and subscription management</li>
                    <li>Security and fraud prevention</li>
                    <li>Load balancing and site performance</li>
                  </ul>
                </div>

                <div className="border border-blue-500 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-3 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    Functional Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Enhance your experience by remembering your preferences.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Language and region preferences</li>
                    <li>Dark/light mode settings</li>
                    <li>Font size and accessibility options</li>
                    <li>Newsletter subscription preferences</li>
                  </ul>
                </div>

                <div className="border border-purple-500 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-3 flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                    Analytics Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Help us understand how visitors interact with our website.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Page views and user journey tracking</li>
                    <li>Article reading time and engagement metrics</li>
                    <li>Search queries and content preferences</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>

                <div className="border border-orange-500 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-3 flex items-center">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mr-3"></span>
                    Personalization Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Power our AI-driven content recommendations and personalized experience.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Content recommendation algorithms</li>
                    <li>Personalized news feed curation</li>
                    <li>Reading history and preferences</li>
                    <li>Customized newsletter content</li>
                  </ul>
                </div>

                <div className="border border-red-500 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-black dark:text-white mb-3 flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                    Advertising Cookies
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Used to deliver relevant advertisements and measure campaign effectiveness.
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Targeted advertising based on interests</li>
                    <li>Ad frequency capping</li>
                    <li>Campaign performance measurement</li>
                    <li>Cross-site tracking prevention</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                3. Third-Party Cookies and Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We work with trusted third-party services that may set their own cookies:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Analytics Partners</h3>
                  <ul className="text-gray-700 dark:text-gray-300 text-sm">
                    <li>• Google Analytics</li>
                    <li>• Adobe Analytics</li>
                    <li>• Mixpanel</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Advertising Partners</h3>
                  <ul className="text-gray-700 dark:text-gray-300 text-sm">
                    <li>• Google Ads</li>
                    <li>• Facebook Pixel</li>
                    <li>• LinkedIn Insight</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Social Media</h3>
                  <ul className="text-gray-700 dark:text-gray-300 text-sm">
                    <li>• Twitter widgets</li>
                    <li>• Facebook plugins</li>
                    <li>• YouTube embeds</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Payment Processing</h3>
                  <ul className="text-gray-700 dark:text-gray-300 text-sm">
                    <li>• Stripe</li>
                    <li>• PayPal</li>
                    <li>• Apple Pay</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                4. Managing Your Cookie Preferences
              </h2>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Cookie Consent Manager</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You can manage your cookie preferences at any time using our Cookie Consent Manager. Click the "Cookie
                  Settings" link in our footer to access these controls.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                    Accept All
                  </span>
                  <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm">
                    Essential Only
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    Customize
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Browser Settings</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    Most browsers allow you to control cookies through their settings:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Block all cookies (may affect site functionality)</li>
                    <li>Block third-party cookies only</li>
                    <li>Delete existing cookies</li>
                    <li>Set cookies to expire when you close your browser</li>
                  </ul>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Opt-Out Tools</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Use industry opt-out tools to limit tracking across websites:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Digital Advertising Alliance (DAA) opt-out</li>
                    <li>Network Advertising Initiative (NAI) opt-out</li>
                    <li>Google Ad Settings</li>
                    <li>Facebook Ad Preferences</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                5. Cookie Retention and Deletion
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left text-black dark:text-white">
                        Cookie Type
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left text-black dark:text-white">
                        Retention Period
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 p-3 text-left text-black dark:text-white">
                        Deletion Method
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        Session Cookies
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        Until browser closes
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        Automatic
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        Persistent Cookies
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        1-24 months
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        Manual or automatic expiry
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        Analytics Cookies
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        2 years
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        Automatic expiry
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        Advertising Cookies
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        30 days - 1 year
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-700 dark:text-gray-300">
                        User control + automatic
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                6. Impact of Disabling Cookies
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Disabled Features</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Personalized content recommendations</li>
                    <li>Saved preferences and settings</li>
                    <li>Shopping cart functionality</li>
                    <li>Social media integration</li>
                    <li>Analytics and performance optimization</li>
                  </ul>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-black dark:text-white mb-2">Still Available</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Basic article reading</li>
                    <li>Search functionality</li>
                    <li>Newsletter signup</li>
                    <li>Contact forms</li>
                    <li>Mobile app access</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
                7. Updates to This Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update this Cookie Policy periodically to reflect changes in our practices or applicable laws. We
                will notify you of significant changes through:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
                <li>Email notification to subscribers</li>
                <li>Prominent notice on our website</li>
                <li>Updated "Last modified" date at the top of this policy</li>
                <li>Push notifications through our mobile app</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">8. Contact Us</h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  If you have questions about our use of cookies or this Cookie Policy, please contact us:
                </p>
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Email:</strong> cookies@sylphcorps.media
                  </p>
                  <p>
                    <strong>Privacy Team:</strong> privacy@sylphcorps.media
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-COOK
                  </p>
                  <p>
                    <strong>Address:</strong> SylphCorps Media Privacy Office, 123 Innovation Drive, Tech City, TC 12345
                  </p>
                  <p>
                    <strong>Cookie Settings:</strong>{" "}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Manage Cookie Preferences
                    </a>
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
