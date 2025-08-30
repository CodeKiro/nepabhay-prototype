import { ApiResponseBuilder } from "@/lib/api";
import { connectDB } from "@/lib/database";
import { User, Post, Comment } from "@/lib/database/models";

export async function GET() {
  try {
    await connectDB();

    // Get statistics
    const [totalUsers, totalPosts, totalComments] = await Promise.all([
      User.countDocuments(),
      Post.countDocuments(),
      Comment.countDocuments(),
    ]);

    // Get recent posts
    const recentPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Get recent users
    const recentUsers = await User.find()
      .select("name email role createdAt emailVerified")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Get user role distribution
    const userRoles = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);

    // Get posts by category
    const postsByCategory = await Post.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    // Calculate total reactions
    const totalReactions = await Post.aggregate([
      {
        $group: {
          _id: null,
          totalLikes: { $sum: "$reactionCount.like" },
          totalLoves: { $sum: "$reactionCount.love" },
          totalInsightful: { $sum: "$reactionCount.insightful" },
        },
      },
    ]);

    const reactionSum = totalReactions[0]
      ? totalReactions[0].totalLikes +
        totalReactions[0].totalLoves +
        totalReactions[0].totalInsightful
      : 0;

    const stats = {
      totalUsers,
      totalPosts,
      totalComments,
      totalReactions: reactionSum,
      recentPosts: recentPosts.map((post) => ({
        id: post._id.toString(),
        title: post.title,
        category:
          post.categories && post.categories.length > 0
            ? post.categories[0]
            : "uncategorized",
        writtenBy: post.writtenBy,
        createdAt: post.createdAt,
      })),
      recentUsers: recentUsers.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        emailVerified: user.emailVerified,
      })),
      userRoles,
      postsByCategory,
    };

    return ApiResponseBuilder.success(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return ApiResponseBuilder.error("Failed to fetch admin statistics");
  }
}
