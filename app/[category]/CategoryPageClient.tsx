"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { RecentArticles } from "@/components/recent-articles"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { getAllCategories, getCategoryBySlug, getArticlesByCategory, getTimeAgo } from "@/lib/data"
import { notFound } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPageClient({ params }: CategoryPageProps) {
  const { toast } = useToast()
  const [refreshKey, setRefreshKey] = useState(0)

  const categories = getAllCategories()
  const navigationItems = categories.map((category) => category.name)
  const category = getCategoryBySlug(params.category)
  const articlesData = getArticlesByCategory(params.category)

  const handleRefresh = useCallback(async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Force re-render by updating key
    setRefreshKey((prev) => prev + 1)

    toast({
      title: "Content refreshed",
      description: `Latest ${category?.name} news has been updated`,
      duration: 2000,
    })
  }, [toast, category?.name])

  if (!category) {
    notFound()
  }

  // Transform articles data
  const articles = articlesData.map((article) => ({
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-serif text-black dark:text-white mb-4">{category.name}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">{category.description}</p>
          </div>

          {articles.length > 0 ? (
            <RecentArticles articles={articles} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No articles found in this category.</p>
            </div>
          )}

          <Newsletter />
        </main>

        <Footer />
      </PullToRefresh>
    </div>
  )
}
