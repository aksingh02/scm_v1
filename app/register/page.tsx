import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/auth/register-form"
import { getAllCategories } from "@/lib/data"
import { PageSkeleton } from "@/components/loading/page-skeleton"

async function RegisterPageContent() {
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
              <h1 className="text-3xl font-bold font-serif text-black dark:text-white">Create Account</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Join SylphCorps Media to stay updated with the latest news
              </p>
            </header>

            <RegisterForm />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to receive news updates and promotional content from SylphCorps Media. You
            can unsubscribe at any time.
          </p>
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
