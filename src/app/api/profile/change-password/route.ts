import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import bcrypt from "bcryptjs";
import { z } from "zod";

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponseBuilder.unauthorized("Authentication required");
    }

    const body = await request.json();
    const validatedData = ChangePasswordSchema.parse(body);

    await connectDB();

    // Get user with password hash
    const user = await User.findById(session.user.id).select("+passwordHash");

    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    // Check if user has a password (required for change password)
    if (!user.passwordHash) {
      return ApiResponseBuilder.error(
        "No password set. Please create a password first.",
        400
      );
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.passwordHash
    );

    if (!isCurrentPasswordValid) {
      return ApiResponseBuilder.error("Current password is incorrect", 400);
    }

    // Check if new password is the same as current password
    const isSamePassword = await bcrypt.compare(
      validatedData.newPassword,
      user.passwordHash
    );

    if (isSamePassword) {
      return ApiResponseBuilder.error(
        "New password must be different from your current password",
        400
      );
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(validatedData.newPassword, 12);

    // Update password
    await User.findByIdAndUpdate(session.user.id, {
      passwordHash: newPasswordHash,
    });

    return ApiResponseBuilder.success(
      { message: "Password changed successfully" },
      "Password changed successfully"
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiResponseBuilder.error("Validation failed", 400);
    }

    console.error("Change password error:", error);
    return ApiResponseBuilder.serverError("Failed to change password");
  }
}
