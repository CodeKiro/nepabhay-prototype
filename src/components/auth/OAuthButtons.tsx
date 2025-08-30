"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface OAuthButtonsProps {
  callbackUrl?: string;
  className?: string;
  useAuthConfigRedirect?: boolean; // New prop to control redirect behavior
}

export function OAuthButtons({
  callbackUrl,
  className = "",
  useAuthConfigRedirect = false,
}: OAuthButtonsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: string) => {
    try {
      setIsLoading(provider);

      if (useAuthConfigRedirect) {
        // For OAuth users who might need onboarding, redirect to onboarding page
        await signIn(provider, {
          callbackUrl: "/profile/onboarding",
          redirect: true,
        });
      } else {
        // Use explicit callbackUrl (for normal sign-in flow)
        await signIn(provider, {
          callbackUrl: callbackUrl || "/",
          redirect: true,
        });
      }
    } catch (error) {
      console.error(`${provider} sign-in error:`, error);
      setIsLoading(null);
    }
  };
  return (
    <div className={`space-y-3 ${className}`}>
      {/* Google Sign In */}
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-3 py-3 border-gray-300 hover:bg-gray-50 text-gray-700"
        onClick={() => handleOAuthSignIn("google")}
        disabled={isLoading !== null}
        loading={isLoading === "google"}
        loadingText="Signing in with Google..."
      >
        {isLoading !== "google" && (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        )}
        Continue with Google
      </Button>

      {/* Facebook Sign In */}
      {/* <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-2 sm:gap-3 py-2 sm:py-3 border-blue-300 hover:bg-blue-50 text-blue-700 text-sm sm:text-base"
        onClick={() => handleOAuthSignIn("facebook")}
        disabled={isLoading !== null}
      >
        {isLoading === "facebook" ? (
          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
        ) : (
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="#1877F2"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        )}
        {isLoading === "facebook" ? "Signing in..." : "Continue with Facebook"}
      </Button> */}

      {/* TikTok Sign In */}
      {/* <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-3 py-3 border-pink-300 hover:bg-pink-50 text-pink-700"
        onClick={() => handleOAuthSignIn("tiktok")}
        disabled={isLoading !== null}
      >
        {isLoading === "tiktok" ? (
          <div className="w-5 h-5 border-2 border-pink-300 border-t-pink-600 rounded-full animate-spin" />
        ) : (
          <svg className="w-5 h-5" fill="#000000" viewBox="0 0 24 24">
            <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        )}
        {isLoading === "tiktok" ? "Signing in..." : "Continue with TikTok"}
      </Button> */}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">or</span>
        </div>
      </div>
    </div>
  );
}
