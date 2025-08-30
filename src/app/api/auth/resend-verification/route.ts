import { NextRequest } from "next/server";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import { emailService, generateVerificationToken } from "@/lib/email";
import { getBaseUrlFromRequest } from "@/lib/utils/url";
import { z } from "zod";

const ResendVerificationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const { email } = ResendVerificationSchema.parse(body);

    await connectDB();

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return ApiResponseBuilder.error(
        "No account found with that email address",
        404
      );
    }

    if (user.emailVerified) {
      return ApiResponseBuilder.error("Email is already verified", 400);
    }

    // Generate new verification token
    const { token, hashedToken, expiresAt } = generateVerificationToken();

    // Save the hashed token to the user
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = expiresAt;
    await user.save();

    // Get base URL from current request
    const baseUrl = getBaseUrlFromRequest(request);

    // Send verification email
    const emailSent = await emailService.sendVerificationEmail(
      email,
      token,
      baseUrl
    );

    if (!emailSent) {
      console.error("Failed to send verification email for:", email);
      return ApiResponseBuilder.serverError(
        "Failed to send verification email. Please try again later."
      );
    }

    return ApiResponseBuilder.success(
      {},
      "Verification email sent successfully. Please check your inbox."
    );
  } catch (error) {
    console.error("Resend verification error:", error);

    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return ApiResponseBuilder.error(firstError.message, 400);
    }

    return ApiResponseBuilder.serverError(
      "An error occurred while sending verification email. Please try again later."
    );
  }
}
