"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { RecentArticles } from "@/components/recent-articles"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  getAllCategories,
  getArticlesByCategory,
  getCategoryBySlug,
  getTimeAgo,
  type Article,
  type Category,
} from "@/lib/data"
import { ArticlesGridSkeleton } from "@/components/loading/articles-grid-skeleton"

interface CategoryPageClientProps {
  category: string
}

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadData()
  }, [category])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [categoriesData, categoryData, articlesData] = await Promise.all([
        getAllCategories(),
        getCategoryBySlug(category),
        getArticlesByCategory(category, 20),
      ])

      setCategories(categoriesData)
      setCurrentCategory(categoryData)
      setArticles(articlesData)
      setHasMore(articlesData.length === 20) // If we got 20 articles, there might be more
    } catch (err) {
      console.error("Error loading category data:", err)
      setError("Failed to load articles. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    try {
      const nextPage = page + 1
      const moreArticles = await getArticlesByCategory(category, 20)

      if (moreArticles.length === 0) {
        setHasMore(false)
      } else {
        setArticles((prev) => [...prev, ...moreArticles])
        setPage(nextPage)
        setHasMore(moreArticles.length === 20)
      }
    } catch (err) {
      console.error("Error loading more articles:", err)
    }
  }

  const navigationItems = categories.map((cat) => cat.name)

  // Transform articles for RecentArticles component
  const transformedArticles = articles.map((article) => ({
    title: article.title,
    summary: article.summary,
    image: article.image,
    category: article.category,
    readTime: article.readTime,
    publishedAt: getTimeAgo(article.publishedAt),
    slug: article.slug,
    author: article.author,
  }))

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header navigationItems={navigationItems} />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>
          <ArticlesGridSkeleton />
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Header navigationItems={navigationItems} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <Button onClick={loadData} className="bg-black text-white hover:bg-gray-800">
              Try Again
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-black mb-4 capitalize">
            {currentCategory?.name || category}
          </h1>
          <p className="text-gray-600">{currentCategory?.description || `Latest ${category} news and updates`}</p>
        </div>

        {articles.length > 0 ? (
          <>
            <RecentArticles articles={transformedArticles} />

            {hasMore && (
              <div className="text-center mt-12">
                <Button onClick={loadMore} className="bg-black text-white hover:bg-gray-800">
                  Load More Articles
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found in this category.</p>
            <p className="text-gray-400 mt-2">Check back later for new content.</p>
          </div>
        )}

        <Newsletter />
      </main>

      <Footer />
    </div>
  )
}
