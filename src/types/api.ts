// API response types and utilities

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

export interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, unknown>;
}

export interface SuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

// API endpoint parameter types
export interface RouteParams {
  params: Promise<{ [key: string]: string }>;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

// Database filter types
export interface MongoFilter {
  [key: string]: unknown;
}

export interface MongoOptions {
  sort?: Record<string, 1 | -1>;
  skip?: number;
  limit?: number;
  select?: string;
  populate?: string | Record<string, unknown>;
}
