"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Alert } from "@/components/ui/Alert";
import { Trash2, UserCheck } from "lucide-react";

export default function DangerZone({
  deleteReason,
  setDeleteReason,
  confirmDelete,
  setConfirmDelete,
  deleteLoading,
  handleDeleteAccount,
  confirmDeactivate,
  setConfirmDeactivate,
  deactivateLoading,
  handleDeactivateAccount,
  error,
}: {
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
  error?: string;
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {error && <Alert variant="destructive">{error}</Alert>}
      {/* Account Deactivation */}
      <Card className="border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600 text-lg sm:text-xl">
            <UserCheck className="h-4 w-4 sm:h-5 sm:w-5" />
            Deactivate Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Temporarily deactivate your account. You can reactivate it anytime
            by logging in. Your data will be preserved.
          </p>
          <form onSubmit={handleDeactivateAccount} className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="confirmDeactivate"
                checked={confirmDeactivate}
                onChange={(e) => setConfirmDeactivate(e.target.checked)}
                disabled={deactivateLoading}
              />
              <Label htmlFor="confirmDeactivate" className="text-sm">
                I want to temporarily deactivate my account
              </Label>
            </div>
            <Button
              type="submit"
              variant="outline"
              disabled={deactivateLoading || !confirmDeactivate}
              className="flex items-center gap-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
            >
              <UserCheck className="h-4 w-4" />
              {deactivateLoading ? "Deactivating..." : "Deactivate Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* Account Deletion */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Permanently delete your account. You will have 30 days to change
            your mind by logging in again. After 30 days, your data will be
            permanently removed.
          </p>
          <form onSubmit={handleDeleteAccount} className="space-y-4">
            <div>
              <Label htmlFor="deleteReason">
                Reason for deletion (optional)
              </Label>
              <Input
                id="deleteReason"
                type="text"
                value={deleteReason}
                onChange={(e) => setDeleteReason(e.target.value)}
                placeholder="Why are you deleting your account?"
                disabled={deleteLoading}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="confirmDelete"
                checked={confirmDelete}
                onChange={(e) => setConfirmDelete(e.target.checked)}
                disabled={deleteLoading}
              />
              <Label htmlFor="confirmDelete" className="text-sm">
                I understand this will delete my account (30-day grace period)
              </Label>
            </div>
            <Button
              type="submit"
              variant="destructive"
              disabled={deleteLoading || !confirmDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              {deleteLoading ? "Deleting..." : "Delete Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
