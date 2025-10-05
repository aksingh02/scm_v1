import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"
import { getCurrentUser } from "@/lib/auth"
import SettingsForm from "./settings-form"
import { redirect } from "next/navigation"
import { PageSkeleton } from "@/components/loading/page-skeleton"

async function SettingsContent() {
  const [categories, user] = await Promise.all([getAllCategories(), getCurrentUser()])
  if (!user) {
    redirect("/login")
  }
  const navigationItems = categories.map((c) => c.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-black dark:text-white">Account Settings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your profile and preferences</p>
          </header>
          <SettingsForm user={user} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SettingsContent />
    </Suspense>
  )
}
