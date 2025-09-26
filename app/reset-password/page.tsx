import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"
import ResetPasswordForm from "./reset-password-form"

async function ResetPasswordContent({ token }: { token?: string }) {
  const categories = await getAllCategories()
  const navigationItems = categories.map((c) => c.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />
      <main className="max-w-md mx-auto px-4 py-16">
        <ResetPasswordForm token={token} />
      </main>
      <Footer />
    </div>
  )
}

export default async function ResetPasswordPage({ searchParams }: { searchParams?: Promise<{ token?: string }> }) {
  const params = (await searchParams) || {}
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16">Loading...</div>}>
      <ResetPasswordContent token={params.token} />
    </Suspense>
  )
}
