import { ArticleSkeleton } from "./article-skeleton"

interface ArticlesGridSkeletonProps {
  count?: number
}

export function ArticlesGridSkeleton({ count = 6 }: ArticlesGridSkeletonProps) {
  return (
    <section>
      <div className="bg-gray-200 h-8 w-48 rounded mb-8 animate-pulse"></div>
      <div className="grid md:grid-cols-2 gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <ArticleSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}
