import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Separator } from "@/components/ui/separator"
import { getAllCategories } from "@/lib/data"

export default function ArticleLoading() {
  const categories = getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto animate-pulse">
          {/* Article Header Skeleton */}
          <header className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gray-200 h-5 w-16 rounded"></div>
              <div className="bg-gray-200 h-3 w-3 rounded-full"></div>
              <div className="bg-gray-200 h-4 w-20 rounded"></div>
              <div className="bg-gray-200 h-3 w-3 rounded-full"></div>
              <div className="bg-gray-200 h-4 w-24 rounded"></div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-gray-200 h-12 w-full rounded"></div>
              <div className="bg-gray-200 h-12 w-5/6 rounded"></div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="bg-gray-200 h-6 w-full rounded"></div>
              <div className="bg-gray-200 h-6 w-4/5 rounded"></div>
            </div>

            <div className="flex items-center space-x-4 mb-8">
              <div className="bg-gray-200 h-12 w-12 rounded-full"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 w-32 rounded"></div>
                <div className="bg-gray-200 h-3 w-48 rounded"></div>
                <div className="bg-gray-200 h-3 w-24 rounded"></div>
              </div>
            </div>
          </header>

          {/* Article Image Skeleton */}
          <div className="mb-8">
            <div className="bg-gray-200 w-full h-96 rounded-lg"></div>
          </div>

          {/* Article Content Skeleton */}
          <div className="space-y-4 mb-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="bg-gray-200 h-4 w-full rounded"></div>
                <div className="bg-gray-200 h-4 w-full rounded"></div>
                <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
              </div>
            ))}
          </div>

          {/* Tags Skeleton */}
          <div className="mb-8">
            <div className="bg-gray-200 h-6 w-16 rounded mb-4"></div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-gray-200 h-6 w-16 rounded-full"></div>
              ))}
            </div>
          </div>
        </article>

        <Separator className="my-12" />

        {/* Related Articles Skeleton */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-gray-200 h-8 w-48 rounded mb-8 animate-pulse"></div>
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-3 animate-pulse">
                <div className="bg-gray-200 w-full h-48 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 w-16 rounded"></div>
                  <div className="bg-gray-200 h-5 w-full rounded"></div>
                  <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
                  <div className="bg-gray-200 h-4 w-full rounded"></div>
                  <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
