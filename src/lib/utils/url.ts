/**
 * Utility functions for URL handling in SSR and API routes
 */

import { NextRequest } from "next/server";

/**
 * Extract base URL from request headers (works in both API routes and SSR)
 * This is the most reliable way to get the current domain in deployment
 */
export function getBaseUrlFromRequest(request?: NextRequest): string {
  // If request is provided directly (API routes)
  if (request) {
    const host = request.headers.get("host");
    const protocol =
      request.headers.get("x-forwarded-proto") ||
      (host?.includes("localhost") ? "http" : "https");
    return `${protocol}://${host}`;
  }

  // Fallback to environment or default for server components
  return getFallbackBaseUrl();
}

/**
 * Extract base URL from request headers (async version for server components)
 * NOTE: This function can only be used in Server Components, not Client Components
 */
export async function getBaseUrlFromHeaders(): Promise<string> {
  try {
    // Dynamic import to avoid client-side bundling issues
    const { headers } = await import("next/headers");
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol =
      headersList.get("x-forwarded-proto") ||
      (host?.includes("localhost") ? "http" : "https");

    if (host) {
      return `${protocol}://${host}`;
    }
  } catch (error) {
    // headers() not available (client-side or edge cases)
    console.warn("Could not extract base URL from headers:", error);
  }

  // Fallback to environment or default
  return getFallbackBaseUrl();
}

/**
 * Get base URL for client-side operations
 */
export function getClientBaseUrl(): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return getFallbackBaseUrl();
}

/**
 * Get fallback base URL from environment (for cases without request context)
 */
export function getFallbackBaseUrl(): string {
  // Priority: NEXTAUTH_URL > VERCEL_URL > localhost
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

/**
 * Create absolute URL from relative path using request context
 */
export function createAbsoluteUrl(path: string, request?: NextRequest): string {
  const baseUrl = getBaseUrlFromRequest(request);
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
