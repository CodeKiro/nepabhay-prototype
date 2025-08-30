import { NextRequest } from "next/server";
import { connectDB } from "@/lib/database";
import { Post } from "@/lib/database/models";
import { PostSchema } from "@/lib/schemas";
import { ApiResponseBuilder, withErrorHandling } from "@/lib/api";
import { requireAdmin } from "@/lib/auth/helpers";
import { appConfig } from "@/config/app";
import type { PostLanguage, PostCategory } from "@/types";

export const GET = withErrorHandling(async (request: NextRequest) => {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");
  const homepage = searchParams.get("homepage");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = Math.min(
    parseInt(
      searchParams.get("limit") || appConfig.pagination.defaultLimit.toString()
    ),
    appConfig.pagination.maxLimit
  );
  const skip = (page - 1) * limit;

  // Build filter
  interface FilterType {
    language?: PostLanguage | { $in: PostLanguage[] };
    categories?: { $in: PostCategory[] };
    $or?: Array<{
      title?: { $regex: string; $options: string };
      content?: { $regex: string; $options: string };
      writtenBy?: { $regex: string; $options: string };
    }>;
    showOnFeatured?: boolean;
    showOnHomepage?: boolean;
  }

  const filter: FilterType = {};

  // Language filter - support multiple languages
  if (language) {
    const languages = language.split(",").map((l) => l.trim());
    if (languages.length === 1) {
      filter.language = languages[0] as PostLanguage;
    } else {
      filter.language = { $in: languages as PostLanguage[] };
    }
  }

  // Category filter - support multiple categories
  if (category) {
    const categories = category.split(",").map((c) => c.trim());
    filter.categories = { $in: categories as PostCategory[] };
  }

  // Search filter
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
      { writtenBy: { $regex: search, $options: "i" } },
    ];
  }

  // Featured filter
  if (featured === "true") {
    filter.showOnFeatured = true;
  } else if (featured === "false") {
    filter.showOnFeatured = false;
  }

  // Homepage filter
  if (homepage === "true") {
    filter.showOnHomepage = true;
  } else if (homepage === "false") {
    filter.showOnHomepage = false;
  }

  // Get posts with pagination
  const [posts, total] = await Promise.all([
    Post.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Post.countDocuments(filter),
  ]);

  return ApiResponseBuilder.successWithPagination(
    posts,
    {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
    `Found ${total} posts`
  );
});

export const POST = withErrorHandling(async (request: NextRequest) => {
  // Require admin authentication
  const { error: authError } = await requireAdmin();
  if (authError) return authError;

  const body = await request.json();

  // Validate input
  const validatedData = PostSchema.parse({
    ...body,
    writtenDate: new Date(body.writtenDate),
  });

  await connectDB();

  // Create post
  const post = new Post(validatedData);
  await post.save();

  return ApiResponseBuilder.success(post, "Post created successfully");
});
