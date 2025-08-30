import { NextRequest } from "next/server";
import { connectDB } from "@/lib/database";
import { Feedback } from "@/lib/database/models";
import { FeedbackSchema } from "@/lib/schemas";
import { ApiResponseBuilder } from "@/lib/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = FeedbackSchema.parse(body);

    if (!body.postId) {
      return ApiResponseBuilder.error("Post ID is required", 400);
    }

    await connectDB();

    // Create feedback
    const feedback = new Feedback({
      postId: body.postId,
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
    });

    await feedback.save();

    return ApiResponseBuilder.success(
      { feedbackId: feedback._id },
      "Feedback submitted successfully"
    );
  } catch (error) {
    console.error("Create feedback error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return ApiResponseBuilder.error("Invalid input data", 400);
    }

    return ApiResponseBuilder.serverError("Failed to submit feedback");
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    const filter = postId ? { postId } : {};

    const feedbacks = await Feedback.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return ApiResponseBuilder.success(feedbacks);
  } catch (error) {
    console.error("Get feedback error:", error);
    return ApiResponseBuilder.serverError("Failed to fetch feedback");
  }
}
