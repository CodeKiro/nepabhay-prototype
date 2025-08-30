import mongoose, { Schema, Document, Model } from "mongoose";
import type { User as UserType } from "@/types";

export interface IOAuthProvider {
  provider: "google" | "facebook" | "tiktok";
  providerId: string;
  email?: string;
  connectedAt: Date;
}

export interface IUser extends Omit<UserType, "_id">, Document {
  _id: mongoose.Types.ObjectId;
  passwordHash?: string; // Optional for OAuth users
  resetToken?: string;
  resetTokenExpiry?: Date;
  emailVerificationToken?: string;
  emailVerificationExpiry?: Date;
  oauthProviders: IOAuthProvider[];
  onboardingCompleted?: boolean; // OAuth onboarding status
}

export interface IUserDocument extends IUser {
  toJSON(): Partial<IUser>;
}

export interface IUserModel extends Model<IUserDocument> {
  findByEmail(email: string): Promise<IUserDocument | null>;
  findByUsername(username: string): Promise<IUserDocument | null>;
  findByEmailOrUsername(identifier: string): Promise<IUserDocument | null>;
  findAdmins(): Promise<IUserDocument[]>;
  generateUniqueUsername(baseName: string): Promise<string>;
}

const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username cannot exceed 20 characters"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    passwordHash: {
      type: String,
      required: function (this: IUserDocument) {
        // Password is required only if user doesn't have OAuth providers
        return !this.oauthProviders || this.oauthProviders.length === 0;
      },
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["reader", "writer", "admin"],
      default: "reader",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      select: false,
    },
    emailVerificationExpiry: {
      type: Date,
      select: false,
    },
    resetToken: {
      type: String,
      select: false,
    },
    resetTokenExpiry: {
      type: Date,
      select: false,
    },
    // OAuth providers for third-party authentication
    oauthProviders: [
      {
        provider: {
          type: String,
          enum: ["google", "facebook", "tiktok"],
          required: true,
        },
        providerId: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          lowercase: true,
          trim: true,
        },
        connectedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    // OAuth onboarding status
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
    // Account status management
    isActive: {
      type: Boolean,
      default: true,
    },
    // Blocking functionality (admin action)
    isBlocked: {
      type: Boolean,
      default: false,
    },
    blockedAt: {
      type: Date,
      default: null,
    },
    blockedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    blockReason: {
      type: String,
      trim: true,
    },
    // Deactivation (user action)
    deactivatedAt: {
      type: Date,
      default: null,
    },
    // Soft deletion (30-day grace period)
    deletionRequestedAt: {
      type: Date,
      default: null,
    },
    deletionReason: {
      type: String,
      trim: true,
    },
    // Login tracking
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ deletionRequestedAt: 1 }); // For cleanup jobs
userSchema.index({ isActive: 1 }); // For filtering active users
userSchema.index({ isBlocked: 1 }); // For filtering blocked users
userSchema.index({ deactivatedAt: 1 }); // For filtering deactivated users
userSchema.index({
  "oauthProviders.provider": 1,
  "oauthProviders.providerId": 1,
}); // For OAuth lookups

// Static methods
userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({
    email: email.toLowerCase(),
    deletionRequestedAt: null, // Exclude soft-deleted users
  }).select("+passwordHash");
};

userSchema.statics.findByUsername = function (username: string) {
  return this.findOne({
    username: username.toLowerCase(),
    deletionRequestedAt: null, // Exclude soft-deleted users
  }).select("+passwordHash");
};

userSchema.statics.findByEmailOrUsername = function (identifier: string) {
  const isEmail = identifier.includes("@");
  const query = isEmail
    ? { email: identifier.toLowerCase() }
    : { username: identifier.toLowerCase() };

  return this.findOne({
    ...query,
    deletionRequestedAt: null, // Exclude soft-deleted users
  }).select("+passwordHash");
};

userSchema.statics.findAdmins = function () {
  return this.find({ role: "admin" });
};

userSchema.statics.generateUniqueUsername = async function (baseName: string) {
  // Clean the base name - remove spaces, special chars, make lowercase
  const cleanBase = baseName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .substring(0, 15); // Limit length

  let username = cleanBase;
  let counter = 1;

  // Keep trying until we find a unique username
  while (await this.findOne({ username, deletionRequestedAt: null })) {
    username = `${cleanBase}${counter}`;
    counter++;
  }

  return username;
};

export const User = (mongoose.models.User ||
  mongoose.model<IUserDocument, IUserModel>("User", userSchema)) as IUserModel;
