"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface Article {
  title: string
  summary: string
  image: string
  category: string
  readTime: string
  publishedAt: string
  slug: string
  author: {
    name: string
    bio: string
    avatar: string
  }
}

interface RecentArticlesClientProps {
  initialArticles: Article[]
}

export function RecentArticlesClient({ initialArticles }: RecentArticlesClientProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [isLoading, setIsLoading] = useState(false)

  const pageRef = useRef(1)
  const hasMoreRef = useRef(true)
  const loadedSlugsRef = useRef(new Set(initialArticles.map((a) => a.slug)))
  const MAX_ARTICLES = 250
  const observerTarget = useRef<HTMLDivElement>(null)

  const loadMoreArticles = useCallback(async () => {
    if (isLoading || !hasMoreRef.current || articles.length >= MAX_ARTICLES) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/articles?page=${pageRef.current}&size=10`)
      const data = await response.json()

      if (data.articles && data.articles.length > 0) {
        const newArticles = data.articles.filter((article: Article) => !loadedSlugsRef.current.has(article.slug))

        if (newArticles.length > 0) {
          const articlesToAdd = newArticles.slice(0, MAX_ARTICLES - articles.length)
          articlesToAdd.forEach((article) => loadedSlugsRef.current.add(article.slug))

          setArticles((prev) => [...prev, ...articlesToAdd])
          pageRef.current += 1

          if (articles.length + articlesToAdd.length >= MAX_ARTICLES) {
            hasMoreRef.current = false
          }
        } else {
          hasMoreRef.current = false
        }
      } else {
        hasMoreRef.current = false
      }
    } catch (error) {
      console.error("Error loading more articles:", error)
    } finally {
      setIsLoading(false)
    }
  }, [articles.length, isLoading])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreRef.current && !isLoading) {
          loadMoreArticles()
        }
      },
      { threshold: 0.1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loadMoreArticles, isLoading])

  return (
    <section>
      <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-8">More News</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <Link key={article.slug} href={`/article/${article.slug}`}>
            <article className="group cursor-pointer">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={article.image || "/svg/placeholder.svg"}
                    alt={article.title}
                    width={120}
                    height={80}
                    className="w-30 h-20 object-cover rounded"
                    sizes="120px"
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
                    <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                      {article.category}
                    </span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                  </div>
                  <h3 className="text-lg font-bold font-serif text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{article.summary}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-500">{article.readTime}</div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div ref={observerTarget} className="mt-12 flex justify-center">
        {isLoading && (
          <div className="grid md:grid-cols-2 gap-8 w-full">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex space-x-4">
                <Skeleton className="w-30 h-20 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
