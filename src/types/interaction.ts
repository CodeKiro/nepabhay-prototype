// Comment and interaction types

export interface Comment {
  _id: string;
  postId: string;
  userId: {
    _id: string;
    name: string;
  };
  content: string;
  parentCommentId?: string;
  replies?: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommentData {
  postId: string;
  content: string;
  parentCommentId?: string;
}

export interface Reaction {
  _id: string;
  postId: string;
  userId: string;
  type: "like" | "love" | "insightful";
  createdAt: Date;
}

export interface CreateReactionData {
  postId: string;
  type: "like" | "love" | "insightful";
}

export interface Feedback {
  _id: string;
  userId?: string;
  email?: string;
  subject: string;
  message: string;
  category: "bug" | "feature" | "general" | "complaint";
  status: "pending" | "reviewed" | "resolved";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFeedbackData {
  subject: string;
  message: string;
  category: "bug" | "feature" | "general" | "complaint";
  email?: string;
}
