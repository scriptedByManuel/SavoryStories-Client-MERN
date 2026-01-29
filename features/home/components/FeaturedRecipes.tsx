"use client"
import { Recipe } from '@/types/recipeType'
import RecipeCard from '@/components/RecipeCard';
import { useFeaturedRecipes } from '../hooks/useFeaturedRecipes';

const FeaturedRecipes = () => {
  const { recipes, isLoading } = useFeaturedRecipes()

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Recipes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hand-picked favorites that bring restaurant-quality dishes to your home kitchen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {!isLoading && (
          
          recipes.map((recipe: Recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          )))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedRecipes