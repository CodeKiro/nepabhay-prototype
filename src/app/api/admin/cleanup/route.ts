import { NextRequest } from "next/server";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    // Simple API key protection for cleanup job
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.CLEANUP_API_KEY) {
      return ApiResponseBuilder.unauthorized("Invalid API key");
    }

    await connectDB();

    // Find users marked for deletion more than 30 days ago
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const usersToDelete = await User.find({
      deletionRequestedAt: { $lte: thirtyDaysAgo },
    });

    let deletedCount = 0;
    for (const user of usersToDelete) {
      // TODO: Add additional cleanup here:
      // - Delete user's posts
      // - Delete user's comments
      // - Delete user's uploaded files
      // - Remove from any related collections

      await User.findByIdAndDelete(user._id);
      deletedCount++;
    }

    return ApiResponseBuilder.success(
      {
        deletedCount,
        deletedUsers: usersToDelete.map((u) => ({ id: u._id, email: u.email })),
      },
      `Permanently deleted ${deletedCount} users`
    );
  } catch (error) {
    console.error("Cleanup job error:", error);
    return ApiResponseBuilder.serverError("Cleanup job failed");
  }
}

// Optional: GET endpoint to check how many users are pending deletion
export async function GET(request: NextRequest) {
  try {
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== process.env.CLEANUP_API_KEY) {
      return ApiResponseBuilder.unauthorized("Invalid API key");
    }

    await connectDB();

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const pendingDeletion = await User.countDocuments({
      deletionRequestedAt: { $ne: null, $gte: thirtyDaysAgo },
    });

    const readyForDeletion = await User.countDocuments({
      deletionRequestedAt: { $lte: thirtyDaysAgo },
    });

    return ApiResponseBuilder.success({
      pendingDeletion,
      readyForDeletion,
      nextCleanupDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Next day
    });
  } catch (error) {
    console.error("Cleanup status error:", error);
    return ApiResponseBuilder.serverError("Failed to get cleanup status");
  }
}
