import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  _id: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  parentCommentId?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  content: string;
  reactionCount: {
    like: number;
    love: number;
    insightful: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post ID is required"],
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      minlength: [1, "Comment must be at least 1 character long"],
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
    reactionCount: {
      like: { type: Number, default: 0 },
      love: { type: Number, default: 0 },
      insightful: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

export const Comment =
  mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
