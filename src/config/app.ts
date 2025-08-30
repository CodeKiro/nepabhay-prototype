/**
 * Configuration file for the application
 * Contains all environment-dependent settings and constants
 * Uses lazy loading to ensure environment variables are available
 */

// Lazy-loaded config to ensure environment variables are loaded
export const appConfig = {
  // Database
  database: {
    get uri() {
      const uri = process.env.MONGODB_URI;
      if (!uri) {
        throw new Error("Missing required environment variable: MONGODB_URI");
      }
      return uri;
    },
    options: {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
    },
  },

  // Authentication
  auth: {
    get secret() {
      const secret = process.env.NEXTAUTH_SECRET;
      if (!secret) {
        throw new Error(
          "Missing required environment variable: NEXTAUTH_SECRET"
        );
      }
      return secret;
    },
    get url() {
      return process.env.NEXTAUTH_URL || "http://localhost:3000";
    },
    sessionMaxAge: 30 * 24 * 60 * 60, // 30 days
    bcryptRounds: 12,
  },

  // Admin setup
  admin: {
    get email() {
      return process.env.ADMIN_EMAIL || "admin@gmail.com";
    },
    get password() {
      return process.env.ADMIN_PASSWORD || "admin";
    },
    name: "System Admin",
  },

  // Email
  email: {
    get host() {
      const host = process.env.MAIL_HOST;
      if (!host) {
        throw new Error("Missing required environment variable: MAIL_HOST");
      }
      return host;
    },
    get port() {
      return parseInt(process.env.MAIL_PORT || "587");
    },
    get user() {
      const user = process.env.MAIL_USER;
      if (!user) {
        throw new Error("Missing required environment variable: MAIL_USER");
      }
      return user;
    },
    get password() {
      const password = process.env.MAIL_PASSWORD;
      if (!password) {
        throw new Error("Missing required environment variable: MAIL_PASSWORD");
      }
      return password;
    },
    get from() {
      const from = process.env.MAIL_FROM;
      if (!from) {
        throw new Error("Missing required environment variable: MAIL_FROM");
      }
      return from;
    },
    verificationTokenExpiry: 24 * 60 * 60 * 1000, // 24 hours
    resetTokenExpiry: 60 * 60 * 1000, // 1 hour
  },

  // Pagination
  pagination: {
    defaultLimit: 10,
    maxLimit: 50,
  },

  // Application
  app: {
    name: "Nepa:Bhay",
    description: "A platform for sharing poems, stories, and blogs",
    version: "1.0.0",
    // Note: For URL generation, use getBaseUrlFromRequest() from @/lib/utils/url
    // This ensures reliable URLs based on actual HTTP requests
  }, // Feature flags
  features: {
    emailVerification: true,
    socialLogin: false,
    fileUploads: false,
  },
} as const;

// Lazy validation of required environment variables
const requiredEnvVars = [
  "MONGODB_URI",
  "NEXTAUTH_SECRET",
  "MAIL_HOST",
  "MAIL_PORT",
  "MAIL_USER",
  "MAIL_PASSWORD",
  "MAIL_FROM",
] as const;

/**
 * Validates that all required environment variables are present
 * Only runs when explicitly called, not during module import
 */
export function validateEnvironmentVariables(): void {
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }
}

export type AppConfig = typeof appConfig;
