import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import { emailService } from "@/lib/email/service";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponseBuilder.unauthorized("Authentication required");
    }

    const body = await request.json();
    const { action, reason } = body;

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return ApiResponseBuilder.error("User not found", 404);
    }

    if (action === "deactivate") {
      // Deactivate account (can be reactivated anytime)
      user.isActive = false;
      user.deactivatedAt = new Date();
      await user.save();

      // Send deactivation success email (don't wait for it to complete)
      emailService
        .sendAccountDeactivationSuccessEmail(user.email, user.name)
        .catch((error) => {
          console.error("Failed to send deactivation success email:", error);
          // Don't fail the deactivation if email sending fails
        });

      return ApiResponseBuilder.success(
        { status: "deactivated" },
        "Account deactivated successfully. You can reactivate it anytime by logging in."
      );
    } else if (action === "delete") {
      // Soft delete (30-day grace period)
      const deletionDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
      user.deletionRequestedAt = new Date();
      user.deletionReason = reason || "User requested deletion";
      user.isActive = false; // Also deactivate immediately
      await user.save();

      // Send deletion scheduled email (don't wait for it to complete)
      emailService
        .sendAccountDeletionScheduledEmail(user.email, user.name, deletionDate)
        .catch((error) => {
          console.error("Failed to send deletion scheduled email:", error);
          // Don't fail the deletion request if email sending fails
        });

      return ApiResponseBuilder.success(
        {
          status: "deletion_requested",
          deletionDate,
        },
        "Account deletion requested. You have 30 days to change your mind by logging in."
      );
    } else {
      return ApiResponseBuilder.error(
        "Invalid action. Use 'deactivate' or 'delete'",
        400
      );
    }
  } catch (error) {
    console.error("Account deletion/deactivation error:", error);
    return ApiResponseBuilder.serverError("Failed to process account action");
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponseBuilder.unauthorized("Authentication required");
    }

    const body = await request.json();
    const { action } = body;

    await connectDB();

    const user = await User.findById(session.user.id);
    if (!user) {
      return ApiResponseBuilder.error("User not found", 404);
    }

    if (action === "reactivate") {
      // Reactivate account
      user.isActive = true;
      user.deletionRequestedAt = null;
      user.deletionReason = undefined;
      await user.save();

      return ApiResponseBuilder.success(
        { status: "active" },
        "Account reactivated successfully!"
      );
    } else {
      return ApiResponseBuilder.error("Invalid action. Use 'reactivate'", 400);
    }
  } catch (error) {
    console.error("Account reactivation error:", error);
    return ApiResponseBuilder.serverError("Failed to reactivate account");
  }
}
