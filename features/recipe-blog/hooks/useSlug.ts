import { ApiResponse } from "@/types/apiResponse";
import { Blog } from "@/types/blogType";
import { Recipe } from "@/types/recipeType";
import useSWR from "swr";

export const useSlug = (slug: string, service: (slug: string) => Promise<ApiResponse<Recipe | Blog >>, route: string) => {
  const { data, error, isLoading } = useSWR(
    slug ? `/${route}/${slug}` : null, 
    () => service(slug)                  
  );

  return { 
    data, 
    error, 
    isLoading 
  };
};
