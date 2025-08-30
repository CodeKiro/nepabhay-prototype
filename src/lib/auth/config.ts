import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { connectDB } from "@/lib/database/connection";
import { appConfig } from "@/config/app";
import { paths } from "@/config/paths";
import { getFallbackBaseUrl } from "@/lib/utils/url";
import bcrypt from "bcryptjs";
import type { AuthenticatedUser } from "@/types";
import TikTokProvider from "./providers/tiktok";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  debug: false, // Set to true only when debugging auth issues
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    TikTokProvider({
      clientId: process.env.TIKTOK_CLIENT_ID!,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();

          // Dynamically import User model to prevent client-side loading
          const { User } = await import("@/lib/database/models/user");

          // Check if user exists and is not soft-deleted
          const user = await User.findByEmailOrUsername(
            credentials.identifier as string
          );

          if (!user) {
            return null;
          }

          // We've moved account status checks to the /api/auth/check-account endpoint
          // This just handles password verification

          // Verify password
          if (typeof user.passwordHash !== "string") {
            return null;
          }
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.passwordHash
          );

          if (!isPasswordValid) {
            return null;
          }

          // Note: The account validation (blocked, deactivated, etc.) is now handled
          // by the /api/auth/check-account API endpoint before attempting login

          // Update last login timestamp
          user.lastLogin = new Date();
          await user.save();

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            username: user.username,
            role: user.role,
          } as AuthenticatedUser & { id: string };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      // Handle OAuth sign-ins
      if (account?.provider !== "credentials" && account) {
        try {
          await connectDB();
          const { User } = await import("@/lib/database/models/user");

          // Check if email is available
          if (!user.email) {
            console.error(`Cannot obtain email from ${account.provider}`);
            return false;
          }

          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            // User exists, check if account is linked
            if (!existingUser.oauthProviders) {
              existingUser.oauthProviders = [];
            }

            const hasProvider = existingUser.oauthProviders.some(
              (p) =>
                p.provider === account.provider &&
                p.providerId === account.providerAccountId
            );

            if (!hasProvider) {
              // Link the new OAuth provider to existing account
              existingUser.oauthProviders.push({
                provider: account.provider as "google" | "facebook" | "tiktok",
                providerId: account.providerAccountId,
                email: user.email || undefined,
                connectedAt: new Date(),
              });
            }

            // Auto-verify email for Google OAuth
            if (account.provider === "google" && !existingUser.emailVerified) {
              existingUser.emailVerified = true;
            }

            existingUser.lastLogin = new Date();
            await existingUser.save();
            return true;
          } else {
            // Create new user from OAuth
            const userName = user.name || "User";
            const username = await User.generateUniqueUsername(userName);

            const newUser = new User({
              name: userName,
              username,
              email: user.email,
              emailVerified: account.provider === "google", // Auto-verify for Google
              oauthProviders: [
                {
                  provider: account.provider as
                    | "google"
                    | "facebook"
                    | "tiktok",
                  providerId: account.providerAccountId,
                  email: user.email || undefined,
                  connectedAt: new Date(),
                },
              ],
              role: "reader",
              isActive: true,
              lastLogin: new Date(),
              onboardingCompleted: false, // New OAuth users need onboarding
            });

            await newUser.save();

            // Send welcome email for new OAuth users (don't wait for it to complete)

            // import("@/lib/email/service")
            //   .then(({ emailService }) => {
            //     if (user.email) {
            //       return emailService.sendWelcomeEmail(
            //         user.email,
            //         userName,
            //         "oauth"
            //       );
            //     }
            //   })
            //   .catch((error: Error) => {
            //     console.error("Failed to send OAuth welcome email:", error);
            //     // Don't fail the sign-in if email sending fails
            //   });

            return true;
          }
        } catch (error) {
          console.error("OAuth sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // For credentials login, user object contains the database user info
      if (user && account?.provider === "credentials") {
        token.role = user.role;
        token.username = user.username;
        token.id = user.id; // This is already the MongoDB ObjectId string
      }

      // Handle OAuth tokens - need to get user from database
      if (account?.provider !== "credentials" && user?.email) {
        try {
          await connectDB();
          const { User } = await import("@/lib/database/models/user");
          const dbUser = await User.findOne({ email: user.email });

          if (dbUser) {
            token.role = dbUser.role;
            token.username = dbUser.username;
            token.id = dbUser._id.toString(); // Use the actual MongoDB ObjectId
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Use the custom ID from token instead of the default sub
        session.user.id = (token.id as string) || (token.sub as string);
        session.user.role = token.role as string;
        session.user.username = token.username as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Use the current request's baseUrl (provided by NextAuth) for most accurate URL
      // This automatically handles deployed vs local environments
      const dynamicBaseUrl = baseUrl || getFallbackBaseUrl();

      // Check if this is a callback from OAuth signup that might need onboarding
      if (url.includes("/api/auth/callback/")) {
        // For OAuth sign-in, redirect to onboarding page
        // The onboarding page will check if onboarding is actually needed
        return `${dynamicBaseUrl}/profile/onboarding`;
      }

      // Allows relative callback URLs
      if (url.startsWith("/")) return `${dynamicBaseUrl}${url}`;

      // Allows callback URLs on the same origin
      if (new URL(url).origin === new URL(dynamicBaseUrl).origin) return url;

      return dynamicBaseUrl;
    },
  },
  pages: {
    signIn: paths.auth.signin,
  },
  session: {
    strategy: "jwt",
    maxAge: appConfig.auth.sessionMaxAge,
  },
  cookies: {
    sessionToken: {
      name: `${
        process.env.NODE_ENV === "production" ? "__Secure-" : ""
      }next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // Only set domain in production and only if it's not localhost
        ...(process.env.NODE_ENV === "production" &&
          process.env.NEXTAUTH_URL &&
          !process.env.NEXTAUTH_URL.includes("localhost") && {
            domain: new URL(getFallbackBaseUrl()).hostname.startsWith("www.")
              ? new URL(getFallbackBaseUrl()).hostname.substring(4)
              : new URL(getFallbackBaseUrl()).hostname,
          }),
      },
    },
  },
  secret: appConfig.auth.secret,
});
