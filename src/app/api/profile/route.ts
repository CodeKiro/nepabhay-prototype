import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import { z } from "zod";

const UpdateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscores"
    )
    .optional(),
});

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponseBuilder.unauthorized("Authentication required");
    }

    await connectDB();

    const user = await User.findById(session.user.id)
      .select(
        "+passwordHash -resetToken -resetTokenExpiry -emailVerificationToken"
      )
      .lean();

    if (!user) {
      return ApiResponseBuilder.notFound("User not found");
    }

    // Add OAuth and password status to response
    const userWithAuthStatus = {
      ...user,
      hasPassword: !!user.passwordHash,
      isOAuthUser: user.oauthProviders && user.oauthProviders.length > 0,
      oauthProviders:
        user.oauthProviders?.map((provider) => ({
          provider: provider.provider,
          connectedAt: provider.connectedAt,
        })) || [],
    };

    // Remove passwordHash from response
    delete userWithAuthStatus.passwordHash;

    return ApiResponseBuilder.success(userWithAuthStatus);
  } catch (error) {
    console.error("Get profile error:", error);
    return ApiResponseBuilder.serverError("Failed to fetch profile");
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponseBuilder.unauthorized("Authentication required");
    }

    const body = await request.json();
    const validatedData = UpdateProfileSchema.parse(body);

    await connectDB();

    // Check if username is being updated and if it's already taken
    if (validatedData.username) {
      const existingUser = await User.findOne({
        username: validatedData.username,
        _id: { $ne: session.user.id },
      });

      if (existingUser) {
        return ApiResponseBuilder.error("Username is already taken", 400);
      }
    }

    const updateData: { name: string; username?: string } = {
      name: validatedData.name,
    };
    if (validatedData.username) {
      updateData.username = validatedData.username;
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      updateData,
      { new: true }
    ).select(
      "+passwordHash -resetToken -resetTokenExpiry -emailVerificationToken"
    );

    if (!updatedUser) {
      return ApiResponseBuilder.notFound("User not found");
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
      "Profile updated successfully"
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiResponseBuilder.error("Validation failed", 400);
    }

    console.error("Update profile error:", error);
    return ApiResponseBuilder.serverError("Failed to update profile");
  }
}
