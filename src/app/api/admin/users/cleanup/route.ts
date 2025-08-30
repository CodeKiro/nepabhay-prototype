import { NextRequest } from "next/server";
import { auth } from "@/lib/auth/config";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/database/models/user";
import { ApiResponseBuilder } from "@/lib/api/response";
import { UserCleanupService } from "@/lib/services/userCleanup";

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action"); // "expired" or "all"

    let filter = {};
    let actionDescription = "";

    switch (action) {
      case "expired":
        // Delete users who requested deletion more than 30 days ago
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        filter = {
          deletionRequestedAt: { $ne: null, $lt: thirtyDaysAgo },
        };
        actionDescription = "expired deletion requests";
        break;

      case "all":
        // Delete all users who requested deletion
        filter = {
          deletionRequestedAt: { $ne: null },
        };
        actionDescription = "all deletion requests";
        break;

      default:
        return ApiResponseBuilder.error(
          "Invalid action. Use 'expired' or 'all'"
        );
    }

    // Get count before deletion for response
    const count = await User.countDocuments(filter);

    if (count === 0) {
      return ApiResponseBuilder.success({
        message: `No users found for ${actionDescription} cleanup`,
        deletedCount: 0,
      });
    }

    // Get list of users to be deleted for logging
    const usersToDelete = await User.find(filter)
      .select("_id name email")
      .lean();

    // Perform cleanup for each user before deletion
    for (const user of usersToDelete) {
      try {
        await UserCleanupService.cleanupDeletedUser(user._id.toString());
      } catch (cleanupError) {
        console.error(`Cleanup failed for user ${user._id}:`, cleanupError);
        // Continue with other users even if one fails
      }
    }

    // Count remaining users (some might have been deleted during cleanup)
    const remainingCount = await User.countDocuments(filter);

    return ApiResponseBuilder.success({
      message: `Successfully cleaned up ${usersToDelete.length} users from ${actionDescription}`,
      deletedCount: usersToDelete.length,
      remainingCount,
      action,
      deletedUsers: usersToDelete.map((u) => ({
        id: u._id,
        name: u.name,
        email: u.email,
      })),
    });
  } catch (error) {
    console.error("Cleanup users error:", error);
    return ApiResponseBuilder.serverError("Failed to cleanup users");
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "expired"; // "expired" or "all"

    let filter = {};
    let description = "";

    switch (type) {
      case "expired":
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        filter = {
          deletionRequestedAt: { $ne: null, $lt: thirtyDaysAgo },
        };
        description = "expired deletion requests (>30 days)";
        break;

      case "all":
        filter = {
          deletionRequestedAt: { $ne: null },
        };
        description = "all deletion requests";
        break;

      default:
        return ApiResponseBuilder.error("Invalid type. Use 'expired' or 'all'");
    }

    const count = await User.countDocuments(filter);
    const users = await User.find(filter)
      .select("name email deletionRequestedAt createdAt")
      .sort({ deletionRequestedAt: 1 })
      .limit(100); // Limit for performance

    return ApiResponseBuilder.success({
      count,
      description,
      users: users.map((user) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        deletionRequestedAt: user.deletionRequestedAt,
        createdAt: user.createdAt,
        daysSinceRequest: user.deletionRequestedAt
          ? Math.floor(
              (Date.now() - new Date(user.deletionRequestedAt).getTime()) /
                (1000 * 60 * 60 * 24)
            )
          : 0,
      })),
    });
  } catch (error) {
    console.error("Get cleanup users error:", error);
    return ApiResponseBuilder.serverError("Failed to get cleanup users");
  }
}
