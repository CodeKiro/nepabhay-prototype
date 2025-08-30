import { NextRequest } from "next/server";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import { hashToken } from "@/lib/email";
import { emailService } from "@/lib/email/service";
import { z } from "zod";
import bcrypt from "bcryptjs";

const ResetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const { token, password } = ResetPasswordSchema.parse(body);

    await connectDB();

    // Hash the token to compare with stored hash
    const hashedToken = hashToken(token);

    // Find user with valid reset token
    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) {
      return ApiResponseBuilder.error(
        "Invalid or expired reset token. Please request a new password reset.",
        400
      );
    }

    // Hash the new password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Update user's password and clear reset token
    user.passwordHash = passwordHash;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    // Send password reset success email (don't wait for it to complete)
    emailService.sendPasswordResetSuccessEmail(user.email).catch((error) => {
      console.error("Failed to send password reset success email:", error);
      // Don't fail the password reset if email sending fails
    });

    return ApiResponseBuilder.success(
      {},
      "Your password has been reset successfully. You can now sign in with your new password."
    );
  } catch (error) {
    console.error("Reset password error:", error);

    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return ApiResponseBuilder.error(firstError.message, 400);
    }

    return ApiResponseBuilder.serverError(
      "An error occurred while resetting your password. Please try again later."
    );
  }
}
