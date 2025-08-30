"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Alert } from "@/components/ui/Alert";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      setError("");

      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Failed to send reset email");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-md w-full space-y-6 sm:space-y-8">
          <div className="text-center">
            <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            </div>
            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 px-4 sm:px-0">
              If an account with that email exists, we&apos;ve sent you password
              reset instructions.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Button
              onClick={() => router.push("/auth/signin")}
              variant="outline"
              className="w-full h-12 sm:h-11 text-base sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div>
          <h2 className="mt-4 sm:mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm sm:text-base text-gray-600 px-4 sm:px-0">
            Enter your email address and we&apos;ll send you instructions to
            reset your password.
          </p>
        </div>

        {/* Show helpful message for logged-in users */}
        {status === "authenticated" && (
          <Alert className="bg-blue-50 border-blue-200 text-blue-800">
            <div className="ml-2">
              <p className="font-medium">You&apos;re currently signed in!</p>
              <p className="text-sm mt-1">
                You can change your password directly from your{" "}
                <Link
                  href="/profile"
                  className="font-medium underline hover:no-underline"
                >
                  profile page
                </Link>{" "}
                instead of resetting it via email.
              </p>
            </div>
          </Alert>
        )}

        <form
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {error && <Alert variant="destructive">{error}</Alert>}

          <div>
            <Label htmlFor="email" className="text-sm sm:text-base font-medium">
              Email address
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                {...register("email")}
                className={`h-12 sm:h-11 text-base sm:text-sm ${
                  errors.email ? "border-red-400" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Button
              type="submit"
              className="w-full h-12 sm:h-11 text-base sm:text-sm bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Reset Instructions
                </>
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/auth/signin"
                className="text-sm sm:text-base text-blue-600 hover:text-blue-500 font-medium"
              >
                Remember your password? Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
