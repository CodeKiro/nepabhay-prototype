import { connectDB } from "@/lib/database";
import { ApiResponseBuilder } from "@/lib/api";

export async function GET() {
  try {
    await connectDB();
    return ApiResponseBuilder.success(
      { status: "healthy", timestamp: new Date().toISOString() },
      "Database connected successfully"
    );
  } catch (error) {
    console.error("Database connection error:", error);
    return ApiResponseBuilder.serverError("Failed to connect to database");
  }
}
