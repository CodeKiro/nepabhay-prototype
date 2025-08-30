import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      console.log("Missing user session:", session?.user);
      return ApiResponseBuilder.unauthorized(
        "Authentication required - please sign in first"
      );
    }

    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return ApiResponseBuilder.error("User not found", 404);
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return ApiResponseBuilder.error(
        "Your account is blocked. Please contact administrator for assistance.",
        403
      );
    }

    // Check if user has requested deletion
    if (user.deletionRequestedAt) {
      return ApiResponseBuilder.error(
        "Your account is scheduled for deletion. Please contact administrator to restore your account.",
        403
      );
    }

    // Reactivate the account
    if (!user.isActive || user.deactivatedAt) {
      user.isActive = true;
      user.deactivatedAt = null;
      await user.save();

      return ApiResponseBuilder.success({
        message: "Account reactivated successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isActive: user.isActive,
        },
      });
    }

    return ApiResponseBuilder.success({
      message: "Account is already active",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Reactivation error:", error);
    return ApiResponseBuilder.serverError("Failed to reactivate account");
  }
}
