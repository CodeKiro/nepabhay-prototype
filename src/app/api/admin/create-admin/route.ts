import { NextRequest } from "next/server";
import { ApiResponseBuilder } from "@/lib/api";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";
import bcrypt from "bcryptjs";
import { z } from "zod";

const CreateAdminSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const validatedData = CreateAdminSchema.parse(body);

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return ApiResponseBuilder.error(
        "User with this email already exists",
        400
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 12);

    // Create admin user
    const newAdmin = new User({
      name: validatedData.name,
      email: validatedData.email,
      passwordHash,
      role: "admin",
      emailVerified: true, // Admins are pre-verified
    });

    await newAdmin.save();

    // Return without password hash
    const adminData = {
      _id: newAdmin._id,
      name: newAdmin.name,
      email: newAdmin.email,
      role: newAdmin.role,
      emailVerified: newAdmin.emailVerified,
      createdAt: newAdmin.createdAt,
      updatedAt: newAdmin.updatedAt,
    };

    return ApiResponseBuilder.success({
      message: "Admin user created successfully",
      admin: adminData,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ApiResponseBuilder.error("Validation failed", 400);
    }

    console.error("Error creating admin:", error);
    return ApiResponseBuilder.error("Failed to create admin user");
  }
}
