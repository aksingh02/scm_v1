import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllCategories } from "@/lib/data"
import { Check, Star } from "lucide-react"

export default function SubscribePage() {
  const categories = getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-6">
              Subscribe to SylphCorps Media
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Stay informed with trusted journalism and in-depth analysis
            </p>
          </header>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Digital Plan */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 relative">
              <h3 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">Digital</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-black dark:text-white">$9.99</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Unlimited digital access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Mobile app access</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Daily newsletter</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Breaking news alerts</span>
                </li>
              </ul>
              <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                Choose Digital
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="border-2 border-blue-600 rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>Most Popular</span>
                </span>
              </div>
              <h3 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-black dark:text-white">$19.99</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Everything in Digital</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Premium articles & analysis</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Ad-free experience</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Exclusive podcasts</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Archive access</span>
                </li>
              </ul>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Choose Premium</Button>
            </div>

            {/* Print + Digital Plan */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-8 relative">
              <h3 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">Print + Digital</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-black dark:text-white">$39.99</span>
                <span className="text-gray-600 dark:text-gray-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Everything in Premium</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Daily print delivery</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Weekend magazine</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700 dark:text-gray-300">Special editions</span>
                </li>
              </ul>
              <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                Choose Print + Digital
              </Button>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-4">
              Try our free newsletter first
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get a taste of our journalism with our daily newsletter featuring top stories and analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              />
              <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                Subscribe Free
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-8 text-center">
              Why subscribe to SylphCorps Media?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Award-Winning Journalism</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our team of Pulitzer Prize-winning journalists delivers the stories that matter most.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Global Coverage</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  With correspondents in 100+ cities worldwide, we bring you news from every corner of the globe.
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-3">Trusted Digital Innovation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Cutting-edge digital journalism with innovative storytelling and comprehensive coverage you can trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
