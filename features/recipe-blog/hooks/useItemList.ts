"use client"
import { debounce } from "lodash";
import { useCallback, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import useSWR from "swr";

export const useItemList = (route: string, service) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchInput = useRef<HTMLInputElement>(null);

  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "newest";
  const limit = searchParams.get("limit") || "6";

  const { data, error, isLoading } = useSWR(
    [`/${route}`, page, search, sort, limit],
    () => service({ page: Number(page), search, sort, limit })
  );

  const updateUrl = useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    updateUrl({ search: e.target.value, page: "1" });
  }, 500);

  const handleClearSearch = () => {
    if (searchInput.current) searchInput.current.value = "";
    updateUrl({ search: null, page: "1" });
  };

  const handleSort = (sortValue: string) => {
    updateUrl({ sort: sortValue, page: "1" });
  };

  const handleUrlChange = (newUrlParams:  Record<string, string | null> ) => {
    updateUrl(newUrlParams);
  };

  return {
    data,
    error,
    isLoading,
    searchInput,
    handleSearch,
    sort,
    handleClearSearch,
    handleSort,
    handleUrlChange,
  };
};
