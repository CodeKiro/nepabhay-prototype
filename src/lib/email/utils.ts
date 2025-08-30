import crypto from "crypto";

/**
 * Generate a secure random token for email verification or password reset
 */
export function generateSecureToken(length: number = 32): string {
  return crypto.randomBytes(length).toString("hex");
}

/**
 * Generate a verification token with expiry
 */
export function generateVerificationToken(): {
  token: string;
  hashedToken: string;
  expiresAt: Date;
} {
  const token = generateSecureToken();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  return { token, hashedToken, expiresAt };
}

/**
 * Generate a password reset token with shorter expiry
 */
export function generatePasswordResetToken(): {
  token: string;
  hashedToken: string;
  expiresAt: Date;
} {
  const token = generateSecureToken();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  return { token, hashedToken, expiresAt };
}

/**
 * Hash a token for storage in database
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Verify if a token matches the hashed version
 */
export function verifyToken(token: string, hashedToken: string): boolean {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  return tokenHash === hashedToken;
}
