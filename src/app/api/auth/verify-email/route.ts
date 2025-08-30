import { NextRequest } from "next/server";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import { hashToken } from "@/lib/email";
import { emailService } from "@/lib/email/service";
import { z } from "zod";

const VerifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const { token } = VerifyEmailSchema.parse(body);

    await connectDB();

    // Hash the token to compare with stored hash
    const hashedToken = hashToken(token);

    // Find user with valid verification token
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: { $gt: new Date() },
    });

    if (!user) {
      return ApiResponseBuilder.error(
        "Invalid or expired verification token. Please request a new verification email.",
        400
      );
    }

    // Mark email as verified and clear verification token
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save();

    // Send welcome email (don't wait for it to complete)
    emailService
      .sendWelcomeEmail(user.email, user.name)
      .catch((error) => {
        console.error("Failed to send welcome email:", error);
        // Don't fail the verification if email sending fails
      });

    return ApiResponseBuilder.success(
      {},
      "Your email has been verified successfully. You can now access all features."
    );
  } catch (error) {
    console.error("Email verification error:", error);

    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return ApiResponseBuilder.error(firstError.message, 400);
    }

    return ApiResponseBuilder.serverError(
      "An error occurred while verifying your email. Please try again later."
    );
  }
}
