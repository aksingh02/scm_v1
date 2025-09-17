import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { getAllCategories } from "@/lib/data"
import Link from "next/link"
import { Suspense } from "react"
import { PageSkeleton } from "@/components/loading/page-skeleton"

async function RegisterPageContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold font-serif text-black dark:text-white mb-2">Create Account</h1>
              <p className="text-gray-600 dark:text-gray-400">Join SylphCorps Media today</p>
            </header>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="Create a password"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Must be at least 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="Confirm your password"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="rounded border-gray-300 dark:border-gray-600 text-black focus:ring-black dark:focus:ring-white mt-1"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-black dark:text-white hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-black dark:text-white hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="rounded border-gray-300 dark:border-gray-600 text-black focus:ring-black dark:focus:ring-white mt-1"
                />
                <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                  Subscribe to our newsletter for the latest news and updates
                </label>
              </div>

              <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                Create Account
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-black dark:text-white hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Ready to stay informed?</p>
            <Link href="/subscribe">
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 bg-transparent">
                Explore Subscription Plans
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <RegisterPageContent />
    </Suspense>
  )
}
