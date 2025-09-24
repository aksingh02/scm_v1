import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import { getAllCategories } from "@/lib/data"
import { PageSkeleton } from "@/components/loading/page-skeleton"

async function ForgotPasswordPageContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="max-w-md mx-auto px-4 py-16">
        <div className="mb-6">
          <a
            href="/login"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <span aria-hidden="true" className="mr-2">
              ←
            </span>
            Back to Login
          </a>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-8">
            <header className="space-y-1 text-center mb-6">
              <h1 className="text-3xl font-bold font-serif text-black dark:text-white">Reset Password</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
            </header>

            <ForgotPasswordForm />
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          Having trouble? Contact our support team at{" "}
          <a href="/contact" className="hover:underline">
            support@sylphcorpsmedia.com
          </a>
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
