import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import { z } from "zod";

const OnboardingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores"
    ),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponseBuilder.unauthorized("Authentication required");
    }

    const body = await request.json();
    const validatedData = OnboardingSchema.parse(body);

    await connectDB();

    const user = await User.findById(session.user.id);

    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    // Check if user is OAuth user
    if (!user.oauthProviders || user.oauthProviders.length === 0) {
      return ApiResponseBuilder.error(
        "Onboarding is only available for OAuth users",
        400
      );
    }

    // Check if username is already taken by another user
    const existingUser = await User.findOne({
      username: validatedData.username,
      _id: { $ne: session.user.id },
    });

    if (existingUser) {
      return ApiResponseBuilder.error("Username is already taken", 400);
    }

    // Update user profile and mark onboarding as completed
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        name: validatedData.name,
        username: validatedData.username,
        onboardingCompleted: true,
      },
      { new: true }
    ).select(
      "-passwordHash -resetToken -resetTokenExpiry -emailVerificationToken"
    );

    if (!updatedUser) {
      return ApiResponseBuilder.notFound("User not found");
    }

    return ApiResponseBuilder.success(
      updatedUser,
      "Profile setup completed successfully"
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiResponseBuilder.error("Validation failed", 400);
    }

    console.error("Onboarding error:", error);
    return ApiResponseBuilder.serverError("Failed to complete onboarding");
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponseBuilder.unauthorized("Authentication required");
    }

    await connectDB();

    const user = await User.findById(session.user.id).lean();

    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    // Determine if user needs onboarding
    // OAuth users need onboarding if they haven't completed it yet
    const needsOnboarding = !!(
      user.oauthProviders &&
      user.oauthProviders.length > 0 &&
      !user.onboardingCompleted
    );

    return ApiResponseBuilder.success({
      needsOnboarding,
      suggestedName: user.name || "User",
      suggestedUsername: user.username || "",
    });
  } catch (error) {
    console.error("Check onboarding error:", error);
    return ApiResponseBuilder.serverError("Failed to check onboarding status");
  }
}
