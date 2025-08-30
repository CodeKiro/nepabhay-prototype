"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import ProfileUpdateForm from "./ProfileUpdateForm";
import PasswordForm from "./PasswordForm";
import DangerZone from "./DangerZone";
import type { User as UserType } from "@/types/auth";

export default function ProfileTabs({
  profile,
  passwordInfo,
  profileError,
  passwordError,
  dangerError,
  ...formProps
}: {
  profile: UserType;
  name: string;
  setName: (v: string) => void;
  username: string;
  setUsername: (v: string) => void;
  updateLoading: boolean;
  handleUpdateProfile: (e: React.FormEvent) => void;
  currentPassword: string;
  setCurrentPassword: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  passwordLoading: boolean;
  handleChangePassword: (e: React.FormEvent) => void;
  deleteReason: string;
  setDeleteReason: (v: string) => void;
  confirmDelete: boolean;
  setConfirmDelete: (v: boolean) => void;
  deleteLoading: boolean;
  handleDeleteAccount: (e: React.FormEvent) => void;
  confirmDeactivate: boolean;
  setConfirmDeactivate: (v: boolean) => void;
  deactivateLoading: boolean;
  handleDeactivateAccount: (e: React.FormEvent) => void;
  passwordInfo?: string;
  profileError?: string;
  passwordError?: string;
  dangerError?: string;
}) {
  return (
    <Tabs defaultValue="profile" className="space-y-4 sm:space-y-6">
      <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto sm:mx-0">
        <TabsTrigger value="profile" className="text-xs sm:text-sm">
          Profile
        </TabsTrigger>
        <TabsTrigger value="password" className="text-xs sm:text-sm">
          Password
        </TabsTrigger>
        <TabsTrigger value="danger" className="text-xs sm:text-sm">
          Danger Zone
        </TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileUpdateForm
          {...formProps}
          profile={profile}
          error={profileError}
        />
      </TabsContent>
      <TabsContent value="password">
        <PasswordForm
          {...formProps}
          profile={profile}
          passwordInfo={passwordInfo}
          error={passwordError}
        />
      </TabsContent>
      <TabsContent value="danger">
        <DangerZone {...formProps} error={dangerError} />
      </TabsContent>
    </Tabs>
  );
}
