import { ArticlesGridSkeleton } from "@/components/loading/articles-grid-skeleton"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"

export default function CategoryLoading() {
  const categories = getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-pulse">
          <div className="bg-gray-200 h-10 w-64 rounded mb-4"></div>
          <div className="bg-gray-200 h-5 w-96 rounded"></div>
        </div>

        <ArticlesGridSkeleton count={8} />
      </main>

      <Footer />
    </div>
  )
}
