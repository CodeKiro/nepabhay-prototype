"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Alert } from "@/components/ui/Alert";
import { UserCheck, ArrowRight } from "lucide-react";
import Loading from "@/components/ui/Loading";

interface OnboardingData {
  needsOnboarding: boolean;
  suggestedName: string;
  suggestedUsername: string;
}

export default function OnboardingPage() {
  const { status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(
    null
  );

  // Form state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const checkOnboardingStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/profile/onboarding");
      if (!response.ok) {
        throw new Error("Failed to check onboarding status");
      }

      const data = await response.json();
      setOnboardingData(data.data);

      if (!data.data.needsOnboarding) {
        // User doesn't need onboarding, redirect to home
        setTimeout(() => {
          router.push("/");
        }, 100);
        return;
      }

      // Set suggested values
      setName(data.data.suggestedName);
      setUsername(data.data.suggestedUsername);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load onboarding"
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      checkOnboardingStatus();
    }
  }, [status, router, checkOnboardingStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/profile/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to complete setup");
      }

      // Success! Redirect to home
      router.push("/?onboarded=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete setup");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUsernameChange = (value: string) => {
    // Clean username - lowercase, only letters, numbers, underscores
    const cleaned = value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setUsername(cleaned);
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // If onboarding check is complete but user doesn't need onboarding,
  // we've already redirected in checkOnboardingStatus, so just show loading
  if (onboardingData && !onboardingData.needsOnboarding) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // If we don't have onboarding data yet, show loading
  if (!onboardingData) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-md w-full space-y-6 sm:space-y-8">
        <div className="text-center">
          <UserCheck className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-green-600" />
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl font-extrabold text-gray-900">
            Welcome to NepaBhay!
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Let&apos;s complete your profile setup
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">
              Complete Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm sm:text-base font-medium"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={submitting}
                  placeholder="Enter your full name"
                  className="mt-1 h-12 sm:h-11 text-base sm:text-sm"
                />
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  This is how others will see your name
                </p>
              </div>

              <div>
                <Label
                  htmlFor="username"
                  className="text-sm sm:text-base font-medium"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  required
                  disabled={submitting}
                  placeholder="username"
                  className="mt-1 h-12 sm:h-11 text-base sm:text-sm"
                />
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  Only lowercase letters, numbers, and underscores allowed
                </p>
              </div>

              <Button
                type="submit"
                disabled={submitting || !name.trim() || !username.trim()}
                className="w-full flex items-center justify-center gap-2 h-12 sm:h-auto text-base sm:text-sm bg-green-600 hover:bg-green-700 mt-6"
              >
                {submitting ? (
                  "Setting up..."
                ) : (
                  <>
                    Complete Setup
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            You can always update your profile later
          </p>
        </div>
      </div>
    </div>
  );
}
