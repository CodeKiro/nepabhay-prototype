"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import Loading from "@/components/ui/Loading";
import {
  BookOpen,
  Search,
  Filter,
  X,
  Loader2,
  Calendar,
  User,
} from "lucide-react";
import {
  useGetPostsQuery,
  useGetFeaturedPostsQuery,
  useGetHomepagePostsQuery,
} from "@/lib/store/api/postsApi";
import { ArticleSidebar } from "@/components/ArticleSidebar";
import type { PostLanguage, PostCategory } from "@/types";

function ArticlesContent() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Handle URL parameters on component mount
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const languageFromUrl = searchParams.get("language");
    const searchFromUrl = searchParams.get("search");
    const featuredFromUrl = searchParams.get("featured");

    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl]);
      setShowFilters(true);
    }
    if (languageFromUrl && languageFromUrl !== "all") {
      setSelectedLanguage(languageFromUrl);
      setShowFilters(true);
    }
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl);
    }
    if (featuredFromUrl) {
      setShowFilters(true);
    }
  }, [searchParams]);

  // Use old page API structure
  const queryParams = {
    page,
    limit: 12,
    ...(selectedLanguage !== "all" && {
      language: selectedLanguage as PostLanguage,
    }),
  };

  // Fetch posts
  const {
    data: postsResponse,
    isLoading,
    error,
    refetch,
  } = useGetPostsQuery(queryParams);

  // Fetch featured posts for sidebar
  const { data: featuredResponse } = useGetFeaturedPostsQuery({ limit: 6 });

  // Fetch homepage posts for trending sidebar
  const { data: homepageResponse } = useGetHomepagePostsQuery({ limit: 6 });

  const posts = postsResponse?.data || [];
  const featuredPosts = featuredResponse?.data || [];
  const homepagePosts = homepageResponse?.data || [];
  const pagination = postsResponse?.pagination;

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setPage(1);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedLanguage("all");
    setSearchTerm("");
    setPage(1);
    setShowFilters(false);
  };

  // Dynamic search handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  // Search button handler
  const handleSearchSubmit = () => {
    // Search is already handled by onChange, but we can trigger refetch if needed
    setPage(1);
  };

  // Use old page categories structure
  const categories = [
    "learning-tips",
    "language-skills",
    "conversation-practice",
    "culture-history",
    "stories-literature",
    "community-corner",
    "daily-practice",
  ];

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

  // Filter posts based on current criteria
  const filteredPosts = posts.filter((post) => {
    // Filter by categories
    if (selectedCategories.length > 0) {
      const hasMatchingCategory = selectedCategories.some((selectedCategory) =>
        post.categories.includes(selectedCategory as PostCategory)
      );
      if (!hasMatchingCategory) {
        return false;
      }
    }

    // Filter by search term (title and content)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(searchLower);
      const contentMatch = post.content.toLowerCase().includes(searchLower);
      if (!titleMatch && !contentMatch) {
        return false;
      }
    }

    return true;
  });

  // Show featured posts if no filters applied, otherwise show filtered posts
  const displayPosts = filteredPosts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters Sidebar - LEFT side (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-1 order-1 lg:order-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </h2>
              </div>

              <div className="space-y-6">
                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Language
                  </label>
                  <div className="space-y-2">
                    {["all", "English", "Nepali", "Newa", "Mixed"].map(
                      (lang) => (
                        <label key={lang} className="flex items-center">
                          <input
                            type="radio"
                            name="language"
                            value={lang}
                            checked={selectedLanguage === lang}
                            onChange={() => handleLanguageChange(lang)}
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {lang === "all" ? "All Languages" : lang}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Categories
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-lg border transition-colors ${
                          selectedCategories.includes(category)
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {getCategoryDisplayName(category)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedCategories.length > 0 ||
                  selectedLanguage !== "all" ||
                  searchTerm) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Clear All Filters</span>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Main Articles Area - MIDDLE */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col gap-4">
                {/* Search Bar with Button */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="pl-10 border-red-200 focus:ring-red-500 focus:border-red-500"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          handleSearchSubmit();
                        }
                      }}
                    />
                  </div>
                  <Button
                    onClick={handleSearchSubmit}
                    className="bg-red-600 text-white hover:bg-red-700 px-6"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>

                {/* Results Count */}
                <div className="text-sm text-gray-600">
                  {displayPosts.length > 0
                    ? `Showing ${displayPosts.length} ${
                        displayPosts.length === 1 ? "article" : "articles"
                      }`
                    : "No articles found"}
                </div>
              </div>
            </div>

            {/* Filters Section - Mobile Below Search, Desktop Left Sidebar */}
            <div className="lg:hidden bg-white rounded-xl border border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-xs px-2 py-1"
                >
                  <span>{showFilters ? "Hide" : "Show"}</span>
                </Button>
              </div>

              <div className={`space-y-3 ${!showFilters ? "hidden" : ""}`}>
                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <div className="space-y-1">
                    {["all", "English", "Nepali", "Newa", "Mixed"].map(
                      (lang) => (
                        <label key={lang} className="flex items-center">
                          <input
                            type="radio"
                            name="language"
                            value={lang}
                            checked={selectedLanguage === lang}
                            onChange={() => handleLanguageChange(lang)}
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {lang === "all" ? "All Languages" : lang}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories
                  </label>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryToggle(category)}
                        className={`w-full text-left px-2 py-1.5 text-sm rounded-md border transition-colors ${
                          selectedCategories.includes(category)
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {getCategoryDisplayName(category)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedCategories.length > 0 ||
                  selectedLanguage !== "all" ||
                  searchTerm) && (
                  <div className="pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full flex items-center justify-center space-x-2 py-1.5 text-xs"
                    >
                      <X className="h-3 w-3" />
                      <span>Clear All Filters</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                  <p className="text-gray-600">Loading articles...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Error loading articles
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Something went wrong while fetching the articles.
                  </p>
                  <Button
                    onClick={() => refetch()}
                    className="bg-red-600 text-white hover:bg-red-700"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Articles List */}
                <div className="space-y-6">
                  {displayPosts && displayPosts.length > 0 ? (
                    displayPosts.map((post) => (
                      <Card
                        key={post._id}
                        className="hover:shadow-md transition-shadow border-red-100 bg-white"
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col space-y-4">
                            {/* Header with Language and Date on Right */}
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <Link
                                  href={`/post/${post._id}`}
                                  className="text-xl font-bold text-gray-900 hover:text-red-600 transition-colors block"
                                >
                                  {post.title}
                                </Link>
                                <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                  <User className="h-3 w-3" />
                                  <span className="font-normal">
                                    {post.writtenBy || "Anonymous"}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end space-y-1">
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {post.language}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Calendar className="h-3 w-3" />
                                  <span>
                                    {new Date(
                                      post.createdAt
                                    ).toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Content Preview */}
                            {post.content && (
                              <p className="text-gray-600 text-sm line-clamp-2">
                                {post.content
                                  .replace(/<[^>]*>/g, "")
                                  .substring(0, 150)}
                                ...
                              </p>
                            )}

                            {/* Footer with Categories and Read More */}
                            <div className="flex items-center justify-between pt-2">
                              <div className="flex flex-wrap gap-2">
                                {post.categories.map((category) => (
                                  <button
                                    key={category}
                                    onClick={() =>
                                      handleCategoryToggle(category)
                                    }
                                    className="px-3 py-1 rounded-md text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                                  >
                                    {getCategoryDisplayName(category)}
                                  </button>
                                ))}
                              </div>
                              <Link
                                href={`/post/${post._id}`}
                                className="text-red-600 hover:text-red-700 text-sm font-medium"
                              >
                                Read more →
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                      <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No articles found
                      </h3>
                      <p className="text-gray-600">
                        {selectedCategories.length > 0 ||
                        selectedLanguage !== "all" ||
                        searchTerm
                          ? "Try adjusting your filters or search term"
                          : "No articles are available at the moment"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {pagination && pagination.pages > 1 && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-sm text-gray-600">
                        Page {pagination.page} of {pagination.pages}
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(page - 1)}
                          disabled={page <= 1}
                          className="border-red-200 text-red-700 hover:bg-red-50"
                        >
                          Previous
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage(page + 1)}
                          disabled={page >= pagination.pages}
                          className="border-red-200 text-red-700 hover:bg-red-50"
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Featured & Trending Articles Sidebar - RIGHT side */}
          <div className="lg:col-span-1 order-3 lg:order-3">
            <ArticleSidebar
              featuredPosts={featuredPosts}
              trendingPosts={homepagePosts}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ArticlesContent />
    </Suspense>
  );
}
