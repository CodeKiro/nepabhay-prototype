/**
 * Centralized route paths configuration
 * This is the SINGLE SOURCE OF TRUTH for all paths in the application
 * For URL generation, use the utilities from @/lib/utils/url
 */

// Base paths (relative)
const basePaths = {
  // Public routes
  home: "/",
  about: "/about",
  lessons: "/lessons",
  articles: "/articles",
  quiz: "/quiz",
  poems: "/poems",
  stories: "/stories",
  blogs: "/blogs",
  post: (id: string) => `/post/${id}`,
  credits: "/credits",
  contribute: "/contribute",
  startContribution: "/start-contribution",
  team: "/team",
  contact: "/contact",
  joinUs: "/join-us",
  helpCenter: "/help",
  feedback: "/feedback",
  partnership: "/partnership",

  // Legal pages
  legal: {
    terms: "/legal/terms",
    privacy: "/legal/privacy",
    dataDelete: "/legal/data-deletion",
  },

  // Auth routes
  auth: {
    signin: "/auth/signin",
    signup: "/auth/signup",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyEmail: "/auth/verify-email",
    resendVerification: "/auth/resend-verification",
  },

  // Protected routes
  profile: "/profile",

  // Admin routes
  admin: {
    dashboard: "/admin",
    posts: "/admin/posts",
    users: "/admin/users",
    comments: "/admin/comments",
    feedback: "/admin/feedback",
    settings: "/admin/settings",
    newPost: "/admin/posts/new",
  },

  // API endpoints
  api: {
    auth: {
      checkEmail: "/api/auth/check-email",
      signup: "/api/auth/signup",
      forgotPassword: "/api/auth/forgot-password",
      resetPassword: "/api/auth/reset-password",
      verifyEmail: "/api/auth/verify-email",
      resendVerification: "/api/auth/resend-verification",
    },
    admin: {
      stats: "/api/admin/stats",
      users: "/api/admin/users",
      createAdmin: "/api/admin/create-admin",
    },
    posts: "/api/posts",
    comments: "/api/comments",
    feedback: "/api/feedback",
    profile: "/api/profile",
  },
} as const;

// Export paths for relative navigation (router.push, Link href, etc.)
export const paths = basePaths;
