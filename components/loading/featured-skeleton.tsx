export function FeaturedSkeleton() {
  return (
    <section className="mb-12 animate-pulse">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="bg-gray-200 h-5 w-16 rounded"></div>
            <div className="bg-gray-200 h-3 w-3 rounded-full"></div>
            <div className="bg-gray-200 h-4 w-20 rounded"></div>
            <div className="bg-gray-200 h-3 w-3 rounded-full"></div>
            <div className="bg-gray-200 h-4 w-24 rounded"></div>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-200 h-8 w-full rounded"></div>
            <div className="bg-gray-200 h-8 w-5/6 rounded"></div>
            <div className="bg-gray-200 h-8 w-4/5 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="bg-gray-200 h-5 w-full rounded"></div>
            <div className="bg-gray-200 h-5 w-full rounded"></div>
            <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
          </div>
          <div className="bg-gray-200 h-4 w-32 rounded"></div>
          <div className="bg-gray-200 h-10 w-40 rounded"></div>
        </div>
        <div className="order-first md:order-last">
          <div className="w-full h-80 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </section>
  )
}
