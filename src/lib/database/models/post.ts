import mongoose, { Schema, Document, Model } from "mongoose";
import type { Post as PostType } from "@/types";

export interface IPost extends Omit<PostType, "_id">, Document {
  _id: mongoose.Types.ObjectId;
}

export interface IPostDocument extends IPost {
  toJSON(): Partial<IPost>;
}

export interface IPostModel extends Model<IPostDocument> {
  findByLanguage(language: string): Promise<IPostDocument[]>;
  findByCategory(category: string): Promise<IPostDocument[]>;
  findFeatured(): Promise<IPostDocument[]>;
  findForHomepage(): Promise<IPostDocument[]>;
}

const postSchema = new Schema<IPostDocument, IPostModel>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters long"],
    },
    language: {
      type: String,
      required: [true, "Language is required"],
      enum: ["English", "Nepali", "Newa", "Mixed"],
    },
    categories: {
      type: [String],
      required: [true, "At least one category is required"],
      enum: [
        "learning-tips",
        "language-skills",
        "conversation-practice",
        "culture-history",
        "stories-literature",
        "community-corner",
        "daily-practice",
      ],
      validate: {
        validator: function (v: string[]) {
          return v.length >= 1 && v.length <= 3;
        },
        message: "Post must have between 1 and 3 categories",
      },
    },
    writtenBy: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    writtenDate: {
      type: Date,
      required: [true, "Written date is required"],
    },
    showOnFeatured: {
      type: Boolean,
      default: false,
    },
    showOnHomepage: {
      type: Boolean,
      default: false,
    },
    reactionCount: {
      like: {
        type: Number,
        default: 0,
        min: 0,
      },
      love: {
        type: Number,
        default: 0,
        min: 0,
      },
      insightful: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    recommendedArticles: {
      type: [String],
      default: [],
      validate: {
        validator: function (v: string[]) {
          return v.length <= 5;
        },
        message: "Maximum 5 recommended articles allowed",
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { __v, ...publicPost } = ret;
        return publicPost;
      },
    },
  }
);

// Indexes for better performance
postSchema.index({ language: 1 });
postSchema.index({ categories: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ writtenDate: -1 });
postSchema.index({ showOnFeatured: 1 });
postSchema.index({ showOnHomepage: 1 });
postSchema.index(
  { title: "text", content: "text" },
  {
    default_language: "english",
    language_override: "none",
  }
);

// Static methods
postSchema.statics.findByLanguage = function (language: string) {
  return this.find({ language });
};

postSchema.statics.findByCategory = function (category: string) {
  return this.find({ categories: { $in: [category] } });
};

postSchema.statics.findFeatured = function () {
  return this.find({ showOnFeatured: true }).sort({ createdAt: -1 });
};

postSchema.statics.findForHomepage = function () {
  return this.find({ showOnHomepage: true }).sort({ createdAt: -1 });
};

export const Post = (mongoose.models.Post ||
  mongoose.model<IPostDocument, IPostModel>("Post", postSchema)) as IPostModel;
