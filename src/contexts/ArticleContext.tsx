"use client";

import { createContext, useContext } from "react";

interface ArticleContextType {
  onSearch?: (query: string) => void;
  setOnSearch: (onSearch: (query: string) => void) => void;
}

export const ArticleContext = createContext<ArticleContextType | undefined>(
  undefined
);

export const useArticleContext = () => {
  const context = useContext(ArticleContext);
  if (!context) {
    throw new Error("useArticleContext must be used within ArticleLayout");
  }
  return context;
};
