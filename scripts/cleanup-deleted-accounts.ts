#!/usr/bin/env tsx

/**
 * Cleanup Script for Account Deletion (TypeScript Version)
 *
 * This script permanently deletes user accounts that have been marked
 * for deletion for more than 30 days.
 *
 * Usage:
 * 1. As cron job: Add to crontab to run daily
 *    0 2 * * * /usr/bin/npx tsx /path/to/cleanup-deleted-accounts.ts
 *
 * 2. Manual execution:
 *    npx tsx scripts/cleanup-deleted-accounts.ts
 *
 * 3. API call:
 *    POST /api/admin/cleanup
 *    Headers: { "x-api-key": "your-cleanup-key" }
 */

import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

// User schema (simplified for cleanup script)
const userSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    name: String,
    deletionRequestedAt: Date,
    deletionReason: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

interface CleanupResult {
  deletedCount: number;
  deletedUsers: Array<{
    id: string;
    email: string;
    username: string;
    deletionRequestedAt: Date;
  }>;
}

async function cleanupDeletedAccounts(): Promise<CleanupResult> {
  try {
    // Connect to MongoDB
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is required");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Find users marked for deletion more than 30 days ago
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const usersToDelete = await User.find({
      deletionRequestedAt: { $lte: thirtyDaysAgo },
    });

    console.log(
      `Found ${usersToDelete.length} accounts ready for permanent deletion`
    );

    if (usersToDelete.length === 0) {
      console.log("No accounts to delete");
      return { deletedCount: 0, deletedUsers: [] };
    }

    let deletedCount = 0;
    const deletedUsers: CleanupResult["deletedUsers"] = [];

    for (const user of usersToDelete) {
      try {
        console.log(`Deleting user: ${user.email} (${user.username})`);

        // TODO: Add cleanup for related data:
        // - Delete user's posts
        // - Delete user's comments
        // - Delete user's uploaded files
        // - Remove from any related collections

        // For now, just delete the user
        await User.findByIdAndDelete(user._id);

        deletedUsers.push({
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          deletionRequestedAt: user.deletionRequestedAt,
        });

        deletedCount++;
        console.log(`✅ Deleted user: ${user.email}`);
      } catch (error) {
        console.error(`❌ Failed to delete user ${user.email}:`, error);
      }
    }

    console.log(`\n🎉 Cleanup completed. Deleted ${deletedCount} accounts.`);

    return { deletedCount, deletedUsers };
  } catch (error) {
    console.error("❌ Cleanup script failed:", error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run if called directly
if (require.main === module) {
  cleanupDeletedAccounts()
    .then((result) => {
      console.log("\n📊 Summary:", result);
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Script failed:", error);
      process.exit(1);
    });
}

export { cleanupDeletedAccounts };
