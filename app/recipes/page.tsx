import CookingLoader from "@/components/CookingLoader";
import RecipesContent from "@/features/recipe-blog/components/RecipeContent";
import { Suspense } from "react";

export default function RecipesPage() {
  return (
    <Suspense fallback={<CookingLoader />}>
      <RecipesContent />
    </Suspense>
  );
}
