import cron from "node-cron";
import { connectDB } from "@/lib/database";

let isSchedulerStarted = false;

export function startCleanupScheduler() {
  if (isSchedulerStarted) {
    console.log("⏰ Cleanup scheduler already running");
    return;
  }

  // Run daily at 2:00 AM
  const task = cron.schedule(
    "0 2 * * *",
    async () => {
      console.log("🧹 Starting automated account cleanup at 2:00 AM...");

      try {
        await runAutomaticCleanup();
        console.log("✅ Automated cleanup completed successfully");
      } catch (error) {
        console.error("❌ Automated cleanup failed:", error);
      }
    },
    {
      timezone: "America/New_York", // Adjust to your timezone
    }
  );

  task.start();
  isSchedulerStarted = true;

  console.log("⏰ Cleanup scheduler started - will run daily at 2:00 AM");
}

export function stopCleanupScheduler() {
  if (isSchedulerStarted) {
    cron.getTasks().forEach((task) => task.stop());
    isSchedulerStarted = false;
    console.log("⏰ Cleanup scheduler stopped");
  }
}

async function runAutomaticCleanup() {
  try {
    await connectDB();

    // Dynamically import User model to prevent client-side loading
    const { User } = await import("@/lib/database/models");

    // Find users marked for deletion more than 30 days ago
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const usersToDelete = await User.find({
      deletionRequestedAt: { $lte: thirtyDaysAgo },
    });

    if (usersToDelete.length === 0) {
      console.log("🧹 No accounts to cleanup");
      return { deletedCount: 0, deletedUsers: [] };
    }

    console.log(
      `🧹 Found ${usersToDelete.length} accounts ready for permanent deletion`
    );

    let deletedCount = 0;
    const deletedUsers = [];

    for (const user of usersToDelete) {
      try {
        console.log(`🗑️ Deleting user: ${user.email} (${user.username})`);

        // TODO: Add cleanup for related data:
        // - Delete user's posts
        // - Delete user's comments
        // - Delete user's uploaded files
        // - Remove from any related collections

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

    console.log(
      `🎉 Automatic cleanup completed. Deleted ${deletedCount} accounts.`
    );

    return { deletedCount, deletedUsers };
  } catch (error) {
    console.error("❌ Automatic cleanup failed:", error);
    throw error;
  }
}

// Export for manual use
export { runAutomaticCleanup };
