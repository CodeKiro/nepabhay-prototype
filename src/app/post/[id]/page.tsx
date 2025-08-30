"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import { InlineSpinner } from "@/components/ui/Spinner";
import { Alert } from "@/components/ui/Alert";
import {
  Heart,
  ThumbsUp,
  MessageCircle,
  Bookmark,
  Share2,
  Clock,
  User,
  ArrowLeft,
  Calendar,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  useGetPostByIdQuery,
  useGetPostsByIdsQuery,
  useGetFeaturedPostsQuery,
  useGetHomepagePostsQuery,
} from "@/lib/store/api/postsApi";
import { useGetCommentsByPostQuery } from "@/lib/store/api/commentsApi";
import { useToggleReactionMutation } from "@/lib/store/api/reactionsApi";
import { ArticleSidebar } from "@/components/ArticleSidebar";

export default function PostDetailPage() {
  const params = useParams();
  const { data: session } = useSession();

  const postId = params.id as string;

  // RTK Query hooks
  const {
    data: postResponse,
    isLoading: postLoading,
    error: postError,
  } = useGetPostByIdQuery(postId);

  const { data: commentsData, isLoading: commentsLoading } =
    useGetCommentsByPostQuery(postId);

  // Fetch featured posts for sidebar
  const { data: featuredResponse } = useGetFeaturedPostsQuery({ limit: 4 });

  // Fetch trending posts for sidebar
  const { data: homepageResponse } = useGetHomepagePostsQuery({ limit: 4 });

  // Extract data from API responses
  const post = postResponse?.data;
  const comments = commentsData?.data || [];

  // Filter out current post from featured and trending lists
  const featuredPosts = (featuredResponse?.data || []).filter(
    (p) => p._id !== postId
  );
  const homepagePosts = (homepageResponse?.data || []).filter(
    (p) => p._id !== postId
  );

  // Fetch recommended articles if post has recommendedArticles
  const {
    data: recommendedResponse,
    isLoading: recommendedLoading,
    error: recommendedError,
  } = useGetPostsByIdsQuery(post?.recommendedArticles || [], {
    skip: !post?.recommendedArticles || post.recommendedArticles.length === 0,
  });

  // Filter out current post from recommended posts (shouldn't happen but safety check)
  const recommendedPosts = (recommendedResponse?.data || []).filter(
    (p) => p._id !== postId
  );

  const [toggleReaction, { isLoading: reactionLoading }] =
    useToggleReactionMutation();

  const handleReaction = async (type: "like" | "love" | "insightful") => {
    if (!session) {
      return;
    }

    try {
      await toggleReaction({
        postId,
        type,
      }).unwrap();
    } catch (error) {
      console.error("Error toggling reaction:", error);
    }
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

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, "").split(" ").length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (postLoading) {
    return <Loading />;
  }

  if (postError || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Alert variant="destructive">
            <p>Failed to load post. Please try again later.</p>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Sidebar - Recommended Articles */}
          <aside className="lg:col-span-1 order-3 lg:order-1">
            <div className="lg:sticky lg:top-6">
              {/* Check if post has recommended articles */}
              {post.recommendedArticles &&
              post.recommendedArticles.length > 0 ? (
                <Card className="border-purple-200 bg-purple-50/30">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-purple-800">
                      <Sparkles className="h-5 w-5 fill-current" />
                      Recommended Articles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-0">
                    {recommendedLoading ? (
                      <div className="text-center py-6">
                        <InlineSpinner size="md" />
                        <p className="text-sm text-gray-500 mt-2">
                          Loading recommendations...
                        </p>
                      </div>
                    ) : recommendedError ? (
                      <div className="text-center py-6 bg-red-50 rounded-lg border border-red-200">
                        <MessageCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
                        <p className="text-sm text-red-700 font-medium mb-1">
                          Failed to load recommendations
                        </p>
                        <p className="text-xs text-red-600">
                          Please try again later
                        </p>
                      </div>
                    ) : recommendedPosts.length > 0 ? (
                      recommendedPosts.slice(0, 3).map((recommendedPost) => (
                        <article
                          key={recommendedPost._id}
                          className="group border-b border-gray-100 last:border-b-0"
                        >
                          <Link href={`/post/${recommendedPost._id}`}>
                            <div className="py-3 px-2 hover:bg-gray-50 transition-colors rounded-lg">
                              <div className="space-y-1">
                                {/* Title */}
                                <h4 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-purple-600 group-hover:underline transition-colors">
                                  {recommendedPost.title}
                                </h4>

                                {/* Author Name */}
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <User className="h-3 w-3" />
                                  <span>{recommendedPost.writtenBy}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </article>
                      ))
                    ) : (
                      <div className="text-center py-6 bg-yellow-50 rounded-lg border border-yellow-200">
                        <MessageCircle className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                        <p className="text-sm text-yellow-700 font-medium mb-1">
                          Recommendations not found
                        </p>
                        <p className="text-xs text-yellow-600">
                          Some recommended articles may no longer be available
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-gray-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <Sparkles className="h-5 w-5" />
                      Popular Articles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-0">
                    {featuredPosts.slice(0, 3).map((recommendedPost) => (
                      <article
                        key={recommendedPost._id}
                        className="group border-b border-gray-100 last:border-b-0"
                      >
                        <Link href={`/post/${recommendedPost._id}`}>
                          <div className="py-3 px-2 hover:bg-gray-50 transition-colors rounded-lg">
                            <div className="space-y-1">
                              {/* Title */}
                              <h4 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-red-600 group-hover:underline transition-colors">
                                {recommendedPost.title}
                              </h4>

                              {/* Author Name */}
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <User className="h-3 w-3" />
                                <span>{recommendedPost.writtenBy}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Browse All Articles Button */}
              <div className="mt-6">
                <Link href="/articles" className="block">
                  <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Browse All Articles
                  </button>
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <article className="lg:col-span-3 order-1 lg:order-2">
            {/* Article Header */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Article Meta */}
              <div className="px-6 py-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
                      {post.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span className="font-medium">{post.writtenBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.writtenDate)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {post.language}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{getReadingTime(post.content)} min read</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="px-6 py-8">
                {/* Content wrapper with responsive overflow handling */}
                <div className="w-full">
                  <div
                    className="prose prose-gray max-w-none prose-sm sm:prose-base prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 
                           break-words word-wrap
                           
                           /* Table styling - responsive with mobile scrolling */
                           prose-table:w-full prose-table:border-collapse prose-table:bg-white prose-table:border prose-table:border-gray-200 prose-table:rounded-lg prose-table:shadow-sm prose-table:my-4
                           prose-thead:bg-gray-50 prose-tbody:bg-white
                           prose-td:px-2 prose-td:py-1.5 sm:prose-td:px-4 sm:prose-td:py-2 prose-td:border-b prose-td:border-gray-200 prose-td:text-sm prose-td:break-words
                           prose-th:px-2 prose-th:py-1.5 sm:prose-th:px-4 sm:prose-th:py-2 prose-th:border-b prose-th:border-gray-200 prose-th:font-semibold prose-th:text-sm prose-th:bg-gray-50 prose-th:break-words
                           
                           /* Pre-formatted text - responsive spacing */
                           prose-pre:my-4 prose-pre:bg-gray-100 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg prose-pre:p-3 sm:prose-pre:p-4 prose-pre:text-sm prose-pre:overflow-x-auto
                           prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 sm:prose-code:px-2 sm:prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:break-words
                           
                           /* Images - responsive margins */
                           prose-img:max-w-full prose-img:h-auto prose-img:rounded-lg prose-img:border prose-img:border-gray-200 prose-img:shadow-sm prose-img:my-4
                           
                           /* Text elements - normal spacing */
                           prose-a:break-words prose-a:word-break-all
                           prose-p:break-words prose-p:my-3
                           prose-blockquote:border-l-4 prose-blockquote:border-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:my-4 prose-blockquote:rounded-r-lg prose-blockquote:break-words
                           
                           /* Direct HTML element targeting - mobile scrolling, desktop normal */
                           [&_*]:max-w-full
                           
                           /* Tables - wrapper for mobile scroll */
                           [&_table]:w-full [&_table]:border-collapse [&_table]:bg-white [&_table]:border [&_table]:border-gray-200 [&_table]:rounded-lg [&_table]:shadow-sm [&_table]:my-4
                           [&_thead]:bg-gray-50 [&_tbody]:bg-white [&_tbody_tr:nth-child(even)]:bg-gray-50
                           [&_td]:px-2 [&_td]:py-1.5 sm:[&_td]:px-4 sm:[&_td]:py-2 [&_td]:border-b [&_td]:border-gray-200 [&_td]:text-sm [&_td]:break-words [&_td]:min-w-[80px]
                           [&_th]:px-2 [&_th]:py-1.5 sm:[&_th]:px-4 sm:[&_th]:py-2 [&_th]:border-b [&_th]:border-gray-200 [&_th]:font-semibold [&_th]:text-sm [&_th]:bg-gray-50 [&_th]:break-words [&_th]:min-w-[80px]
                           
                           /* Code blocks - responsive spacing */
                           [&_pre]:my-4 [&_pre]:bg-gray-100 [&_pre]:border [&_pre]:border-gray-200 [&_pre]:rounded-lg [&_pre]:p-3 sm:[&_pre]:p-4 [&_pre]:text-sm [&_pre]:overflow-x-auto
                           [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 sm:[&_code]:px-2 sm:[&_code]:py-1 [&_code]:rounded [&_code]:text-sm [&_code]:break-words
                           
                           /* Media elements - responsive margins */
                           [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:border [&_img]:border-gray-200 [&_img]:shadow-sm [&_img]:my-4
                           [&_video]:max-w-full [&_video]:h-auto [&_video]:rounded-lg [&_video]:border [&_video]:border-gray-200 [&_video]:my-4
                           [&_iframe]:max-w-full [&_iframe]:rounded-lg [&_iframe]:border [&_iframe]:border-gray-200 [&_iframe]:my-4
                           [&_svg]:max-w-full [&_svg]:h-auto
                           [&_canvas]:max-w-full [&_canvas]:h-auto [&_canvas]:border [&_canvas]:border-gray-200 [&_canvas]:rounded-lg [&_canvas]:my-4
                           [&_audio]:max-w-full [&_audio]:my-4
                           [&_embed]:max-w-full [&_embed]:rounded-lg [&_embed]:border [&_embed]:border-gray-200 [&_embed]:my-4
                           [&_object]:max-w-full [&_object]:rounded-lg [&_object]:border [&_object]:border-gray-200 [&_object]:my-4
                           
                           /* Block elements - normal spacing */
                           [&_blockquote]:border-l-4 [&_blockquote]:border-blue-400 [&_blockquote]:bg-blue-50 [&_blockquote]:pl-4 [&_blockquote]:py-2 [&_blockquote]:my-4 [&_blockquote]:rounded-r-lg [&_blockquote]:break-words
                           [&_figure]:max-w-full [&_figure]:my-4
                           [&_figcaption]:text-sm [&_figcaption]:text-gray-600 [&_figcaption]:mt-2 [&_figcaption]:break-words
                           
                           /* Text elements - word breaking without excessive spacing */
                           [&_div]:break-words [&_span]:break-words [&_p]:break-words [&_p]:my-3
                           [&_h1]:break-words [&_h2]:break-words [&_h3]:break-words [&_h4]:break-words [&_h5]:break-words [&_h6]:break-words
                           [&_a]:break-words [&_a]:word-break-all
                           [&_li]:break-words [&_ul]:my-3 [&_ol]:my-3
                           [&_dl]:my-3 [&_dt]:break-words [&_dd]:break-words
                           [&_address]:break-words"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Mobile table wrapper for horizontal scrolling */}
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
      @media (max-width: 640px) {
        /* Only make tables scrollable, not the entire prose content */
        .prose table {
          display: block;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          width: 100%;
          margin: 16px 0;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .prose table thead,
        .prose table tbody {
          display: table;
          width: 100%;
          table-layout: auto;
          min-width: 400px; /* Minimum width to trigger horizontal scroll */
        }
        
        .prose table thead {
          display: table-header-group;
        }
        
        .prose table tbody {
          display: table-row-group;
        }
        
        .prose table tr {
          display: table-row;
        }
        
        .prose table th,
        .prose table td {
          display: table-cell;
          padding: 12px 16px;
          border-right: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          vertical-align: top;
          word-wrap: break-word;
          white-space: normal;
        }
        
        /* Remove borders from edges */
        .prose table th:last-child,
        .prose table td:last-child {
          border-right: none;
        }
        
        .prose table tbody tr:last-child td {
          border-bottom: none;
        }
        
        /* Column widths - ensure consistent alignment */
        .prose table th:first-child,
        .prose table td:first-child {
          width: 140px;
          min-width: 140px;
          max-width: 140px;
          font-weight: 600;
        }
        
        .prose table th:nth-child(2),
        .prose table td:nth-child(2) {
          width: 240px;
          min-width: 240px;
          max-width: 240px;
        }
        
        /* For tables with more than 2 columns */
        .prose table th:nth-child(n+3),
        .prose table td:nth-child(n+3) {
          width: 150px;
          min-width: 150px;
        }
        
        .prose table th {
          background-color: #374151;
          color: white;
          font-weight: 600;
          font-size: 14px;
          text-align: left;
        }
        
        .prose table td {
          font-size: 14px;
          line-height: 1.5;
          background-color: white;
        }
        
        .prose table tbody tr:nth-child(even) td {
          background-color: #f9fafb;
        }
        
        .prose table tbody tr:hover td {
          background-color: #f3f4f6;
        }
        
        /* Code styling within tables */
        .prose table td code,
        .prose table th code {
          background-color: rgba(0, 0, 0, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 12px;
          font-family: 'Courier New', monospace;
          white-space: nowrap;
        }
        
        .prose table th code {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
        }
      }
    `,
                    }}
                  />
                </div>

                {/* Categories Section - Seamless continuation */}
                {post.categories && post.categories.length > 0 && (
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <Link
                          key={category}
                          href={`/articles?category=${category}`}
                        >
                          <button className="px-3 py-1 rounded-md text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer">
                            {getCategoryDisplayName(category)}
                          </button>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Article Actions - After Content and Tags */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction("like")}
                      disabled={reactionLoading}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                    >
                      <Heart className="h-4 w-4" />
                      <span>{post.reactionCount.like}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction("love")}
                      disabled={reactionLoading}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.reactionCount.love}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReaction("insightful")}
                      disabled={reactionLoading}
                      className="flex items-center gap-2 text-gray-600 hover:text-yellow-600"
                    >
                      <Lightbulb className="h-4 w-4" />
                      <span>{post.reactionCount.insightful || 0}</span>
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MessageCircle className="h-4 w-4" />
                      <span>{comments.length} comments</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Comments ({comments.length})
                </h2>
                <p className="text-gray-600 text-sm">
                  Join the conversation and share your thoughts
                </p>
              </div>

              {/* Comments List */}
              {commentsLoading ? (
                <div className="flex justify-center py-8">
                  <InlineSpinner size="md" />
                </div>
              ) : comments.length > 0 ? (
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="border-b border-gray-100 pb-4"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium text-sm">
                            {comment.userId?.name?.charAt(0) || "A"}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {comment.userId?.name || "Anonymous"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No comments yet
                  </h3>
                  <p className="text-gray-500">
                    Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          </article>

          {/* Right Sidebar - Featured & Trending Articles */}
          <aside className="lg:col-span-1 order-4 lg:order-3 lg:sticky lg:top-6">
            <ArticleSidebar
              featuredPosts={featuredPosts}
              trendingPosts={homepagePosts}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
