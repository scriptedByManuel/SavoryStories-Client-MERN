import { useState, useEffect } from "react";
import { Blog } from "@/types/blogType";
import blogService from "@/services/blogService";

export const useFeaturedBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setError(null);
      try {
        setIsLoading(true); // Loading ကို စကတည်းက true ပေးထားတာ ပိုသေချာပါတယ်
        const response = await blogService.getAllBlogs({ home: true });
        setBlogs(response.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred while fetching blogs.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, isLoading, error };
};
