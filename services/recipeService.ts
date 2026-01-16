import { apiClient } from "@/lib/axios";
import { Recipe } from "@/types/recipeType";
import { ApiResponse } from "@/types/apiResponse";

const recipeService = {
  getAllRecipes: async (
    options: {
      page?: number;
      limit?: number;
      search?: string;
      sort?: string;
      home?: boolean;
    } = {}
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
        `/recipes/${slug}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default recipeService
