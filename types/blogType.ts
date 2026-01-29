import z from "zod";
import { Chef } from "./recipeType";

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  author: Chef;
  createdAt: string;
  updatedAt: string;
}

export const blogSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  excerpt: z.string().min(20, "Excerpt should be at least 20 characters"),
  content: z.string().min(50, "Content is too short. Share more details!"),
  featuredImage: z.any().optional(),
});

export type BlogFormValues = z.infer<typeof blogSchema>;