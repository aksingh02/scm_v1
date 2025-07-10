"use client"

import { useState, useCallback } from "react"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { FeaturedArticle } from "@/components/featured-article"
import { RecentArticles } from "@/components/recent-articles"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { getAllCategories, getFeaturedArticle, getRecentArticles, getTimeAgo } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function NewsHomepage() {
  const { toast } = useToast()
  const [refreshKey, setRefreshKey] = useState(0)

  const categories = getAllCategories()
  const navigationItems = categories.map((category) => category.name)
  const featuredArticleData = getFeaturedArticle()
  const recentArticlesData = getRecentArticles(6)

  const handleRefresh = useCallback(async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Force re-render by updating key
    setRefreshKey((prev) => prev + 1)

    toast({
      title: "Content refreshed",
      description: "Latest news has been updated",
      duration: 2000,
    })
  }, [toast])

  if (!featuredArticleData) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">No featured article found</div>
    )
  }

  // Transform featured article data to match component interface
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

  // Transform recent articles data
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header navigationItems={navigationItems} />

      <PullToRefresh onRefresh={handleRefresh}>
        <main className="container mx-auto px-4 py-8" key={refreshKey}>
          <FeaturedArticle article={featuredArticle} />

          <Separator className="my-12 border-gray-200 dark:border-gray-800" />

          <RecentArticles articles={recentArticles} />

          <Newsletter />
        </main>

        <Footer />
      </PullToRefresh>
    </div>
  )
}
