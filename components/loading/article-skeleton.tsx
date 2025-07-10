export function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
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
  )
}
