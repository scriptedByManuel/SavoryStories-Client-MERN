"use client";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types/recipeType";
import { motion } from "framer-motion";
import Link from "next/link";
import { Edit2, Trash2, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ChefRecipeCard = ({
  recipe,
  deleteOneRecipe,
  mutateRecipes,
}: {
  recipe: Recipe;
  deleteOneRecipe: any;
  mutateRecipes: any;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteOneRecipe(recipe._id);
      toast.success(res.message || "Recipe deleted");

      await mutateRecipes();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow flex flex-col h-full"
    >
      {/* Image Section - Link to Recipe Detail */}
      <Link
        href={`/recipes/${recipe.slug}`}
        className="relative h-48 overflow-hidden block"
      >
        <img
          src={
            recipe.image || "/image-placeholder.jpeg"
          }
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        {/* Title & Description */}
        <Link href={`/recipes/${recipe.slug}`}>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {recipe.title}
          </h3>
        </Link>
        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm flex-1">
          {recipe.description}
        </p>

        {/* Dashboard Actions */}
        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
          <Button size="sm" variant="outline" asChild className="flex-1">
            <Link href={`/dashboard/edit-recipe/${recipe.slug}`}>
              <Edit2 className="mr-2 h-3 w-3" />
              Edit
            </Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-destructive hover:bg-destructive/10 bg-transparent border-destructive/20"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Trash2 className="mr-2 h-3 w-3" />
                )}
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your recipe "<strong>{recipe.title}</strong>".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </motion.div>
  );
};

export default ChefRecipeCard;
