import { useState, useEffect } from "react";
import { Recipe } from "@/types/recipeType";
import recipeService from "@/services/recipeService";

export const useFeaturedRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setError(null)
      try {
        const response = await recipeService.getAllRecipes({ home: true });
        setRecipes(response.data);
      } catch (error: unknown) {
        if(error instanceof Error){
          setError(error.message);
        } else {
          setError("An unexpected error occurred while fetching blogs.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return { recipes, isLoading, error };
};