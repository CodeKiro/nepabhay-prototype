// Post-related types and interfaces

export type PostLanguage = "English" | "Nepali" | "Newa" | "Mixed";

export type PostCategory =
  | "learning-tips"
  | "language-skills"
  | "conversation-practice"
  | "culture-history"
  | "stories-literature"
  | "community-corner"
  | "daily-practice";

export interface Post {
  _id: string;
  title: string;
  content: string;
  language: PostLanguage;
  categories: PostCategory[];
  writtenBy: string;
  writtenDate: Date;
  showOnFeatured: boolean;
  showOnHomepage: boolean;
  reactionCount: {
    like: number;
    love: number;
    insightful: number;
  };
  recommendedArticles: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostData {
  title: string;
  content: string;
  language: PostLanguage;
  categories: PostCategory[];
  writtenBy: string;
  writtenDate: Date;
  showOnFeatured?: boolean;
  showOnHomepage?: boolean;
  recommendedArticles?: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  _id: string;
}

export interface PostFilter {
  language?: PostLanguage;
  categories?: { $in: PostCategory[] };
  showOnFeatured?: boolean;
  showOnHomepage?: boolean;
  search?: string;
}

export interface PostQuery {
  language?: string;
  genre?: string;
  featured?: string;
  homepage?: string;
  page?: string;
  limit?: string;
  search?: string;
}
