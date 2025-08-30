"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { User, UserCheck, Shield, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { User as UserType } from "@/types/auth";

export default function ProfileOverview({ profile }: { profile: UserType }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <User className="h-4 w-4 sm:h-5 sm:w-5" />
          Profile Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
          <div>
            <Label className="text-xs sm:text-sm font-medium">Name</Label>
            <p className="text-xs sm:text-sm text-muted-foreground">{profile.name}</p>
          </div>
          <div>
            <Label className="text-xs sm:text-sm font-medium">Username</Label>
            <p className="text-xs sm:text-sm text-muted-foreground">@{profile.username}</p>
          </div>
          <div>
            <Label className="text-xs sm:text-sm font-medium">Email</Label>
            <div className="flex items-center gap-2">
              <p className="text-xs sm:text-sm text-muted-foreground">{profile.email}</p>
              {profile.emailVerified && (
                <UserCheck className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              )}
            </div>
          </div>
          <div>
            <Label className="text-xs sm:text-sm font-medium">Role</Label>
            <div className="flex items-center gap-2">
              <p className="text-xs sm:text-sm text-muted-foreground capitalize">{profile.role}</p>
              {profile.role === "admin" && (
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
              )}
            </div>
          </div>
          <div>
            <Label className="text-xs sm:text-sm font-medium">Member Since</Label>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <p className="text-xs sm:text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <div>
            <Label className="text-xs sm:text-sm font-medium">Account Type</Label>
            <div className="flex items-center gap-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {profile.isOAuthUser ? "OAuth Account" : "Email Account"}
                {profile.hasPassword && " (with password)"}
              </p>
            </div>
          </div>
          {profile.isOAuthUser && profile.oauthProviders && profile.oauthProviders.length > 0 && (
            <div className="md:col-span-2">
              <Label className="text-xs sm:text-sm font-medium">Connected Accounts</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.oauthProviders.map((provider) => (
                  <div
                    key={provider.provider}
                    className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {provider.provider.charAt(0).toUpperCase() + provider.provider.slice(1)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
