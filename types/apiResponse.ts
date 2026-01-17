export interface PaginationButtonItem {
  url: string | null;
  label: string;
  active: boolean;
}

export interface RootPaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  to: number;
  last_page: number;
  per_page: number;
  total: number;
  links: PaginationButtonItem[]; 
}

export interface ApiResponse<T> {
  data: T;
  links?: RootPaginationLinks;
  meta?: PaginationMeta;
}