import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Comment {
  _id: string;
  text: string;
  userId: {
    _id: string;
    name: string;
  };
  postId: string;
  parentId?: string;
  replies: Comment[];
  createdAt: string;
  updatedAt: string;
}

interface CommentsResponse {
  success: boolean;
  data: Comment[];
}

interface CommentResponse {
  success: boolean;
  data: Comment;
}

interface CreateCommentData {
  postId: string;
  text: string;
  parentId?: string;
}

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    // Get comments for a post
    getCommentsByPost: builder.query<CommentsResponse, string>({
      query: (postId) => `/comments?postId=${postId}`,
      providesTags: (result, error, postId) => [
        { type: "Comment", id: postId },
        "Comment",
      ],
    }),

    // Create a new comment
    createComment: builder.mutation<CommentResponse, CreateCommentData>({
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comment", id: postId },
        "Comment",
      ],
    }),

    // Update comment
    updateComment: builder.mutation<
      CommentResponse,
      { id: string; text: string }
    >({
      query: ({ id, text }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Comment", id },
        "Comment",
      ],
    }),

    // Delete comment
    deleteComment: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Comment", id },
        "Comment",
      ],
    }),
  }),
});

export const {
  useGetCommentsByPostQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
