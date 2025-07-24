"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { RecentArticles } from "@/components/recent-articles"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { getAllCategories, searchArticlesData, type Article, getTimeAgo } from "@/lib/data"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Article[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    // Load categories
    getAllCategories().then((cats) => {
      setCategories(cats.map((cat) => cat.name))
    })

    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsSearching(true)
    try {
      const searchResults = await searchArticlesData(searchQuery)
      setResults(searchResults)
    } catch (error) {
      console.error("Search failed:", error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)
  }

  // Transform results for RecentArticles component
  const transformedResults = results.map((article) => ({
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
    <div className="min-h-screen bg-white">
      <Header navigationItems={categories} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold font-serif text-black mb-6 text-center">Search Articles</h1>

          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search for articles, topics, or keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 border-gray-300 focus:border-gray-500"
              />
            </div>
            <Button type="submit" className="bg-black text-white hover:bg-gray-800" disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </form>
        </div>

        {query && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {isSearching ? "Searching..." : `Search results for "${query}"`}
            </h2>
            {!isSearching && (
              <p className="text-gray-600">
                Found {results.length} {results.length === 1 ? "article" : "articles"}
              </p>
            )}
          </div>
        )}

        {results.length > 0 && !isSearching && <RecentArticles articles={transformedResults} />}

        {query && results.length === 0 && !isSearching && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found matching your search.</p>
            <p className="text-gray-400 mt-2">Try different keywords or browse our categories.</p>
          </div>
        )}

        <Newsletter />
      </main>

      <Footer />
    </div>
  )
}
