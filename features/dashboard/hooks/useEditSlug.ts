import { ApiResponse } from "@/types/apiResponse";
import useSWR from "swr";

const useEditSlug = <T>(
  slug: string, 
  service: (slug: string) => Promise<ApiResponse<T>>, 
  route: string
) => {
  const { data, error, isLoading } = useSWR(
    slug ? `/${route}/${slug}` : null, 
    () => service(slug)                  
  );

  return { 
    data: data?.data as T, 
    error, 
    isLoading 
  };
};

export default useEditSlug;