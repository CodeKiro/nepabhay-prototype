"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

const ResendVerificationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ResendVerificationFormData = z.infer<typeof ResendVerificationSchema>;

function ResendVerificationContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [emailFromQuery, setEmailFromQuery] = useState("");

  // Get email from query params
  useEffect(() => {
    const email = searchParams.get("email");
    if (email) {
      setEmailFromQuery(email);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResendVerificationFormData>({
    resolver: zodResolver(ResendVerificationSchema),
    defaultValues: {
      email: emailFromQuery,
    },
  });

  // Update form value when emailFromQuery changes
  useEffect(() => {
    if (emailFromQuery) {
      setValue("email", emailFromQuery);
    }
  }, [emailFromQuery, setValue]);

  const onSubmit = async (data: ResendVerificationFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/resend-verification", {
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
        setError(
          result.error || "Failed to send verification email. Please try again."
        );
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-md w-full">
          <Card className="border-green-200 shadow-lg">
            <CardHeader className="text-center p-4 sm:p-6">
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <CardTitle className="text-lg sm:text-xl">
                Verification Email Sent!
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                We&apos;ve sent a new verification email to your inbox. Please
                check your email and spam folder.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
              <div className="text-center text-xs sm:text-sm text-gray-600">
                <p>
                  Didn&apos;t receive the email? Check your spam folder or try
                  again in a few minutes.
                </p>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="w-full h-12 sm:h-auto text-base sm:text-sm"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Another Email
                </Button>
                <Link href="/auth/signin">
                  <Button
                    variant="outline"
                    className="w-full h-12 sm:h-auto text-base sm:text-sm"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-gray-50">
      <div className="max-w-md w-full">
        <Card className="shadow-lg">
          <CardHeader className="text-center p-4 sm:p-6">
            <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <CardTitle className="text-lg sm:text-xl">
              Resend Verification Email
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter your email address to receive a new verification email.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && <Alert variant="destructive">{error}</Alert>}

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm sm:text-base font-medium"
                >
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email")}
                  className={`h-12 sm:h-11 text-base sm:text-sm ${
                    errors.email ? "border-red-400" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

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
                    Send Verification Email
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link
                  href="/auth/signin"
                  className="text-sm sm:text-base text-blue-600 hover:text-blue-500 font-medium inline-flex items-center"
                >
                  <ArrowLeft className="h-3 w-3 mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ResendVerificationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-gray-50">
          <div className="max-w-md w-full">
            <Card className="shadow-lg">
              <CardHeader className="text-center p-4 sm:p-6">
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Loading...</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      }
    >
      <ResendVerificationContent />
    </Suspense>
  );
}
