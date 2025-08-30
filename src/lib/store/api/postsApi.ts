import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Post, PostLanguage } from "@/types";

// Minimal post data for recommendations
export interface RecommendedPost {
  _id: string;
  title: string;
  writtenBy: string;
  createdAt: Date | string;
}

interface PostsResponse {
  success: boolean;
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface RecommendedPostsResponse {
  success: boolean;
  data: RecommendedPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface PostResponse {
  success: boolean;
  data: Post;
}

interface PostsQueryParams {
  page?: number;
  limit?: number;
  language?: PostLanguage;
  category?: string;
  featured?: boolean;
  homepage?: boolean;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // Get all posts with filtering and pagination
    getPosts: builder.query<PostsResponse, PostsQueryParams>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();

        if (params.page) searchParams.append("page", params.page.toString());
        if (params.limit) searchParams.append("limit", params.limit.toString());
        if (params.language) searchParams.append("language", params.language);
        if (params.category) searchParams.append("category", params.category);
        if (params.featured) searchParams.append("featured", "true");
        if (params.homepage) searchParams.append("homepage", "true");

        return `/posts?${searchParams.toString()}`;
      },
      providesTags: ["Post"],
    }),

    // Get posts by category
    getPostsByCategory: builder.query<
      PostsResponse,
      { category: string; page?: number; limit?: number }
    >({
      query: ({ category, page = 1, limit = 10 }) => {
        const searchParams = new URLSearchParams();
        searchParams.append("category", category);
        searchParams.append("page", page.toString());
        searchParams.append("limit", limit.toString());
        return `/posts?${searchParams.toString()}`;
      },
      providesTags: ["Post"],
    }),

    // Get single post by ID
    getPostById: builder.query<PostResponse, string>({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    // Get multiple posts by IDs
    getPostsByIds: builder.query<RecommendedPostsResponse, string[]>({
      query: (ids) => ({
        url: `/posts/batch?ids=${ids.join(",")}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Post" as const,
                id: _id,
              })),
              "Post",
            ]
          : ["Post"],
    }),

    // Get featured posts
    getFeaturedPosts: builder.query<PostsResponse, { limit?: number }>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        searchParams.append("featured", "true");
        if (params.limit) searchParams.append("limit", params.limit.toString());
        return `/posts?${searchParams.toString()}`;
      },
      providesTags: ["Post"],
    }),

    // Get homepage posts
    getHomepagePosts: builder.query<PostsResponse, { limit?: number }>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        searchParams.append("homepage", "true");
        if (params.limit) searchParams.append("limit", params.limit.toString());
        return `/posts?${searchParams.toString()}`;
      },
      providesTags: ["Post"],
    }),

    // Create post (admin only)
    createPost: builder.mutation<PostResponse, Partial<Post>>({
      query: (post) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Post"],
    }),

    // Update post (admin only)
    updatePost: builder.mutation<
      PostResponse,
      { id: string; post: Partial<Post> }
    >({
      query: ({ id, post }) => ({
        url: `/posts/${id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Post", id },
        "Post",
      ],
    }),

    // Delete post (admin only)
    deletePost: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Post", id }, "Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByCategoryQuery,
  useGetPostByIdQuery,
  useGetPostsByIdsQuery,
  useGetFeaturedPostsQuery,
  useGetHomepagePostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
