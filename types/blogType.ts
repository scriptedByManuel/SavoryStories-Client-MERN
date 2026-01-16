import { Chef } from "./recipeType";

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  author: string | Chef;
  createdAt: string;
  updatedAt: string;
}