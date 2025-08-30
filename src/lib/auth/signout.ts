import { signOut as nextAuthSignOut } from "next-auth/react";
import { getClientBaseUrl } from "@/lib/utils/url";

/**
 * Custom signOut function that uses dynamic URLs from centralized config
 */
export const signOut = async (options?: { callbackUrl?: string }) => {
  const baseUrl = getClientBaseUrl();
  const defaultCallbackUrl = `${baseUrl}/auth/signin`;

  return nextAuthSignOut({
    callbackUrl: options?.callbackUrl || defaultCallbackUrl,
  });
};
/**
 * Server-side signOut for server actions
 */
export const serverSignOut = async (callbackUrl?: string) => {
  const { signOut } = await import("@/lib/auth");
  const { getFallbackBaseUrl } = await import("@/lib/utils/url");

  const baseUrl = getFallbackBaseUrl();
  const defaultCallbackUrl = `${baseUrl}/auth/signin`;

  return signOut({
    redirectTo: callbackUrl || defaultCallbackUrl,
  });
};
