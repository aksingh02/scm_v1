import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"
import { getNewsUserProfile } from "@/lib/news-user"
import { ProfileSettings } from "@/components/profile/profile-settings"
import { PageSkeleton } from "@/components/loading/page-skeleton"

async function ProfilePageContent() {
  const cookieStore = cookies()
  const authToken = cookieStore.get("scm_session")?.value ?? cookieStore.get("news_auth_token")?.value

  if (!authToken) {
    redirect("/login")
  }

  const [categories, user] = await Promise.all([getAllCategories(), getNewsUserProfile(authToken)])

  if (!user) {
    redirect("/login")
  }

  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <ProfileSettings user={user} />
      </main>

      <Footer />
    </div>
  )
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ProfilePageContent />
    </Suspense>
  )
}
