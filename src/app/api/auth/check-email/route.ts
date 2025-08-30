import { NextRequest } from "next/server";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import { z } from "zod";

const CheckEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const { email } = CheckEmailSchema.parse(body);

    await connectDB();

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return ApiResponseBuilder.error("User not found", 404);
    }

    return ApiResponseBuilder.success({
      exists: true,
      emailVerified: user.emailVerified,
      hasPassword: !!user.passwordHash,
    });
  } catch (error) {
    console.error("Check email error:", error);

    if (error instanceof z.ZodError) {
      const firstError = error.issues[0];
      return ApiResponseBuilder.error(firstError.message, 400);
    }

    return ApiResponseBuilder.serverError(
      "An error occurred while checking email status."
    );
  }
}
