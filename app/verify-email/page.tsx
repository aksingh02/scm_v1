import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"

import VerifyEmailClient from "./verify-email-client"
import { PageSkeleton } from "@/components/loading/page-skeleton"

export default async function VerifyEmailPage({
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
            <h1 className="text-3xl font-serif font-bold text-black dark:text-white">Verify your email</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Click the verification link from your email, or paste the token here if you have one.
            </p>
          </header>
          <VerifyEmailClient token={token} />
        </main>
        <Footer />
      </div>
    </Suspense>
  )
}
