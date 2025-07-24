"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Loader2 } from "lucide-react"
import { searchArticlesData, getTimeAgo, type Article } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

interface SearchResultsProps {
  initialQuery: string
  initialResults: Article[]
}

export function SearchResults({ initialQuery, initialResults }: SearchResultsProps) {
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Article[]>(initialResults)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      router.push("/search")
      return
    }

    setLoading(true)
    try {
      const articles = await searchArticlesData(searchQuery)
      setResults(articles)
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  useEffect(() => {
    const queryParam = searchParams.get("q")
    if (queryParam && queryParam !== query) {
      setQuery(queryParam)
    }
  }, [searchParams, query])

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold font-serif text-black dark:text-white mb-6 text-center">Search Articles</h1>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for articles, topics, or keywords..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto">
        {initialQuery && (
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              {loading ? (
                "Searching..."
              ) : (
                <>
                  {results.length} result{results.length !== 1 ? "s" : ""} for "{initialQuery}"
                </>
              )}
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : results.length > 0 ? (
          <div className="grid gap-6">
            {results.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="aspect-video md:aspect-square relative">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <CardContent className="md:w-2/3 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {getTimeAgo(article.publishedAt)}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-3">
                      <Link
                        href={`/article/${article.slug}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{article.summary}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>By {article.author.name}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        ) : initialQuery ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No articles found for "{initialQuery}"</p>
            <p className="text-gray-500 dark:text-gray-500">Try different keywords or browse our categories</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Enter a search term to find articles</p>
          </div>
        )}
      </div>
    </main>
  )
}
