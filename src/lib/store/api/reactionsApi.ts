import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ReactionsResponse {
  success: boolean;
  data: {
    likes: number;
    loves: number;
    insightful: number;
    userLiked: boolean;
    userLoved: boolean;
    userInsightful: boolean;
  };
}

export const reactionsApi = createApi({
  reducerPath: "reactionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Reaction"],
  endpoints: (builder) => ({
    // Get reactions for a post
    getPostReactions: builder.query<ReactionsResponse, string>({
      query: (postId) => `/posts/${postId}/reactions`,
      providesTags: (result, error, postId) => [
        { type: "Reaction", id: postId },
      ],
    }),

    // Toggle reaction on a post
    toggleReaction: builder.mutation<
      ReactionsResponse,
      { postId: string; type: "like" | "love" | "insightful" }
    >({
      query: ({ postId, type }) => ({
        url: `/posts/${postId}/reactions`,
        method: "POST",
        body: { type },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Reaction", id: postId },
      ],
    }),
  }),
});

export const { useGetPostReactionsQuery, useToggleReactionMutation } =
  reactionsApi;
