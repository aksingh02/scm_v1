import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAllCategories } from "@/lib/data"
import Link from "next/link"
import { Suspense } from "react"
import { PageSkeleton } from "@/components/loading/page-skeleton"
import { ArrowLeft, Mail } from "lucide-react"

async function ForgotPasswordPageContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <Link
                href="/login"
                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Sign In
              </Link>
            </div>

            <header className="mb-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              </div>
              <h1 className="text-3xl font-bold font-serif text-black dark:text-white mb-2">Reset Password</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </header>

            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  placeholder="Enter your email address"
                />
              </div>

              <Button className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                Send Reset Link
              </Button>
            </form>

            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• We'll send a password reset link to your email</li>
                <li>• Click the link to create a new password</li>
                <li>• The link will expire in 24 hours for security</li>
              </ul>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{" "}
                <Link href="/login" className="text-black dark:text-white hover:underline font-medium">
                  Sign in instead
                </Link>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-black dark:text-white hover:underline font-medium">
                  Create one here
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Having trouble? Contact our support team at{" "}
              <Link href="/contact" className="hover:underline">
                support@sylphcorps.com
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ForgotPasswordPageContent />
    </Suspense>
  )
}
