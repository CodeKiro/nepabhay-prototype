"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { type PostFormData } from "@/lib/schemas";
import PostForm from "@/components/admin/PostForm";
import Loading from "@/components/ui/Loading";

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
  recommendedArticles?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function EditPostPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState<Post | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const router = useRouter();
  const params = useParams();
  const postId = params.id as string;

  // Fetch post data for editing
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        if (data.success) {
          setPost(data.data);
        } else {
          setFetchError(data.error || "Failed to load post");
        }
      } catch (err) {
        setFetchError(
          err instanceof Error ? err.message : "Failed to load post"
        );
      } finally {
        setFetchLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    setError("");

    try {
      // Ensure the date is properly serialized
      const submitData = {
        ...data,
        writtenDate: data.writtenDate.toISOString(),
      };

      console.log("Submitting data:", submitData);

      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to update post");
      }

      router.push("/admin/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (fetchLoading) {
    return <Loading size="md" showBrand={false} className="min-h-[400px]" />;
  }

  if (fetchError || !post) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-12">
          <p className="text-blue-600 mb-4">{fetchError || "Post not found"}</p>
          <button
            onClick={() => router.push("/admin/posts")}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Back to Posts
          </button>
        </div>
      </div>
    );
  }

  // Prepare initial data for the form
  const initialData: Partial<PostFormData> = {
    title: post.title,
    content: post.content,
    language: post.language as PostFormData["language"],
    categories: post.categories as PostFormData["categories"],
    writtenBy: post.writtenBy,
    writtenDate: new Date(post.writtenDate),
    showOnFeatured: post.showOnFeatured,
    showOnHomepage: post.showOnHomepage,
    recommendedArticles: post.recommendedArticles || [],
  };

  return (
    <PostForm
      mode="edit"
      initialData={initialData}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      currentPostId={postId}
    />
  );
}
