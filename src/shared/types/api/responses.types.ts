export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError };

export type ApiError = {
  code: string;
  message: string;
  details?: Record<string, string[]>;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};
