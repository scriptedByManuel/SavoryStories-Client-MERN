import { Recipe } from "@/types/recipeType";
import { motion } from "framer-motion";

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
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
  return (
    <motion.a
      initial="hidden"
      animate="visible"
      href={`/recipes/${recipe._id}`}
      className="group cursor-pointer"
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 overflow-hidden">
          <img
            src={
              recipe.image
                ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${recipe.image}`
                : "/placeholder.png"
            }
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {recipe.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
            {recipe.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
            <span>{recipe.cookingTime} mins</span>
            <span className="text-primary font-medium">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default RecipeCard;
