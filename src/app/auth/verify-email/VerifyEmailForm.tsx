"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

export function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  const token = searchParams.get("token");

  const verifyEmail = useCallback(async (token: string) => {
    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setMessage(
          result.message ||
            "Your email has been verified successfully! You can now access all features."
        );
      } else {
        setStatus("error");
        setMessage(
          result.error ||
            "Invalid or expired verification token. Please request a new verification email."
        );
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link. No token provided.");
      return;
    }

    verifyEmail(token);
  }, [token, verifyEmail]);

  const handleResendVerification = async () => {
    // For now, redirect to resend verification page
    router.push("/auth/resend-verification");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="max-w-md w-full">
          <Card className="shadow-lg">
            <CardHeader className="text-center p-4 sm:p-6">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 animate-spin" />
              </div>
              <CardTitle className="text-lg sm:text-xl">
                Verifying Your Email
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Please wait while we verify your email address...
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-md w-full">
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="text-center p-4 sm:p-6">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">
                Email Verified Successfully!
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {message}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <Button
                onClick={() => router.push("/auth/signin")}
                className="w-full h-12 sm:h-auto text-base sm:text-sm bg-green-600 hover:bg-green-700"
              >
                Continue to Sign In
              </Button>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="w-full h-12 sm:h-auto text-base sm:text-sm"
              >
                Go to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 via-white to-gray-50">
      <div className="max-w-md w-full">
        <Card className="border-red-200 shadow-lg">
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <CardTitle className="text-lg sm:text-xl text-red-700">
              Verification Failed
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {message}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
            <Button
              onClick={handleResendVerification}
              className="w-full h-12 sm:h-auto text-base sm:text-sm bg-red-600 hover:bg-red-700"
            >
              <Mail className="w-4 h-4 mr-2" />
              Request New Verification Email
            </Button>
            <Button
              onClick={() => router.push("/auth/signin")}
              variant="outline"
              className="w-full h-12 sm:h-auto text-base sm:text-sm"
            >
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
