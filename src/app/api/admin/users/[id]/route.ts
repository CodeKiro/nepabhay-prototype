import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    await connectDB();

    const { id } = await params;
    const user = await User.findById(id)
      .select("-password -resetToken -resetTokenExpiry")
      .lean();

    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    return ApiResponseBuilder.success(user);
  } catch (error) {
    console.error("Get user error:", error);
    return ApiResponseBuilder.serverError("Failed to fetch user");
  }
}

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

    await connectDB();

    // Prevent admins from changing other users' passwords or sensitive data
    const allowedFields = ["name", "email", "role"];
    const updateData: Record<string, string> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password -resetToken -resetTokenExpiry");

    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    return ApiResponseBuilder.success(user, "User updated successfully");
  } catch (error) {
    console.error("Update user error:", error);
    return ApiResponseBuilder.serverError("Failed to update user");
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    const { id } = await params;

    // Prevent admin from deleting themselves
    if (session.user.id === id) {
      return ApiResponseBuilder.error("Cannot delete your own account", 400);
    }

    await connectDB();

    const user = await User.findById(id);
    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    // If deleting an admin, check if there are other admins
    if (user.role === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });
      if (adminCount <= 1) {
        return ApiResponseBuilder.error(
          "Cannot delete the last admin user",
          400
        );
      }
    }

    await User.findByIdAndDelete(id);

    return ApiResponseBuilder.success(
      { deletedId: id },
      "User deleted successfully"
    );
  } catch (error) {
    console.error("Delete user error:", error);
    return ApiResponseBuilder.serverError("Failed to delete user");
  }
}
