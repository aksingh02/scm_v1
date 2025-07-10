import { FeaturedSkeleton } from "./featured-skeleton"
import { ArticlesGridSkeleton } from "./articles-grid-skeleton"
import { Separator } from "@/components/ui/separator"

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <header className="border-b border-gray-200">
        <div className="border-b border-gray-100 py-2">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="bg-gray-200 h-4 w-48 rounded animate-pulse"></div>
            <div className="flex space-x-4">
              <div className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
              <div className="bg-gray-200 h-4 w-12 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="bg-gray-200 h-8 w-48 rounded animate-pulse"></div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 h-10 w-64 rounded animate-pulse"></div>
              <div className="bg-gray-200 h-10 w-24 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        <nav className="border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="hidden md:flex items-center space-x-8 py-3">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-gray-200 h-4 w-16 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FeaturedSkeleton />
        <Separator className="my-12" />
        <ArticlesGridSkeleton />
      </main>
    </div>
  )
}
