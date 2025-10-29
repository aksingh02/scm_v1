"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getTimeAgo, type Article, type Category } from "@/lib/data"
import { fetchArticlesByCategoryDirect } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"
import { Loader2 } from "lucide-react"

interface CategoryPageClientProps {
  category: Category
  initialArticles: Article[]
  categorySlug: string
}

export function CategoryPageClient({ category, initialArticles, categorySlug }: CategoryPageClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialArticles.length >= 12)
  const [currentPage, setCurrentPage] = useState(1)

  const loadMoreArticles = async () => {
    if (loading) return

    setLoading(true)
    try {
      const response = await fetchArticlesByCategoryDirect(categorySlug, currentPage, 12)

      if (response.content.length === 0) {
        setHasMore(false)
      } else {
        // Transform API articles to Article interface
        const newArticles = response.content.map((apiArticle) => ({
          id: apiArticle.id.toString(),
          title: apiArticle.title,
          slug: apiArticle.slug,
          summary: apiArticle.excerpt,
          content: apiArticle.content,
          image: apiArticle.imageUrl,
          category: apiArticle.categories[0]?.name || "General",
          author: {
            name: apiArticle.author.fullName,
            bio: apiArticle.author.bio,
            avatar: "/placeholder.svg?height=50&width=50",
          },
          publishedAt: apiArticle.publishedAt,
          readTime: `${Math.ceil(apiArticle.content.split(" ").length / 200)} min read`,
          tags: apiArticle.tags,
          featured: apiArticle.featured,
          trending: apiArticle.trending,
          viewCount: apiArticle.viewCount,
          likeCount: apiArticle.likeCount,
        }))

        setArticles((prev) => [...prev, ...newArticles])
        setCurrentPage((prev) => prev + 1)

        if (response.last) {
          setHasMore(false)
        }
      }
    } catch (error) {
      console.error("Error loading more articles:", error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white mb-4">{category.name}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">{category.description}</p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No articles found in this category yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {articles.map((article) => (
              // ✅ key on Link (outermost element)
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="block" // makes whole card clickable
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getTimeAgo(article.publishedAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                      {/* ✅ removed inner Link */}
                      <span className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {article.title}
                      </span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">{article.summary}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>By {article.author.name}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="text-center">
              <Button
                onClick={loadMoreArticles}
                disabled={loading}
                variant="outline"
                className="px-8 py-2 bg-transparent"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More Articles"
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  )
}
