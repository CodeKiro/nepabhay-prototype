// Core application types and interfaces

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: "reader" | "writer" | "admin";
  createdAt: Date;
  updatedAt: Date;
  // Account status
  isActive: boolean;
  emailVerified: boolean;
  // OAuth information
  hasPassword?: boolean;
  isOAuthUser?: boolean;
  oauthProviders?: Array<{
    provider: "google" | "facebook" | "tiktok";
    connectedAt: Date;
  }>;
  // Blocking functionality (admin action)
  isBlocked: boolean;
  blockedAt?: Date | null;
  blockedBy?: string | null;
  blockReason?: string;
  // Deactivation (user action)
  deactivatedAt?: Date | null;
  // Soft deletion (30-day grace period)
  deletionRequestedAt?: Date | null;
  deletionReason?: string;
  // Login tracking
  lastLogin?: Date | null;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  username: string;
  role: "reader" | "writer" | "admin";
}

export interface AuthResult {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface AuthSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  expires: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  name: string;
}

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordResetData {
  token: string;
  password: string;
  confirmPassword: string;
}
