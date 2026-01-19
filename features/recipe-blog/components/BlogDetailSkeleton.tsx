import { Skeleton } from "@/components/ui/skeleton"

export function BlogDetailSkeleton() {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      {/* Back Button Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-stone-900" />
      </div>

      <article className="max-w-3xl mx-auto">
        {/* Category Badge Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-6 w-24 rounded-full mb-4  bg-gray-200 dark:bg-stone-900" />

          {/* Title Skeleton */}
          <Skeleton className="h-14 w-full mb-4  bg-gray-200 dark:bg-stone-900" />
          <Skeleton className="h-14 w-3/4 mb-6  bg-gray-200 dark:bg-stone-900" />

          {/* Author and Date Info Skeleton */}
          <div className="flex flex-wrap items-center gap-6 py-6 border-y border-border">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded  bg-gray-200 dark:bg-stone-900" />
              <Skeleton className="h-4 w-24  bg-gray-200 dark:bg-stone-900" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded  bg-gray-200 dark:bg-stone-900" />
              <Skeleton className="h-4 w-32  bg-gray-200 dark:bg-stone-900" />
            </div>
            <Skeleton className="h-8 w-20  bg-gray-200 dark:bg-stone-900" />
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <div className="relative h-96 md:h-[500px] mb-8 rounded-lg overflow-hidden">
          <Skeleton className="w-full h-full  bg-gray-200 dark:bg-stone-900" />
        </div>

        {/* Content Skeleton */}
        <div className="prose prose-lg max-w-none space-y-6">
          {/* Heading */}
          <Skeleton className="h-8 w-64  bg-gray-200 dark:bg-stone-900" />

          {/* Paragraphs */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-stone-900" />
            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-stone-900" />
            <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-stone-900" />
          </div>

          {/* List Items */}
          <div className="space-y-2 pl-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full  bg-gray-200 dark:bg-stone-900" />
            ))}
          </div>

          {/* Another Heading */}
          <Skeleton className="h-8 w-48 mt-8 bg-gray-200 dark:bg-stone-900" />

          {/* More Paragraphs */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-stone-900" />
            <Skeleton className="h-4 w-full bg-gray-200 dark:bg-stone-900" />
            <Skeleton className="h-4 w-2/3 bg-gray-200 dark:bg-stone-900" />
          </div>
        </div>

        {/* Author Bio Section Skeleton */}
        <div className="mt-12 pt-8 border-t border-border">
          <Skeleton className="h-6 w-48 mb-4 bg-gray-200 dark:bg-stone-900" />
          <div className="p-6 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-start gap-4">
              <Skeleton className="h-16 w-16 rounded-full flex-shrink-0 bg-gray-200 dark:bg-stone-900" />
              <div className="flex-1">
                <Skeleton className="h-5 w-32 mb-2 bg-gray-200 dark:bg-stone-900" />
                <Skeleton className="h-4 w-full mb-1 bg-gray-200 dark:bg-stone-900" />
                <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-stone-900" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
