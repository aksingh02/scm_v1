"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Loader2, AlertCircle } from "lucide-react"
import { getTimeAgo, type Article } from "@/lib/data"
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
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSearch = async (searchQuery: string, skipPush = false) => {
    const trimmed = searchQuery.trim()
    if (!trimmed) {
      setResults([])
      setError(null)
      router.push("/search")
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      // Use the API route for client-side searches
      const response = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`)
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setResults(data.articles || [])

      // Only push new URL if it's a new query (prevents re-render loops)
      if (!skipPush && trimmed !== searchParams.get("q")) {
        router.push(`/search?q=${encodeURIComponent(trimmed)}`, { scroll: false })
      }
    } catch (err) {
      console.error("Search error:", err)
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      
      // Check if it's a fetch error (likely from browser extension or network)
      if (errorMessage.includes("fetch") || errorMessage.includes("Failed to fetch")) {
        setError("Unable to connect to search service. Please check your internet connection or try disabling browser extensions.")
      } else {
        setError("Search failed. Please try again.")
      }
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
    const q = searchParams.get("q") || ""
    if (q && q !== query) {
      setQuery(q)
      // Run search automatically when URL changes
      handleSearch(q, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

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
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 dark:text-red-200 font-medium">Search Error</p>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {initialQuery && !error && (
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
              <Link key={article.id} href={`/article/${article.slug}`} className="block">
                <Card className="overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer">
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
                      <h3 className="font-bold text-xl mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{article.summary}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>By {article.author.name}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : initialQuery && !error ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No articles found for "{initialQuery}"</p>
            <p className="text-gray-500 dark:text-gray-500">Try different keywords or browse our categories</p>
          </div>
        ) : !error ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Enter a search term to find articles</p>
          </div>
        ) : null}
      </div>
    </main>
  )
}
