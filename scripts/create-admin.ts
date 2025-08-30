#!/usr/bin/env tsx

/**
 * Admin User Creation Script
 *
 * This script creates an admin user in the database.
 * Run with: npm run setup-admin
 */

// Load environment variables first
import { config } from "dotenv";
config({ path: ".env.local" });

import { connectDB } from "../src/lib/database";
import { User } from "../src/lib/database/models";
import bcrypt from "bcryptjs";

async function createAdminUser() {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || "admin@gmail.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    const admin = new User({
      name: "Admin",
      email: adminEmail,
      passwordHash,
      role: "admin",
      emailVerified: true, // Admin should be pre-verified
    });

    await admin.save();
    console.log("Admin user created successfully");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

// Export for use in other files
export { createAdminUser };

// Run if called directly
if (require.main === module) {
  createAdminUser().then(() => {
    process.exit(0);
  });
}
