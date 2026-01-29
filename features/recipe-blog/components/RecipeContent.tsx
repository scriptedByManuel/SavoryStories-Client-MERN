"use client"
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import RecipeCard from "@/components/RecipeCard";
import Pagination from "@/components/Pagination";
import recipeService from "@/services/recipeService";
import { useItemList } from "@/features/recipe-blog/hooks/useItemList";
import { Recipe } from "@/types/recipeType";
import PublicEmptyState from "@/features/recipe-blog/components/PublicEmptyState";

const  RecipesContent = () => {
  const { getAllRecipes } = recipeService
  const {
    data,
    isLoading,
    searchInput,
    handleSearch,
    handleSort,
    sort,
    handleUrlChange,
  } = useItemList('recipes', getAllRecipes);
  const recipes = data?.data || [];
  const meta = data?.meta;
  const links = data?.links;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const pageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="flex min-h-screen flex-col"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <main className="flex-1 pt-8">
        <div className="container mx-auto px-4 mb-8">
          <h1 className="text-4xl font-bold text-foreground">All Recipes</h1>
          <p className="text-muted-foreground mt-2">
            Discover delicious recipes shared by our community of professional
            chefs.
          </p>
        </div>

        <div className="container mx-auto px-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
            ref={searchInput}
              placeholder="Search recipes by title, author, or ingredients..."
              onChange={handleSearch}
              className="pl-10 pr-12"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <ChevronDown className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="space-y-1" align="end">
                <DropdownMenuItem
                  onClick={() => handleSort("newest")}
                  className={
                    sort === "newest"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSort("oldest")}
                  className={
                    sort === "oldest"
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
                >
                  Oldest
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isLoading ? (
          null
        ) : recipes.length === 0 ? (
          <PublicEmptyState />
        ) : (
          <motion.div
            className="container mx-auto px-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {recipes.map((recipe: Recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>

            {meta && meta.last_page > 1 && (
              <Pagination links={links}  meta={meta} handleUrlChange={handleUrlChange}/>
            )}
          </motion.div>
        )}
      </main>
    </motion.div>
  );
}

export default RecipesContent;