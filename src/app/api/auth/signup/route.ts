import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { SignUpSchema } from "@/lib/schemas";
import { ApiResponseBuilder } from "@/lib/api";
import { emailService, generateVerificationToken } from "@/lib/email";
import { getBaseUrlFromRequest } from "@/lib/utils/url";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = SignUpSchema.parse(body);

    // Connect to database
    await connectDB();

    // Check if user already exists (email or username)
    const existingUserByEmail = await User.findOne({
      email: validatedData.email,
    });
    if (existingUserByEmail) {
      return ApiResponseBuilder.error(
        "User with this email already exists",
        400
      );
    }

    const existingUserByUsername = await User.findOne({
      username: validatedData.username,
    });
    if (existingUserByUsername) {
      return ApiResponseBuilder.error("Username is already taken", 400);
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(validatedData.password, saltRounds);

    // Generate email verification token
    const { token, hashedToken, expiresAt } = generateVerificationToken();

    // Create user
    const user = new User({
      name: validatedData.name,
      username: validatedData.username,
      email: validatedData.email,
      passwordHash,
      role: "reader",
      emailVerified: false,
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: expiresAt,
      isActive: true,
    });

    await user.save();

    // Get base URL from current request
    const baseUrl = getBaseUrlFromRequest(request);

    // Send verification email
    const emailSent = await emailService.sendVerificationEmail(
      validatedData.email,
      token,
      baseUrl
    );

    if (!emailSent) {
      console.error(
        "Failed to send verification email for:",
        validatedData.email
      );
      // Don't fail user creation if email fails, just log it
    }

    return ApiResponseBuilder.success(
      {
        userId: user._id,
        emailSent: emailSent,
        message: emailSent
          ? "Account created successfully. Please check your email to verify your account."
          : "Account created successfully. Please contact support if you don't receive a verification email.",
      },
      "User created successfully"
    );
  } catch (error) {
    console.error("Signup error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return ApiResponseBuilder.error("Invalid input data", 400);
    }

    return ApiResponseBuilder.serverError("Failed to create user");
  }
}
