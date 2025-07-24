import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { FeaturedArticle } from "@/components/featured-article"
import { RecentArticles } from "@/components/recent-articles"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { getAllCategories, getFeaturedArticle, getRecentArticles, getTimeAgo } from "@/lib/data"
import { Suspense } from "react"
import { FeaturedSkeleton } from "@/components/loading/featured-skeleton"
import { ArticlesGridSkeleton } from "@/components/loading/articles-grid-skeleton"

async function FeaturedSection() {
  const featuredArticleData = await getFeaturedArticle()

  if (!featuredArticleData) {
    return <div className="text-center py-8">No featured article available</div>
  }

  const featuredArticle = {
    title: featuredArticleData.title,
    summary: featuredArticleData.summary,
    image: featuredArticleData.image,
    category: featuredArticleData.category,
    readTime: featuredArticleData.readTime,
    author: featuredArticleData.author,
    publishedAt: getTimeAgo(featuredArticleData.publishedAt),
    slug: featuredArticleData.slug,
  }

  return <FeaturedArticle article={featuredArticle} />
}

async function RecentSection() {
  const recentArticlesData = await getRecentArticles(6)

  const recentArticles = recentArticlesData.map((article) => ({
    title: article.title,
    summary: article.summary,
    image: article.image,
    category: article.category,
    readTime: article.readTime,
    publishedAt: getTimeAgo(article.publishedAt),
    slug: article.slug,
    author: article.author,
  }))

  return <RecentArticles articles={recentArticles} />
}

async function HeaderSection() {
  const categories = await getAllCategories()
  const navigationItems = categories.map((category) => category.name)
  return <Header navigationItems={navigationItems} />
}

export default async function NewsHomepage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Suspense fallback={<div className="h-20 bg-white dark:bg-gray-900" />}>
        <HeaderSection />
      </Suspense>

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedSection />
        </Suspense>

        <Separator className="my-12 border-gray-200 dark:border-gray-800" />

        <Suspense fallback={<ArticlesGridSkeleton />}>
          <RecentSection />
        </Suspense>

        <Newsletter />
      </main>

      <Footer />
    </div>
  )
}
