import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LoginForm } from "@/components/auth/login-form"
import { getAllCategories } from "@/lib/data"
import { PageSkeleton } from "@/components/loading/page-skeleton"

async function LoginPageContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-bold font-serif text-black dark:text-white mb-2">Welcome Back</h1>
              <p className="text-gray-600 dark:text-gray-400">Sign in to your SylphCorps Media account</p>
            </header>

            <LoginForm />

            <div className="mt-6">
              <Separator className="my-4" />
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-black dark:text-white hover:underline font-medium">
                  Create one here
                </a>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By signing in, you agree to our{" "}
                <a href="/terms" className="hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">New to SylphCorps Media?</p>
            <a href="/subscribe">
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 bg-transparent">
                Start Your Subscription
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LoginPageContent />
    </Suspense>
  )
}
