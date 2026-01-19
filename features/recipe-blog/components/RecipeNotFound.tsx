import { ChefHat, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BlogNotFound() {
  return (
    <main className="flex-1 py-12">
      <div className="container mx-auto px-4">
        <Link
          href="/recipes"
          className="flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Recipes
        </Link>

        <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
          <ChefHat className="h-24 w-24 text-muted-foreground/50 mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Recipe Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            Sorry, we couldn't find the recipe you're looking for. It may have been removed or the link might be incorrect.
          </p>
          <Button asChild>
            <Link href="/recipes">Browse All Recipes</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}