"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Loading from "@/components/ui/Loading";
import { formatDate, stripHtmlAndTruncate } from "@/lib/utils";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  RefreshCw,
  Filter,
  X,
  FileText,
  Star,
  Home,
  Globe,
} from "lucide-react";

interface Post {
  _id: string;
  title: string;
  content: string;
  language: string;
  categories: string[];
  writtenBy: string;
  writtenDate: string;
  showOnFeatured: boolean;
  showOnHomepage: boolean;
  reactionCount: {
    like: number;
    love: number;
    insightful: number;
  };
  createdAt: string;
  updatedAt: string;
}

const LANGUAGES = [
  { value: "English", label: "English" },
  { value: "Nepali", label: "Nepali" },
  { value: "Newa", label: "Newa" },
  { value: "Mixed", label: "Mixed" },
];

const CATEGORIES = [
  { value: "learning-tips", label: "Learning Tips" },
  { value: "language-skills", label: "Language Skills" },
  { value: "conversation-practice", label: "Conversation & Practice" },
  { value: "culture-history", label: "Culture & History" },
  { value: "stories-literature", label: "Stories & Literature" },
  { value: "community-corner", label: "Community Corner" },
  { value: "daily-practice", label: "Daily Practice" },
];

const getCategoryDisplayName = (category: string) => {
  const categoryMap = CATEGORIES.find((cat) => cat.value === category);
  return categoryMap ? categoryMap.label : category;
};

// Memoized Posts List Component for better performance
const PostsList = memo(
  ({
    posts,
    loading,
    error,
    deletePost,
    toggleCategory,
    selectedCategories,
  }: {
    posts: Post[];
    loading: boolean;
    error: string;
    deletePost: (id: string) => void;
    toggleCategory: (category: string) => void;
    selectedCategories: string[];
  }) => {
    if (loading) {
      return <Loading size="md" showBrand={false} className="h-64" />;
    }

    if (error) {
      return (
        <div className="text-center py-12">
          <p className="text-blue-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No posts found</p>
            <Button asChild>
              <Link href="/admin/posts/new">
                <Plus className="h-4 w-4 mr-2" />
                Create your first post
              </Link>
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post._id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{post.language}</Badge>
                    {post.showOnFeatured && (
                      <Badge className="bg-amber-100 text-amber-800">
                        Featured
                      </Badge>
                    )}
                    {post.showOnHomepage && (
                      <Badge className="bg-sky-100 text-sky-800">
                        Homepage
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <p className="text-sm text-gray-600">
                    By {post.writtenBy} • {formatDate(post.writtenDate)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link
                      href={`/post/${post._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye className="h-3 w-3" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/posts/${post._id}/edit`}>
                      <Edit className="h-3 w-3" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deletePost(post._id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">
                {stripHtmlAndTruncate(post.content, 200)}
              </p>

              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.categories.map((category: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1.5 rounded-md text-xs transition-all duration-200 cursor-pointer ${
                        selectedCategories.includes(category)
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-sm"
                      }`}
                    >
                      {getCategoryDisplayName(category)}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex space-x-4">
                  <span>❤️ {post.reactionCount.like}</span>
                  <span>💝 {post.reactionCount.love}</span>
                  <span>💡 {post.reactionCount.insightful}</span>
                </div>
                <span>Created {formatDate(post.createdAt)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
);

PostsList.displayName = "PostsList";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFeatured, setShowFeatured] = useState<boolean | null>(null);
  const [showHomepage, setShowHomepage] = useState<boolean | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (selectedLanguage) params.append("language", selectedLanguage);
      if (selectedCategories.length > 0)
        params.append("category", selectedCategories.join(","));
      if (showFeatured !== null)
        params.append("featured", showFeatured.toString());
      if (showHomepage !== null)
        params.append("homepage", showHomepage.toString());

      const response = await fetch(`/api/posts?${params}`);
      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      if (data.success) {
        setPosts(data.data || []);
        setError("");
      } else {
        console.error("API returned error:", data.error);
        setPosts([]);
        setError(data.error || "Failed to load posts");
      }
    } catch (err) {
      setError("Failed to load posts");
      console.error(err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [
    search,
    selectedLanguage,
    selectedCategories,
    showFeatured,
    showHomepage,
  ]);

  useEffect(() => {
    // For search, use debounced fetch to avoid too many API calls
    if (search) {
      const timeoutId = setTimeout(fetchPosts, 300);
      return () => clearTimeout(timeoutId);
    } else {
      // For non-search filters, fetch immediately
      fetchPosts();
    }
  }, [fetchPosts, search]);

  const clearFilters = () => {
    setSearch("");
    setSelectedLanguage("");
    setSelectedCategories([]);
    setShowFeatured(null);
    setShowHomepage(null);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      alert("Failed to delete post");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <p className="mt-2 text-gray-600">Manage your published content</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/admin/posts/new">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Link>
          </Button>
          <Button variant="outline" onClick={fetchPosts} disabled={loading}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search posts by title or content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Close Filter" : "Open Filter"}
              {(selectedLanguage ||
                selectedCategories.length > 0 ||
                showFeatured !== null ||
                showHomepage !== null) && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                  {(selectedLanguage ? 1 : 0) +
                    selectedCategories.length +
                    (showFeatured !== null ? 1 : 0) +
                    (showHomepage !== null ? 1 : 0)}
                </span>
              )}
            </Button>
            {(selectedLanguage ||
              selectedCategories.length > 0 ||
              showFeatured !== null ||
              showHomepage !== null) && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Language
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="language"
                        value=""
                        checked={selectedLanguage === ""}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        All Languages
                      </span>
                    </label>
                    {LANGUAGES.map((lang) => (
                      <label key={lang.value} className="flex items-center">
                        <input
                          type="radio"
                          name="language"
                          value={lang.value}
                          checked={selectedLanguage === lang.value}
                          onChange={(e) => setSelectedLanguage(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {lang.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Categories
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {CATEGORIES.map((cat) => (
                      <label key={cat.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.value)}
                          onChange={() => toggleCategory(cat.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {cat.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Featured Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Star className="w-4 h-4 inline mr-1" />
                    Featured
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="featured"
                        checked={showFeatured === null}
                        onChange={() => setShowFeatured(null)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">All</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="featured"
                        checked={showFeatured === true}
                        onChange={() => setShowFeatured(true)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Featured
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="featured"
                        checked={showFeatured === false}
                        onChange={() => setShowFeatured(false)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Not Featured
                      </span>
                    </label>
                  </div>
                </div>

                {/* Homepage Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Home className="w-4 h-4 inline mr-1" />
                    Homepage
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="homepage"
                        checked={showHomepage === null}
                        onChange={() => setShowHomepage(null)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">All</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="homepage"
                        checked={showHomepage === true}
                        onChange={() => setShowHomepage(true)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        On Homepage
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="homepage"
                        checked={showHomepage === false}
                        onChange={() => setShowHomepage(false)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Not on Homepage
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <PostsList
        posts={posts}
        loading={loading}
        error={error}
        deletePost={deletePost}
        toggleCategory={toggleCategory}
        selectedCategories={selectedCategories}
      />
    </div>
  );
}
