import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeaturedArticle } from "@/components/featured-article"
import { RecentArticles } from "@/components/recent-articles"
import { Newsletter } from "@/components/newsletter"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { getAllCategories, getFeaturedArticle, getRecentArticles } from "@/lib/data"
import { Suspense } from "react"

async function HomePageContent() {
  const [categories, featuredArticle, recentArticles] = await Promise.all([
    getAllCategories(),
    getFeaturedArticle(),
    getRecentArticles(6),
  ])

  const navigationItems = categories.map((category) => category.name)

  const handleRefresh = async () => {
    // Refresh logic would go here
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <PullToRefresh onRefresh={handleRefresh}>
        <main>
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
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  )
}
