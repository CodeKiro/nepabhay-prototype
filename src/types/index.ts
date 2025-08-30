// Re-export all types for easy importing
export * from "./auth";
export * from "./post";
export * from "./interaction";
export * from "./api";
export * from "./ui";

// Global utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Environment types
export interface EnvironmentVariables {
  MONGODB_URI: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD: string;
  NODE_ENV: "development" | "production" | "test";
}

// Configuration types
export interface DatabaseConfig {
  uri: string;
  options: {
    serverSelectionTimeoutMS: number;
    socketTimeoutMS: number;
    maxPoolSize: number;
    minPoolSize: number;
  };
}

export interface AuthConfig {
  secret: string;
  url: string;
  sessionMaxAge: number;
  bcryptRounds: number;
}

export interface AppFeatures {
  emailVerification: boolean;
  socialLogin: boolean;
  fileUploads: boolean;
}
