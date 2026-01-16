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
