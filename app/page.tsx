import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedArticle } from "@/components/featured-article"
import { RecentArticles } from "@/components/recent-articles"
import { Newsletter } from "@/components/newsletter"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { getAllCategories, getFeaturedArticle, getRecentArticles } from "@/lib/data"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
          <Skeleton className="aspect-video w-full" />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="w-30 h-20 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

async function HomePageContent() {
  const [categories, featuredArticle, recentArticles] = await Promise.all([
    getAllCategories(),
    getFeaturedArticle(),
    getRecentArticles(6),
  ])

  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <PullToRefresh>
        <main className="container mx-auto px-4 py-8">
          {featuredArticle && <FeaturedArticle article={featuredArticle} />}
          <RecentArticles articles={recentArticles} />
          <Newsletter />
        </main>
      </PullToRefresh>

      <Footer />
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePageContent />
    </Suspense>
  )
}
