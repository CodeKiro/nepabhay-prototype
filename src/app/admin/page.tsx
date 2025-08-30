"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import {
  FileText,
  Users,
  MessageCircle,
  Heart,
  UserCheck,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getCleanupStats, runCleanup } from "./actions";

interface AdminStats {
  totalPosts: number;
  totalUsers: number;
  totalComments: number;
  totalReactions: number;
  recentPosts: Array<{
    id: string;
    title: string;
    category: string;
    writtenBy: string;
    createdAt: string;
  }>;
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    emailVerified: boolean;
  }>;
  userRoles: Array<{ _id: string; count: number }>;
  postsByCategory: Array<{ _id: string; count: number }>;
}

interface CleanupStats {
  pendingDeletion: number;
  readyForDeletion: number;
}

function StatsCard({
  title,
  value,
  icon: Icon,
  description,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cleanup states
  const [cleanupStats, setCleanupStats] = useState<CleanupStats | null>(null);
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [cleanupMessage, setCleanupMessage] = useState("");
  const [cleanupError, setCleanupError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data.data);

        // Fetch cleanup stats
        await fetchCleanupStats();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const fetchCleanupStats = async () => {
    try {
      const stats = await getCleanupStats();
      setCleanupStats(stats);
    } catch (err) {
      console.log("Failed to fetch cleanup stats:", err);
    }
  };

  const handleCleanup = async () => {
    if (
      !confirm(
        "Are you sure you want to permanently delete all accounts marked for deletion over 30 days ago? This action cannot be undone."
      )
    ) {
      return;
    }

    setCleanupLoading(true);
    setCleanupError("");
    setCleanupMessage("");

    try {
      const result = await runCleanup();
      setCleanupMessage(`Successfully deleted ${result.deletedCount} accounts`);

      // Refresh cleanup stats
      await fetchCleanupStats();
    } catch (err) {
      setCleanupError(
        err instanceof Error ? err.message : "Failed to run cleanup"
      );
    } finally {
      setCleanupLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">
          Error: {error || "Failed to load data"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the admin panel. Here&apos;s an overview of your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Posts"
          value={stats.totalPosts}
          icon={FileText}
          description="Published posts on the platform"
        />
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          description="Registered users"
        />
        <StatsCard
          title="Total Comments"
          value={stats.totalComments}
          icon={MessageCircle}
          description="Comments across all posts"
        />
        <StatsCard
          title="Total Reactions"
          value={stats.totalReactions}
          icon={Heart}
          description="Likes, loves, and insights"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentPosts.length > 0 ? (
                stats.recentPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <p className="font-medium">{post.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">{post.category}</span>
                        <span>•</span>
                        <span>by {post.writtenBy}</span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No posts found</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Users */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentUsers.length > 0 ? (
                stats.recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{user.email}</span>
                        <span>•</span>
                        <span className="capitalize">{user.role}</span>
                        {user.emailVerified && (
                          <UserCheck className="h-3 w-3 text-green-600" />
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(user.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground">No users found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* User Roles Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.userRoles.map((role) => (
                <div key={role._id} className="flex justify-between">
                  <span className="capitalize">{role._id}</span>
                  <span>{role.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Posts by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Posts by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats.postsByCategory.map((category) => (
                <div key={category._id} className="flex justify-between">
                  <span className="capitalize">{category._id}</span>
                  <span>{category.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Cleanup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Account Cleanup Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cleanupStats && (
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {cleanupStats.pendingDeletion}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Accounts in 30-day grace period
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {cleanupStats.readyForDeletion}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Accounts ready for permanent deletion
                  </p>
                </div>
              </div>
            )}

            {/* Scheduler Status */}
            <div className="p-4 border rounded-lg bg-blue-50">
              <div className="flex items-center gap-2 text-blue-700">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Auto-Cleanup Scheduler</span>
              </div>
              <p className="text-sm text-blue-600 mt-1">
                Automatic cleanup runs daily at 2:00 AM
              </p>
              <p className="text-xs text-blue-500 mt-1">
                Status:{" "}
                {process.env.NODE_ENV === "production" ||
                process.env.NEXT_PUBLIC_ENABLE_SCHEDULER === "true"
                  ? "Active"
                  : "Disabled in Development"}
              </p>
            </div>

            {cleanupMessage && (
              <Alert>
                <UserCheck className="h-4 w-4" />
                <div>{cleanupMessage}</div>
              </Alert>
            )}

            {cleanupError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <div>{cleanupError}</div>
              </Alert>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={fetchCleanupStats}
                disabled={cleanupLoading}
              >
                Refresh Stats
              </Button>
              <Button
                variant="destructive"
                onClick={handleCleanup}
                disabled={
                  cleanupLoading || cleanupStats?.readyForDeletion === 0
                }
              >
                {cleanupLoading ? (
                  "Processing..."
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Expired Accounts (
                    {cleanupStats?.readyForDeletion || 0})
                  </>
                )}
              </Button>
            </div>

            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <div>
                <p className="font-medium">Warning</p>
                <p className="text-sm">
                  This action permanently deletes user accounts that have been
                  marked for deletion over 30 days ago. This cannot be undone.
                </p>
              </div>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
