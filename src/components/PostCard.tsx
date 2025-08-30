import Link from "next/link";
import { formatDate, stripHtmlAndTruncate } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Heart, MessageCircle, Eye, Calendar, User } from "lucide-react";
import { paths } from "@/config/paths";

interface Post {
  _id: string;
  title: string;
  content: string;
  language: "English" | "Nepali" | "Newa" | "Mixed";
  categories: string[];
  writtenBy: string;
  writtenDate: Date;
  showOnFeatured?: boolean;
  showOnHomepage?: boolean;
  reactionCount: {
    like: number;
    love: number;
    insightful: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

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

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const totalReactions =
    post.reactionCount.like +
    post.reactionCount.love +
    post.reactionCount.insightful;

  return (
    <Card hover className="group">
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center space-x-2 flex-wrap gap-1">
            <span className="px-2 py-1 rounded-full text-xs sm:text-xs font-medium bg-blue-100 text-blue-800">
              {post.language}
            </span>
            {post.showOnFeatured && (
              <span
                className="px-2 py-1 rounded-full text-xs sm:text-xs font-medium bg-amber-100 text-amber-800"
                title="Top Pick"
              >
                ⭐ Featured
              </span>
            )}
            {post.showOnHomepage && (
              <span
                className="px-2 py-1 rounded-full text-xs sm:text-xs font-medium bg-purple-100 text-purple-800"
                title="Trending Article"
              >
                🔥 Trending
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
          <Link href={paths.post(post._id)}>{post.title}</Link>
        </h3>

        {/* Content Preview */}
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
          {stripHtmlAndTruncate(post.content, 150)}
        </p>

        {/* Metadata */}
        <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">{post.writtenBy}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">
              {formatDate(post.writtenDate)}
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {post.categories.map((category) => (
            <Link
              key={category}
              href={`/articles?category=${encodeURIComponent(category)}`}
              className="px-2 sm:px-3 py-1 rounded-md text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {getCategoryDisplayName(category)}
            </Link>
          ))}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between pt-3 sm:pt-4 px-4 sm:px-6 pb-4 sm:pb-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>{totalReactions}</span>
          </div>
          <div className="flex items-center space-x-1">
            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>0</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          asChild
          className="text-xs sm:text-sm"
        >
          <Link href={paths.post(post._id)}>
            <Eye className="h-3 w-3 sm:h-3 sm:w-3 mr-1" />
            <span className="hidden xs:inline">Read More</span>
            <span className="xs:hidden">Read</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
