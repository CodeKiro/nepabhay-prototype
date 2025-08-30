"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  User,
  UserCheck,
  UserX,
  Shield,
  ShieldOff,
  Trash2,
  RefreshCw,
  MoreVertical,
  AlertTriangle,
  Clock,
  Plus,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "reader" | "writer";
  avatar?: string;
  isActive: boolean;
  emailVerified: boolean; // Changed from isEmailVerified to emailVerified
  isBlocked: boolean;
  blockedAt?: string;
  blockedBy?: {
    _id: string;
    name: string;
    email: string;
  };
  blockReason?: string;
  deactivatedAt?: string;
  deletionRequestedAt?: string;
  createdAt: string;
  lastLogin?: string;
}

type StatusFilter =
  | "all"
  | "active"
  | "blocked"
  | "deactivated"
  | "deletion_requested"
  | "cleanup_expired";

const statusConfig = {
  all: { label: "All Users", icon: User, color: "text-gray-600" },
  active: { label: "Active", icon: UserCheck, color: "text-green-600" },
  blocked: { label: "Blocked", icon: Shield, color: "text-red-600" },
  deactivated: { label: "Deactivated", icon: UserX, color: "text-orange-600" },
  deletion_requested: {
    label: "Deletion Requested",
    icon: Trash2,
    color: "text-purple-600",
  },
  cleanup_expired: {
    label: "Cleanup Required",
    icon: AlertTriangle,
    color: "text-yellow-600",
  },
};

export default function UserManagement() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        search,
        status: statusFilter,
      });

      const response = await fetch(`/api/admin/users?${params}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUsers(data.data || []);
          setPagination(
            data.pagination || {
              page: 1,
              limit: 10,
              total: 0,
              pages: 0,
            }
          );
        } else {
          console.error("API returned error:", data.error);
          setUsers([]);
        }
      } else {
        console.error(
          "Failed to fetch users:",
          response.status,
          response.statusText
        );
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleBlockUser = async (userId: string, reason: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/block`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to block user:", error);
    }
  };

  const handleUnblockUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/block`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to unblock user:", error);
    }
  };

  const getStatusBadge = (user: UserData) => {
    if (user.isBlocked) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <Shield className="w-3 h-3 mr-1" />
          Blocked
        </span>
      );
    }
    if (user.deletionRequestedAt) {
      const isExpired =
        new Date(user.deletionRequestedAt) <
        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      return (
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            isExpired
              ? "bg-yellow-100 text-yellow-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          <Trash2 className="w-3 h-3 mr-1" />
          {isExpired ? "Cleanup Required" : "Delete Requested"}
        </span>
      );
    }
    if (user.deactivatedAt) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          <UserX className="w-3 h-3 mr-1" />
          Deactivated
        </span>
      );
    }
    if (user.isActive) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <UserCheck className="w-3 h-3 mr-1" />
          Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        <Clock className="w-3 h-3 mr-1" />
        Inactive
      </span>
    );
  };

  const getStatusCounts = () => {
    // Safety check: return empty counts if users array is not yet loaded
    if (!users || !Array.isArray(users)) {
      return {
        active: 0,
        blocked: 0,
        deactivated: 0,
        deletion_requested: 0,
        cleanup_expired: 0,
      };
    }

    return users.reduce(
      (acc, user) => {
        if (user.isBlocked) acc.blocked++;
        else if (user.deletionRequestedAt) {
          const isExpired =
            new Date(user.deletionRequestedAt) <
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          if (isExpired) acc.cleanup_expired++;
          else acc.deletion_requested++;
        } else if (user.deactivatedAt) acc.deactivated++;
        else if (user.isActive) acc.active++;

        return acc;
      },
      {
        active: 0,
        blocked: 0,
        deactivated: 0,
        deletion_requested: 0,
        cleanup_expired: 0,
      }
    );
  };

  const handleCleanupUsers = async (action: "expired" | "all") => {
    const confirmMessage =
      action === "expired"
        ? "Are you sure you want to permanently delete all users who requested deletion more than 30 days ago? This action cannot be undone."
        : "Are you sure you want to permanently delete ALL users who requested deletion? This action cannot be undone.";

    if (!confirm(confirmMessage)) return;

    try {
      const response = await fetch(
        `/api/admin/users/cleanup?action=${action}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(`${data.message}`);
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to cleanup users:", error);
    }
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">
            Manage user accounts, permissions, and cleanup
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/users/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create User
          </Link>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {Object.entries(statusConfig).map(([key, config]) => {
            const count =
              key === "all"
                ? pagination.total
                : statusCounts[key as keyof typeof statusCounts] || 0;
            const isActive = statusFilter === key;
            const Icon = config.icon;

            return (
              <button
                key={key}
                onClick={() => setStatusFilter(key as StatusFilter)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  isActive
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? "text-blue-600" : config.color
                  }`}
                />
                <span>{config.label}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    isActive
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Cleanup Section for Admin */}
      {(statusFilter === "cleanup_expired" ||
        statusFilter === "deletion_requested") && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-yellow-800">
                Account Cleanup
              </h3>
              <p className="text-yellow-700 text-sm">
                {statusFilter === "cleanup_expired"
                  ? "Users who requested deletion more than 30 days ago can be permanently removed."
                  : "Manage users who have requested account deletion."}
              </p>
            </div>
            <div className="flex gap-2">
              {statusFilter === "cleanup_expired" && (
                <button
                  onClick={() => handleCleanupUsers("expired")}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Expired ({statusCounts.cleanup_expired})
                </button>
              )}
              {statusFilter === "deletion_requested" && (
                <button
                  onClick={() => handleCleanupUsers("all")}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete All ({statusCounts.deletion_requested})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">Loading users...</p>
                  </td>
                </tr>
              ) : !users || users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <User className="w-12 h-12 mx-auto text-gray-400" />
                    <p className="mt-2 text-gray-500">No users found</p>
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user.avatar ? (
                            <Image
                              className="h-10 w-10 rounded-full"
                              src={user.avatar}
                              alt={user.name}
                              width={40}
                              height={40}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          {!user.emailVerified && (
                            <div className="text-xs text-orange-600 flex items-center mt-1">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Email not verified
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "writer"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(user)}
                      {user.isBlocked && user.blockReason && (
                        <div className="text-xs text-gray-500 mt-1">
                          Reason: {user.blockReason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        {user.lastLogin
                          ? formatDistanceToNow(new Date(user.lastLogin), {
                              addSuffix: true,
                            })
                          : "Never"}
                      </div>
                      <div className="text-xs text-gray-400">
                        Joined {format(new Date(user.createdAt), "MMM d, yyyy")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {user.isBlocked ? (
                          <button
                            onClick={() => handleUnblockUser(user._id)}
                            className="text-green-600 hover:text-green-900 flex items-center"
                          >
                            <ShieldOff className="w-4 h-4 mr-1" />
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              const reason = prompt("Enter block reason:");
                              if (reason) handleBlockUser(user._id, reason);
                            }}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <Shield className="w-4 h-4 mr-1" />
                            Block
                          </button>
                        )}
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() =>
                  setPagination((p) => ({
                    ...p,
                    page: Math.max(1, p.page - 1),
                  }))
                }
                disabled={pagination.page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setPagination((p) => ({
                    ...p,
                    page: Math.min(p.pages, p.page + 1),
                  }))
                }
                disabled={pagination.page === pagination.pages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {(pagination.page - 1) * pagination.limit + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}
                  </span>{" "}
                  of <span className="font-medium">{pagination.total}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() =>
                      setPagination((p) => ({
                        ...p,
                        page: Math.max(1, p.page - 1),
                      }))
                    }
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  {Array.from(
                    { length: Math.min(5, pagination.pages) },
                    (_, i) => {
                      const page = i + Math.max(1, pagination.page - 2);
                      if (page > pagination.pages) return null;
                      return (
                        <button
                          key={page}
                          onClick={() => setPagination((p) => ({ ...p, page }))}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === pagination.page
                              ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                  )}
                  <button
                    onClick={() =>
                      setPagination((p) => ({
                        ...p,
                        page: Math.min(p.pages, p.page + 1),
                      }))
                    }
                    disabled={pagination.page === pagination.pages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
