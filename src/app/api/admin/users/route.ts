import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";
import bcrypt from "bcryptjs";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "all"; // all, active, blocked, deactivated, deletion_requested
    const skip = (page - 1) * limit;

    // Build filter
    interface UserFilter {
      $or?: Array<{
        name?: { $regex: string; $options: string };
        email?: { $regex: string; $options: string };
      }>;
      isBlocked?: boolean;
      isActive?: boolean;
      deactivatedAt?: { $ne?: null } | null;
      deletionRequestedAt?: { $ne?: null; $lt?: Date } | null;
    }

    const filter: UserFilter = {};

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Status filter
    switch (status) {
      case "active":
        filter.isActive = true;
        filter.isBlocked = false;
        filter.deactivatedAt = null;
        filter.deletionRequestedAt = null;
        break;
      case "blocked":
        filter.isBlocked = true;
        break;
      case "deactivated":
        filter.deactivatedAt = { $ne: null };
        break;
      case "deletion_requested":
        filter.deletionRequestedAt = { $ne: null };
        break;
      case "cleanup_expired":
        // Users who requested deletion more than 30 days ago
        filter.deletionRequestedAt = { $ne: null };
        // This would need additional query logic in the main query
        break;
      // "all" case - no additional filters
    }

    // Get users with pagination
    let query = User.find(filter)
      .select(
        "-password -resetToken -resetTokenExpiry -emailVerificationToken -emailVerificationExpiry"
      )
      .populate("blockedBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Special handling for cleanup_expired
    if (status === "cleanup_expired") {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      query = User.find({
        ...filter,
        deletionRequestedAt: { $lt: thirtyDaysAgo },
      })
        .select(
          "-password -resetToken -resetTokenExpiry -emailVerificationToken -emailVerificationExpiry"
        )
        .populate("blockedBy", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    }

    const users = await query.lean();

    // Count total for pagination
    let totalFilter = filter;
    if (status === "cleanup_expired") {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      totalFilter = {
        ...filter,
        deletionRequestedAt: { $lt: thirtyDaysAgo },
      };
    }
    const total = await User.countDocuments(totalFilter);

    const pagination = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    };

    return ApiResponseBuilder.successWithPagination(users, pagination);
  } catch (error) {
    console.error("Get users error:", error);
    return ApiResponseBuilder.serverError("Failed to fetch users");
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    const { name, username, email, password, role, emailVerified } =
      await request.json();

    // Validate required fields
    if (!name || !username || !email || !password || !role) {
      return ApiResponseBuilder.error("All fields are required", 400);
    }

    // Validate role
    if (!["reader", "writer", "admin"].includes(role)) {
      return ApiResponseBuilder.error("Invalid role", 400);
    }

    await connectDB();

    // Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return ApiResponseBuilder.error("Email already exists", 400);
      }
      if (existingUser.username === username.toLowerCase()) {
        return ApiResponseBuilder.error("Username already exists", 400);
      }
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user
    const newUser = new User({
      name: name.trim(),
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role,
      emailVerified: emailVerified ?? true, // Use provided value or default to true
      isActive: true,
    });

    await newUser.save();

    // Remove sensitive data from response
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      emailVerified: newUser.emailVerified,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
    };

    return ApiResponseBuilder.success(
      userResponse,
      "User created successfully"
    );
  } catch (error) {
    console.error("Create user error:", error);
    return ApiResponseBuilder.serverError("Failed to create user");
  }
}
