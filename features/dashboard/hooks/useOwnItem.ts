"use client";
import useSWR from "swr";

const useOwnItem = (route: string, service: any) => {
  
  const { data, error, isLoading, mutate } = useSWR(
    [`/${route}`, "all"],
    () => service({ 
      page: 1, 
      limit: 100000 
    })
  );

  return {
    items: data?.data, 
    error,
    isLoading,
    mutate,
  };
};

export default useOwnItem