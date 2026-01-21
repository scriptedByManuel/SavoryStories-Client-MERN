import { apiClient } from "@/lib/axios";
import { ApiResponse } from "@/types/apiResponse";
import { Blog } from "@/types/blogType";

const blogService = {
  getAllBlogs: async (
    options: {
      page?: number;
      limit?: number;
      search?: string;
      sort?: string;
      home?: boolean;
    } = {}
  ): Promise<ApiResponse<Blog[]>> => {
    const {
      page = 1,
      limit = 6,
      search = "",
      sort = "newest",
      home = false,
    } = options;

    const response = await apiClient.get<ApiResponse<Blog[]>>("/blogs", {
      params: { page, limit, search, sort, home: home.toString() },
    });

    return response.data;
  },

  getBlogBySlug: async (slug: string): Promise<ApiResponse<Blog>> => {
    try {
      const response = await apiClient.get<ApiResponse<Blog>>(
        `/blogs/${slug}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyOwnBlogs: async (
    options: {
      page?: number;
      limit?: number;
      search?: string;
      sort?: string;
      home?: boolean;
    } = {}
  ): Promise<ApiResponse<Blog[]>> => {
    const {
      page = 1,
      limit = 6,
      search = "",
      sort = "newest",
      home = false,
    } = options;

    const response = await apiClient.get<ApiResponse<Blog[]>>("/blogs/my-blogs", {
      params: { page, limit, search, sort, home: home.toString() },
    });

    return response.data;
  },

    deleteOneBlog: async (id:string) => {
    try {
      const response  = await apiClient.delete(`/blogs/${id}`)
      return response.data
    } catch (error) {
      throw error
    }
  }
};

export default blogService
