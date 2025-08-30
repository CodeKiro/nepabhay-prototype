"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "@/components/ui/Alert";
import { useToast, ToastContainer } from "@/components/ui/Toast";
import { signOut } from "@/lib/auth/signout";
import ProfileOverview from "@/components/profile/ProfileOverview";
import ProfileTabs from "@/components/profile/ProfileTabs";
import Loading from "@/components/ui/Loading";
import type { User as UserType } from "@/types/auth";

export default function ProfilePage() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const [profile, setProfile] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteReason, setDeleteReason] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDeactivate, setConfirmDeactivate] = useState(false);

  // Form-specific error states
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [dangerError, setDangerError] = useState("");

  // Loading states
  const [updateLoading, setUpdateLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deactivateLoading, setDeactivateLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch("/api/profile");
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data.data);
      setName(data.data.name);
      setUsername(data.data.username);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status, router, fetchProfile]);

  // Separate effect for onboarding success to avoid infinite loop
  useEffect(() => {
    if (searchParams.get("onboarded") === "true") {
      toast.success("Welcome! Your profile has been set up successfully.");
      // Clean up the URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("onboarded");
      router.replace(newUrl.pathname, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]); // toast intentionally omitted to prevent infinite loop

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setProfileError("");

    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update profile");
      }

      const data = await response.json();
      setProfile(data.data);
      toast.success("Profile updated successfully!");
    } catch (err) {
      setProfileError(
        err instanceof Error ? err.message : "Failed to update profile"
      );
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and Confirm password do not match");
      setPasswordLoading(false);
      return;
    }

    try {
      // Check if this is create password (OAuth user without password) or change password
      const isCreatePasswordMode =
        profile?.isOAuthUser && !profile?.hasPassword;
      const endpoint = isCreatePasswordMode
        ? "/api/profile/create-password"
        : "/api/profile/change-password";

      const body = isCreatePasswordMode
        ? { newPassword, confirmPassword }
        : { currentPassword, newPassword, confirmPassword };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update password");
      }

      const data = await response.json();
      const message = isCreatePasswordMode
        ? "Password created successfully!"
        : "Password changed successfully!";

      toast.success(message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Update profile with new data if create-password returned updated profile
      if (isCreatePasswordMode && data.data) {
        setProfile(data.data);
      } else {
        // Only fetch profile if we don't have updated data from the response
        fetchProfile();
      }
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Failed to update password"
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteLoading(true);
    setDangerError("");

    if (!confirmDelete) {
      setDangerError("Please confirm account deletion");
      setDeleteLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/profile/account-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete",
          reason: deleteReason,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete account");
      }

      toast.success(
        "Account deletion requested. You have 30 days to change your mind by logging in again."
      );

      // Logout after successful deletion
      setTimeout(async () => {
        await signOut({ callbackUrl: "/" });
      }, 2000);
    } catch (err) {
      setDangerError(
        err instanceof Error ? err.message : "Failed to delete account"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeactivateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeactivateLoading(true);
    setDangerError("");

    if (!confirmDeactivate) {
      setDangerError("Please confirm account deactivation");
      setDeactivateLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/profile/account-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "deactivate",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to deactivate account");
      }

      toast.success(
        "Account deactivated successfully. You can reactivate it anytime by logging in."
      );

      // Logout after successful deactivation
      setTimeout(async () => {
        await signOut({ callbackUrl: "/" });
      }, 2000);
    } catch (err) {
      setDangerError(
        err instanceof Error ? err.message : "Failed to deactivate account"
      );
    } finally {
      setDeactivateLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Failed to load profile</div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-red-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        <div className="relative flex w-full justify-center">
          <div className="hidden sm:block sm:w-1/4 lg:w-1/4"></div>
          <div className="w-full sm:w-2/4 lg:w-2/4 px-4 sm:px-8 lg:px-12 pb-20">
            <div className="text-center pt-6 sm:pt-10 pb-6 sm:pb-8 px-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Profile Settings
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Manage your account settings and preferences.
              </p>
            </div>
            {error && <Alert variant="destructive">{error}</Alert>}
            <div className="space-y-6">
              <ProfileOverview profile={profile} />
              <ProfileTabs
                profile={profile}
                name={name}
                setName={setName}
                username={username}
                setUsername={setUsername}
                updateLoading={updateLoading}
                handleUpdateProfile={handleUpdateProfile}
                currentPassword={currentPassword}
                setCurrentPassword={setCurrentPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                passwordLoading={passwordLoading}
                handleChangePassword={handleChangePassword}
                deleteReason={deleteReason}
                setDeleteReason={setDeleteReason}
                confirmDelete={!!confirmDelete}
                setConfirmDelete={setConfirmDelete}
                deleteLoading={deleteLoading}
                handleDeleteAccount={handleDeleteAccount}
                confirmDeactivate={!!confirmDeactivate}
                setConfirmDeactivate={setConfirmDeactivate}
                deactivateLoading={deactivateLoading}
                handleDeactivateAccount={handleDeactivateAccount}
                profileError={profileError}
                passwordError={passwordError}
                dangerError={dangerError}
                passwordInfo={
                  profile?.isOAuthUser && !profile?.hasPassword
                    ? `You used OAuth (${
                        profile?.oauthProviders?.[0]?.provider || "OAuth"
                      }) to login and have not setup a password yet. Set up a password as a backup login method.`
                    : undefined
                }
              />
            </div>
          </div>
          <div className="hidden sm:block sm:w-1/4 lg:w-1/4"></div>
        </div>
      </div>
    </>
  );
}
