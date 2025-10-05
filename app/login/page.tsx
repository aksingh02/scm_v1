import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"
import { PageSkeleton } from "@/components/loading/page-skeleton"
import LoginForm from "@/components/auth/login-form"

async function LoginContent() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((c) => c.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-700">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-black dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to your account to continue</p>
          </header>

          <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <LoginContent />
    </Suspense>
  )
}
