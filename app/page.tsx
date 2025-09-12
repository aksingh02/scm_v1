import { FeaturedArticle } from "@/components/featured-article"
import { RecentArticles } from "@/components/recent-articles"
import { Newsletter } from "@/components/newsletter"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { getArticles } from "@/lib/api"
import { Suspense } from "react"
import { FeaturedSkeleton } from "@/components/loading/featured-skeleton"
import { ArticlesGridSkeleton } from "@/components/loading/articles-grid-skeleton"

async function HomePage() {
  try {
    const articles = await getArticles()

    if (!articles || articles.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">No articles available</h1>
            <p className="text-gray-600 dark:text-gray-400">Please check back later for the latest news.</p>
          </div>
        </div>
      )
    }

    const [featuredArticle, ...recentArticles] = articles

    return (
      <PullToRefresh>
        <div className="space-y-12">
          <Suspense fallback={<FeaturedSkeleton />}>
            <FeaturedArticle article={featuredArticle} />
          </Suspense>

          <Suspense fallback={<ArticlesGridSkeleton />}>
            <RecentArticles articles={recentArticles.slice(0, 6)} />
          </Suspense>

          <Newsletter />
        </div>
      </PullToRefresh>
    )
  } catch (error) {
    console.error("Error loading homepage:", error)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Unable to load articles</h1>
          <p className="text-gray-600 dark:text-gray-400">
            We're experiencing technical difficulties. Please try again later.
          </p>
        </div>
      </div>
    )
  }
}

export default HomePage
