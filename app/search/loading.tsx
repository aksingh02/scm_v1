import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getAllCategories } from "@/lib/data"

export default function SearchLoading() {
  const categories = getAllCategories()
  const navigationItems = categories.map((category) => category.name)

  return (
    <div className="min-h-screen bg-white">
      <Header navigationItems={navigationItems} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8 animate-pulse">
          <div className="bg-gray-200 h-8 w-48 rounded mb-6 mx-auto"></div>
          <div className="flex gap-4">
            <div className="flex-1 bg-gray-200 h-10 rounded"></div>
            <div className="bg-gray-200 h-10 w-20 rounded"></div>
          </div>
        </div>

        <div className="mb-8 animate-pulse">
          <div className="bg-gray-200 h-6 w-64 rounded mb-4"></div>
          <div className="bg-gray-200 h-4 w-32 rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-30 h-20 bg-gray-200 rounded"></div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-200 h-4 w-16 rounded"></div>
                    <div className="bg-gray-200 h-3 w-3 rounded-full"></div>
                    <div className="bg-gray-200 h-4 w-20 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-gray-200 h-5 w-full rounded"></div>
                    <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
                  </div>
                  <div className="bg-gray-200 h-4 w-full rounded"></div>
                  <div className="bg-gray-200 h-4 w-2/3 rounded"></div>
                  <div className="bg-gray-200 h-3 w-16 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
