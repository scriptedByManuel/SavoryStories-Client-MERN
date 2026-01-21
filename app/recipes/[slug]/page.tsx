'use client'

import React from "react"; 
import { use } from "react";
import { Badge } from "@/components/ui/badge";
import recipeService from "@/services/recipeService";
import { ArrowLeft, ChefHat, Clock, Utensils } from "lucide-react";
import Link from "next/link";
import { RecipeDetailSkeleton } from "@/features/recipe-blog/components/RecipeDetailSkeleton";
import { RecipeNotFound } from "@/features/recipe-blog/components/BlogNotFound";
import useSlug from "@/features/recipe-blog/hooks/useSlug";

const RecipeDetailPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  const { getRecipeBySlug } = recipeService;
  const { data, isLoading } = useSlug(slug, getRecipeBySlug, 'recipes');

  const recipe = data?.data;

  return (
    <div className="flex min-h-screen flex-col">
      {isLoading ? (
        <RecipeDetailSkeleton />
      ) : recipe ? (
         <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/recipes"
            className="flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Recipes
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <img
                src={recipe.image ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${recipe.image}` : "/placeholder.png"}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-6 left-6 text-lg py-1 px-4 bg-primary/90 backdrop-blur-md">
                {recipe.category}
              </Badge>
            </div>

            {/* Title and Info Section */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {recipe.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {recipe.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                <div className="bg-muted/50 rounded-2xl p-4 text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <span className="block text-sm font-semibold">{recipe.cookingTime} mins</span>
                  <span className="text-xs text-muted-foreground">Prep & Cook</span>
                </div>
                <div className="bg-muted/50 rounded-2xl p-4 text-center">
                  <ChefHat className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <span className="block text-sm font-semibold">{recipe.difficulty}</span>
                  <span className="text-xs text-muted-foreground">Skill Level</span>
                </div>
                <div className="bg-muted/50 rounded-2xl p-4 text-center">
                  <Utensils className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <span className="block text-sm font-semibold">{recipe.ingredients?.length || 0}</span>
                  <span className="text-xs text-muted-foreground">Ingredients</span>
                </div>
              </div>

              {/* Chef Info */}
              <div className="flex items-center gap-4 p-4 border rounded-2xl hover:bg-muted/30 transition-colors">
                <img
                  src={recipe.author?.avatar ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${recipe.author.avatar}` : "/placeholder.png"}
                  alt={recipe.author?.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <span className="block text-xs text-muted-foreground">Recipe by</span>
                  <div className="font-bold hover:text-primary transition-colors">
                    {recipe.author.name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients & Instructions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Utensils className="mr-3 h-6 w-6 text-primary" />
                Ingredients
              </h2>
              <ul className="space-y-4">
                {recipe.ingredients?.map((ingredient: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 text-lg text-muted-foreground pb-4 border-b border-dashed">
                    <span className="h-2 w-2 rounded-full bg-primary mt-2.5 shrink-0" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <ChefHat className="mr-3 h-6 w-6 text-primary" />
                Instructions
              </h2>
              <div className="space-y-8">
                {recipe.instructions?.map((step: string, index: number) => (
                  <div key={index} className="flex gap-6">
                    <span className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-lg text-muted-foreground leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      ) : (
        <RecipeNotFound />
      )}
     
    </div>
  );
};

export default RecipeDetailPage;