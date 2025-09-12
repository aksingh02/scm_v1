import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedArticle } from "@/components/featured-article"
import { RecentArticles } from "@/components/recent-articles"
import { Newsletter } from "@/components/newsletter"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { getAllCategories, getFeaturedArticles, getRecentArticles } from "@/lib/data"
import { FeaturedSkeleton } from "@/components/loading/featured-skeleton"
import { ArticlesGridSkeleton } from "@/components/loading/articles-grid-skeleton"

async function HomePageContent() {
  const [categories, featuredArticles, recentArticles] = await Promise.all([
    getAllCategories(),
    getFeaturedArticles(),
    getRecentArticles(9),
  ])

  const navigationItems = categories.map((category) => category.name)
  const featuredArticle = featuredArticles[0] || null

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <main>
        <PullToRefresh>
          {/* Featured Article */}
          {featuredArticle && (
            <section className="py-8">
              <div className="container mx-auto px-4">
                <FeaturedArticle article={featuredArticle} />
              </div>
            </section>
          )}

          {/* Recent Articles */}
          <RecentArticles articles={recentArticles} />

          {/* Newsletter */}
          <Newsletter />
        </PullToRefresh>
      </main>

      <Footer />
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 py-8">
            <FeaturedSkeleton />
            <ArticlesGridSkeleton />
          </div>
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  )
}
