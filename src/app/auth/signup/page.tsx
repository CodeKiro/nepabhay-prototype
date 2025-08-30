"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, type SignUpFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { OAuthButtons } from "@/components/auth/OAuthButtons";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Alert } from "@/components/ui/Alert";
import { Eye, EyeOff, UserPlus, Mail } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "An error occurred");
        return;
      }

      setUserEmail(data.email); // Store the email for resend verification
      setSuccess(true);
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center py-6 sm:py-12 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-lg w-full text-center">
          <div className="bg-white p-4 sm:p-8 rounded-2xl shadow-xl border border-blue-100">
            {/* Happy Boy Image */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <Image
                  src="/stickers/happywithlike.webp"
                  alt="Happy celebration"
                  width={140}
                  height={140}
                  className="animate-bounce-slow"
                />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-green-800 mb-4">
              सुभाय्! (Subhāy!)
            </h2>
            <p className="text-lg text-green-700 mb-2 font-medium">
              Account Created Successfully!
            </p>
            <p className="text-green-600 mb-4">
              लसकुस (Lasakus)! Welcome to our Newa community. Please check your
              email to verify your account before signing in.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              धन्यवाद (Dhanyabād) for joining us! Verification emails may take a
              few minutes to arrive. Check your spam folder if you don&apos;t
              see it.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => router.push("/auth/signin")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Mail className="h-4 w-4 mr-2" />
                Go to Sign In
              </Button>
              <Button
                onClick={() =>
                  router.push(
                    `/auth/resend-verification?email=${encodeURIComponent(
                      userEmail
                    )}`
                  )
                }
                variant="outline"
                className="w-full border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                Resend Verification Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
      {/* Container to center both sections together */}
      <div className="min-h-screen flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto lg:items-center lg:justify-center">
        {/* Left Side - Form */}
        <div className="lg:w-1/2 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 order-2 lg:order-1 lg:pr-4">
          <div className="max-w-md w-full space-y-6 mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Join Our Community
              </h2>
              <p className="text-sm text-gray-600">
                Connect with fellow language enthusiasts and cultural explorers
              </p>
              {/* Decorative line */}
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className="h-0.5 w-8 bg-red-500 rounded-full"></div>
                <div className="h-0.5 w-4 bg-blue-500 rounded-full"></div>
              </div>
            </div>

            {/* OAuth Buttons */}
            <OAuthButtons useAuthConfigRedirect={true} />

            {/* Form - No Card Border */}
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {error && <Alert variant="destructive">{error}</Alert>}

              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Full name
                </Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className={
                    errors.name
                      ? "border-red-400 focus-visible:ring-blue-500"
                      : "focus-visible:ring-blue-500"
                  }
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Choose a username"
                  {...register("username")}
                  className={
                    errors.username
                      ? "border-red-400 focus-visible:ring-blue-500"
                      : "focus-visible:ring-blue-500"
                  }
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Only lowercase letters, numbers, and underscores allowed
                </p>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className={
                    errors.email
                      ? "border-red-400 focus-visible:ring-blue-500"
                      : "focus-visible:ring-blue-500"
                  }
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    {...register("password")}
                    className={
                      errors.password
                        ? "border-red-400 focus-visible:ring-blue-500 pr-10"
                        : "focus-visible:ring-blue-500 pr-10"
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-700 font-medium"
                >
                  Confirm password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    {...register("confirmPassword")}
                    className={
                      errors.confirmPassword
                        ? "border-red-400 focus-visible:ring-blue-500 pr-10"
                        : "focus-visible:ring-blue-500 pr-10"
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Account
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Cultural Content */}
        <div className="lg:w-1/2 relative overflow-hidden flex flex-col items-center justify-center p-6 lg:p-8 order-1 lg:order-2 min-h-[40vh] lg:min-h-auto lg:pl-4">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-16 right-12 w-24 h-24 bg-blue-200/30 rounded-full animate-float"></div>
            <div className="absolute top-1/3 left-16 w-20 h-20 bg-red-300/40 rounded-full animate-bounce delay-300"></div>
            <div className="absolute bottom-1/3 right-20 w-16 h-16 bg-blue-300/20 rounded-full animate-pulse delay-700"></div>
            <div className="absolute bottom-20 left-10 w-8 h-8 bg-blue-500/40 rounded-full animate-float delay-500"></div>
          </div>

          <div className="relative text-center space-y-8 z-10 max-w-md mx-auto">
            {/* Large Greeting Image */}
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src="/stickers/greetingbothboyandgirlfull.png"
                  alt="Newa cultural greeting"
                  width={300}
                  height={300}
                  className="transition-transform duration-700 ease-out hover:scale-105"
                />
                {/* Subtle glow effect around image */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-transparent to-red-400/10 rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Newa Greeting */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-black text-transparent bg-gradient-to-r from-blue-600 via-red-600 to-black bg-clip-text">
                ज्वजलपा !
              </h1>
              {/* Decorative line */}
              <div className="flex items-center justify-center space-x-3">
                <div className="h-1 w-12 bg-red-500 rounded-full"></div>
                <div className="h-1 w-6 bg-blue-500 rounded-full"></div>
                <div className="h-1 w-3 bg-black rounded-full"></div>
              </div>
            </div>

            {/* Welcome Note */}
            <div className="max-w-md mx-auto">
              <p className="text-lg text-gray-800 font-medium">
                सुभाय् - Thank you for joining our community!
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Start your Nepal Bhasa learning adventure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
