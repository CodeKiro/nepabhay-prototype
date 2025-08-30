"use client";

import ArticleNavbar from "@/components/ArticleNavbar";
import { useState } from "react";
import { ArticleContext } from "@/contexts/ArticleContext";

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [onSearch, setOnSearch] = useState<
    ((query: string) => void) | undefined
  >();

  return (
    <ArticleContext.Provider value={{ onSearch, setOnSearch }}>
      <div className="min-h-screen flex flex-col bg-white">
        <ArticleNavbar onSearch={onSearch} />
        <main className="flex-1">{children}</main>
      </div>
    </ArticleContext.Provider>
  );
}
