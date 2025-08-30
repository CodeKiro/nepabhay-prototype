import { connectDB } from "./connection";
import { validateEnvironmentVariables } from "@/config/app";
import bcrypt from "bcryptjs";

// Track initialization state
let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

/**
 * Creates the default admin user if it doesn't exist
 */
async function createDefaultAdmin(): Promise<void> {
  try {
    // Validate environment variables are available
    validateEnvironmentVariables();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";
    const adminName = "System Admin";
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const bcryptRounds = 12;

    // Dynamically import User model to prevent client-side loading
    const { User } = await import("./models/user");

    // Check if admin already exists
    const existingAdmin = await User.findByEmail(adminEmail);

    if (existingAdmin) {
      console.log("✅ Admin user already exists");
      return;
    }

    // Create admin user
    const passwordHash = await bcrypt.hash(adminPassword, bcryptRounds);

    const adminUser = new User({
      name: adminName,
      username: adminUsername,
      email: adminEmail,
      passwordHash,
      role: "admin",
      emailVerified: true, // Admin should be pre-verified
    });

    await adminUser.save();

    console.log("🎉 Admin user created successfully");
    console.log(`� Username: ${adminUsername}`);
    console.log(`�📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    console.log("⚠️  Please change the default password after first login");
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    throw new Error(`Failed to create admin user: ${error}`);
  }
}

/**
 * Initializes the database with default data
 */
export async function initializeDatabase(): Promise<void> {
  // Prevent multiple simultaneous initializations
  if (isInitialized) {
    return;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    try {
      console.log("🚀 Starting database initialization...");

      // Ensure database connection
      await connectDB();

      // Create default admin
      await createDefaultAdmin();

      isInitialized = true;
      console.log("✅ Database initialization completed successfully");
    } catch (error) {
      console.error("❌ Database initialization failed:", error);
      initializationPromise = null; // Reset promise to allow retry
      throw error;
    }
  })();

  return initializationPromise;
}

/**
 * Resets the initialization state (useful for testing)
 */
export function resetInitialization(): void {
  isInitialized = false;
  initializationPromise = null;
}
