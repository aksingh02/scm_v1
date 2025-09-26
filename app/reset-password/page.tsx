import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"
import ResetPasswordForm from "./reset-password-form"
import { PageSkeleton } from "@/components/loading/page-skeleton"

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const categories = await getAllCategories()
  const navigationItems = categories.map((c) => c.name)
  const token = (searchParams?.token as string) || ""

  return (
    <Suspense fallback={<PageSkeleton />}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header navigationItems={navigationItems} />
        <main className="container mx-auto px-4 py-10 max-w-2xl">
          <header className="mb-6">
            <h1 className="text-3xl font-serif font-bold text-black dark:text-white">Reset password</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Enter your new password. This form requires a valid reset token from your email.
            </p>
          </header>
          <ResetPasswordForm token={token} />
        </main>
        <Footer />
      </div>
    </Suspense>
  )
}
