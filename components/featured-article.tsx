import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface FeaturedArticleProps {
  article: {
    title: string
    summary: string
    image: string
    category: string
    readTime: string
    author: {
      name: string
      bio: string
      avatar: string
    }
    publishedAt: string
    slug: string
  }
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="mb-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs font-medium">
              {article.category}
            </span>
            <span>•</span>
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-black dark:text-white leading-tight">
            {article.title}
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{article.summary}</p>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <span>By {article.author.name}</span>
          </div>
          <Link href={`/article/${article.slug}`}>
            <Button
              variant="outline"
              className="mt-4 bg-transparent border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Read Full Article
            </Button>
          </Link>
        </div>
        <div className="order-first md:order-last">
          <Image
            src={article.image || "/svg/placeholder.svg"}
            alt={article.title}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
