import z from "zod";

export type Difficulty = "easy" | "medium" | "hard";

export interface Recipe {
  _id: string; 
  title: string;
  slug: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime?: number;
  difficulty?: Difficulty;
  category?: string;
  image?: string;
  author: string | Chef; 
  createdAt: string;
  updatedAt: string;
}

export interface Chef {
  _id: string,
  name: string;
  avatar?: string;
  bio?: string
}

export const recipeSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  ingredients: z.array(z.string().min(1, "Ingredient cannot be empty")).min(1, "At least one ingredient is required"),
  instructions: z.array(z.string().min(1, "Step cannot be empty")).min(1, "At least one instruction step is required"),
  cookingTime: z.coerce.number().min(1, "Cooking time must be at least 1 minute"),
  difficulty: z.enum(["easy", "medium", "hard"], {
    required_error: "Please select a difficulty level",
  }),
  category: z.string().min(1, "Please select a category"),
  image: z.any().optional(),
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;
