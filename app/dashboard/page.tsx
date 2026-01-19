"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, BookOpen, Clock } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookIcon as BlogIcon } from "lucide-react"
import { useProfileStore } from "@/stores/useProfileStore"

const MOCK_RECIPES = [
  {
    id: 1,
    title: "Margherita Pizza",
    author: "Mario Batali",
    cookTime: "30 mins",
    difficulty: "Easy",
    image: "/margherita-pizza.png",
  },
  {
    id: 2,
    title: "Saffron Risotto",
    author: "Julia Child",
    cookTime: "45 mins",
    difficulty: "Medium",
    image: "/saffron-risotto.jpg",
  },
  {
    id: 3,
    title: "Thai Green Curry",
    author: "Marco Pierre White",
    cookTime: "40 mins",
    difficulty: "Medium",
    image: "/thai-green-curry.png",
  },
]

const MOCK_BLOGS = [
  {
    id: 1,
    title: "The Art of Perfect Pasta",
    author: "Mario Batali",
    excerpt: "Learn the secrets to making restaurant-quality pasta at home.",
    category: "Techniques",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    title: "Sourcing Fresh Ingredients",
    author: "Julia Child",
    excerpt: "A guide to finding the best seasonal ingredients in your area.",
    category: "Sourcing",
    createdAt: "2024-01-15",
  },
]

export default function DashboardPage() {
  const { chef } = useProfileStore()
  const router = useRouter()
  const [recipes, setRecipes] = useState(MOCK_RECIPES)
  const [blogs, setBlogs] = useState(MOCK_BLOGS)


  return (
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${chef?.avatar}`} alt={chef?.name} />
              <AvatarFallback>{chef?.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {chef?.name}!</h1>
              <p className="text-muted-foreground">Manage recipes and blogs.</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button asChild>
              <Link href="/dashboard/new-recipe">
                <Plus className="mr-2 h-4 w-4" />
                Create Recipe
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/new-blog">
                <Plus className="mr-2 h-4 w-4" />
                Write Blog
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recipes.length}</div>
              <p className="text-xs text-muted-foreground">Published recipes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
              <BlogIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blogs.length}</div>
              <p className="text-xs text-muted-foreground">Published blog posts</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Recipes */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Recent Recipes</h2>
            {recipes.length === 0 ? (
              <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <BookOpen className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No recipes yet</h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                  You haven't shared any recipes with the community. Start by creating your first one!
                </p>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/new-recipe">Get Started</Link>
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {recipes.slice(0, 3).map((recipe) => (
                  <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
                    <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {recipe.title}
                        </h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {recipe.cookTime}
                          </div>
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                            {recipe.difficulty}
                          </span>
                        </div>
                        <div className="flex gap-2 border-t border-border pt-3">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/dashboard/edit-recipe/${recipe.id}`} onClick={(e) => e.stopPropagation()}>
                              Edit
                            </Link>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:bg-destructive/10 bg-transparent"
                            onClick={(e) => {
                              e.preventDefault()
                              setRecipes(recipes.filter((r) => r.id !== recipe.id))
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                {recipes.length > 3 && (
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/recipes">View All Recipes ({recipes.length})</Link>
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Recent Blogs */}
          <div>
            <h2 className="text-xl font-bold mb-4">Your Recent Blogs</h2>
            {blogs.length === 0 ? (
              <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
                <div className="rounded-full bg-muted p-6 mb-4">
                  <BlogIcon className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No blogs yet</h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                  Share your culinary knowledge and stories with the community!
                </p>
                <Button variant="outline" asChild>
                  <Link href="/dashboard/new-blog">Write First Blog</Link>
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {blogs.slice(0, 3).map((blog) => (
                  <Link key={blog.id} href={`/blog/${blog.id}`}>
                    <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer p-4">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-bold text-sm flex-1 hover:text-primary transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <span className="px-2 py-1 bg-accent/20 text-accent text-xs font-medium rounded whitespace-nowrap flex-shrink-0">
                          {blog.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{blog.excerpt}</p>
                      <p className="text-xs text-muted-foreground mb-3 border-t border-border pt-3">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/dashboard/edit-blog/${blog.id}`} onClick={(e) => e.stopPropagation()}>
                            Edit
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:bg-destructive/10 bg-transparent"
                          onClick={(e) => {
                            e.preventDefault()
                            setBlogs(blogs.filter((b) => b.id !== blog.id))
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
                {blogs.length > 3 && (
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href="/blog">View All Blogs ({blogs.length})</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
  )
}
