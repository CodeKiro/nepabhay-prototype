"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import Loading from "@/components/ui/Loading";
import AuthErrorHandler from "@/components/auth/AuthErrorHandler";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { Eye, EyeOff } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setAuthError(null);

    try {
      // First, check account status before attempting login
      const accountCheckResponse = await fetch("/api/auth/check-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      const accountData = await accountCheckResponse.json();

      // If account has specific issues, handle them before attempting login
      if (accountData.status === "ERROR" && accountData.errorCode) {
        console.log("Account check found issues:", accountData.errorCode);

        // For deactivated accounts, proceed with login but remember we need to show reactivation
        if (
          accountData.errorCode === "ACCOUNT_DEACTIVATED" &&
          accountData.allowLogin
        ) {
          // Store that we need to show reactivation UI after login
          sessionStorage.setItem("showReactivation", "true");
        } else {
          // For other error cases, show error immediately and don't attempt login
          setAuthError(accountData.errorCode);
          setIsSubmitting(false);
          return;
        }
      }

      // If account check passes, proceed with login
      const result = await signIn("credentials", {
        identifier,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.log("Sign-in error:", result);

        // For normal credential errors
        if (result.error === "CredentialsSignin") {
          setError("Invalid email/username or password");
        } else {
          setError(result.error || "An error occurred");
        }
        setIsSubmitting(false);
      } else {
        // Successful login

        // Check if we need to show the reactivation UI
        if (
          typeof window !== "undefined" &&
          sessionStorage.getItem("showReactivation") === "true"
        ) {
          sessionStorage.removeItem("showReactivation");
          setAuthError("ACCOUNT_DEACTIVATED");
          setIsSubmitting(false);
        } else {
          router.push(callbackUrl);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  const handleReactivationRequest = () => {
    setAuthError(null);
    setError("");
    // You could show a success message here if needed
  };

  // Show AuthErrorHandler if there's an auth-specific error
  if (authError) {
    return (
      <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 via-white to-blue-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <AuthErrorHandler
            error={authError}
            userEmail={identifier}
            onRetry={handleReactivationRequest}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      {/* Container to center both sections together */}
      <div className="min-h-screen flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto lg:items-center lg:justify-center">
        {/* Left Side - Cultural Content */}
        <div className="lg:w-1/2 relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 order-1 min-h-[40vh] sm:min-h-[45vh] lg:min-h-auto lg:pr-6">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-8 sm:top-12 left-4 sm:left-6 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 bg-red-200/30 rounded-full animate-float"></div>
            <div className="absolute top-1/4 right-6 sm:right-8 lg:right-16 w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 bg-blue-300/40 rounded-full animate-bounce delay-300"></div>
            <div className="absolute bottom-1/3 left-6 sm:left-10 lg:left-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-16 lg:h-16 bg-red-300/20 rounded-full animate-pulse delay-700"></div>
            <div className="absolute bottom-8 sm:bottom-12 right-4 sm:right-6 lg:right-10 w-6 h-6 sm:w-8 sm:h-8 bg-red-500/40 rounded-full animate-float delay-500"></div>
          </div>

          <div className="relative text-center space-y-4 sm:space-y-6 lg:space-y-8 z-10 max-w-md mx-auto">
            {/* Large Dancing Kids Image */}
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src="/stickers/jumpingdancingboygirl.webp"
                  alt="Dancing friends - Newa celebration"
                  width={300}
                  height={300}
                  className="w-64 sm:w-72 lg:w-80 h-auto animate-bounce-slow transition-transform duration-700 ease-out hover:scale-105"
                />
                {/* Subtle glow effect around image */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 via-transparent to-blue-400/10 rounded-full blur-xl sm:blur-2xl"></div>
              </div>
            </div>

            {/* Newa Greeting */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-red-600 via-blue-600 to-black bg-clip-text">
                तारेमाम् !
              </h1>
              {/* Decorative line */}
              <div className="flex items-center justify-center space-x-3">
                <div className="h-1 w-12 bg-red-500 rounded-full"></div>
                <div className="h-1 w-6 bg-blue-500 rounded-full"></div>
                <div className="h-1 w-3 bg-black rounded-full"></div>
              </div>
            </div>

            {/* Welcome Back Note */}
            <div className="max-w-md mx-auto">
              <p className="text-lg text-gray-800 font-medium">
                लसकुस - Welcome back to our community!
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Continue your Nepal Bhasa learning journey
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 flex items-center justify-center py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 order-2 lg:pl-6">
          <div className="max-w-md w-full space-y-6 mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Sign In to Continue
              </h2>
              <p className="text-sm text-gray-600">
                Access your account and connect with the community
              </p>
              {/* Decorative line */}
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className="h-0.5 w-8 bg-blue-500 rounded-full"></div>
                <div className="h-0.5 w-4 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* OAuth Buttons */}
            <OAuthButtons useAuthConfigRedirect={true} />

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription className="text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label
                  htmlFor="identifier"
                  className="text-gray-700 font-medium"
                >
                  Email or Username *
                </Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your email or username"
                  className="mt-1 focus-visible:ring-blue-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password *
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="focus-visible:ring-blue-500 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                loading={isSubmitting}
                loadingText="Signing in..."
                className="w-full mt-6"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-8 text-center">
              <span className="text-gray-600 text-sm">
                Don&apos;t have an account?{" "}
              </span>
              <Link
                href="/auth/signup"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SignInLoading() {
  return <Loading size="md" showBrand={true} className="min-h-screen" />;
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInLoading />}>
      <SignInForm />
    </Suspense>
  );
}
