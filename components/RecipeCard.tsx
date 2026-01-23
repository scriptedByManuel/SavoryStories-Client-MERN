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

  const imageUrl = recipe.image
    ? `${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${recipe.image}`
    : "/placeholder.png";

  return (
    <motion.a
      initial="hidden"
      animate="visible"
      href={`/recipes/${recipe.slug}`}
      className="group cursor-pointer block h-full" 
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 flex flex-col h-full">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {recipe.title}
          </h3>
          
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm flex-1">
            {recipe.description || "No description available."}
          </p>

          {/* Footer: Cooking Time & Difficulty */}
          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4 mt-auto">
            <div className="flex items-center gap-1">
              <span className="font-medium text-foreground">
                {recipe.cookingTime || 0}
              </span> 
              <span>mins</span>
            </div>
            
            <span className="text-primary font-semibold capitalize bg-primary/10 px-2 py-0.5 rounded">
              {recipe.difficulty || "Easy"}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default RecipeCard;
