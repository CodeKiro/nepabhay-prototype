import { ApiResponseBuilder } from "@/lib/api";
import { connectDB } from "@/lib/database";
import { User } from "@/lib/database/models";

export async function GET() {
  try {
    await connectDB();

    const adminCount = await User.countDocuments({ role: "admin" });

    return ApiResponseBuilder.success({ adminCount });
  } catch (error) {
    console.error("Error fetching admin count:", error);
    return ApiResponseBuilder.error("Failed to fetch admin count");
  }
}
