import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/utils/date" // Assuming formatDate is imported from a utils file

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

interface RecentArticlesProps {
  articles: Article[]
}

export function RecentArticles({ articles }: RecentArticlesProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold font-serif text-black dark:text-white mb-8">More News</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <Link key={index} href={`/article/${article.slug}`}>
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
                    <span>{formatDate(article.publishedAt)}</span>
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
    </section>
  )
}
