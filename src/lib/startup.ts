import { initializeDatabase } from "@/lib/database/initialization";
import { startCleanupScheduler } from "@/lib/scheduler";

/**
 * Application startup initialization
 * This runs once when the application starts
 */
async function startup(): Promise<void> {
  try {
    console.log("🚀 Starting application initialization...");

    // Initialize database and seed data
    await initializeDatabase();

    // Start cleanup scheduler (only in production or if explicitly enabled)
    if (
      process.env.NODE_ENV === "production" ||
      process.env.ENABLE_SCHEDULER === "true"
    ) {
      startCleanupScheduler();
    } else {
      console.log(
        "⏰ Cleanup scheduler disabled in development (set ENABLE_SCHEDULER=true to enable)"
      );
    }

    console.log("✅ Application initialization completed");
  } catch (error) {
    console.error("❌ Application initialization failed:", error);
    // Don't throw here to prevent app crash during startup
    // Log and continue
  }
}

// Only run on server side and not in tests
if (typeof window === "undefined" && process.env.NODE_ENV !== "test") {
  startup();
}

export { startup };
