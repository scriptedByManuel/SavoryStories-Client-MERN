"use client";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/types/recipeType";
import { motion } from "framer-motion";
import Link from "next/link";
import { Edit2, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";


const ChefRecipeCard = ({ recipe, deleteOneRecipe, onDeleteSuccess }: { recipe: Recipe, deleteOneRecipe: any, onDeleteSuccess: any }) => {


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const handleDelete = async (id: string) => {
    try {
      const data = await deleteOneRecipe(id)
      onDeleteSuccess()
      toast.success(data.message)
    } catch (error: unknown) {
      if(error instanceof Error) {
        toast.error("Failed to delete")
      }
    }
  }

  return (
    <motion.div
      layout
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow flex flex-col h-full"
    >
      {/* Image Section - Link to Recipe Detail */}
      <Link href={`/recipes/${recipe.slug}`} className="relative h-48 overflow-hidden block">
        <img
          src={
            recipe.image
              ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${recipe.image}`
              : "/placeholder.png"
          }
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        {/* Title Section - Link to Recipe Detail */}
        <Link href={`/recipes/${recipe.slug}`}>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {recipe.title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-2 text-sm flex-1">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4 mt-auto">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{recipe.cookingTime} mins</span>
          </div>
          <span className="text-primary font-medium capitalize">
            {recipe.difficulty}
          </span>
        </div>

        {/* Dashboard Actions */}
        <div className="flex gap-2 mt-4 pt-4">
          <Button size="sm" variant="outline" asChild className="flex-1">
            <Link href={`/dashboard/edit-recipe/${recipe._id}`}>
              <Edit2 className="mr-2 h-3 w-3" />
              Edit
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-destructive hover:bg-destructive/10 bg-transparent border-destructive/20"
            onClick={() => handleDelete(recipe._id)}
          >
            <Trash2 className="mr-2 h-3 w-3" />
            Delete
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChefRecipeCard;