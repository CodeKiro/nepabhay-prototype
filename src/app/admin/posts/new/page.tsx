"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { type PostFormData } from "@/lib/schemas";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    setError("");

    try {
      // Ensure the date is properly serialized
      const submitData = {
        ...data,
        writtenDate: data.writtenDate.toISOString(),
      };

      console.log("Creating post with data:", submitData);

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to create post");
      }

      router.push("/admin/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PostForm
      mode="create"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
}
