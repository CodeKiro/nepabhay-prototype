import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    const { id } = await params;
    const { isActive } = await request.json();

    // Prevent admin from deactivating themselves
    if (session.user.id === id && !isActive) {
      return ApiResponseBuilder.error(
        "Cannot deactivate your own account",
        400
      );
    }

    await connectDB();

    // If deactivating an admin, check if there are other admins
    const user = await User.findById(id);
    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    if (user.role === "admin" && !isActive) {
      const adminCount = await User.countDocuments({
        role: "admin",
        isActive: true,
      });
      if (adminCount <= 1) {
        return ApiResponseBuilder.error(
          "Cannot deactivate the last active admin",
          400
        );
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    ).select("-passwordHash -resetToken -resetTokenExpiry");

    if (!updatedUser) {
      return ApiResponseBuilder.notFound("User not found");
    }

    return ApiResponseBuilder.success(
      updatedUser,
      `User ${isActive ? "activated" : "deactivated"} successfully`
    );
  } catch (error) {
    console.error("Toggle user activation error:", error);
    return ApiResponseBuilder.serverError(
      "Failed to update user activation status"
    );
  }
}
