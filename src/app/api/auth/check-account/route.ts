import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/database/connection";
import { appConfig } from "@/config/app";

export async function POST(request: NextRequest) {
  try {
    const { identifier } = await request.json();

    if (!identifier) {
      return NextResponse.json(
        { error: "Identifier is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const { User } = await import("@/lib/database/models/user");

    // Find the user by email or username
    const user = await User.findByEmailOrUsername(identifier);

    // User not found - return normal response (don't leak info)
    if (!user) {
      return NextResponse.json({ status: "OK" });
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return NextResponse.json(
        { status: "ERROR", errorCode: "ACCOUNT_BLOCKED" },
        { status: 403 }
      );
    }

    // Check if account has deletion requested
    if (user.deletionRequestedAt) {
      return NextResponse.json(
        { status: "ERROR", errorCode: "ACCOUNT_DELETION_REQUESTED" },
        { status: 403 }
      );
    }

    // Check if account is deactivated
    if (!user.isActive || user.deactivatedAt) {
      return NextResponse.json(
        {
          status: "ERROR",
          errorCode: "ACCOUNT_DEACTIVATED",
          // Allow login with deactivated account, but flag that it needs reactivation
          allowLogin: true,
        },
        { status: 403 }
      );
    }

    // Check if email is verified (only if email verification is enabled)
    if (appConfig.features.emailVerification && !user.emailVerified) {
      return NextResponse.json(
        { status: "ERROR", errorCode: "EMAIL_NOT_VERIFIED" },
        { status: 403 }
      );
    }

    // All checks passed
    return NextResponse.json({ status: "OK" });
  } catch (error) {
    console.error("Account check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
