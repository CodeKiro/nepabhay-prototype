"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/database";

export async function getCleanupStats() {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    await connectDB();

    // Dynamically import User model to prevent client-side loading
    const { User } = await import("@/lib/database/models");

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const pendingDeletion = await User.countDocuments({
      deletionRequestedAt: { $ne: null, $gte: thirtyDaysAgo },
    });

    const readyForDeletion = await User.countDocuments({
      deletionRequestedAt: { $lte: thirtyDaysAgo },
    });

    return {
      pendingDeletion,
      readyForDeletion,
    };
  } catch (error) {
    console.error("Failed to get cleanup stats:", error);
    throw error;
  }
}

export async function runCleanup() {
  try {
    const session = await auth();

    if (!session || session.user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    await connectDB();

    // Dynamically import User model to prevent client-side loading
    const { User } = await import("@/lib/database/models");

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const usersToDelete = await User.find({
      deletionRequestedAt: { $lte: thirtyDaysAgo },
    });

    let deletedCount = 0;
    for (const user of usersToDelete) {
      // TODO: Add additional cleanup here:
      // - Delete user's posts
      // - Delete user's comments
      // - Delete user's uploaded files
      // - Remove from any related collections

      await User.findByIdAndDelete(user._id);
      deletedCount++;
    }

    return {
      deletedCount,
      deletedUsers: usersToDelete.map((u) => ({
        id: u._id.toString(),
        email: u.email,
      })),
    };
  } catch (error) {
    console.error("Failed to run cleanup:", error);
    throw error;
  }
}
