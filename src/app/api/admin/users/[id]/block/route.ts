import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import { UserCleanupService } from "@/lib/services/userCleanup";
import mongoose from "mongoose";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    const { reason } = await request.json();
    const params = await context.params;

    if (!reason?.trim()) {
      return ApiResponseBuilder.error("Block reason is required", 400);
    }

    await connectDB();

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return ApiResponseBuilder.error("Invalid user ID", 400);
    }

    // Find the user
    const user = await User.findById(params.id);
    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    // Prevent blocking admins
    if (user.role === "admin") {
      return ApiResponseBuilder.error("Cannot block admin users", 400);
    }

    // Prevent self-blocking
    if (user._id.toString() === session.user.id) {
      return ApiResponseBuilder.error("Cannot block yourself", 400);
    }

    // Update user block status
    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      {
        isBlocked: true,
        blockedAt: new Date(),
        blockedBy: session.user.id,
        blockReason: reason,
      },
      { new: true }
    ).populate("blockedBy", "name email");

    if (!updatedUser) {
      return ApiResponseBuilder.error("User not found", 404);
    }

    // Clean up user data (comments, reactions, etc.)
    try {
      await UserCleanupService.cleanupBlockedUser(params.id);
    } catch (cleanupError) {
      console.error("Cleanup error after blocking user:", cleanupError);
      // Continue even if cleanup fails - the user is still blocked
    }

    return ApiResponseBuilder.success(
      {
        user: updatedUser,
        message: "User blocked successfully and data cleaned up",
      },
      "User blocked successfully"
    );
  } catch (error) {
    console.error("Error blocking user:", error);
    return ApiResponseBuilder.serverError("Failed to block user");
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    await connectDB();
    const params = await context.params;

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return ApiResponseBuilder.error("Invalid user ID", 400);
    }

    // Find the user
    const user = await User.findById(params.id);
    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    // Unblock the user
    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      {
        isBlocked: false,
        blockedAt: null,
        blockedBy: null,
        blockReason: null,
        isActive: true, // Reactivate when unblocked
      },
      { new: true }
    );

    if (!updatedUser) {
      return ApiResponseBuilder.error("User not found", 404);
    }

    // Restore user data
    try {
      await UserCleanupService.restoreUnblockedUser(params.id);
    } catch (restoreError) {
      console.error("Restore error after unblocking user:", restoreError);
      // Continue even if restore fails - the user is still unblocked
    }

    return ApiResponseBuilder.success(
      {
        user: updatedUser,
        message: "User unblocked successfully and data restored",
      },
      "User unblocked successfully"
    );
  } catch (error) {
    console.error("Error unblocking user:", error);
    return ApiResponseBuilder.serverError("Failed to unblock user");
  }
}
