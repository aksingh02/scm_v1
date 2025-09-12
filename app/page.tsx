import { Suspense } from "react"
import { getArticles, getFeaturedArticles } from "@/lib/api"
import { FeaturedArticle } from "@/components/featured-article"
import { RecentArticles } from "@/components/recent-articles"
import { Newsletter } from "@/components/newsletter"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { FeaturedSkeleton } from "@/components/loading/featured-skeleton"
import { ArticlesGridSkeleton } from "@/components/loading/articles-grid-skeleton"

async function FeaturedSection() {
  try {
    const featuredResponse = await getFeaturedArticles()
    const featuredArticle = featuredResponse.data?.[0]

    if (!featuredArticle) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No featured articles available at the moment.</p>
        </div>
      )
    }

    return <FeaturedArticle article={featuredArticle} />
  } catch (error) {
    console.error("Error loading featured article:", error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Unable to load featured article.</p>
      </div>
    )
  }
}

async function RecentSection() {
  try {
    const articlesResponse = await getArticles(undefined, 1, 8)
    const articles = articlesResponse.data || []

    return <RecentArticles articles={articles} />
  } catch (error) {
    console.error("Error loading recent articles:", error)
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Unable to load recent articles.</p>
      </div>
    )
  }
}

export default function HomePage() {
  return (
    <PullToRefresh>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            <Suspense fallback={<FeaturedSkeleton />}>
              <FeaturedSection />
            </Suspense>
          </div>

          {/* Recent Articles Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<ArticlesGridSkeleton />}>
              <RecentSection />
            </Suspense>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16">
          <Newsletter />
        </div>
      </div>
    </PullToRefresh>
  )
}
