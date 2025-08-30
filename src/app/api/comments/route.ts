import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { Comment } from "@/lib/database/models";
import { CommentSchema } from "@/lib/schemas";
import { ApiResponseBuilder } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return ApiResponseBuilder.error("Post ID is required", 400);
    }

    // Get comments with user information
    const comments = await Comment.find({ postId })
      .populate("userId", "name")
      .populate("parentCommentId")
      .sort({ createdAt: -1 })
      .lean();

    return ApiResponseBuilder.success(comments);
  } catch (error) {
    console.error("Get comments error:", error);
    return ApiResponseBuilder.serverError("Failed to fetch comments");
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return ApiResponseBuilder.unauthorized("Authentication required");
    }

    const body = await request.json();

    // Validate input
    const validatedData = CommentSchema.parse(body);

    if (!body.postId) {
      return ApiResponseBuilder.error("Post ID is required", 400);
    }

    await connectDB();

    // Create comment
    const comment = new Comment({
      postId: body.postId,
      userId: session.user.id,
      content: validatedData.content,
      parentCommentId: validatedData.parentCommentId || null,
    });

    await comment.save();

    // Populate user info before returning
    await comment.populate("userId", "name");

    return ApiResponseBuilder.success(comment, "Comment created successfully");
  } catch (error) {
    console.error("Create comment error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return ApiResponseBuilder.error("Invalid input data", 400);
    }

    return ApiResponseBuilder.serverError("Failed to create comment");
  }
}
