import { NextRequest } from "next/server";
import { connectDB } from "@/lib/database";
import { Post } from "@/lib/database/models";
import { ApiResponseBuilder } from "@/lib/api";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");

    if (!idsParam) {
      return ApiResponseBuilder.error("IDs parameter is required");
    }

    // Parse comma-separated IDs
    const ids = idsParam.split(",").filter((id) => id.trim().length > 0);

    if (ids.length === 0) {
      return ApiResponseBuilder.error("At least one valid ID is required");
    }

    // Validate ObjectIds
    const validIds = ids.filter((id) => {
      try {
        return /^[0-9a-fA-F]{24}$/.test(id);
      } catch {
        return false;
      }
    });

    if (validIds.length === 0) {
      return ApiResponseBuilder.error("No valid ObjectIds provided");
    }

    // Fetch posts by IDs with only required fields
    const posts = await Post.find({
      _id: { $in: validIds },
    })
      .select("title writtenBy createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return ApiResponseBuilder.successWithPagination(posts, {
      page: 1,
      limit: posts.length,
      total: posts.length,
      pages: 1,
    });
  } catch (error) {
    console.error("Error fetching posts by IDs:", error);
    return ApiResponseBuilder.serverError("Failed to fetch posts");
  }
}
