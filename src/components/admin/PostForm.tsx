"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PostSchema,
  type PostFormData,
  categories,
  languages,
} from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { TiptapEditor } from "@/components/ui/TiptapEditor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { ArrowLeft, Save, Edit, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  useGetPostsQuery,
  useGetPostsByIdsQuery,
} from "@/lib/store/api/postsApi";

interface PostFormProps {
  mode: "create" | "edit";
  initialData?: Partial<PostFormData>;
  onSubmit: (data: PostFormData) => Promise<void>;
  isLoading: boolean;
  error: string;
  currentPostId?: string; // ID of the post being edited (to exclude from recommendations)
}

export default function PostForm({
  mode,
  initialData,
  onSubmit,
  isLoading,
  error,
  currentPostId,
}: PostFormProps) {
  const form = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    mode: "onChange",
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      categories: initialData?.categories || [],
      language:
        (initialData?.language as (typeof languages)[number]) || "English",
      writtenDate: initialData?.writtenDate || new Date(),
      writtenBy: initialData?.writtenBy || "",
      showOnFeatured: initialData?.showOnFeatured || false,
      showOnHomepage: initialData?.showOnHomepage || false,
      recommendedArticles: initialData?.recommendedArticles || [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  // Format date for HTML date input
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const selectedCategories = watch("categories") || [];
  const selectedRecommendedArticles = watch("recommendedArticles") || [];

  // Get all posts for recommended articles selection
  const { data: postsResponse, isLoading: postsLoading } = useGetPostsQuery({
    limit: 50, // Get more posts for selection
  });

  // Fetch selected recommended articles to ensure they're always available for display
  const { data: selectedPostsResponse } = useGetPostsByIdsQuery(
    selectedRecommendedArticles,
    {
      skip: selectedRecommendedArticles.length === 0,
    }
  );

  // Filter out current post from available posts (prevent self-recommendation)
  const availablePosts = (postsResponse?.data || []).filter((post) =>
    currentPostId ? post._id !== currentPostId : true
  );

  // Combine available posts with selected posts to ensure selected ones are always visible
  const selectedPosts = selectedPostsResponse?.data || [];
  const combinedPosts = [
    ...selectedPosts,
    ...availablePosts.filter(
      (post) => !selectedRecommendedArticles.includes(post._id)
    ),
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const toggleCategory = (category: (typeof categories)[number]) => {
    const current = selectedCategories;
    if (current.includes(category)) {
      setValue(
        "categories",
        current.filter((c) => c !== category)
      );
    } else if (current.length < 3) {
      setValue("categories", [...current, category]);
    }
  };

  const toggleRecommendedArticle = (postId: string) => {
    const current = selectedRecommendedArticles;
    if (current.includes(postId)) {
      setValue(
        "recommendedArticles",
        current.filter((id) => id !== postId)
      );
    } else if (current.length < 5) {
      setValue("recommendedArticles", [...current, postId]);
    }
  };

  // Filter posts for recommended articles selection (only from available posts, not selected ones)
  const filteredPosts = availablePosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryDisplayName = (cat: string) => {
    const categoryMap: Record<string, string> = {
      "learning-tips": "Learning Tips",
      "language-skills": "Language Skills",
      "conversation-practice": "Conversation & Practice",
      "culture-history": "Culture & History",
      "stories-literature": "Stories & Literature",
      "community-corner": "Community Corner",
      "daily-practice": "Daily Practice",
    };
    return categoryMap[cat] || cat;
  };

  const title = mode === "create" ? "Create New Post" : "Edit Post";
  const description =
    mode === "create"
      ? "Share your thoughts, stories, and poetry"
      : "Update your post content and settings";
  const submitButtonText = mode === "create" ? "Create Post" : "Update Post";
  const loadingText = mode === "create" ? "Creating..." : "Updating...";

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 px-3 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {title}
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            {description}
          </p>
        </div>
        <Button
          variant="outline"
          asChild
          size="sm"
          className="self-start sm:self-auto"
        >
          <Link href="/admin/posts">
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Back to Posts</span>
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {error && <Alert variant="destructive">{error}</Alert>}

            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter post title"
                {...register("title")}
                className={errors.title ? "border-blue-500" : ""}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-blue-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="content">Content *</Label>
              <TiptapEditor
                content={watch("content") || ""}
                onChange={(content) => setValue("content", content)}
                placeholder="Write your content here..."
              />
              {errors.content && (
                <p className="mt-1 text-sm text-blue-600">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Language *</Label>
                <select
                  id="language"
                  {...register("language")}
                  className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select language</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                {errors.language && (
                  <p className="mt-1 text-sm text-blue-600">
                    {errors.language.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="writtenDate">Written Date *</Label>
                <Input
                  id="writtenDate"
                  type="date"
                  value={formatDateForInput(watch("writtenDate") || new Date())}
                  onChange={(e) =>
                    setValue("writtenDate", new Date(e.target.value))
                  }
                  className={errors.writtenDate ? "border-blue-500" : ""}
                />
                {errors.writtenDate && (
                  <p className="mt-1 text-sm text-blue-600">
                    {errors.writtenDate.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="writtenBy">Author *</Label>
              <Input
                id="writtenBy"
                placeholder="Author name"
                {...register("writtenBy")}
                className={errors.writtenBy ? "border-blue-500" : ""}
              />
              {errors.writtenBy && (
                <p className="mt-1 text-sm text-blue-600">
                  {errors.writtenBy.message}
                </p>
              )}
            </div>

            <div>
              <Label>Categories * (Select up to 3)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {categories.map((category) => {
                  const isSelected = selectedCategories.includes(category);
                  const isDisabled =
                    !isSelected && selectedCategories.length >= 3;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => toggleCategory(category)}
                      disabled={isDisabled}
                      className={`p-2 text-sm rounded-md border transition-colors ${
                        isSelected
                          ? "bg-purple-100 border-purple-500 text-purple-700"
                          : isDisabled
                          ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {getCategoryDisplayName(category)}
                    </button>
                  );
                })}
              </div>
              {errors.categories && (
                <p className="mt-1 text-sm text-blue-600">
                  {errors.categories.message}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Selected: {selectedCategories.length}/3
              </p>
            </div>

            {/* Recommended Articles Selection */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Recommended Articles (Optional)
              </Label>
              <p className="text-xs text-gray-500 mb-4">
                Select up to 5 articles to recommend to readers. These will
                appear on the article detail page.
              </p>

              {/* Search for posts */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Selected articles display */}
              {selectedRecommendedArticles.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Selected Articles ({selectedRecommendedArticles.length}/5)
                  </h4>
                  <div className="space-y-2">
                    {selectedRecommendedArticles.map((postId) => {
                      const post = combinedPosts.find((p) => p._id === postId);
                      return post ? (
                        <div
                          key={postId}
                          className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3"
                        >
                          <div className="flex-1">
                            <h5 className="font-medium text-sm text-gray-900">
                              {post.title}
                            </h5>
                            <p className="text-xs text-gray-600">
                              By {post.writtenBy}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRecommendedArticle(postId)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Available articles for selection */}
              <div className="border border-gray-200 rounded-lg max-h-60 overflow-y-auto">
                {postsLoading ? (
                  <div className="p-4 text-center text-gray-500">
                    Loading articles...
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredPosts.slice(0, 20).map((post) => {
                      const isSelected = selectedRecommendedArticles.includes(
                        post._id
                      );
                      const canSelect = selectedRecommendedArticles.length < 5;

                      return (
                        <div
                          key={post._id}
                          className={`p-3 hover:bg-gray-50 ${
                            isSelected
                              ? "bg-blue-50 border-l-4 border-l-blue-500"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h5 className="font-medium text-sm text-gray-900">
                                {post.title}
                              </h5>
                              <p className="text-xs text-gray-600">
                                By {post.writtenBy} • {post.language} •{" "}
                                {post.categories.join(", ")}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleRecommendedArticle(post._id)}
                              disabled={!isSelected && !canSelect}
                              className={
                                isSelected
                                  ? "bg-blue-600 hover:bg-blue-700"
                                  : !canSelect
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }
                            >
                              {isSelected ? "Selected" : "Select"}
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    {searchTerm
                      ? "No articles found matching your search"
                      : "No articles available"}
                  </div>
                )}
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Selected: {selectedRecommendedArticles.length}/5 articles
              </p>
            </div>

            {/* Feature Flags */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="showOnFeatured"
                  {...register("showOnFeatured")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label
                  htmlFor="showOnFeatured"
                  className="text-sm font-medium text-gray-700"
                >
                  Show on Featured Section
                </Label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="showOnHomepage"
                  {...register("showOnHomepage")}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label
                  htmlFor="showOnHomepage"
                  className="text-sm font-medium text-gray-700"
                >
                  Show on Homepage
                </Label>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {loadingText}
                  </div>
                ) : (
                  <div className="flex items-center">
                    {mode === "create" ? (
                      <Save className="h-4 w-4 mr-2" />
                    ) : (
                      <Edit className="h-4 w-4 mr-2" />
                    )}
                    {submitButtonText}
                  </div>
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/posts">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
