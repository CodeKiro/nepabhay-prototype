"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Alert } from "@/components/ui/Alert";
import { Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import type { User } from "@/types/auth";

export default function ProfileUpdateForm({
  profile,
  name,
  setName,
  username,
  setUsername,
  updateLoading,
  handleUpdateProfile,
  error,
}: {
  profile: User;
  name: string;
  setName: (v: string) => void;
  username: string;
  setUsername: (v: string) => void;
  updateLoading: boolean;
  handleUpdateProfile: (e: React.FormEvent) => void;
  error?: string;
}) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Save className="h-4 w-4" /> Update Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            {error}
          </Alert>
        )}
        <form onSubmit={handleUpdateProfile} className="space-y-3 sm:space-y-4">
          <div>
            <Label htmlFor="name" className="text-xs sm:text-sm">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={updateLoading}
              className="mt-1 h-8 sm:h-10 text-xs sm:text-sm"
            />
          </div>
          <div>
            <Label htmlFor="username" className="text-xs sm:text-sm">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
                )
              }
              required
              disabled={updateLoading}
              placeholder="username"
              className="mt-1 h-8 sm:h-10 text-xs sm:text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Only lowercase letters, numbers, and underscores allowed
            </p>
          </div>
          <Button
            type="submit"
            disabled={
              updateLoading ||
              (name === profile.name && username === profile.username)
            }
            className="flex items-center gap-2 w-full sm:w-auto text-xs sm:text-sm h-8 sm:h-10 shadow"
          >
            <Save className="h-3 w-3 sm:h-4 sm:w-4" />
            {updateLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
