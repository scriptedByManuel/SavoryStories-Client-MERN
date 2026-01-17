"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full rounded-lg bg-gray-200 dark:bg-stone-900" />
      <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-stone-900" />
      <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-stone-900" />
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20 bg-gray-200 dark:bg-stone-900" />
        <Skeleton className="h-8 w-20 bg-gray-200 dark:bg-stone-900" />
      </div>
    </div>
  )
}

export function SkeletonGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
