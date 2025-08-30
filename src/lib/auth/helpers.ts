import { auth } from "./config";
import { ApiResponseBuilder } from "@/lib/api/response";
import type { AuthResult } from "@/types";

/**
 * Get authenticated user from session
 */
export async function getAuthenticatedUser(): Promise<AuthResult> {
  try {
    const session = await auth();

    if (!session?.user || !session.user.email || !session.user.name) {
      return {
        user: null,
        isAuthenticated: false,
        isAdmin: false,
      };
    }

    return {
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        username: session.user.username || "",
        role: session.user.role as "reader" | "writer" | "admin",
      },
      isAuthenticated: true,
      isAdmin: session.user.role === "admin",
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      user: null,
      isAuthenticated: false,
      isAdmin: false,
    };
  }
}

/**
 * Middleware to require authentication
 */
export async function requireAuth() {
  const authResult = await getAuthenticatedUser();

  if (!authResult.isAuthenticated) {
    return {
      error: ApiResponseBuilder.unauthorized("Authentication required"),
      user: null,
    };
  }

  return {
    error: null,
    user: authResult.user!,
  };
}

/**
 * Middleware to require admin role
 */
export async function requireAdmin() {
  const authResult = await getAuthenticatedUser();

  if (!authResult.isAuthenticated) {
    return {
      error: ApiResponseBuilder.unauthorized("Authentication required"),
      user: null,
    };
  }

  if (!authResult.isAdmin) {
    return {
      error: ApiResponseBuilder.forbidden("Admin access required"),
      user: null,
    };
  }

  return {
    error: null,
    user: authResult.user!,
  };
}

/**
 * Check if user can perform action (for conditional auth)
 */
export async function canPerformAction(
  requiredRole?: "reader" | "writer" | "admin"
): Promise<AuthResult & { canPerform: boolean }> {
  const authResult = await getAuthenticatedUser();

  if (!requiredRole) {
    return { ...authResult, canPerform: true };
  }

  if (!authResult.isAuthenticated) {
    return { ...authResult, canPerform: false };
  }

  const roleHierarchy = { reader: 1, writer: 2, admin: 3 };
  const userLevel = roleHierarchy[authResult.user!.role];
  const requiredLevel = roleHierarchy[requiredRole];

  return {
    ...authResult,
    canPerform: userLevel >= requiredLevel,
  };
}
