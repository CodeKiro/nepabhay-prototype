import { NextRequest } from "next/server";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import { emailService, generatePasswordResetToken } from "@/lib/email";
import { getBaseUrlFromRequest } from "@/lib/utils/url";
import { z } from "zod";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const { email } = ForgotPasswordSchema.parse(body);

    await connectDB();

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success to prevent email enumeration attacks
    if (!user) {
      return ApiResponseBuilder.success(
        {},
        "If an account with that email exists, we've sent password reset instructions."
      );
    }

    // Generate password reset token
    const { token, hashedToken, expiresAt } = generatePasswordResetToken();

    // Save the hashed token to the user
    user.resetToken = hashedToken;
    user.resetTokenExpiry = expiresAt;
    await user.save();

    // Get base URL from current request
    const baseUrl = getBaseUrlFromRequest(request);

    // Send password reset email
    const emailSent = await emailService.sendPasswordResetEmail(
      email,
      token,
      baseUrl
    );

    if (!emailSent) {
      console.error("Failed to send password reset email for:", email);
      return ApiResponseBuilder.serverError(
        "Failed to send password reset email. Please try again later."
      );
    }

    return ApiResponseBuilder.success(
      {},
      "If an account with that email exists, we've sent password reset instructions."
    );
  } catch (error) {
    console.error("Forgot password error:", error);

    if (error instanceof z.ZodError) {
      return ApiResponseBuilder.error(
        "Please enter a valid email address",
        400
      );
    }

    return ApiResponseBuilder.serverError(
      "An error occurred while processing your request. Please try again later."
    );
  }
}
