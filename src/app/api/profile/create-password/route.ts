import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import bcrypt from "bcryptjs";
import { z } from "zod";

const CreatePasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
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
    const validatedData = CreatePasswordSchema.parse(body);

    await connectDB();

    // Get user with password hash to check current state
    const user = await User.findById(session.user.id).select("+passwordHash");

    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    // Check if user already has a password
    if (user.passwordHash) {
      return ApiResponseBuilder.error(
        "Password already exists. Use change password instead.",
        400
      );
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(validatedData.newPassword, 12);

    // Update user with new password
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { passwordHash },
      { new: true }
    ).select("-resetToken -resetTokenExpiry -emailVerificationToken");

    if (!updatedUser) {
      return ApiResponseBuilder.notFound("User not found after update");
    }

    // Add OAuth and password status to response
    const userWithAuthStatus = {
      ...updatedUser.toObject(),
      hasPassword: !!updatedUser.passwordHash,
      isOAuthUser:
        updatedUser.oauthProviders && updatedUser.oauthProviders.length > 0,
      oauthProviders:
        updatedUser.oauthProviders?.map(
          (provider: { provider: string; connectedAt: Date }) => ({
            provider: provider.provider,
            connectedAt: provider.connectedAt,
          })
        ) || [],
    };

    // Remove passwordHash from response
    delete userWithAuthStatus.passwordHash;

    return ApiResponseBuilder.success(
      userWithAuthStatus,
      "Password created successfully"
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiResponseBuilder.error("Validation failed", 400);
    }

    console.error("Create password error:", error);
    return ApiResponseBuilder.serverError("Failed to create password");
  }
}
