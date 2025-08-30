"use client";

import Link from "next/link";
import { TrendingUp, Star, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { Post } from "@/types";

interface ArticleSidebarProps {
  featuredPosts?: Post[];
  trendingPosts?: Post[];
  className?: string;
}

function SidebarArticleItem({ post }: { post: Post }) {
  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article className="group border-b border-gray-100 last:border-b-0">
      <Link href={`/post/${post._id}`}>
        <div className="py-3 px-2 hover:bg-gray-50 transition-colors rounded-lg">
          <div className="space-y-1">
            {/* Title */}
            <h4 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-red-600 group-hover:underline transition-colors">
              {post.title}
            </h4>

            {/* Publish Date */}
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.writtenDate)}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function ArticleSidebar({
  featuredPosts = [],
  trendingPosts = [],
  className = "",
}: ArticleSidebarProps) {
  return (
    <aside className={`flex flex-col gap-6 ${className}`}>
      {/* Trending Articles - Shows first on mobile, second on desktop */}
      {trendingPosts.length > 0 && (
        <Card className="border-gray-200 order-1 lg:order-2">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <TrendingUp className="h-5 w-5" />
              Trending Articles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {trendingPosts.slice(0, 6).map((article) => (
              <SidebarArticleItem key={article._id} post={article} />
            ))}
          </CardContent>
        </Card>
      )}

      {/* Featured Articles - Shows second on mobile, first on desktop */}
      {featuredPosts.length > 0 && (
        <Card className="border-red-200 bg-red-50/30 order-2 lg:order-1">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-red-800">
              <Star className="h-5 w-5 fill-current" />
              Featured Articles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0">
            {featuredPosts.slice(0, 6).map((article) => (
              <SidebarArticleItem key={article._id} post={article} />
            ))}
            {featuredPosts.length > 6 && (
              <div className="pt-3 mt-3 border-t border-red-200">
                <Link
                  href="/articles?featured=true"
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 hover:underline font-medium transition-colors"
                >
                  <span>View all featured articles</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </aside>
  );
}
