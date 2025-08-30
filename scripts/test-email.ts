#!/usr/bin/env tsx

/**
 * Email Service Test Script
 *
 * This script tests the email service with Gmail SMTP configuration.
 * Run with: npm run test-email
 */

import { config } from "dotenv";
import path from "path";

// Load environment variables first
config({ path: path.resolve(process.cwd(), ".env.local") });

// Import after loading env vars
import { emailService } from "../src/lib/email";

async function testEmailService() {
  console.log("🧪 Testing Email Service with Gmail SMTP...\n");

  // Debug: Show loaded environment variables
  console.log("📧 Environment variables loaded:");
  console.log(`   MAIL_HOST: ${process.env.MAIL_HOST || "NOT SET"}`);
  console.log(`   MAIL_PORT: ${process.env.MAIL_PORT || "NOT SET"}`);
  console.log(`   MAIL_USER: ${process.env.MAIL_USER || "NOT SET"}`);
  console.log(`   MAIL_FROM: ${process.env.MAIL_FROM || "NOT SET"}`);
  console.log(
    `   MAIL_PASSWORD: ${process.env.MAIL_PASSWORD ? "***SET***" : "NOT SET"}`
  );
  console.log("");

  // Check if all required vars are set
  if (
    !process.env.MAIL_HOST ||
    !process.env.MAIL_PORT ||
    !process.env.MAIL_USER ||
    !process.env.MAIL_PASSWORD ||
    !process.env.MAIL_FROM
  ) {
    console.log("❌ Missing required email environment variables!");
    console.log("Please check your .env.local file contains:");
    console.log("   MAIL_HOST=smtp.gmail.com");
    console.log("   MAIL_PORT=587");
    console.log("   MAIL_USER=your-user");
    console.log("   MAIL_PASSWORD=your-password");
    console.log("   MAIL_FROM=your-from-email");
    return;
  }

  // Test 1: Connection Test
  console.log("1. Testing SMTP connection...");
  const connectionTest = await emailService.testConnection();

  if (connectionTest) {
    console.log("   ✅ SMTP connection successful!");
  } else {
    console.log("   ❌ SMTP connection failed!");
    return;
  }

  // Test 2: Test verification email (optional - uncomment to test)
  /*
  console.log("\n2. Testing verification email...");
  const testToken = "test-verification-token-123";
  const verificationTest = await emailService.sendVerificationEmail(
    "your-test-email@example.com", // Replace with your email
    testToken
  );
  
  if (verificationTest) {
    console.log("   ✅ Verification email sent successfully!");
  } else {
    console.log("   ❌ Failed to send verification email!");
  }
  */

  // Test 3: Test password reset email (optional - uncomment to test)
  /*
  console.log("\n3. Testing password reset email...");
  const resetToken = "test-reset-token-456";
  const resetTest = await emailService.sendPasswordResetEmail(
    "your-test-email@example.com", // Replace with your email
    resetToken
  );
  
  if (resetTest) {
    console.log("   ✅ Password reset email sent successfully!");
  } else {
    console.log("   ❌ Failed to send password reset email!");
  }
  */

  console.log("\n✨ Email service test completed!");
}

// Run the test
testEmailService().catch((error) => {
  console.error("❌ Email service test failed:", error);
  process.exit(1);
});
