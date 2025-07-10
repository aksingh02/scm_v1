import { Header } from "@/components/header"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { getAllCategories, getArticleBySlug, getRelatedArticles, formatDate, getTimeAgo } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const categories = getAllCategories()
  const navigationItems = categories.map((category) => category.name)
  const article = getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(article, 3)

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Link
                href={`/${article.category.toLowerCase()}`}
                className="bg-black text-white px-2 py-1 text-xs font-medium hover:bg-gray-800"
              >
                {article.category}
              </Link>
              <span>•</span>
              <span>{getTimeAgo(article.publishedAt)}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold font-serif text-black leading-tight mb-6">{article.title}</h1>

            <p className="text-xl text-gray-700 leading-relaxed mb-6">{article.summary}</p>

            <div className="flex items-center space-x-4 mb-8">
              <Image
                src={article.author.avatar || "/placeholder.svg"}
                alt={article.author.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="font-semibold text-black">{article.author.name}</p>
                <p className="text-sm text-gray-600">{article.author.bio}</p>
                <p className="text-sm text-gray-500">{formatDate(article.publishedAt)}</p>
              </div>
            </div>
          </header>

          {/* Article Image */}
          <div className="mb-8">
            <Image
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              width={800}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-800 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        <Separator className="my-12" />

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold font-serif text-black mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link key={relatedArticle.id} href={`/article/${relatedArticle.slug}`} className="group">
                  <article className="space-y-3">
                    <Image
                      src={relatedArticle.image || "/placeholder.svg"}
                      alt={relatedArticle.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="space-y-2">
                      <span className="bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        {relatedArticle.category}
                      </span>
                      <h3 className="font-bold font-serif text-black group-hover:text-gray-700 transition-colors leading-tight">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{relatedArticle.summary}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Newsletter />
      </main>

      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const { getAllArticles } = await import("@/lib/data")
  const articles = getAllArticles()

  return articles.map((article) => ({
    slug: article.slug,
  }))
}
