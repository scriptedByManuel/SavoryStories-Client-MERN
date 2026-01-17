import React from "react";
import { Button } from "./ui/button";
import { PaginationMeta, RootPaginationLinks } from "@/types/apiResponse";
import { urlToParams } from "@/lib/urlToParams";

interface PaginationProp {
  meta: PaginationMeta;
  links: RootPaginationLinks;
  handleUrlChange: (newUrlParams: Record<string, string | null>) => void;
}

const Pagination = ({ meta, links, handleUrlChange }: PaginationProp) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 mb-12">
      <p className="text-sm text-muted-foreground">
        Showing {meta.from} to {meta.to} of {meta.total} results
      </p>

      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUrlChange(urlToParams(links.first))}
          disabled={meta.current_page === 1}
          className="w-10 h-10 p-0"
        >
          &lt;&lt;
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUrlChange(urlToParams(links.prev))}
          disabled={meta.current_page === 1}
          className="w-10 h-10 p-0"
        >
          &lt;
        </Button>
        <div className="px-4 py-2 text-sm font-medium text-foreground">
          {meta.current_page}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUrlChange(urlToParams(links.next))}
          disabled={meta.current_page === meta.last_page}
          className="w-10 h-10 p-0"
        >
          &gt;
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUrlChange(urlToParams(links.last))}
          disabled={meta.current_page === meta.last_page}
          className="w-10 h-10 p-0"
        >
          &gt;&gt;
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
