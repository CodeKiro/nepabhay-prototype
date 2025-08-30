import { z } from "zod";

// Enums
export const categories = [
  "learning-tips",
  "language-skills",
  "conversation-practice",
  "culture-history",
  "stories-literature",
  "community-corner",
  "daily-practice",
] as const;
export const languages = ["English", "Nepali", "Newa", "Mixed"] as const;
export const reactions = ["like", "love", "insightful"] as const;

// Validation schemas
export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .trim(),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username cannot exceed 20 characters")
      .regex(
        /^[a-z0-9_]+$/,
        "Username can only contain lowercase letters, numbers, and underscores"
      )
      .toLowerCase(),
    email: z.string().email("Please enter a valid email address").toLowerCase(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password cannot exceed 100 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const SignInSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or username is required")
    .transform((val) => val.toLowerCase()),
  password: z.string().min(1, "Password is required"),
});

export const PostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title cannot exceed 200 characters")
    .trim(),
  content: z.string().min(10, "Content must be at least 10 characters").trim(),
  categories: z
    .array(z.enum(categories))
    .min(1, "At least one category is required")
    .max(3, "Maximum 3 categories allowed"),
  language: z.enum(languages, {
    message: "Please select a language",
  }),
  writtenDate: z.date({
    message: "Written date is required",
  }),
  writtenBy: z
    .string()
    .min(2, "Author name must be at least 2 characters")
    .max(100, "Author name cannot exceed 100 characters")
    .trim(),
  showOnFeatured: z.boolean(),
  showOnHomepage: z.boolean(),
  recommendedArticles: z
    .array(z.string())
    .max(5, "Maximum 5 recommended articles allowed")
    .optional(),
});

export const CommentSchema = z.object({
  content: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(1000, "Comment cannot exceed 1000 characters")
    .trim(),
  parentCommentId: z.string().optional(),
});

export const FeedbackSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .trim(),
  email: z.string().email("Please enter a valid email address").toLowerCase(),
  message: z
    .string()
    .min(5, "Message must be at least 5 characters")
    .max(1000, "Message cannot exceed 1000 characters")
    .trim(),
});

// Types
export type SignUpFormData = z.infer<typeof SignUpSchema>;
export type SignInFormData = z.infer<typeof SignInSchema>;
export type PostFormData = z.infer<typeof PostSchema>;
export type CommentFormData = z.infer<typeof CommentSchema>;
export type FeedbackFormData = z.infer<typeof FeedbackSchema>;
