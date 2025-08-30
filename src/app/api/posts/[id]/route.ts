import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";
import { Post } from "@/lib/database/models";
import { PostSchema } from "@/lib/schemas";
import { ApiResponseBuilder } from "@/lib/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const post = await Post.findById(id).lean();

    if (!post) {
      return ApiResponseBuilder.notFound("Post not found");
    }

    return ApiResponseBuilder.success(post);
  } catch (error) {
    console.error("Get post error:", error);
    return ApiResponseBuilder.serverError("Failed to fetch post");
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    const body = await request.json();

    try {
      // Validate input
      const validatedData = PostSchema.parse({
        ...body,
        writtenDate: new Date(body.writtenDate),
      });

      await connectDB();

      const { id } = await params;
      const post = await Post.findByIdAndUpdate(id, validatedData, {
        new: true,
        runValidators: true,
      });

      if (!post) {
        return ApiResponseBuilder.notFound("Post not found");
      }
      return ApiResponseBuilder.success(post, "Post updated successfully");
    } catch (validationError) {
      console.error("Validation error details:", validationError);
      if (validationError instanceof Error) {
        console.error("Error name:", validationError.name);
        console.error("Error message:", validationError.message);
      }
      throw validationError;
    }
  } catch (error) {
    console.error("Update post error:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return ApiResponseBuilder.error("Invalid input data", 400);
    }

    if (error instanceof Error && error.name === "ValidationError") {
      console.error("MongoDB validation error:", error.message);
      return ApiResponseBuilder.error(
        `Validation failed: ${error.message}`,
        400
      );
    }

    return ApiResponseBuilder.serverError("Failed to update post");
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      return ApiResponseBuilder.unauthorized("Admin access required");
    }

    await connectDB();

    const { id } = await params;
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return ApiResponseBuilder.notFound("Post not found");
    }

    return ApiResponseBuilder.success(
      { deletedId: id },
      "Post deleted successfully"
    );
  } catch (error) {
    console.error("Delete post error:", error);
    return ApiResponseBuilder.serverError("Failed to delete post");
  }
}
