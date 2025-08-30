import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types/auth";

interface AuthResponse {
  success: boolean;
  data?: unknown;
  message?: string;
  error?: string;
}

interface ProfileResponse {
  success: boolean;
  data: User;
}

interface UpdateProfileData {
  name?: string;
  username?: string;
}

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["User", "Profile"],
  endpoints: (builder) => ({
    // Get user profile
    getUserProfile: builder.query<ProfileResponse, void>({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),

    // Update user profile
    updateProfile: builder.mutation<ProfileResponse, UpdateProfileData>({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    // Change password
    changePassword: builder.mutation<AuthResponse, ChangePasswordData>({
      query: (data) => ({
        url: "/profile/change-password",
        method: "POST",
        body: data,
      }),
    }),

    // Delete account
    deleteAccount: builder.mutation<AuthResponse, { reason: string }>({
      query: (data) => ({
        url: "/profile/delete-account",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),

    // Check email availability
    checkEmail: builder.mutation<AuthResponse, { email: string }>({
      query: (data) => ({
        url: "/auth/check-email",
        method: "POST",
        body: data,
      }),
    }),

    // Sign up
    signUp: builder.mutation<
      AuthResponse,
      { name: string; email: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    // Forgot password
    forgotPassword: builder.mutation<AuthResponse, { email: string }>({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    // Reset password
    resetPassword: builder.mutation<
      AuthResponse,
      { token: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // Verify email
    verifyEmail: builder.mutation<AuthResponse, { token: string }>({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    // Resend verification
    resendVerification: builder.mutation<AuthResponse, { email: string }>({
      query: (data) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useCheckEmailMutation,
  useSignUpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
} = authApi;
