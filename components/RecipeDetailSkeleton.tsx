import { Skeleton } from "@/components/ui/skeleton"

export const RecipeDetailSkeleton = () => {
  return (
    <main className="flex-1 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-4 w-32  bg-gray-200 dark:bg-stone-900" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section Skeleton */}
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
            <Skeleton className="w-full h-full  bg-gray-200 dark:bg-stone-900" />
          </div>

          {/* Title and Info Section Skeleton */}
          <div className="flex flex-col justify-center">
            {/* Title */}
            <Skeleton className="h-12 w-full mb-6  bg-gray-200 dark:bg-stone-900" />
            <Skeleton className="h-12 w-3/4 mb-6  bg-gray-200 dark:bg-stone-900" />

            {/* Description */}
            <Skeleton className="h-6 w-full mb-2  bg-gray-200 dark:bg-stone-900" />
            <Skeleton className="h-6 w-full mb-8  bg-gray-200 dark:bg-stone-900" />

            {/* Info Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-2xl  bg-gray-200 dark:bg-stone-900" />
              ))}
            </div>

            {/* Chef Info Card Skeleton */}
            <div className="flex items-center gap-4 p-4 border rounded-2xl">
              <Skeleton className="h-12 w-12 rounded-full shrink-0  bg-gray-200 dark:bg-stone-900" />
              <div className="flex-1">
                <Skeleton className="h-3 w-20 mb-2  bg-gray-200 dark:bg-stone-900" />
                <Skeleton className="h-4 w-32  bg-gray-200 dark:bg-stone-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients & Instructions Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
          {/* Ingredients Skeleton */}
          <div className="lg:col-span-1">
            <Skeleton className="h-8 w-32 mb-6  bg-gray-200 dark:bg-stone-900" />
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16  bg-gray-200 dark:bg-stone-900" />
              ))}
            </div>
          </div>

          {/* Instructions Skeleton */}
          <div className="lg:col-span-2">
            <Skeleton className="h-8 w-32 mb-6  bg-gray-200 dark:bg-stone-900" />
            <div className="space-y-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-6">
                  <Skeleton className="h-10 w-10 rounded-full shrink-0  bg-gray-200 dark:bg-stone-900" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-full mb-2  bg-gray-200 dark:bg-stone-900" />
                    <Skeleton className="h-4 w-3/4  bg-gray-200 dark:bg-stone-900" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
