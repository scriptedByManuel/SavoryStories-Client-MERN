import { apiClient } from "@/lib/axios";
import { Recipe, RecipeFormValues } from "@/types/recipeType";
import { ApiResponse } from "@/types/apiResponse";

const recipeService = {
  getAllRecipes: async (
    options: {
      page?: number | string;
      limit?: number | string;
      search?: string;
      sort?: string;
      home?: boolean;
    } = {},
  ): Promise<ApiResponse<Recipe[]>> => {
    const {
      page = 1,
      limit = 6,
      search = "",
      sort = "newest",
      home = false,
    } = options;

    const response = await apiClient.get<ApiResponse<Recipe[]>>("/recipes", {
      params: { page, limit, search, sort, home: home.toString() },
    });

    return response.data;
  },

  getRecipeBySlug: async (slug: string): Promise<ApiResponse<Recipe>> => {
    try {
      const response = await apiClient.get<ApiResponse<Recipe>>(
        `/recipes/${slug}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyOwnRecipes: async (
    options: {
      page?: number | string;
      limit?: number | string;
      search?: string;
      sort?: string;
      home?: boolean;
    } = {},
  ): Promise<ApiResponse<Recipe[]>> => {
    const {
      page = 1,
      limit = 6,
      search = "",
      sort = "newest",
      home = false,
    } = options;

    const response = await apiClient.get<ApiResponse<Recipe[]>>(
      "/recipes/my-recipes",
      {
        params: { page, limit, search, sort, home: home.toString() },
      },
    );

    return response.data;
  },

  deleteOneRecipe: async (id: string) => {
    try {
      const response = await apiClient.delete(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  storeNewRecipe: async (payload: RecipeFormValues) => {
    try {
      const response = await apiClient.post<ApiResponse<Recipe>>("/recipes", payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateRecipe: async (id:string, payload: RecipeFormValues) => {
    try {
      const response = await apiClient.patch<ApiResponse<Recipe>>(`/recipes/${id}`, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
};

export default recipeService;
