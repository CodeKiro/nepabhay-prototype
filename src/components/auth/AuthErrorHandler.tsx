"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  AlertTriangle,
  Shield,
  UserX,
  Mail,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { logError } from "@/lib/utils/errorLogger";

interface AuthErrorHandlerProps {
  error: string | null;
  onRetry?: () => void;
  userEmail?: string;
}

export default function AuthErrorHandler({
  error,
  onRetry,
  userEmail,
}: AuthErrorHandlerProps) {
  const [isReactivating, setIsReactivating] = useState(false);
  const [reactivationSuccess, setReactivationSuccess] = useState(false);

  const handleReactivation = async () => {
    setIsReactivating(true);
    try {
      // Make API request with credentials to ensure session is included
      const response = await fetch("/api/auth/reactivate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important: This ensures cookies/session are sent
      });

      if (response.ok) {
        setReactivationSuccess(true);
        setTimeout(() => {
          if (onRetry) onRetry();
        }, 2000);
      } else {
        const data = await response.json();
        const errorMsg = data.message || "Failed to reactivate account";
        logError.auth("Account reactivation failed", {
          userEmail,
          responseStatus: response.status,
          errorMessage: errorMsg,
        });
        alert(errorMsg);
      }
    } catch (error) {
      logError.auth("Reactivation request failed", {
        userEmail,
        error: error instanceof Error ? error.message : String(error),
      });
      console.error("Reactivation error:", error);
      alert("Failed to reactivate account. Please try again.");
    } finally {
      setIsReactivating(false);
    }
  };

  if (!error) return null;

  const getErrorContent = () => {
    switch (error) {
      case "ACCOUNT_BLOCKED":
        return {
          icon: <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-red-500" />,
          title: "Account Blocked",
          message:
            "Your account has been blocked by an administrator. Please contact support for assistance.",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          canReactivate: false,
        };

      case "ACCOUNT_DELETION_REQUESTED":
        return {
          icon: <UserX className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500" />,
          title: "Account Deletion Scheduled",
          message:
            "Your account is scheduled for deletion. Please contact administrator to restore your account.",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
          canReactivate: false,
        };

      case "ACCOUNT_DEACTIVATED":
        return {
          icon: <UserX className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500" />,
          title: "Account Deactivated",
          message:
            "Your account is currently deactivated. Would you like to reactivate it to continue?",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          canReactivate: true,
        };

      case "EMAIL_NOT_VERIFIED":
        return {
          icon: <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500" />,
          title: "Email Not Verified",
          message:
            "Please verify your email address before signing in. Check your inbox for a verification link.",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          canReactivate: false,
        };

      default:
        return {
          icon: (
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-500" />
          ),
          title: "Sign In Error",
          message: "An error occurred during sign in. Please try again.",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          canReactivate: false,
        };
    }
  };

  const errorContent = getErrorContent();

  if (reactivationSuccess) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
          <div className="text-center space-y-3 sm:space-y-4">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mx-auto" />
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-green-800">
                Account Reactivated!
              </h3>
              <p className="text-sm sm:text-base text-green-600">
                Your account has been successfully reactivated. Redirecting...
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`max-w-md mx-auto ${errorContent.bgColor} ${errorContent.borderColor} border-2`}
    >
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-center">
          <div className="flex flex-col items-center space-y-2">
            {errorContent.icon}
            <span className="text-lg sm:text-xl font-bold">
              {errorContent.title}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <div>
            <p className="text-sm sm:text-base">{errorContent.message}</p>
            {userEmail && (
              <p className="text-xs sm:text-sm text-gray-600 mt-2 break-all">
                Account: {userEmail}
              </p>
            )}
          </div>
        </Alert>

        <div className="flex flex-col space-y-2">
          {errorContent.canReactivate && (
            <Button
              onClick={handleReactivation}
              disabled={isReactivating}
              className="w-full h-12 sm:h-auto text-base sm:text-sm"
            >
              {isReactivating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Reactivating...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Reactivate Account
                </>
              )}
            </Button>
          )}

          {onRetry && (
            <Button
              variant="outline"
              onClick={onRetry}
              className="w-full h-12 sm:h-auto text-base sm:text-sm"
            >
              Try Again
            </Button>
          )}

          {error === "EMAIL_NOT_VERIFIED" && (
            <Button
              variant="outline"
              onClick={() => {
                // Implement resend verification email
                alert("Verification email resent! Please check your inbox.");
              }}
              className="w-full h-12 sm:h-auto text-base sm:text-sm"
            >
              <Mail className="w-4 h-4 mr-2" />
              Resend Verification Email
            </Button>
          )}
        </div>

        {!errorContent.canReactivate && (
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600 break-words">
              Need help? Contact support at{" "}
              <a
                href="mailto:support@nepabhay.com"
                className="text-blue-600 hover:underline break-all"
              >
                support@nepabhay.com
              </a>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
