"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Alert } from "@/components/ui/Alert";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Lock, Eye, EyeOff, RefreshCw } from "lucide-react";
import type { User as UserType } from "@/types/auth";

export default function PasswordForm({
  profile,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  passwordLoading,
  handleChangePassword,
  passwordInfo,
  error,
}: {
  profile: UserType;
  currentPassword: string;
  setCurrentPassword: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  passwordLoading: boolean;
  handleChangePassword: (e: React.FormEvent) => void;
  passwordInfo?: string;
  error?: string;
}) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Determine if this is create password mode - OAuth user without password
  const isCreateMode = profile?.isOAuthUser && !profile?.hasPassword;

  // Check if error is related to current password being incorrect
  const isCurrentPasswordError =
    error &&
    (error.toLowerCase().includes("current password is incorrect") ||
      (error.toLowerCase().includes("current password") &&
        error.toLowerCase().includes("incorrect")));

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Lock className="h-4 w-4" />{" "}
          {isCreateMode ? "Create Password" : "Change Password"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <div className="flex flex-col space-y-2">
              <span>{error}</span>
              {isCurrentPasswordError && (
                <div className="flex items-center gap-2 mt-2">
                  <RefreshCw className="h-4 w-4" />
                  <span className="text-sm">
                    Forgot your password?{" "}
                    <Link
                      href="/auth/forgot-password"
                      className="font-medium underline hover:no-underline"
                    >
                      Reset it now
                    </Link>
                  </span>
                </div>
              )}
            </div>
          </Alert>
        )}
        <form
          onSubmit={handleChangePassword}
          className="space-y-3 sm:space-y-4"
        >
          {/* Show info only for OAuth users without password */}
          {isCreateMode && passwordInfo && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md text-blue-800 text-sm">
              {passwordInfo}
            </div>
          )}

          {/* Current password field - only show if user has existing password */}
          {!isCreateMode && (
            <div>
              <Label htmlFor="currentPassword" className="text-xs sm:text-sm">
                Current Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  disabled={passwordLoading}
                  className="h-8 sm:h-10 text-xs sm:text-sm pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="newPassword" className="text-xs sm:text-sm">
              {isCreateMode ? "Password" : "New Password"}
            </Label>
            <div className="relative mt-1">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={passwordLoading}
                minLength={8}
                className="h-8 sm:h-10 text-xs sm:text-sm pr-10"
                placeholder={
                  isCreateMode ? "Create a password" : "Enter new password"
                }
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="text-xs sm:text-sm">
              {isCreateMode ? "Confirm Password" : "Confirm New Password"}
            </Label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={passwordLoading}
                minLength={8}
                className="h-8 sm:h-10 text-xs sm:text-sm pr-10"
                placeholder={
                  isCreateMode
                    ? "Confirm your password"
                    : "Confirm new password"
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={passwordLoading}
            className="flex items-center gap-2 w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-10 shadow"
          >
            <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
            {passwordLoading
              ? isCreateMode
                ? "Creating..."
                : "Changing..."
              : isCreateMode
              ? "Create Password"
              : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
