import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types/auth";

interface AdminStatsResponse {
  success: boolean;
  data: {
    totalPosts: number;
    totalUsers: number;
    totalComments: number;
    totalReactions: number;
    recentPosts: Array<{
      id: string;
      title: string;
      category: string;
      writtenBy: string;
      createdAt: string;
    }>;
    recentUsers: Array<{
      id: string;
      name: string;
      email: string;
      role: string;
      createdAt: string;
      emailVerified: boolean;
    }>;
    userRoles: Array<{ _id: string; count: number }>;
    postsByCategory: Array<{ _id: string; count: number }>;
  };
}

interface UsersResponse {
  success: boolean;
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

interface UserResponse {
  success: boolean;
  data: User;
}

interface CreateAdminData {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserData {
  role?: string;
  emailVerified?: boolean;
}

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/admin",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["AdminStats", "AdminUsers", "AdminPosts"],
  endpoints: (builder) => ({
    // Get admin dashboard statistics
    getAdminStats: builder.query<AdminStatsResponse, void>({
      query: () => "/stats",
      providesTags: ["AdminStats"],
    }),

    // Get all users (admin only)
    getUsers: builder.query<
      UsersResponse,
      { page?: number; limit?: number; search?: string }
    >({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append("page", params.page.toString());
        if (params.limit) searchParams.append("limit", params.limit.toString());
        if (params.search) searchParams.append("search", params.search);

        return `/users?${searchParams.toString()}`;
      },
      providesTags: ["AdminUsers"],
    }),

    // Get single user (admin only)
    getUserById: builder.query<UserResponse, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "AdminUsers", id }],
    }),

    // Create admin user
    createAdmin: builder.mutation<UserResponse, CreateAdminData>({
      query: (data) => ({
        url: "/create-admin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminUsers", "AdminStats"],
    }),

    // Update user (admin only)
    updateUser: builder.mutation<
      UserResponse,
      { id: string; data: UpdateUserData }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "AdminUsers", id },
        "AdminUsers",
        "AdminStats",
      ],
    }),

    // Delete user (admin only)
    deleteUser: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "AdminUsers", id },
        "AdminUsers",
        "AdminStats",
      ],
    }),

    // Schedule user deletion (admin only)
    scheduleUserDeletion: builder.mutation<
      { success: boolean },
      { id: string; reason: string }
    >({
      query: ({ id, reason }) => ({
        url: `/users/${id}/deletion`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "AdminUsers", id },
        "AdminUsers",
      ],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateAdminMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useScheduleUserDeletionMutation,
} = adminApi;
