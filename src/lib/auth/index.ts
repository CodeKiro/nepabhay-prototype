// Re-export auth configuration and utilities
export { auth, signIn, signOut, handlers } from "./config";
export { authMiddleware } from "./middleware";
export {
  getAuthenticatedUser,
  requireAuth,
  requireAdmin,
  canPerformAction,
} from "./helpers";
