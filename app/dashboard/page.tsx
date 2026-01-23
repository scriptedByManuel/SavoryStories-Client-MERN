"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, BookOpen, Settings, Loader2 } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookIcon as BlogIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useProfileStore } from "@/stores/useProfileStore";
import useOwnItem from "@/features/dashboard/hooks/useOwnItem";
import recipeService from "@/services/recipeService";
import blogService from "@/services/blogService";
import ChefRecipeCard from "@/features/dashboard/components/ChefRecipeCard";
import { Recipe } from "@/types/recipeType";
import ChefBlogCard from "@/features/dashboard/components/ChefBlogCard";
import { Blog } from "@/types/blogType";

export default function DashboardPage() {
  const { chef } = useProfileStore();
  const { getMyOwnRecipes, deleteOneRecipe } = recipeService;
  const { getMyOwnBlogs, deleteOneBlog } = blogService;

  const [isMounted, setIsMounted] = useState(false);
  const [visibleRecipes, setVisibleRecipes] = useState(6);
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  

  const recipeEndRef = useRef<HTMLDivElement>(null);
  const blogEndRef = useRef<HTMLDivElement>(null);

  const { items: recipes = [], isLoading: loadingRecipes, mutate: mutateRecipes } = useOwnItem(
    "recipes",
    getMyOwnRecipes,
  );
  const { items: blogs = [], isLoading: loadingBlogs, mutate: mutateBlogs } = useOwnItem(
    "blogs",
    getMyOwnBlogs,
  );
-
  // Initial mount check for Hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Infinite scroll for recipes
  useEffect(() => {
    if (!isMounted || recipes.length <= visibleRecipes) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleRecipes((prev) => Math.min(prev + 6, recipes.length));
        }
      },
    );

    const currentRef = recipeEndRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isMounted, recipes.length, visibleRecipes]);

  // Infinite scroll for blogs
  useEffect(() => {
    if (!isMounted || blogs.length <= visibleBlogs) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleBlogs((prev) => Math.min(prev + 6, blogs.length));
        }
      },
    );

    const currentRef = blogEndRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isMounted, blogs.length, visibleBlogs]);

  // Prevent hydration error
  if (!isMounted) return null;

  // Loading state
  if (loadingRecipes || loadingBlogs) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const displayedRecipes = recipes.slice(0, visibleRecipes);
  const displayedBlogs = blogs.slice(0, visibleBlogs);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary">
              <AvatarImage 
                src={chef?.avatar ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${chef.avatar}` : ""} 
                alt={chef?.name} 
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {chef?.name ? chef.name[0].toUpperCase() : "C"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {chef?.name || "Chef"}!</h1>
              <p className="text-muted-foreground">Manage your culinary journey here.</p>
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
            <Button asChild variant="outline" size="icon">
              <Link href={`/dashboard/settings`} title="Settings">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Recipes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recipes.length}</div>
              <p className="text-xs text-muted-foreground">Published masterpieces</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
              <BlogIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blogs.length}</div>
              <p className="text-xs text-muted-foreground">Shared stories</p>
            </CardContent>
          </Card>
        </div>

        {/* Recipes Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Your Recipes</h2>
          {recipes.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg">
              <div className="rounded-full bg-muted p-6 mb-4">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No recipes yet</h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                Start sharing your delicious secrets with the world.
              </p>
              <Button asChild>
                <Link href="/dashboard/new-recipe">Create First Recipe</Link>
              </Button>
            </div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {displayedRecipes.map((recipe: Recipe) => (
                  <ChefRecipeCard key={recipe._id} recipe={recipe} deleteOneRecipe={deleteOneRecipe} mutateRecipes={mutateRecipes} />
                ))}
              </motion.div>
              
              {visibleRecipes < recipes.length && (
                <div ref={recipeEndRef} className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
            </>
          )}
        </section>

        {/* Blogs Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Your Blogs</h2>
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-lg">
              <div className="rounded-full bg-muted p-6 mb-4">
                <BlogIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No blogs yet</h3>
              <p className="text-muted-foreground max-w-sm mb-6">
                Write about your culinary experiences and tips.
              </p>
              <Button asChild variant="outline">
                <Link href="/dashboard/new-blog">Write First Blog</Link>
              </Button>
            </div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {displayedBlogs.map((blog: Blog) => (
                  <ChefBlogCard key={blog._id} blog={blog} deleteOneBlog={deleteOneBlog} mutateBlogs={mutateBlogs} />
                ))}
              </motion.div>
              
              {visibleBlogs < blogs.length && (
                <div ref={blogEndRef} className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}