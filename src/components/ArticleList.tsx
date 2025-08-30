"use client";

import Link from "next/link";
import { Calendar, User, Heart, Eye, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Post } from "@/types";

interface ArticleListItemProps {
  post: Post;
  showMetrics?: boolean;
}

export function ArticleListItem({
  post,
  showMetrics = true,
}: ArticleListItemProps) {
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      "learning-tips": "Learning Tips",
      "language-skills": "Language Skills",
      "conversation-practice": "Conversation & Practice",
      "culture-history": "Culture & History",
      "stories-literature": "Stories & Literature",
      "community-corner": "Community Corner",
      "daily-practice": "Daily Practice",
    };
    return categoryMap[category] || category;
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      "learning-tips": "bg-blue-100 text-blue-800",
      "language-skills": "bg-green-100 text-green-800",
      "conversation-practice": "bg-purple-100 text-purple-800",
      "culture-history": "bg-amber-100 text-amber-800",
      "stories-literature": "bg-pink-100 text-pink-800",
      "community-corner": "bg-indigo-100 text-indigo-800",
      "daily-practice": "bg-red-100 text-red-800",
    };
    return colorMap[category] || "bg-gray-100 text-gray-800";
  };

  const getLanguageColor = (language: string) => {
    const colorMap: Record<string, string> = {
      English: "bg-slate-100 text-slate-800",
      Nepali: "bg-orange-100 text-orange-800",
      Newa: "bg-cyan-100 text-cyan-800",
      Mixed: "bg-violet-100 text-violet-800",
    };
    return colorMap[language] || "bg-gray-100 text-gray-800";
  };

  const totalReactions =
    post.reactionCount.like +
    post.reactionCount.love +
    post.reactionCount.insightful;

  // Extract preview text from content (first 150 characters)
  const getPreviewText = (content: string) => {
    // Remove HTML tags and get plain text
    const plainText = content.replace(/<[^>]*>/g, "");
    return plainText.length > 150
      ? plainText.substring(0, 150) + "..."
      : plainText;
  };

  return (
    <article className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-200">
      <div className="flex flex-col space-y-4">
        {/* Header with Categories and Language */}
        <div className="flex flex-wrap items-center gap-2">
          {post.categories.slice(0, 2).map((category) => (
            <Badge
              key={category}
              className={`${getCategoryColor(category)} text-xs font-medium`}
            >
              {getCategoryDisplayName(category)}
            </Badge>
          ))}
          <Badge
            className={`${getLanguageColor(post.language)} text-xs font-medium`}
          >
            {post.language}
          </Badge>
          {post.showOnFeatured && (
            <Badge className="bg-red-100 text-red-800 text-xs font-medium">
              Featured
            </Badge>
          )}
        </div>

        {/* Title and Preview */}
        <div className="space-y-2">
          <Link href={`/post/${post._id}`}>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {getPreviewText(post.content)}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.writtenBy}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.writtenDate)}</span>
          </div>
        </div>

        {/* Bottom Row: Metrics and Read More */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          {showMetrics && (
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {totalReactions > 0 && (
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{totalReactions}</span>
                </div>
              )}
              {/* You can add view count here if available */}
              {/* <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>123</span>
              </div> */}
              {/* You can add comment count here if available */}
              {/* <div className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>5</span>
              </div> */}
            </div>
          )}

          <Link href={`/post/${post._id}`}>
            <div className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium group-hover:gap-2 transition-all">
              <span>Read More</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
}

interface ArticleListProps {
  posts: Post[];
  showMetrics?: boolean;
  className?: string;
}

export function ArticleList({
  posts,
  showMetrics = true,
  className = "",
}: ArticleListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <Eye className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            No articles found
          </h3>
          <p className="text-gray-500 text-sm">
            Try adjusting your search criteria or check back later for new
            content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {posts.map((post) => (
        <ArticleListItem key={post._id} post={post} showMetrics={showMetrics} />
      ))}
    </div>
  );
}
