import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    const body = await request.json();
    const { id } = await params;
    const { action } = body; // "approve" or "reject"

    if (!["approve", "reject"].includes(action)) {
      return ApiResponseBuilder.error("Invalid action", 400);
    }

    await connectDB();

    if (action === "approve") {
      // Delete the user
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return ApiResponseBuilder.notFound("User not found");
      }
      return ApiResponseBuilder.success(
        { deletedId: id },
        "User deleted successfully"
      );
    } else {
      // Reject deletion request
      const updateData = {
        deletionRequested: false,
        deletionReason: null,
        deletionRequestedAt: null,
      };

      const user = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      }).select("-password -resetToken -resetTokenExpiry");

      if (!user) {
        return ApiResponseBuilder.notFound("User not found");
      }

      return ApiResponseBuilder.success(user, "Deletion request rejected");
    }
  } catch (error) {
    console.error("Handle deletion request error:", error);
    return ApiResponseBuilder.serverError("Failed to handle deletion request");
  }
}
